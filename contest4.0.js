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

/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
    const result = [];
    for (let i = 0; i < Math.pow(2, arr.length); i++) {
        const temp = [];
        for (let j = 0; j < arr.length; j++) {
            // & is bitwise AND
            if ((i & Math.pow(2, j))) {
                temp.push(arr[j])
            }
        }
        result.push(temp.join(''))
    }

    return Math.max(...result.filter(hasOnlyUniqueLetters).map(it => it.length), 0);

    function hasOnlyUniqueLetters(str) {
        return str.length === new Set([...str]).size
    }
};

/**
 * @param {number[]} arr
 * @return {number}
 */
var minimumMoves = function (arr) {
    if (arr == null || arr.length === 0) {
        return 0;
    }

    let len = arr.length;
    // dp[i][j] means minimum moves for subarray [i, j]
    const dp = new Array(len).fill(new Array(len));

    for (let i = 0; i < len; i++) {
        dp[i][i] = 1;
    }

    for (let j = 0; j < len; j++) {
        for (let i = j - 1; i >= 0; i--) {
            if (i === j - 1) {
                dp[i][j] = arr[i] === arr[j] ? 1 : 2;
                continue;
            }
            let min = Infinity;
            if (arr[i] === arr[j]) {
                min = Math.min(min, dp[i + 1][j - 1]);
            }
            // two subarrays [i, k], and (k, j]
            for (let k = i; k < j; k++) {
                min = Math.min(min, dp[i][k] + dp[k + 1][j]);
            }
            dp[i][j] = min;
        }
    }
    return dp[0][len - 1];
};

/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function (pattern, str) {
    const splitted_pattern = pattern.split('');
    const splitted_str = str.split(' ');

    if (splitted_pattern.length !== splitted_str.length) {
        return false;
    }

    const pattern_str_map = {};
    const str_pattern_map = {};

    for (let i = 0; i < splitted_str.length; i++) {
        const str_key = splitted_str[i];
        const pattern_el = splitted_pattern[i];

        if (str_key in str_pattern_map) {
            if (pattern_el !== str_pattern_map[str_key]) {
                return false;
            }
        } else {
            str_pattern_map[str_key] = pattern_el;
        }

        if (pattern_el in pattern_str_map) {
            if (str_key !== pattern_str_map[pattern_el]) {
                return false;
            }
        } else {
            pattern_str_map[pattern_el] = str_key;
        }
    }

    return true;
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
 * @return {number}
 */
var sumRootToLeaf = function (root) {
    let sum = 0;

    dfs();

    return sum;

    function dfs(node = root, currSum = 0) {
        if (!node)
            return;

        currSum *= 2;
        currSum += node.val;

        if (!node.left && !node.right)
            return sum += currSum;

        dfs(node.left, currSum);
        dfs(node.right, currSum);

    }
};

/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    const transform = (arr) => arr.reverse().reduce((current, item, index) => {
        current += item * Math.pow(10, index);
        return current;
    }, 0);

    const makeEqual = (str1, str2) => {
        const first = str1.split('.').map(Number);
        const second = str2.split('.').map(Number);

        while (first.length < second.length) {
            first.push(0)
        }

        while (second.length < first.length) {
            second.push(0)
        }

        return [first, second]
    };

    const [s1, s2] = makeEqual(version1, version2);
    const [first, second] = [transform(s1), transform(s2)];
    console.log(first, second);

    if (first > second) {
        return 1;
    } else if (second > first) {
        return -1;
    } else {
        return 0;
    }
};

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
    let A = 0, B = 0, chars = new Map();

    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            A++
        } else {
            chars.set(secret[i], chars.get(secret[i]) + 1 || 1);
        }
    }


    for (let i = 0; i < guess.length; i++) {
        if (chars.get(guess[i]) > 0 && secret[i] !== guess[i]) {
            ++B && chars.set(guess[i], chars.get(guess[i]) - 1);
        }
    }

    return `${A}A${B}B`;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    const n = nums.length;
    if (!n) {
        return 0;
    }
    let curMax = nums[0];
    let curMin = nums[0];
    let max = nums[0];

    for (let i = 1; i < n; i++) {
        const num = nums[i];
        const minProd = curMin * num;
        const maxProd = curMax * num;
        curMax = Math.max(num, minProd, maxProd);
        curMin = Math.min(num, minProd, maxProd);
        max = Math.max(max, curMax);
    }
    return max;
};

/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function (s, indices) {
    const arr = s.split('');

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let to = indices[i];

        while (true) {
            const cc = arr[to];
            const ccto = indices[to];

            if (to === ccto) break;

            arr[to] = item;
            indices[to] = to;
            item = cc;
            to = ccto;
        }
    }

    return arr.join('')
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function (nums, k) {
    const map = {};
    let cnt = 0;

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i === j) continue;

            if (nums[j] - nums[i] === k) {
                const key = `${nums[i]},${nums[j]}`;

                if (!(key in map)) {
                    cnt++;
                }

                map[key] = [nums[i], nums[j]];
            }
        }
    }

    return cnt;
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
 * @return {number}
 */
var getMinimumDifference = function (root) {
    function inorder(node) {
        if (!node) return [];

        let values = [];

        if (node.left) {
            values = values.concat(inorder(node.left));
        }

        values.push(node.val);

        if (node.right) {
            values = values.concat(inorder(node.right))
        }

        return values;
    }

    const data = inorder(root);
    let min = Infinity;

    for (let i = 1; i < data.length; i++) {
        min = Math.min(min, data[i] - data[i - 1])
    }

    return min;
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    const arr = [];
    const temp = [];
    const map = {};

    (function dfs(left, start = 0) {
        if (left <= 0) {
            if (left === 0) {
                arr.push([...temp]);
            }

            return;
        }

        for (let i = start; i < candidates.length; i++) {
            temp.push(candidates[i]);
            dfs(left - candidates[i], i + 1);
            temp.pop();
        }
    })(target);

    arr.forEach(item => {
        const key = item.sort().toString();
        map[key] = item;
    });

    return Object.values(map);
};

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    const stack = [];

    for (const char of s) {
        if (char !== "]") {
            stack.push(char);
            continue;
        }
        let cur = stack.pop();
        let str = '';
        while (cur !== '[') {
            str = cur + str;
            cur = stack.pop();
        }
        let num = '';
        cur = stack.pop();
        while (!isNaN(+cur)) {
            num = cur + num;
            cur = stack.pop();
        }
        stack.push(cur);
        stack.push(str.repeat(+num));
    }
    return stack.join('');
};

/**
 * @param {number} N
 * @return {number}
 */
