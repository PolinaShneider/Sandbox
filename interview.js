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

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    const map = {};

    for (let i = 0; i < s.length; i++) {
        const key = s[i];
        map[key] = i;
    }

    const stack = [s[0]];
    const present = {
        [s[0]]: true,
    };

    for (let i = 1; i < s.length; i++) {
        let prev = stack[stack.length - 1];
        const curr = s[i];

        while (curr < prev && map[prev] >= i && !present[curr]) {
            const el = stack.pop();
            prev = stack[stack.length - 1];
            present[el] = false;
        }

        if (!(present[curr])) {
            stack.push(curr);
            present[curr] = true;
        }
    }

    return stack.join('');
};

const obj = {
    name: 'Vasya',
    age: 18,
    size: {
        w: 20,
        h: 15
    }
};

const newObj = JSON.parse(JSON.stringify(obj));

obj.age = 20; // newObj.age = 18
obj.size.h = 100; // newObj.size.h = 15 ?

/**
 * https://medium.com/better-programming/javascript-tips-2-object-array-deep-clone-implementation-2d6a43e43d2a
 * @param val
 * @returns {[]|*}
 */
function deepCopy(val) {
    if (val === null || typeof val !== "object") {
        return val;
    }

    let copy = Array.isArray(val) ? [] : {};

    for (let key in val) {
        copy[key] = deepCopy(val[key]);
    }

    return copy;
}

const obj = {
    a: 2,
    arr: ['hello', 1, 2],
    size: {
        w: 90,
        h: 10
    }
};

const copy = deepCopy(obj);
console.log(copy);

function isRotation(str1, str2) {
    const concated = str1.repeat(2);

    return concated.indexOf(str2) !== -1;
}

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {

    if (nums.length < 2) {
        return nums.map(it => '' + it);
    }

    const result = [];
    const temp = [nums[0]];

    for (let i = 1; i < nums.length; i++) {
        const current = nums[i];

        if (current - nums[i - 1] > 1) {
            if (temp.length > 1) {
                result.push(`${temp.shift()}->${temp.pop()}`)
            } else {
                result.push('' + temp[0]);
            }

            temp.length = 0;
        }

        temp.push(current);

        if (i === nums.length - 1 && temp.length) {
            if (temp.length > 1) {
                result.push(`${temp.shift()}->${temp.pop()}`)
            } else {
                result.push('' + temp[0]);
            }
        }
    }

    return result;
};

const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit)
        }
    }
};

const debounced = (func, delay) => {
    let inDebounce;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
};
