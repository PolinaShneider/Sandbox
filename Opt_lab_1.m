clc; clearvars;

A = [];
b = [];
lb = [0; 0; 0; 0; 0; 0];
ub = [10; 20; 15; 15; 2; 15];
Aeq = [1 1 1 1 1 1];
beq = 40;
startingPoint = lb;

% Целевые функции
y1 = @(x) time(x); % → min
z1 = @(x) y1(x); % → min
[x1, z1_opt] = fmincon(z1, startingPoint, A, b, Aeq, beq, lb, ub);


y2 = @(x) demand(x); % → max
z2 = @(x) -y2(x); % → min
[x2, z2_opt] = fmincon(z2, startingPoint, A, b, Aeq, beq, lb, ub);


y3 = @(x) money(x, x1); % → max
z3 = @(x) -y3(x); % → min
[x3, z3_opt] = fmincon(z3, startingPoint, A, b, Aeq, beq, lb, ub);


% Выделение главного критерия — время. Ограничение: выручка 90% от max
A = [-300 -800 -500 -500 -1500 -850];
b = z3_opt * 0.9;
[x4, main_opt] = fmincon(z1, startingPoint, A, b, Aeq, beq, lb, ub);

disp(x4);
disp(main_opt);

% Аддитивная свертка
z1_norm = @(x) z1(x)/abs(z1_opt);
z2_norm = @(x) z2(x)/abs(z2_opt);
z3_norm = @(x) z3(x)/abs(z3_opt);
A = [];
b = [];
f = @(x) 1/3 * z1_norm(x) + 1/3 * z2_norm(x) + 1/3 * z3_norm(x);
[x5, add_opt] = fmincon(f, startingPoint, A, b, Aeq, beq, lb, ub);

% Мультипликативная свертка
f = @(x) 1 / (z1(x) * z2(x) * z3(x));
A = [];
b = [];
[x6, mult_opt] = fmincon(f, startingPoint, A, b, Aeq, beq, lb, ub);

% Минимакс
f = @(x) [z1_norm(x) z2_norm(x) z3_norm(x)];
A = [];
b = [];
[x7, minmax_opt] = fminimax(f, startingPoint, A, b, Aeq, beq, lb, ub);

% Метод последовательных уступок
A = [
    -300 -800 -500 -500 -700 -850;
    -6 -10 -6.5 -7 -2 -8;
    -10 -20 -20 -15 -1 -15;
];
b = [z3_opt * 0.8; -z1_opt * 0.8; z2_opt * 0.8];
[x8, gradual_opt] = fmincon(z1, startingPoint, A, b, Aeq, beq, lb, ub);

% Метод достижения цели
f = @(x) [z1(x), z2(x), z3(x)];
goal = [z1_opt, z2_opt, z3_opt];
w = abs(goal);
A = [];
b = [];
[x9, goalattaint_opt, attain_factor] = fgoalattain(f, startingPoint, goal, w, A, b, Aeq, beq, lb, ub);

% Введение метрики
f_met = @(x)(1 - z1_norm(x))^2 + (1 - z2_norm(x))^2 + (1 - z3_norm(x))^2;
[x10, met_opt] = fmincon(f_met, startingPoint, A, b, Aeq, beq, lb, ub);

% Стохастическое программирование
A = [-300 -800 -500 -500 -700 -850; -1 -1 -1 -1 -1 -1];
% M = 40; D = 16;
Aeq = [];
beq = [];

K = [0.7265, 0.5095, 0.3249, 0.1584];
x_stoch = zeros(4,6);
f_val_stock = zeros(4,1);
for n = 1:length(K)
    b = [z3_opt * 0.9; -40 + K(n) * 6];
    [x11, main_stoch_opt] = fmincon(z1, startingPoint, A, b, Aeq, beq, lb, ub);
    x_stoch(n,:) = x11;
    f_val_stock(n) = main_stoch_opt;
end

function [total] = time(x)
    total = (6*x(1) + 10*x(2) + 6.5*x(3) + 7*x(4) + 2*x(5) + 8*x(6));
end

function [claimed] = demand(x)
    claimed = (10*x(1) + 20*x(2) + 15*x(3) + 15*x(4) + 1*x(5) + 15*x(6));
end

function [accum] = money(x, x1)
    accum = 0;
    if (x1(1) >= 6)
        accum = accum + 300*x(1);
    end
    if (x1(2) >= 10)
        accum = accum + 800*x(2);
    end
    if (x1(3) >= 6.5)
        accum = accum + 500*x(3);
    end
    if (x1(4) >= 7)
        accum = accum + 500*x(4);
    end
    if (x1(5) >= 2)
        accum = accum + 1500*x(5);
    end
    if (x1(6) >= 8)
        accum = accum + 850*x(6);
    end
end