var bitwiseComplement = function (N) {
    return parseInt(N.toString(2).split('').map(it => +it ? '0' : '1').join(''), 2);
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    let max = '';

    function isPalindrome(str) {
        return str === str.split('').reverse().join('');
    }

    for (let i = 0; i < s.length; i++) {
        let str = '';
        for (let j = i; j < s.length; j++) {
            str += s[j];

            if (isPalindrome(str) && str.length > max.length) {
                max = str;
            }
        }
    }

    return max;
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
 * @return {number}
 */
var minDepth = function (root) {
    if (root == null) {
        return 0;
    }

    if ((root.left == null) && (root.right == null)) {
        return 1;
    }

    let min_depth = Infinity;
    if (root.left != null) {
        min_depth = Math.min(minDepth(root.left), min_depth);
    }
    if (root.right != null) {
        min_depth = Math.min(minDepth(root.right), min_depth);
    }

    return min_depth + 1;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
    let min_i = Infinity;
    for (let j = 0; j < nums.length - 1; j++) {
        min_i = Math.min(min_i, nums[j]);
        for (let k = j + 1; k < nums.length; k++) {
            if (nums[k] < nums[j] && min_i < nums[k]) {
                return true;
            }
        }
    }
    return false;
};

/**
 * @param {number[]} seats
 * @return {number}
 */
var maxDistToClosest = function (seats) {
    let first = null, last = null;
    let max = 0;

    for (let i = 0; i < seats.length; i++) {
        if (seats[i]) {
            if (first == null) {
                first = i;
            }

            if (last != null) {
                let dist = i - last;
                max = Math.max(max, Math.floor(dist / 2));
            }

            last = i;
        }
    }

    if (seats[0] !== 1) {
        max = Math.max(max, first);
    }

    if (seats[seats.length - 1] !== 1) {
        max = Math.max(max, seats.length - 1 - last);
    }

    return max;
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
    let prev = null, big = null, small = null;
    let dfs = function (root) {
        if (!root) return;
        dfs(root.left);
        if (prev != null && prev.val > root.val) {
            small = root; // potential smaller number that needs to be swapped
            if (!big) big = prev; // assured bigger number that needs to be swapped
            else return;
        }
        prev = root;
        dfs(root.right);
    };

    dfs(root);
    [big.val, small.val] = [small.val, big.val];
};

/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
    let res = '';

    while (head) {
        res += head.val;
        head = head.next;
    }

    return parseInt(res, 2)
};

/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
    intervals.sort(([a,], [b,]) => a - b);
    for (let i = 0; i < intervals.length - 1; i++) {
        const current = intervals[i];
        const next = intervals[i + 1];

        if (current[1] > next[0]) {
            return false;
        }
    }

    return true;
};

/**
 * @param {string} s
 * @return {number}
 */
var maxPower = function (s) {
    let count = 1;
    let max = 1;
    for (let i = 0; i < s.length; i++) {
        const curr = s[i];
        const next = s[i + 1];

        if (next !== curr) {
            max = Math.max(count, max);
            count = 1;
        } else {
            count++;
        }
    }

    return max;
};

/**
 * @param {number[]} chips
 * @return {number}
 */
var minCostToMoveChips = function (chips) {
    let even_cnt = 0;
    let odd_cnt = 0;
    for (const chip of chips) {
        if (chip % 2 === 0) {
            even_cnt++;
        } else {
            odd_cnt++;
        }
    }
    return Math.min(odd_cnt, even_cnt);
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    function dump(list) {
        let sum = '';

        while (list) {
            sum += list.val;
            list = list.next;
        }

        return sum;
    }

    const arr = (BigInt(dump(l1)) + BigInt(dump(l2))).toString().split('');
    let head = new ListNode(arr.shift());
    let prev = head;
    while (arr.length) {
        head.next = new ListNode(arr.shift());
        head = head.next;
    }

    return prev;
};

function getBestFitImageIndex(frame, images) {
    function resize(elementSizes, containerSizes) {
        const elementRatio = elementSizes.w / elementSizes.h;
        const containerRatio = containerSizes.w / containerSizes.h;

        let width, height;

        if (containerRatio > elementRatio) {
            width = containerSizes.w;
            height = containerSizes.w / elementRatio;
        } else {
            width = containerSizes.h * elementRatio;
            height = containerSizes.h;
        }

        return {w: width, h: height}
    }

    let [resExtraArea, index] = [Infinity, -1];
    const {w: sample_w, h: sample_h} = frame;
    const frameArea = sample_w * sample_h;

    for (let i = 0; i < images.length; i++) {
        const {w, h} = images[i];

        if (frameArea === w * h) {
            return i;
        }

        const {w: resized_w, h: resized_h} = resize({w, h}, {w: sample_w, h: sample_h});
        const newArea = resized_w * resized_h;
        console.log(resized_w, resized_h);

        if (newArea - frameArea < resExtraArea) {
            resExtraArea = newArea - frameArea;
            index = i;
        }
    }

    return index;
}

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
 * @return {number}
 */
var maxAncestorDiff = function (root) {
    let res = 0;

    recursive(root, root.val, root.val);

    return res;

    function recursive(node, minSoFar, maxSoFar) {
        if (!node)
            return;

        let diffWithMax = maxSoFar - node.val;

        let diffWithMin = node.val - minSoFar;

        res = Math.max(res, diffWithMax, diffWithMin);

        minSoFar = Math.min(minSoFar, node.val);
        maxSoFar = Math.max(maxSoFar, node.val);

        recursive(node.left, minSoFar, maxSoFar);
        recursive(node.right, minSoFar, maxSoFar);

    }
};

/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
var validSquare = function (p1, p2, p3, p4) {
    let map = new Map();
    let arr = [p1, p2, p3, p4];
    let largest = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let dist = distance(arr[i], arr[j]);
            map.set(dist, map.get(dist) + 1 || 1);
            largest = Math.max(largest, map.get(dist));
        }
    }

    return map.size === 2 && largest === 4;

    function distance([x_1, y_1], [x_2, y_2]) {
        return Math.sqrt(Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2))
    }
};


var permuteUnique = function (nums) {
    let res = [];
    let countMap = new Map();

    for (let n of nums) {
        countMap.set(n, (countMap.get(n) + 1 || 1))
    }

    function backtrack(nums, arr) {
        if (arr.length === nums.length) {
            res.push([...arr]);
            return
        }
        for (let [key, value] of countMap) {
            if (value === 0) continue;
            arr.push(key);
            countMap.set(key, --value);
            backtrack(nums, arr);
            arr.pop();
            countMap.set(key, ++value)
        }
    }

    backtrack(nums, []);
    return res;
};

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
    let startOfNextLevel = root, current = null, lastVisited;

    while (startOfNextLevel) { //traverse every level of the tree
        current = startOfNextLevel, startOfNextLevel = lastVisited = null;

        while (current) { // traverse level of tree exactly like a linked list

            for (let child of [current.left, current.right]) {
                if (child) {
                    if (lastVisited) lastVisited.next = child;
                    else startOfNextLevel = child;
                    lastVisited = child;
                }
            }
            current = current.next; //traverse level exactly like a linked list
        }
    }

    return root;
};

