/**
 * Initialize your data structure here.
 */
var Logger = function () {
    this.map = {};
};

/**
 * Returns true if the message should be printed in the given timestamp, otherwise returns false.
 If this method returns false, the message will not be printed.
 The timestamp is in seconds granularity.
 * @param {number} timestamp
 * @param {string} message
 * @return {boolean}
 */
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
    if (!(message in this.map) || timestamp - this.map[message] >= 10) {
        this.map[message] = timestamp;
        return true;
    }
    return false;
};

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */

/**
 * @param {string} S
 * @return {string}
 */
var removeVowels = function (S) {
    return S.replace(/[aeiou]/g, "");
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    const copy = s.replace(/[^a-z0-9]/gi, "").toLowerCase();
    return copy.split("").reverse().join("") === copy;
};

/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function (S, K) {
    const string = S.replace(/-/g, '').toUpperCase().split('').reverse();

    let result = "";
    while (string.length) {
        result += string.splice(0, K).join('') + '-';
    }

    if (result.endsWith('-')) {
        result = result.slice(0, -1);
    }

    return result.split('').reverse().join('');
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const arr = [];

    if (s.length === 1) {
        return s.length;
    }

    for (let i = 0; i < s.length; i++) {
        outer: for (let a = i + 1; a < s.length; a++) {
            let result = {};

            for (let b = i; b <= a; b++) {
                if (s[b] in result) {
                    arr.push(Object.keys(result).join(''));
                    break outer;
                } else {
                    result[s[b]] = true;
                }
            }

            arr.push(Object.keys(result).join(''));
        }
    }

    if (!arr.length) {
        return 0;
    }

    return Math.max(...arr.map(it => it.length));
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring2 = function (s) {
    const arr = new Array(s.length).fill(0);
    const map = {};

    if (s.length < 2) {
        return s.length;
    }

    for (let i = 0; i < s.length; i++) {
        if (s[i] in map) {
            arr[i] = (i - arr[i - 1] <= map[s[i]]) ? i - map[s[i]] : arr[i - 1] + 1;
        } else {
            arr[i] = (arr[i - 1] + 1) || 1;
        }
        map[s[i]] = i;
    }

    return Math.max(...arr);
};

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
    function compare(first, second) {
        return (first !== second) ? `${first}->${second}` : `${first}`;
    }

    const result = [];

    if (!nums.length) {
        return [compare(lower, upper)];
    }

    const first = nums[0];
    const last = nums[nums.length - 1];

    if (lower < first) {
        result.push(compare(lower, first - 1));
    }

    for (let i = 0; i < nums.length; i++) {
        const prev = nums[i - 1];
        const curr = nums[i];

        if (prev !== undefined && curr - prev > 1) {
            result.push(compare(prev + 1, curr - 1));
        }
    }

    if (upper > last) {
        result.push(compare(last + 1, upper));
    }

    return result;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
    function traverse(tree) {
        let values = [];

        values.push(tree.val);

        if (tree.left) {
            values = values.concat(traverse(tree.left));
        }

        if (tree.right) {
            values = values.concat(traverse(tree.right));
        }

        return values;
    }

    let [elem, diff] = [Infinity, Infinity];

    traverse(root).forEach((item) => {
        if (Math.abs(item - target) < diff) {
            [elem, diff] = [item, Math.abs(item - target)];
        }
    });

    return elem;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number}
 */

/*
 * time: O(H), height of tree
 * space: O(1), iterating the binary search tree;
 * Explanation: https://leetcode.com/problems/closest-binary-search-tree-value/discuss/593833/Binary-Search-O(H)-O(1)-Javascript
 */
var closestValue2 = function (root, target) {
    if (!root.left && !root.right) return root.val;

    let closest = Math.abs(root.val - target);
    let closestVal = root.val;
    let go = true;

    while (go) {
        if (Math.abs(root.val - target) < closest) {
            closest = Math.abs(root.val - target);
            closestVal = root.val;
        }
        let path = target < root.val ? 'left' : 'right';
        if (root[path]) {
            root = root[path];
        } else {
            go = false
        }
    }

    return closestVal;
};

