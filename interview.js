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

console.log(factorial(5));

// 5 = 1 * 2 * 3 * 4 * 5 = 120