/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function (buckets, minutesToDie, minutesToTest) {
    const states = minutesToTest / minutesToDie + 1;
    return Math.ceil(Math.log(buckets) / Math.log(states));
};
/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function (A) {
    let longestMountainLength = 0;
    let mountainFrom = A.length;

    for (let i = 1; i < A.length; ++i) {
        const beforePrevious = i >= 2 ? A[i - 2] : Infinity;
        const previous = A[i - 1];
        const current = A[i];

        // update mountainFrom to before when the previous is the foot of a mountain
        if (current > previous && previous <= beforePrevious) {
            mountainFrom = i - 1;
            continue;
        }

        // update mountainFrom to current when there's flat terrain between current and beforePrevious
        if (current === previous || beforePrevious === previous) {
            mountainFrom = i;
            continue;
        }

        // start counting mountain length in down trend
        if (current < previous) {
            longestMountainLength = Math.max(longestMountainLength, i - mountainFrom + 1);
        }
    }

    return longestMountainLength >= 3 ? longestMountainLength : 0;
};

/**
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var mirrorReflection = function (p, q) {
    if (q === 0) return 0;
    if (q === p) return 1;

    const gcd = (a, b) => {
        if (a === b) {
            return 1;
        } else if (a > b) {
            const r = a % b;
            return r ? gcd(b, r) : b;
        } else {
            const r = b & a;
            return r ? gcd(a, r) : a;
        }
    };

    const lcm = (a, b) => {
        return a * b / gcd(a, b);
    };

    const total = lcm(p, q);
    const xCoord = total / p;
    const yCoord = total / q;

    if (xCoord % 2 === 0) {
        if (yCoord % 2 === 0) {
            // We should never reach this
            return -1;
        } else {
            return 0;
        }
    } else {
        if (yCoord % 2 === 0) {
            return 2;
        } else {
            return 1;
        }
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
    return searchR(nums, 0, nums.length - 1, target);
};

function searchR(nums, left, right, target) {
    if (left > right) {
        return false;
    }
    if (left === right) {
        return nums[left] === target;
    }
    if (left < right && nums[left] < nums[right] && (target < nums[left] || target > nums[right])) {
        return false;
    }
    const m = Math.floor((left + right) / 2);
    const isL = searchR(nums, left, m, target);
    const isR = searchR(nums, m + 1, right, target);

    return !!(isL || isR);
}

/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function (digits, n) {
    let count = 0;

    /*
    Transform digits to integers and sort them from small to big.
    */
    digits = digits.map(d => parseInt(d, 10));
    digits.sort((a, b) => a - b);

    const digitsLength = digits.length;
    const nDigits = ('' + n).split('').map(d => parseInt(d, 10));

    /*
    Add all possible numbers that have less digits than n.

    For example, if we have n = 216 and digits = [1,2,4]:
    - Count all numbers of 1 digit _ (3^1 possibilites)
    - Count all numbers of 2 digits _ _ (3^2 possibilites)
    */
    for (let i = 1; i < nDigits.length; i++) {
        count += Math.pow(digitsLength, i);
    }

    /*
    Now we need to find those numbers with the same amount of digits
    as n that are less or equal than n. Let's call 'x' the first digit
    of n and 'y' any of the available digits. We have these possibilities:

    - If y < x: we can count all numbers of n digits starting with y.
      In the previous example, if we have x = 2 and y = 1, we can add all
      numbers of the form 1 _ _. There are 3^2 possibilites.
    - If y = x: then we need to do recursion on the next position. Using
      again the previous example, if x = 2 and y = 2, we have numbers of
      the form 2 _ _. Some are possible (211) and some aren't (221).
    - If y > x: then we don't count anything, as we don't meet the condition.

    In the recursion, remember the include the base case! If we already
    covered all digits positions, it means we found n itself, which is valid
    since n <= n. Hence, we need to count 1.
    */
    const find = (pos, nDigits, digits) => {
        if (pos === nDigits.length) {
            return 1;
        }

        let count = 0;

        for (let i = 0; i < digits.length; i++) {
            if (digits[i] < nDigits[pos]) {
                count += Math.pow(digitsLength, nDigits.length - pos - 1);
            } else if (digits[i] === nDigits[pos]) {
                count += find(pos + 1, nDigits, digits);
            } else {
                break;
            }
        }

        return count;
    }

    count += find(0, nDigits, digits);

    return count;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
    const map = new Map();

    let l = 0;
    let r = 0;
    let maxLength = 0;

    while (r < s.length) {
        const c = s[r];

        if (map.has(c) || map.size < 2) {
            maxLength = Math.max(maxLength, r - l + 1);
        } else if (map.size === 2) {
            let lastMinKey;
            let lastMin = Infinity;

            for (const [k, v] of map.entries()) {
                if (v < lastMin) {
                    lastMinKey = k;
                    lastMin = v;
                }
            }

            map.delete(lastMinKey);
            l = lastMin + 1;
        }

        map.set(c, r);
        r++;
    }


    maxLength = Math.max(maxLength, s.length - l);

    return maxLength;
};

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    const arr = s.match(/(\d+|[\+\-\*\/])/g);
    const numStack = [];
    const op = {
        '*': (a, b) => a * b,
        '/': (a, b) => ~~(a / b)
    };

    for (let i = 0; i < arr.length; i++) {
        if (/\d+/.test(arr[i])) {
            if (/-/.test(arr[i - 1])) numStack.push(+arr[i] * -1);
            else numStack.push(+arr[i]);
        } else if (/[*\/]/.test(arr[i])) {
            const a = numStack.pop();
            const b = +arr[i + 1];
            numStack.push(op[arr[i++]](a, b));
        }
    }

    while (numStack.length > 1) {
        const a = numStack.pop();
        const b = numStack.pop();
        numStack.push(a + b);
    }
    return numStack.pop();
};

/**
 * @param {number} K
 * @return {number}
 */