function findMax(arr, k, min, max) {
    if (min >= max) return -1;

    let mid = Math.floor((min + max) / 2);
    const pivot = arr[mid];

    if (pivot > k) {
        // in left;
        return findMax(arr, k, min, mid - 1);
    } else if (pivot < k) {
        // in right
        return findMax(arr, k, mid + 1, max);
    } else {
        //max index of k

        while (arr[mid + 1] === k) mid++;
        return mid;
    }
}

function findFreq(arr, k) {
    let maxIndex = findMax(arr, k, 0, arr.length);
    let count = 0;

    while (arr[maxIndex--] === k) count++;
    return count;
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    const map = new Map();

    for (const key of s) {
        const val = map.get(key);

        if (val === void 0) {
            map.set(key, 1)
        } else {
            map.set(key, val + 1);
        }
    }

    for (const key of t) {
        const val = map.get(key);

        if (val === 1) {
            map.delete(key);
        } else if (val > 1) {
            map.set(key, val - 1);
        }
    }

    return s.length === t.length && map.size === 0;
};

/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
    citations.sort((a, b) => a - b);
    let i = 0;
    while (i < citations.length && citations[citations.length - 1 - i] > i) {
        i++;
    }
    return i;
};

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
    const result = [[1], [1, 1]];

    if (rowIndex < 2) {
        return result[rowIndex];
    }

    for (let i = 2; i < rowIndex + 1; i++) {
        const prev = result[i - 1];
        const arr = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                arr.push(1);
            } else {
                arr.push(
                    prev[j] + prev[j - 1]
                )
            }
        }

        result.push([...arr]);
        arr.length = 0;
    }

    return result[rowIndex];
};

/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function (characters, combinationLength) {
    var subsets = function (nums) {
        const result = [];
        for (let i = 0; i < Math.pow(2, nums.length); i++) {
            const temp = [];
            for (let j = 0; j < nums.length; j++) {
                // & is bitwise AND
                if ((i & Math.pow(2, j))) {
                    temp.push(nums[j])
                }
            }
            result.push(temp)
        }
        return result
    };

    this.data = subsets(
        characters.split('')
    ).map(
        it => it.join('')
    ).sort().filter(
        it => it.length === combinationLength
    );
    this.index = 0;
};

/**
 * @return {string}
 */
CombinationIterator.prototype.next = function () {
    return this.data[this.index++];
};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function () {
    return this.index + 1 < this.data.length;
};

/**
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
    intervals.sort(([, first], [, second]) => first - second);
    let count = 0, prev = 0;
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[prev][1]) {
            ++count;
        } else {
            prev = i;
        }
    }
    return count;
};

console.assert(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]) === 1, '1, result:', eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));
console.assert(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]) === 2, '2');
console.assert(eraseOverlapIntervals([[1, 2], [2, 3]]) === 0, '3');

// 1----------------100
// 1---11
// 2-------12
//     11--12


// 1--2
//    2--3
//       3--4
// 1-----3

/**
 * @param {string} s
 * @return {number[]}
 */
var findPermutation = function (s) {
    const counts = s.replace(/DI/g, 'D|I').replace(/ID/g, 'I|D').split('|').map(part => part.length);
    let maxSoFar = s[0] === 'D' ? counts[0] + 1 : 1;
    const res = [maxSoFar];
    for (let i = 0; i < counts.length; i++) {
        if (s[0] === 'D' && i % 2 === 0 || s[0] === 'I' && i % 2 === 1) {
            for (let j = maxSoFar - 1, stop = maxSoFar - counts[i]; j >= stop; j--) {
                res.push(j);
            }
        } else {
            for (let stop = ++maxSoFar + counts[i] - 1; maxSoFar < stop; maxSoFar++) {
                res.push(maxSoFar);
            }
            maxSoFar += counts[i + 1] || 0;
            res.push(maxSoFar);
        }
    }
    return res;
};

/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function (num) {
    const dictionary = {
        '0': '0',
        '1': '1',
        '6': '9',
        '8': '8',
        '9': '6',
    };

    const convert = n => dictionary[n] || "";

    return num === num.split('').map(convert).reverse().join('');
};

/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function (s) {
    if (!s.length) {
        return 0;
    }

    return s === s.split('').reverse().join('') ? 1 : 2;
};

