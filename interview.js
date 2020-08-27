const root = {
    children: [
        {
            children: [
                {
                    children: [],
                    val: 5
                },
                {
                    children: [],
                    val: 6
                }
            ],
            val: 3
        },
        {
            children: [],
            val: 2
        },
        {
            children: [],
            val: 4
        }
    ],
    val: 1
};

function dfs(tree) {
    const stack = [tree];
    const values = [];
    while (stack.length) {
        const curr = stack.pop();
        values.push(curr.val);

        for (const child of curr.children) {
            stack.push(child);
        }
    }

    return values;
}

function bfs(root) {
    const queue = [root];
    const values = [];
    while (queue.length) {
        let current = queue.shift();
        values.push(current.val);

        for (let child of current.children) {
            queue.push(child);
        }
    }

    return values;
}


function binary(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while (high >= low) {
        const mid = Math.floor((high + low) / 2);
        if (arr[mid] === target) {
            return mid;
        }

        if (target > arr[mid]) {
            low = mid + 1;
        }

        if (arr[mid] > target) {
            high = mid - 1;
        }
    }

    return -1;
}

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

function fib(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

function factorial(n) {
    return (n > 1) ? n * factorial(n - 1) : n;
}

// console.log(factorial(5));

// 5 = 1 * 2 * 3 * 4 * 5 = 120

function spy(func) {

    function wrapper() {
        wrapper.calls.push(arguments);
        return func.apply(this, arguments);
    }

    wrapper.calls = [];

    return wrapper;
}

function work(a, b) {
    // console.log( a + b ); // произвольная функция или метод
}

work = spy(work);

function debounce(fn, ms) {
    let stop = false;

    return function () {
        if (stop) {
            return;
        }

        fn.apply(this, arguments);
        stop = true;

        setTimeout(() => stop = false, ms);
    }
}

function compress(arr) {
    arr.sort((a, b) => a - b);

    const res = [];
    const tmp = [];

    for (let i = 0; i < arr.length; i++) {
        tmp.push(arr[i]);

        if (arr[i + 1] - arr[i] === 1) {
            tmp.push(arr[i + 1]);
        } else {
            let item = arr[i];
            if (tmp.length > 1) {
                item = [tmp[0], tmp.pop()].join('-');
            }
            tmp.length = 0;
            res.push(item)
        }
    }

    return res
}

// сортируем [-1, 1, 2, 3, 5, 6, 10]
// идем по массиву: если разница между текущим и пред.

console.log(compress([1, 2, 3, 4, 6, 7]));