var smallestRepunitDivByK = function (K) {
    if (!(K % 2) || !(K % 5)) return -1; // short circuit

    let len = 0, val = 0, loop = 100000;

    while (loop--) {
        val = (val * 10 + 1) % K;
        len++;
        if (!val) return len;
    }
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    let sum = 0;
    for (let e of nums) sum += e;
    if (sum % 2) return false;
    let arr = new Array(nums.length + 1);
    for (let a = 0; a < arr.length; a++) {
        arr[a] = new Array((sum / 2) + 1).fill(false);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (i === 0) arr[i][j] = false;
            if (j === 0) arr[i][j] = true;
        }
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = 1; j < arr[0].length; j++) {
            if (nums[i - 1] <= j) {
                arr[i][j] = arr[i - 1][j - nums[i - 1]] || arr[i - 1][j];
            } else {
                arr[i][j] = arr[i - 1][j];
            }
        }
    }
    return arr[nums.length][sum / 2];
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    if (!nums.length || !k) return [];

    const max = Math.max(...nums.slice(0, k)),
        numbers = [max];

    for (let i = k; i < nums.length; i++) {
        if (nums[i - k] === numbers[numbers.length - 1]) {
            if (nums[i] >= nums[i - k]) {
                numbers[numbers.length] = nums[i];
            } else {
                numbers[numbers.length] = Math.max(...nums.slice(i - k + 1, i + 1));
            }
        } else {
            numbers[numbers.length] = Math.max(numbers[numbers.length - 1], nums[i]);
        }
    }

    return numbers;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
    let res = -Infinity;
    for (let s = 0; s < nums.length - k + 1; s++) {
        let sum = 0;
        for (let i = s; i < nums.length; i++) {
            sum += nums[i];
            if (i - s + 1 >= k)
                res = Math.max(res, sum / (i - s + 1));
        }
    }
    return res;
};

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function (buildings) {
    if (buildings.length === 0) return [];

    let startEndHeightList = [];
    for (let building of buildings) {
        let [start, end, height] = building;
        startEndHeightList.push([start, 0 - height]);
        startEndHeightList.push([end, height]);
    }
    startEndHeightList.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]); // ascending sort by x, y
    let result = [];
    let currHeights = [0]; // init with ground height 0
    let prevMaxHeight = 0;
    for (let i = 0; i < startEndHeightList.length; i++) {
        let [pos, height] = startEndHeightList[i];
        if (height < 0) { // new building, add to currHeights
            currHeights.push(0 - height);
        } else { // end of building, add to map as 0
            let removeIdx = currHeights.indexOf(height);
            currHeights.splice(removeIdx, 1);
        }

        let currMaxHeight = Math.max(...currHeights);
        if (currMaxHeight !== prevMaxHeight) result.push([pos, currMaxHeight]);
        prevMaxHeight = currMaxHeight;
    }
    return result;
};

/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestDistance = function (words, word1, word2) {
    const first = [];
    const second = [];

    for (let i = 0; i < words.length; i++) {
        if (words[i] === word1) {
            first.push(i);
        }

        if (words[i] === word2) {
            second.push(i);
        }
    }

    let min = Infinity;
    for (let i = 0; i < first.length; i++) {
        for (let j = 0; j < second.length; j++) {
            const candidate = Math.abs(first[i] - second[j]);
            if (candidate < min) {
                min = candidate;
            }
        }
    }

    return min;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param head The linked list's head.
 Note that the head is guaranteed to be not null, so it contains at least one node.
 * @param {ListNode} head
 */
var Solution = function (head) {
    this.head = head;
};

/**
 * Returns a random node's value.
 * @return {number}
 */
Solution.prototype.getRandom = function () {
    let i = 0, val;
    let node = this.head;

    while (node) {
        i++;
        if (Math.floor(Math.random() * i) + 1 === i) val = node.val;
        node = node.next;
    }

    return val;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */

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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
    const newRoot = new TreeNode(undefined);
    let cur = newRoot;
    const inorder = node => {
        if (node === null) {
            return;
        }
        inorder(node.left);
        node.left = null;
        cur.right = node;
        cur = node;
        inorder(node.right);
    };
    inorder(root);
    return newRoot.right;
};

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
    let sum = 0;

    flowerbed.map((x, i) => {
        if (!flowerbed[i - 1] && !x && !flowerbed[i + 1]) {
            sum++;
            flowerbed[i] = 1;
        }
    });

    return n <= sum;
};

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
    let startOfNextLevel = root, current = null, lastVisited;

    while (startOfNextLevel) { //traverse every level of the tree
        current = startOfNextLevel, startOfNextLevel = lastVisited = null;

        while (current) { // traverse level of tree exactly like a linked list

            for (let child of [current.left, current.right]) {
                if (child) {
                    if (lastVisited) lastVisited.next = child;
                    else startOfNextLevel = child;
                    lastVisited = child;
                }
            }
            current = current.next; //traverse level exactly like a linked list
        }
    }

    return root;
};

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    let mat = Array(n).fill(0).map(i => Array(n).fill(0))
    let dir = [[0, 1], [-1, 0], [0, -1], [1, 0]]   //The directions in order, right, down, left, up
    let i = 0, j = -1, num = 1

    for (let x = 0; num <= n * n; x++) {
        x = x % 4
        i += dir[x][0], j += dir[x][1]
        while (i >= 0 && j >= 0 && i < n && j < n && mat[i][j] === 0) {
            mat[i][j] = num++
            i += dir[x][0], j += dir[x][1]
        }
        i -= dir[x][0], j -= dir[x][1]
    }
    return mat
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    const map = {};
    for (let i = nums.length - 1; i >= 0; i--) {
        map[nums[i]] = ++map[nums[i]] || 1;

        if (map[nums[i]] > 2) {
            nums.splice(i, 1)
        }
    }
    return nums.length
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
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {
    if (!root) return root;

    const left = getDepth(root.left);
    const right = getDepth(root.right);

    if (left > right) {
        return subtreeWithAllDeepest(root.left);
    }

    if (left < right) {
        return subtreeWithAllDeepest(root.right);
    }

    return root;
};

const getDepth = (node) => {
    if (!node) return 0;

    const left = getDepth(node.left);
    const right = getDepth(node.right);

    return Math.max(left, right) + 1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxCoins = (nums) => {
    const vals = [1, ...nums, 1];
    const n = nums.length;
    const dp = [...Array(n + 2)].map(() => Array(n + 2).fill(0));
    for (let len = 1; len <= n; len++) {
        for (let i = 1; i + len <= n + 1; i++) {
            const j = i + len - 1;
            for (let k = i; k <= j; k++) {
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i][k - 1] + vals[i - 1] * vals[k] * vals[j + 1] + dp[k + 1][j],
                );
            }
        }
    }
    return dp[1][n];
};

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const output = [];
    const partitions = [];
    const isPalindrome = str => str === str.split('').reverse().join('');
    const findPalindrome = (str, start, parts, result) => {
        if (start === str.length) {
            result.push([...parts])
            return;
        }

        for (let i = start + 1; i <= str.length; i++) {
            const target = str.substring(start, i);
            if (isPalindrome(target)) {
                parts.push(target);
                findPalindrome(str, i, parts, result);
                parts.pop();
            }
        }
    }
    /*
        string: 'aab'
        start = 0 will find palindrome in 'a', 'aa', 'aab'
        start = 1 will find palindrome in      'a',  'ab'
        start = 2 will find palindrome in            'b'
     */
    findPalindrome(s, 0, partitions, output);

    return output;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var plusOne = function (head) {
    let first = new ListNode(0)
    first.next = head
    let farRightNine = first

    while (head) {
        if (head.val !== 9) {
            farRightNine = head
        }
        head = head.next
    }

    farRightNine.val++
    farRightNine = farRightNine.next

    while (farRightNine) {
        farRightNine.val = 0
        farRightNine = farRightNine.next
    }
    return first.val === 0 ? first.next : first
};

