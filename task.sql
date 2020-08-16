# Write your MySQL query statement below
select name, population, area from World
where area > 3000000 or population > 25000000

# Write your MySQL query statement below
update `salary` SET sex = (case when sex = 'f' then 'm' when sex = 'm' then 'f' end);

# Write your MySQL query statement below
select * from `cinema` WHERE MOD(id, 2) = 1 AND description NOT LIKE 'boring' ORDER BY rating DESC;

# Write your MySQL query statement below
select class from (
    select class, count(distinct student) as num from courses group by class
) as temp_table where num >= 5;

# Write your MySQL query statement below
select max(num)as num from (
    select num, count(num) as cnt from `my_numbers` group by num
) as T WHERE cnt = 1;

# Write your MySQL query statement below
select distinct a.seat_id
from cinema a join cinema b
  on abs(a.seat_id - b.seat_id) = 1
  and a.free = true and b.free = true
order by a.seat_id;

# Write your MySQL query statement below
select name from `customer` WHERE referee_id IS NULL OR referee_id <> 2;

# Write your MySQL query statement below
delete t1 FROM `Person` t1
INNER JOIN `Person` t2
WHERE
    t1.Id > t2.Id AND
    t1.Email = t2.Email;

# Write your MySQL query statement below
delete t1 FROM Person t1, Person t2
WHERE
    t1.Id > t2.Id AND
    t1.Email = t2.Email;

# Write your MySQL query statement below
select
    a.Name as 'Employee'
from
    Employee as a,
    Employee as b
where
    a.ManagerId = b.Id
        and a.Salary > b.Salary
;

# Write your MySQL query statement below
select
     a.NAME as Employee
from Employee as a join Employee as b
     on a.ManagerId = b.Id
     and a.Salary > b.Salary
;

# Write your MySQL query statement below
select
    weather.id as 'Id'
from
    weather
        join
    weather w on DATEDIFF(weather.RecordDate, w.RecordDate) = 1
        and weather.Temperature > w.Temperature
;
