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