/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function (A, B, C, D) {
    if (!A || !B || !C || !D) return [];
    // cuadratic solution... counter, reduced from sum_of_two
    let memory = new Map();
    for (let i of A) {
        for (let j of B) {
            memory.set(-(i + j), memory.get(-(i + j)) + 1 || 1);
        }
    }
    // look in the map if we have seen the complement of this sum
    let output = 0;
    for (let m of C) {
        for (let n of D) {
            output += memory.has(m + n) ? memory.get(m + n) : 0;
        }
    }
    return output;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
    let first_num = Infinity;
    let second_num = Infinity;
    for (const n of nums) {
        if (n <= first_num) {
            first_num = n;
        } else if (n <= second_num) {
            second_num = n;
        } else {
            return true;
        }
    }
    return false;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var plusOne = function (head) {
    let first = new ListNode(0)
    first.next = head
    let farRightNine = first

    while (head) {
        if (head.val !== 9) {
            farRightNine = head
        }
        head = head.next
    }

    farRightNine.val++
    farRightNine = farRightNine.next

    while (farRightNine) {
        farRightNine.val = 0
        farRightNine = farRightNine.next
    }
    return first.val === 0 ? first.next : first
};

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var smallestRangeII = function (A, K) {
    A.sort((a, b) => a - b);

    let max = -Infinity;
    let min = Infinity;
    let n = A.length - 1

    let res = A[n] - A[0];

    for (let i = 0; i < n; i++) {
        max = Math.max(A[i] + K, A[n] - K);
        min = Math.min(A[i + 1] - K, A[0] + K)
        res = Math.min(res, max - min)
    }

    return res
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
 * @param {TreeNode} u
 * @return {TreeNode}
 */
var findNearestRightNode = function (root, u) {
    if (!root) {
        return null;
    }
    let queue = [root];
    while (queue) {
        // length is the length of the current level we are looking at
        const length = queue.length;
        for (let i = 0; i < length; i++) {
            const curr = queue.shift();
            if (curr === u && i !== length - 1) {
                return queue.shift();
            } else if (curr === u) {
                return null;
            }
            if (curr.left) {
                queue.push(curr.left);
            }
            if (curr.right) {
                queue.push(curr.right);
            }
        }
    }
    // u is for sure in the tree, then it wont reach here
    return null;
};

/**
 * @param {number} n
 * @return {number}
 */
var nextGreaterElement = function (n) {
    let arr = n.toString().split("");
    let pivotIdx = -1;
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i - 1] < arr[i]) {
            pivotIdx = i - 1;
            break;
        }
    }
    if (pivotIdx == -1) return -1; // there is no next greater number
    for (let i = arr.length - 1; i > pivotIdx; i--) {
        if (arr[pivotIdx] < arr[i]) {
            [arr[pivotIdx], arr[i]] = [arr[i], arr[pivotIdx]];
            break;
        }
    }
    let lSubarr = arr.slice(0, pivotIdx + 1);
    let rSubarr = arr.slice(pivotIdx + 1);
    rSubarr.reverse();
    let res = Number(lSubarr.join("") + rSubarr.join(""));
    return res <= 2 ** 31 - 1 ? res : -1;
    // Time Complexity: O(n)
    // Space Complexity: O(n)
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    let dummy = new ListNode();
    dummy.next = head;
    let result = dummy;
    while (dummy.next && dummy.next.next) {
        let p = dummy.next, q = dummy.next.next;
        dummy.next = q;
        p.next = q.next;
        q.next = p;
        dummy = p
    }
    return result.next
};

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function (matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return [];
    let rows = matrix.length;
    let columns = matrix[0].length;
    let results = new Array(rows + columns - 1);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!results[i + j]) results[i + j] = [];
            results[i + j].push(matrix[i][j]);
        }
    }
    for (let i = 0; i < (rows + columns - 1); i = i + 2) {
        if (i % 2 === 0) results[i] = results[i].reverse();
    }
    return results.flat()
};

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s, i = 0, memo = {}) {
    if (i in memo) return memo[i];
    if (s[i] === '0') return 0;
    if (i >= s.length - 1) return 1;
    memo[i] = numDecodings(s, i + 1, memo)
        + (s[i] + s[i + 1] < 27 ? numDecodings(s, i + 2, memo) : 0);
    return memo[i];
};

/**
 * @param {number[]} A
 * @return {number}
 */
var minJumps = function (A) {
    let q = new Set([0]), level = 0, f = {}, n = A.length, seen = new Set(), result = Infinity
    for (let i = 0; i < n; i++) // create groups of indices with the same value
        if (!f[A[i]])
            f[A[i]] = [i]
        else
            f[A[i]].push(i)
    while (result === Infinity) { // process each BFS level seperately
        let temp = new Set //holds the indices of the next level
        q.forEach(idx => {
            if (idx === n - 1)
                return result = level
            //process each valid neighbor only once
            for (let nei of [idx - 1, idx + 1, ...f[A[idx]]])
                if (!seen.has(nei) && nei >= 0 && nei < n)
                    seen.add(nei), temp.add(nei),
                        f[A[idx]] = [-1] //and invalidate the Value-neighbors previously processed
        })
        q = temp, level++
    }
    return result
};

/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function (target) {
    target = Math.abs(target);
    let steps = 0, sum = 0;
    while (sum < target) {
        steps++;
        sum += steps;
    }
    while ((sum - target) % 2 !== 0) {
        steps++;
        sum += steps;
    }
    return steps;
};

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
    let hash = {}, distinct = 0, max = 0;
    let start = 0, end = 0;
    while (end < s.length) {
        if (hash[s[end]] == null || hash[s[end]] <= 0) distinct++;
        hash[s[end]] = hash[s[end]] + 1 || 1;
        end++;
        while (distinct > k) {
            hash[s[start]]--;
            if (hash[s[start++]] === 0) distinct--;
        }
        max = Math.max(max, end - start);
    }
    return max;
};

/**
 * rules:
 * live -> die = -1
 * die -> live = 2
 */
var gameOfLife = function (board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let cell = board[i][j];
            let neighbors = getNeighbors(i, j, board);
            if (cell == 0 && neighbors == 3) {
                board[i][j] = 2
            }
            if (cell == 1 && (neighbors < 2 || neighbors > 3)) {
                board[i][j] = -1;
            }
        }
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == -1) board[i][j] = 0;
            if (board[i][j] == 2) board[i][j] = 1;
        }
    }
};


