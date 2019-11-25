/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
    const candidates = {};

    for (let i = 0; i < nums.length; i++) {
        const item = nums[i];

        if (candidates[item]) {
            delete candidates[item]
        } else {
            candidates[item] = 1;
        }
    }

    return Object.keys(candidates);
};

console.assert(singleNumber([1, 2, 1, 3, 2, 5]).join(",") === "3,5", "singleNumber #1");

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
    const candidates = {};
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        const item = nums[i];

        if (candidates[item]) {
            result.push(item);
        } else {
            candidates[item] = 1;
        }
    }

    return result;
};

console.assert(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]).join(",") === "2,3", "findDuplicates #1");

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
    const map = {};

    for (let symb of s) {
        map[symb] = ++map[symb] || 1;
    }

    const sorted = Object.entries(map).sort(([, val1], [, val2]) => val2 - val1);

    return sorted.reduce((total, [symb, num]) => {
        return total += symb.repeat(num)
    }, "")
};

console.assert(frequencySort("tree") === "eetr", "frequencySort #1");
console.assert(frequencySort("cccaaa") === "cccaaa", "frequencySort #2");
console.assert(frequencySort("Aabb") === "bbAa", "frequencySort #3");

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
const permute = (arr, part = []) => {
    let result = [];

    if (arr.length === 0) {
        result.push(part)
    } else {
        for (let i = 0; i < arr.length; i++) {
            let current = arr.slice();
            let next = current.splice(i, 1);
            result = result.concat(permute(current, part.concat(next)))
        }
    }

    return result;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let stringList = [];
    let maxLength = 0;

    for (let i = 0; i < s.length; i++) {
        if (stringList.includes(s[i])) {
            const charToRemove = stringList.indexOf(s[i]) + 1;
            stringList = stringList.slice(charToRemove)
        }
        stringList.push(s[i]);
        maxLength = Math.max(maxLength, stringList.length)
    }

    return maxLength
};

console.assert(lengthOfLongestSubstring("abcabcbb") === 3, "lengthOfLongestSubstring #1");
console.assert(lengthOfLongestSubstring("bbbbb") === 1, "lengthOfLongestSubstring #2");
console.assert(lengthOfLongestSubstring("pwwkew") === 3, "lengthOfLongestSubstring #3");
console.assert(lengthOfLongestSubstring(" ") === 1, "lengthOfLongestSubstring #4");
console.assert(lengthOfLongestSubstring("dvdf") === 3, "lengthOfLongestSubstring #5");

/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function (num) {
    while (num > 1) {
        num /= 4;
    }

    return num === 1;
};

console.assert(isPowerOfFour(16) === true, "isPowerOfFour #1");
console.assert(isPowerOfFour(1025) === false, "isPowerOfFour #2");

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    for (let num of nums) {
        if (nums.indexOf(num) === nums.lastIndexOf(num)) {
            return num;
        }
    }
};

console.assert(singleNumber([2, 2, 3, 2]) === 3, "singleNumber #1");
console.assert(singleNumber([0, 1, 0, 1, 0, 1, 99]) === 99, "singleNumber #2");

/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
    return (n % 4 !== 0);
};

console.assert(canWinNim(4) === false, "canWinNim #1");
console.assert(canWinNim(5) === true, "canWinNim #2");

/**
 * @param {number} num
 * @return {string}
 */
var toHex = function (num) {
    const map = {
        '0000': 0, '0001': 1, '0010': 2, '0011': 3, '0100': 4, '0101': 5,
        '0110': 6, '0111': 7, '1000': 8, '1001': 9, '1010': 'a', '1011': 'b',
        '1100': 'c', '1101': 'd', '1110': 'e', '1111': 'f'
    };

    let result = "";

    if (num === 0) return "0";

    num = (num < 0) ? (Math.pow(2, 32) + num) : num;

    while (num) {
        let mod = num % 16;
        result = map[Number(mod).toString(2).padStart(4, 0)] + result;
        num = Math.floor(num / 16);
    }

    return result;
};

console.assert(toHex(0) === "0", "toHex #1");
console.assert(toHex(-1) === "ffffffff", "toHex #2");
console.assert(toHex(26) === "1a", "toHex #3");

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function (A, K) {
    return (BigInt(A.join("")) + BigInt(K)).toString().split("").map(elem => +elem)
};

console.assert(
    addToArrayForm([1, 2, 0, 0], 34).join("") === [1, 2, 3, 4].join(""),
    "addToArrayForm #1"
);
console.assert(
    addToArrayForm([9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 1).join("") === [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].join(""),
    "addToArrayForm #2"
);
console.assert(
    addToArrayForm([2, 1, 5], 806).join("") === [1, 0, 2, 1].join(""),
    "addToArrayForm #3"
);

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    let sum = getSum(nums);
    let part = 0;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (part === (sum - part - num)) {
            return i;
        }
        part += num;
    }

    return -1;

    function getSum(arr) {
        return arr.reduce((accum, value) => {
            return accum + value
        }, 0)
    }
};

console.assert(pivotIndex([1, 7, 3, 6, 5, 6]) === 3, "pivotIndex #1");
console.assert(pivotIndex([2, 2]) === -1, "pivotIndex #2");
console.assert(pivotIndex([-1, -1, -1, -1, -1, 0]) === 2, "pivotIndex #3");

/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function (name, typed) {
    function toLetters(word) {
        let prev = "";
        const result = [];

        for (let symb of word) {
            if (prev.includes(symb)) {
                prev += symb;
            } else {
                if (prev.length) {
                    result.push(prev);
                }
                prev = symb;
            }
        }

        result.push(prev);
        return result;
    }

    const actual = toLetters(typed);
    const expected = toLetters(name);

    if (actual.length !== expected.length) {
        return false;
    }

    for (let i = 0; i < actual.length; i++) {
        if (actual[i].charAt(0) !== expected[i].charAt(0) || actual[i].length < expected[i].length) {
            return false;
        }
    }

    return true;
};

console.assert(isLongPressedName("kikcxmvzi", "kiikcxxmmvvzz") === false, "isLongPressedName #1");