var numsSameConsecDiff = function (N, K) {
    const res = [];
    var compose = function (n) {
        if (n.length === N) {
            res.push(n)
        } else {
            let num = Number(n[n.length - 1]);
            if (num - K >= 0) compose(`${n}${num - K}`);
            if (num + K <= 9 && K > 0) compose(`${n}${num + K}`);
        }

    };
    for (let i = 0; i < 10; i++) {
        if (N > 1 && i === 0) continue;
        compose(`${i}`)
    }
    return res
};

/**
 * @param {string} S
 * @return {string}
 */
var toGoatLatin = function (S) {
    // vowels, consonants
    // if vowel -> word + ma
    // else -> ordw + ma
    // result + a * (index + 1)

    const vowelRegex = /[aeuoi]/i;


    function letterToBack(str) {
        return str.slice(1) + str[0];
    }

    function repeat(count) {
        let res = "";
        for (let i = 0; i < count + 1; i++) {
            res += 'a';
        }

        return res;
    }

    const arr = S.split(" ");
    return arr.reduce((total, item, index) => {
        let copy = item;
        if (!vowelRegex.test(copy[0])) {
            copy = letterToBack(copy)
        }
        copy += "ma" + repeat(index);
        total.push(copy);
        return total;
    }, []).join(" ");
};

Array.prototype.flatten = function () {
    const result = [];
    while (this.length) {
        const elem = this.pop();

        if (Array.isArray(elem)) {
            result.push(...elem);
        } else {
            result.push(elem);
        }
    }

    result.reverse();

    return result;
};

function getMaxSubSum(arr) {
    const sums = [];
    for (let a = 0; a < arr.length; a++) {
        for (let b = a; b < arr.length; b++) {
            let sum = 0;
            for (let i = a; i <= b; i++) {
                sum += arr[i];
            }
            sums.push(sum);
        }
    }
    return Math.max(...sums);
}

function getMaxSubSum(arr) {
    let maxS = 0;
    for (let a = 0; a < arr.length; a++) {
        let sum = 0;
        for (let b = a; b < arr.length; b++) {
            sum += arr[b];
            maxS = Math.max(maxS, sum);
        }
    }
    return maxS;
}

/**
 * https://learn.javascript.ru/array
 * @param arr
 * @returns {number}
 */
function getMaxSubSum(arr) {
    let maxSum = 0;
    let partialSum = 0;

    for (let item of arr) { // для каждого элемента массива
        partialSum += item; // добавляем значение элемента к partialSum
        maxSum = Math.max(maxSum, partialSum); // запоминаем максимум на данный момент
        if (partialSum < 0) partialSum = 0; // ноль если отрицательное
    }

    return maxSum;
}

console.assert(getMaxSubSum([-1, 2, 3, -9]) === 5);
console.assert(getMaxSubSum([2, -1, 2, 3, -9]) === 6);
console.assert(getMaxSubSum([-1, 2, 3, -9, 11]) === 11);
console.assert(getMaxSubSum([-2, -1, 1, 2]) === 3);
console.assert(getMaxSubSum([100, -9, 2, -3, 5]) === 100);
console.assert(getMaxSubSum([1, 2, 3]) === 6);

function camelize(str) {
    return str.split('-').reduce((total, item, index) => {
        if (index) {
            total.push(item.charAt(0).toUpperCase() + item.slice(1))
        } else {
            total.push(item)
        }

        return total;
    }, []).join('');
}

function filterRange(arr, a, b) {
    return arr.filter((item) => item >= a && item <= b);
}

function filterRangeInPlace(arr, a, b) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1)
        }
    }
}

function sum(a) {
    return function (b) {
        return a + b;
    }
}

// console.log(sum(2)(4));

function add(n) {
    var func = function (x) {
        if (typeof x === "undefined") {
            x = 0;
        }
        return add(n + x);
    };

    func.toString = function () {
        return n;
    };

    return func;
}

// console.log(+add(1)(2)(3)()()(6));

/**
 * Similar to Promise.all but a concurrency limit
 *
 * @param {Array} iterable Array of functions that returns a promise
 * @param {Object} concurrency max number of parallel promises running
 */