var getNeighbors = function (r, c, board) {
    let radius = [-1, 0, +1], count = 0;
    for (let i = 0; i < radius.length; i++) {
        for (let j = 0; j < radius.length; j++) {
            if (!(radius[i] == 0 && radius[j] == 0) && board[r + radius[i]] != null) {
                let neighbor = board[r + radius[i]][c + radius[j]];
                if (Math.abs(neighbor) == 1) count += 1;
            }
        }
    }
    return count;
};

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    const stack = [-1];
    let res = 0;
    heights.push(0);
    for (let i in heights) {
        while (heights[stack[stack.length - 1]] > heights[i]) {
            const ceilIndex = stack.pop();
            const leftIndex = stack[stack.length - 1];
            res = Math.max(res, (i - leftIndex - 1) * heights[ceilIndex]);
        }
        stack.push(i);
    }
    return res;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function (original, cloned, target) {
    if (!cloned) return null;
    if (original.val === target.val) return cloned;
    return getTargetCopy(original.left, cloned.left, target) || getTargetCopy(original.right, cloned.right, target)
};
var deleteDuplicates = function (head) {
    const dummyHead = new ListNode();
    let curr = head, currD = dummyHead, num;

    while (curr) {
        num = curr.val;

        while (curr.next && curr.next.val === num) {
            while (curr && curr.val === num) curr = curr.next;
            if (!curr) break;
            num = curr.val
        }

        if (!curr) break;
        currD.next = curr;
        curr = curr.next;
        currD = currD.next;
        currD.next = null;
    }
    return dummyHead.next;
};

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
    let i = 1, j = 0;
    while (k) {
        (arr[j] !== i) ? k-- : j++;
        i++;
    }
    return i - 1;
};

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    return (BigInt(num1) * BigInt(num2)).toString();
};

/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
    return word1.join('') === word2.join('');
};

/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
    let weights = new Uint16Array(limit), pairs = 0
    for (let wt of people) weights[wt]++;                          // Make a frequency map of people's weights
    for (let i = 0, j = limit; i <= j;) {                        // Initiate the sliding window
        while (!weights[j] && j > i) j--;                     // Until you find a non-zero, slide j back
        while (!weights[i] && i < j) i++;                     // Until you find a non-zero, slide i forward
        let x = weights[i], y = weights[j];
        if (i + j > limit) j--;                                   // If they're not a match, move on to the next j
        else if (i === j) pairs += ~~(x / 2), j = 0;          // If they're the same, add half and force a break
        else if (x <= y) weights[j] -= x, pairs += x, i++;    // Otherwise, take the lower amount and remove it
        else weights[i] -= y, pairs += y, j--                //    from the higher amount before moving onward
    }
    return people.length - pairs                                  // Each pair means one less trip than the max
};

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val === undefined ? 0 : val;
 *    this.children = children === undefined ? [] : children;
 * };
 */

/**
 * @param {Node[]} tree
 * @return {Node}
 */
var findRoot = function (tree) {
    const memo = new Map();

    const dfs = function (node) {
        if (!node) return 0;
        if (memo.has(node)) return memo.get(node);
        let count = 0;
        for (let child of node.children) {
            count += dfs(child);
        }
        memo.set(node, count + 1);
        return count + 1;
    };

    for (let i = 0; i < tree.length; i++) {
        const count = dfs(tree[i]);
        if (count === tree.length) return tree[i];
    }
    return null;
};

/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
    const sum = nums.reduce((acc, cur) => acc + cur, 0);
    const target = sum - x;

    if (target < 0) return -1;
    if (!target) return nums.length;

    let start = 0, runningSum = 0, maxLen = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        runningSum += nums[i];
        while (runningSum > target) runningSum -= nums[start++];
        if (runningSum === target) maxLen = Math.max(maxLen, i - start + 1);
    }
    return maxLen === -Infinity ? -1 : nums.length - maxLen;
};

/**
 * @param {number} n
 * @return {number}
 */
var getMaximumGenerated = function (n) {
    if (!n) {
        return 0;
    }

    const arr = [0, 1];

    for (let i = 0; i < n / 2; i++) {
        arr[2 * i] = arr[i];
        arr[2 * i + 1] = arr[i] + arr[i + 1];
    }

    return Math.max(...arr);
};

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {NestedInteger[]} nestedList
 * @return {number}
 */
var dfs = function (nestedList, depth) {
    var sum = 0;
    var n = nestedList.length;
    for (var i = 0; i < n; i++) {
        if (nestedList[i].isInteger()) {
            sum += nestedList[i].getInteger() * depth;
        } else {
            sum += dfs(nestedList[i].getList(), depth + 1);
        }
    }
    return sum;
};
var depthSum = function (nestedList) {
    return dfs(nestedList, 1);
};

/**
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function (n) {
    return 5 + 10 * combination(n - 1, 1) + 10 * combination(n - 1, 2) + 5 * combination(n - 1, 3) + combination(n - 1, 4);
};

function combination(n, k) {
    if (k === 1)
        return n;

    return combination(n - 1, k - 1) * n / k;
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
    const map = {};
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        const complement = k - nums[i];

        if ((complement in map)) {
            map[complement] = --map[complement];
            if (!map[complement]) delete map[complement];
            count++;
        } else {
            map[nums[i]] = ++map[nums[i]] || 1;
        }
    }
    return count;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var mostCompetitive = function (nums, k) {
    if (k === nums.length) return nums;

    const L = nums.length;
    let list = nums.slice(L - k, L);

    let peek = 0;

    while (peek < k - 1 && list[peek] <= list[peek + 1])
        peek++;

    for (let i = L - k - 1; i >= 0; i--) {
        if (nums[i] > list[0])
            continue;

        list.splice(peek, 1);
        list.splice(0, 0, nums[i]);

        while (peek < k - 1 && list[peek] <= list[peek + 1])
            peek++;
    }

    return list;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function (s, t) {
    const longer = s.length > t.length ? s : t;
    const shorter = s.length > t.length ? t : s;

    if (longer.length - shorter.length > 1) {
        return false;
    }

    let count = 0, i = 0, j = 0;

    while (i < longer.length) {
        if (longer[i] !== shorter[j]) {
            count++;

            if (longer.length > shorter.length) {
                i++;
                continue;
            }
        }

        i++;
        j++;
    }

    return count === 1;
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
    if (word1.length !== word2.length) return false;

    const ws1 = [...new Set(word1)].sort().join('')
    const ws2 = [...new Set(word2)].sort().join('')
    if (ws1 !== ws2) return false;

    const freq1 = Array(26).fill(0);
    const freq2 = Array(26).fill(0);

    for (let i = 0; i < word1.length; i++) {
        const idx1 = word1[i].charCodeAt() - 'a'.charCodeAt();
        const idx2 = word2[i].charCodeAt() - 'a'.charCodeAt();
        freq1[idx1]++;
        freq2[idx2]++;
    }
    const str1 = freq1.filter(x => x).sort().join()
    const str2 = freq2.filter(x => x).sort().join()
    return str1 === str2;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    let i = 0;

    let result = null;

    lists.forEach(v => {
        result = mergeList(result, v);
    });

    return result;
};

var mergeList = (l1, l2) => {
    if (l1 == null)
        return l2;

    if (l2 == null)
        return l1;

    if (l1.val < l2.val) {
        l1.next = mergeList(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeList(l1, l2.next);
        return l2;
    }
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var kLengthApart = function (nums, k) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i]) {
            if (i && count < k) {
                return false;
            } else {
                count = 0;
            }
        } else {
            count++;
        }
    }

    return true;
};

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
    const m = heights.length, n = heights[0].length;
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    let l = 0, r = Math.pow(10, 6);

    while (l < r) {
        let mid = l + ((r - l) >> 1);
        let t = bfs(mid);
        if (t) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }

    return l;

    function bfs(val) {
        const queue = [[0, 0]];
        const visited = new Set([0, 0]);

        while (queue.length) {
            let [x, y] = queue.shift();
            if (x === m - 1 && y === n - 1) return true;
            for (let dir of dirs) {
                let nx = dir[0] + x;
                let ny = dir[1] + y;
                if (nx < 0 || ny < 0 || nx >= m || ny >= n || visited.has(nx + ' ' + ny)) continue;
                if (Math.abs(heights[nx][ny] - heights[x][y]) > val) continue;
                visited.add(nx + ' ' + ny);
                queue.push([nx, ny]);
            }
        }

        return false;
    }
};

/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function (n) {
    let num = 0;

    for (let i = 1; i <= n; i++) {
        num *= (2 ** i.toString(2).length);
        num += i;
        num %= (10 ** 9 + 7)
    }
    return num;
};

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function (n, k) {
    const arr = Array(n).fill(1);
    k -= n;

    while (k) {
        arr[--n] += Math.min(k, 25);
        k -= Math.min(k, 25);
    }
    return arr.reduce((acc, cur) => acc + String.fromCharCode(cur + 96), '')
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var countCornerRectangles = function (grid) {
    let res = 0, m = grid.length, n = grid[0].length;
    for (let i = 0; i < m - 1; i++) {
        for (let j = i + 1; j < m; j++) {
            let count = 0;
            for (let k = 0; k < n; k++) {
                if (grid[i][k] === 1 && grid[j][k] === 1) count++;
            }
            res += count * (count - 1) / 2
        }
    }
    return res;
};

function swap(nums, x, y) {
    var tmp = nums[x];
    nums[x] = nums[y];
    nums[y] = tmp;
}

function maxHeapSort(nums, n, parent) {
    var left = parent * 2 + 1;
    while (left < n) {
        var maxChild = left;
        var right = left + 1;
        if (right < n && nums[right] > nums[left]) {
            maxChild = right;
        }
        if (nums[maxChild] <= nums[parent]) {
            return;
        }
        swap(nums, parent, maxChild);
        parent = maxChild;
        left = parent * 2 + 1;
    }
}


/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeviation = function (nums) {
    var n = nums.length;
    if (n < 2) return 0;
    nums.forEach((v, i) => (v % 2 === 1) && (nums[i] *= 2));
    for (var i = (n - 1) >> 1; i >= 0; i--) {
        maxHeapSort(nums, n, i);
    }
    var min = Math.min(...nums);
    var max = nums[0];
    var ans = max - min;
    while (max % 2 === 0) {
        max /= 2;
        min = Math.min(max, min);
        nums[0] = max;
        maxHeapSort(nums, n, 0);
        max = nums[0];
        ans = Math.min(ans, max - min);
    }
    return ans;
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    let i, j;
    // Find the first index from the right where the value is less than the next value. If this doesn't exist then i = -1.
    for (i = nums.length - 2; nums[i] >= nums[i + 1] && i >= 0; i--) ;
    if (i >= 0) {
        // Find the first index from the right where the value is greater than the value found in previous step.
        for (j = nums.length - 1; nums[j] <= nums[i]; j--) ;
        // Swap the two values found.
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    // Reverse everything after index i found above. Note if i = -1 then the whole array is reversed.
    for (i++, j = nums.length - 1; i < j; i++, j--) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
};

/**
 * @param {number} height
 * @param {number} width
 * @param {number[]} tree
 * @param {number[]} squirrel
 * @param {number[][]} nuts
 * @return {number}
 */
var minDistance = function (height, width, tree, squirrel, nuts) {
    const treeSum = 2 * nuts.reduce((sum, nut) => sum + dist(tree, nut), 0);
    const maxReductionBySquirrel = Math.max(...nuts.map(nut => dist(tree, nut) - dist(squirrel, nut)));
    return treeSum - maxReductionBySquirrel;
};

function dist(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {
    if (root === null) return root;
    if (root.val > high) return trimBST(root.left, low, high);
    if (root.val < low) return trimBST(root.right, low, high);

    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    let list = head;

    while (list) {
        if (list.val === 'visited') {
            return true;
        } else {
            list.val = 'visited';
            list = list.next ? list.next : null;
        }
    }

    return false;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
    let map = {}, res = 0;

    for (let n of nums) {
        map[n] = ~~map[n] + 1;
    }

    for (let n in map) {
        if (map[+n + 1]) {
            res = Math.max(res, map[n] + map[+n + 1])
        }
    }

    return res
};

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
    const parts = path.split(/\/+/g).filter(
        (item) => Boolean(item) && item !== '.'
    );

    const result = [];
    let toDelete = 0;

    while (parts.length) {
        const current = parts.pop();

        if (current === "..") {
            toDelete++;
        } else {
            if (toDelete) {
                toDelete--;
            } else {
                result.push(current);
            }
        }
    }

    return '/' + result.reverse().join('/');
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
 * @return {number[]}
 */
var rightSideView = function (root) {
    let values = [];
    traverse(root, 0);
    return values;

    function traverse(root, depth) {
        if (!root) return;
        traverse(root.right, depth + 1);
        if (values[depth] == undefined) {
            values[depth] = root.val;
        }
        traverse(root.left, depth + 1);
    }

    // Time Complexity: O(N), we visit every node exactly once
    // Space Complexity: O(H), call stack can go as deep as height of tree
};

/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
    let arr = s.split(c);
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {

            if (i !== 0 && (i === arr.length - 1 || j < Math.round(arr[i].length / 2)))
                result.push(j + 1);
            else
                result.push(arr[i].length - j);

        }

        if (i !== arr.length - 1)
            result.push(0);

    }

    return result;
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function (grid) {
    let islandHashMap = {};
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 1) {
                const islandReference = {str: 's'}; // start
                dfs(grid, row, col, islandReference);
                islandHashMap[islandReference['str']] = true;
            }
        }
    }

    return Object.keys(islandHashMap).length;
};