function promiseAllThrottled(iterable, {concurrency = 3} = {}) {
    const promises = [];

    function enqueue(current = 0, queue = []) {
        // return if done
        if (current === iterable.length) {
            return Promise.resolve();
        }
        // take one promise from collection
        const promise = iterable[current];
        const activatedPromise = promise();
        // add promise to the final result array
        promises.push(activatedPromise);
        // add current activated promise to queue and remove it when done
        const autoRemovePromise = activatedPromise.then(() => {
            // remove promise from the queue when done
            return queue.splice(queue.indexOf(autoRemovePromise), 1);
        });
        // add promise to the queue
        queue.push(autoRemovePromise);

        // if queue length >= concurrency, wait for one promise to finish before adding more.
        const readyForMore = queue.length < concurrency ? Promise.resolve() : Promise.race(queue);
        return readyForMore.then(() => enqueue(current + 1, queue));
    }

    return enqueue()
        .then(() => Promise.all(promises));
}

// simulate 10 async tasks that takes 5 seconds to complete.
// https://adrianmejia.com/promises-tutorial-concurrency-in-javascript-node/
const requests = Array(10)
    .fill()
    .map((_, i) => () => new Promise((resolve => setTimeout(() => {
        console.log(`exec'ing task #${i}`), resolve(`task #${i}`);
    }, 5000))));

// promiseAllThrottled(requests, {concurrency: 3})
//     .then(console.log)
//     .catch(error => console.error('Oops something went wrong', error));

function work(a, b) {
    console.log(a + b); // произвольная функция или метод
}

function spy(func) {

    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, arguments);
    }

    wrapper.calls = [];

    return wrapper;
}

work = spy(work);

function delay(f, ms) {
    return function () {
        setTimeout(() => f.apply(this, arguments), ms);
    };
}

function debounce(f, ms) {

    let isCooldown = false;

    return function () {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => isCooldown = false, ms);
    };

}

/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v1
 */
var ZigzagIterator = function ZigzagIterator(v1, v2) {
    this.v1 = v1;
    this.v2 = v2;

    this.index = -1;
};


/**
 * @this ZigzagIterator
 * @returns {boolean}
 */
ZigzagIterator.prototype.hasNext = function hasNext() {
    return this.v1.length || this.v2.length;
};

/**
 * @this ZigzagIterator
 * @returns {integer}
 */
ZigzagIterator.prototype.next = function next() {
    this.index++;

    if (!(this.index % 2) && this.v1.length) {
        return this.v1.shift();
    } else if (this.index % 2 && this.v2.length) {
        return this.v2.shift();
    } else {
        return this.v1.length ? this.v1.shift() : this.v2.shift()
    }
};

/**
 * Your ZigzagIterator will be called like this:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
 */

Function.prototype.defer = function (ms) {
    let f = this;
    return function (...args) {
        setTimeout(() => f.apply(this, args), ms);
    }
};

function f(a, b) {
    console.log(a + b);
}

/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    const map = {};

    for (let i = 1; i <= n; i++) {
        map[i] = "";

        if (i % 3 === 0) {
            map[i] += "Fizz";
        }

        if (i % 5 === 0) {
            map[i] += "Buzz";
        }
    }

    return Object.entries(map).map(([key, value]) => value ? value : key)
};

/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function (intervals) {
    const result = [];

    for (let i = 0; i < intervals.length; i++) {
        let end = intervals[i][1];
        let [min, idx] = [Infinity, -1];
        for (let j = 0; j < intervals.length; j++) {
            if (i === j) {
                continue;
            }

            if (intervals[j][0] >= end && intervals[j][0] < min) {
                [min, idx] = [intervals[j][0], j];
            }
        }

        result.push(idx);
    }

    return result;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    let maxOnes = 0;
    const {arr} = nums.reduce((total, item, index, arr) => {
        if (item) {
            total.len++
        } else {
            maxOnes = Math.max(total.len, maxOnes);
            total.arr.push(total.len, '*');
            total.len = 0;
        }

        if (index === arr.length - 1 && total.len) {
            maxOnes = Math.max(total.len, maxOnes);
            total.arr.push(total.len);
        }

        return total
    }, {
        arr: [],
        len: 0
    });

    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i - 1]) && !isNaN(arr[i + 1])) {
            max = Math.max(max, arr[i - 1] + arr[i + 1] + 1);
        }
    }

    if (nums.length < 3 && !nums.every(Boolean)) {
        return maxOnes + 1;
    }

    return Math.max(max, maxOnes);
};