function dfs(grid, row, col, ref) {
    grid[row][col] = 2; // mark as visited
    // check up
    if (grid[row - 1] && grid[row - 1][col] === 1) {
        ref.str = ref.str + 'u';
        dfs(grid, row - 1, col, ref);
    }

    // check down
    if (grid[row + 1] && grid[row + 1][col] === 1) {
        ref.str = ref.str + 'd';
        dfs(grid, row + 1, col, ref);
    }

    // check left
    if (grid[row][col - 1] === 1) {
        ref.str = ref.str + 'l';
        dfs(grid, row, col - 1, ref);
    }

    // check right
    if (grid[row][col + 1] === 1) {
        ref.str = ref.str + 'r';
        dfs(grid, row, col + 1, ref);
    }

    ref.str = ref.str + 'c'; // call back
}

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
 * @return {TreeNode}
 */
var convertBST = function (root) {
    let sum = 0
    convertBSTHelper(root)
    return root

    function convertBSTHelper(root) {
        if (root === null) return sum
        convertBSTHelper(root.right, sum)
        sum += root.val
        root.val = sum
        convertBSTHelper(root.left, sum)

        return sum
    }
};

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
    function createNewNodes(node) {
        if (!node) return;
        const newNode = new Node(node.val);
        newNode.next = node.next;
        node.next = newNode;
        createNewNodes(newNode.next);
    }

    function linkRandomNode(node) {
        if (!node) return;
        node.next.random = node.random ? node.random.next : null;
        linkRandomNode(node.next.next);
    }

    function restoreOriginal(node) {
        if (!node) return null;
        const temp = node.next;
        node.next = node.next.next;
        temp.next = restoreOriginal(node.next)
        return temp;
    }

    createNewNodes(head);
    linkRandomNode(head);
    return restoreOriginal(head);
};

/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation.
 * function Iterator() {
 *    @ return {number}
 *    this.next = function() { // return the next number of the iterator
 *       ...
 *    };
 *
 *    @return {boolean}
 *    this.hasNext = function() { // return true if it still has numbers
 *       ...
 *    };
 * };
 */

/**
 * @param {Iterator} iterator
 */
var PeekingIterator = function (iterator) {
    this.it = iterator;
    this.peeked = false;
    this.last = null;
    this.has = this.it.hasNext();
};

/**
 * @return {number}
 */
PeekingIterator.prototype.peek = function () {
    if (!this.peeked) {
        this.last = this.it.next();
        this.peeked = true;
    }
    return this.last;
};

/**
 * @return {number}
 */
PeekingIterator.prototype.next = function () {
    if (!this.peeked) {
        this.last = this.it.next();
    }
    this.has = this.it.hasNext();
    this.peeked = false;
    return this.last;
};

/**
 * @return {boolean}
 */
PeekingIterator.prototype.hasNext = function () {
    return this.has;
};

/**
 * Your PeekingIterator object will be instantiated and called as such:
 * var obj = new PeekingIterator(arr)
 * var param_1 = obj.peek()
 * var param_2 = obj.next()
 * var param_3 = obj.hasNext()
 */

/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
    let steps = 0;
    while (num) {
        if (num % 2 === 0) {
            num /= 2
        } else {
            num -= 1
        }

        steps++;
    }

    return steps;
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
    let n = grid.length
    let m = grid[0].length;
    if (grid[0][0] == 1 || grid[n - 1][m - 1] == 1) return -1

    let dir = [[1, 0], [-1, 0], [1, 1], [-1, 1], [0, 1], [0, -1], [1, -1], [-1, -1]]
    let visited = Array(n).fill().map(i => Array(m).fill(0))
    let queue = [[0, 0, 1]]

    while (queue.length) {
        let [row, col, k] = queue.shift()
        if (row == n - 1 && col == m - 1) return k

        for (let d of dir) {
            let x = row + d[0], y = col + d[1]
            if (x >= 0 && y >= 0 && x < n && y < m && grid[x][y] == 0 && visited[x][y] == 0) {
                visited[x][y] = 1
                queue.push([x, y, k + 1])
            }
        }
    }

    return -1
};

/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
    const colors = {}

    for (let i = 0; i < graph.length; i++) {
        if (!colors.hasOwnProperty(i) && !dfs(i, true)) return false
    }

    return true

    function dfs(idx, color) {
        if (colors.hasOwnProperty(idx)) return color === colors[idx];
        colors[idx] = color

        for (const i of graph[idx]) {
            if (!dfs(i, !color)) return false
        }

        return true
    }
};

/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
var kWeakestRows = function (mat, k) {
    return mat
        .map((row, ind) => ({ // returns Array of objects, with properties {ind, sum}, i.e. index and sum of the row
            ind,
            sum: row.reduce((acc, item) => acc + item, 0),
        }))
        .sort((a, b) => a.sum - b.sum) // sort map
        .slice(0, k) // get first K items
        .map(item => item.ind); // from the Array of objects, return only Array of `ind`
};

/**
 * @param {number[]} pid
 * @param {number[]} ppid
 * @param {number} kill
 * @return {number[]}
 */
var killProcess = function (pid, ppid, kill) {
    const parents = {};
    for (let i = 0; i < ppid.length; i++) {
        parents[ppid[i]] = parents[ppid[i]] || [];
        parents[ppid[i]].push(pid[i]);
    }
    const res = [];
    dfs(parents, kill, res);
    return res;
};

function dfs(parents, kill, res) {
    res.push(kill);
    if (!parents[kill]) return;
    for (let pid of parents[kill]) {
        dfs(parents, pid, res);
    }
}

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let l = 0
    let r = height.length - 1
    let res = 0

    while (l < r) {
        let area = (r - l) * Math.min(height[l], height[r])
        res = Math.max(res, area)

        if (height[l] < height[r]) {
            l++
        } else {
            r--
        }
    }
    return res
};

/**
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function (A) {
    let numSlices = 0;
    for (let i = 0, j = A.length - 2; i < j; i++) { // check every start element
        for (let ii = i; ii < j; ii++) { //check how many sub arrays you can make
            if (A[ii + 1] - A[ii] === A[ii + 2] - A[ii + 1]) numSlices++;
            else break;
        }
    }
    return numSlices;
};

/**
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */
var brokenCalc = function (X, Y) {
    let count = 0;

    while (Y > X) {
        Y % 2 ? Y++ : Y /= 2;
        count++;
    }
    return count + (X - Y)
};

/**
 * Definition for knows()
 *
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */
var solution = function (knows) {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
    return function (n) {
        let c = 0;
        for (let i = 1; i < n; i++) {
            if (knows(c, i)) {
                c = i;
            }
        }
        for (let i = 0; i < n; i++) {
            if (i !== c && (knows(c, i) || !knows(i, c))) {
                return -1;
            }
        }
        return c;
    };
};