function zipArray(arr) {
    if (!Array.isArray(arr)) return arr;

    // We can get not sorted array
    arr = arr.sort((a, b) => a - b);

    // Check for standart size for that function
    if (arr.length < 2) return arr.join('');

    // We can't start from slice, like a --2,3
    let isSlice = false;
    let res = '';

    arr.forEach((cur, i) => {
        // I can't pop, becose isEq will be not correct!
        if (i === arr.length - 1) return;
        // Checks is next elem ordered
        const isEq = cur + 1 === arr[i + 1];

        if (!isEq) {
            // Always when !isEq, we write devided result
            res += `${cur},`;
            isSlice = false;
        } else if (!isSlice && isEq) {
            // On every slice-start
            res += `${cur}-`;
            isSlice = true;
        }
    });

    // Write last elem
    res += arr[arr.length - 1];
    return res;
}

function zipArray(arr) {
    arr.sort((a, b) => a - b);

    const result = [];
    const temp = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] - arr[i] === 1) {
            temp.push(arr[i], arr[i + 1]);
        } else {
            let item = arr[i];
            if (temp.length > 1) {
                item = [temp[0], temp.pop()].join('-');
                temp.length = 0;
            }
            result.push(item.toString());
        }
    }

    return result;
}

function zipString(str) {
    const map = {};

    for (let elem of str) {
        map[elem] = ++map[elem] || 1;
    }

    return Object.entries(map).reduce((total, item) => {
        const [key, val] = item;
        total += val > 1 ? `${key}${val}` : `${key}`;
        return total;
    }, '');
}

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const results = [];

    function helper(left, right, max, str) {
        if (left === max && right === max) {
            results.push(str);
            return;
        }

        if (left < max) {
            helper(left + 1, right, max, `${str}(`)
        }

        if (right < left) {
            helper(left, right + 1, max, `${str})`)
        }
    }

    helper(0, 0, n, '');

    return results;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i === j) continue;

            if (Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k) {
                return true;
            }
        }
    }

    return false;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    for (let i = 0; i < s.length - 1; i++) {
        let pattern = s.substring(0, i + 1);
        const splitted = s.split(pattern).filter(Boolean).length === 0;

        if (splitted) {
            return true;
        }
    }

    return false;
};

/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function (S) {
    const unique = [...new Set(S)];
    const map = unique.reduce((total, item) => {
        total[item] = [S.indexOf(item), S.lastIndexOf(item)];
        return total;
    }, {});

    const ranges = [];

    // Create ranges out of the letter ranges of the map
    for (const letter of S) {
        const [start, end] = map[letter];
        // first range goes directly in, and also ranges that don't overlap with the most recent one
        if (ranges.length === 0 || ranges[ranges.length - 1][1] < start) {
            ranges.push([start, end]);
        } else {
            // else we need to merge. only update the right side of the range if the merged range
            // extends it.
            if (end > ranges[ranges.length - 1][1]) {
                ranges[ranges.length - 1][1] = end;
            }
        }
    }

    const out = [];
    for (const [start, end] of ranges) {
        out.push(end - start + 1);
    }

    return out;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
    function traverse(root) {
        let values = [];

        if (!root) {
            return [];
        }

        if (root.left) {
            values = values.concat(traverse(root.left))
        }

        values.push(root.val);

        if (root.right) {
            values = values.concat(traverse(root.right))
        }

        return values;
    }

    function merge(l1, l2) {
        const list = [];

        let i = 0;
        let j = 0;

        while (i < l1.length && j < l2.length) {
            if (l1[i] < l2[j]) {
                list.push(l1[i]);
                i++;
            } else {
                list.push(l2[j]);
                j++;
            }
        }

        // Store remaining elements of first array
        while (i < l1.length) {
            list.push(l1[i]);
            i++;
        }

        // Store remaining elements of second array
        while (j < l2.length) {
            list.push(l2[j]);
            j++;
        }

        return list;

    }

    return merge(traverse(root1), traverse(root2));
};
