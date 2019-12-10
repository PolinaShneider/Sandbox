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

/**
 * Initialize your data structure here.
 */
var MyStack = function () {
    this.value = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
    this.value.push(x)
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
    return this.value.pop()
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
    return this.value[this.value.length - 1]
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
    return this.value.length === 0
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
    let n = chars.length;
    let count = 1;

    for (let i = n - 2; i >= 0; i--) {
        if (chars[i] === chars[i + 1]) {
            count++;
        } else if (count > 1) {
            chars.splice(i + 2, count - 1, ...count.toString().split(''));
            count = 1;
        }
    }

    if (count > 1) {
        chars.splice(1, count - 1, ...count.toString().split(''));
    }

    return chars.length;
};

console.assert(compress(["a", "a", "b", "b", "c", "c", "c"]) === 6, "compress #1");
console.assert(compress(["a"]) === 1, "compress #2");
console.assert(compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]) === 4, "compress #3");

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    const map = {};

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] in map && i - map[nums[i]] <= k) {
            return true;
        }

        map[nums[i]] = i;
    }
    return false;
};

console.assert(containsNearbyDuplicate([1, 2, 3, 1], 3) === true, "containsNearbyDuplicate #1");
console.assert(containsNearbyDuplicate([1, 0, 1, 1], 1) === true, "containsNearbyDuplicate #2");
console.assert(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2) === false, "containsNearbyDuplicate #3");
console.assert(containsNearbyDuplicate([1, 1, 1], 0) === false, "containsNearbyDuplicate #4");
console.assert(containsNearbyDuplicate([99, 99], 2) === true, "containsNearbyDuplicate #5");

/**
 * @param {number} x
 * @param {number} y
 * @param {number} bound
 * @return {number[]}
 */
var powerfulIntegers = function (x, y, bound) {
    const result = new Set();
    const xPowMax = (x > 1) ? Math.round(Math.log(bound) / Math.log(x)) : 1;
    const yPowMax = (y > 1) ? Math.round(Math.log(bound) / Math.log(y)) : 1;

    for (let i = 0; i <= xPowMax; i++) {
        for (let j = 0; j <= yPowMax; j++) {
            const candidate = Math.pow(x, i) + Math.pow(y, j);
            if (candidate <= bound) {
                result.add(candidate)
            }
        }
    }

    return [...result];
};

console.assert(powerfulIntegers(2, 3, 10).join(",") === [2, 4, 10, 3, 5, 7, 9].join(","), "powerfulIntegers #1");

/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    /**
     * Sort as strings, last is largest
     */
    timePoints.sort();
    let prev = new Date('2017-03-29T' + timePoints[0]);
    let min = prev - new Date('2017-03-28T' + timePoints[timePoints.length - 1]);
    for (let i = 1; i < timePoints.length; i++) {
        let curr = new Date('2017-03-29T' + timePoints[i]);
        min = Math.min(min, curr - prev);
        prev = curr;
    }
    return min / 60000;
};

var findMinDifference = function (timePoints) {
    const nums = new Array(timePoints.length);
    for (let i = 0; i < timePoints.length; i++) {
        const data = timePoints[i].split(":");
        nums[i] = data[0] * 60 + (+data[1]);
    }

    let min = Infinity;
    nums.sort((a, b) => a - b);
    for (let i = 1; i < timePoints.length; i++) {
        min = Math.min(min, nums[i] - nums[i - 1]);
    }

    min = Math.min(min, 24 * 60 + nums[0] - nums[timePoints.length - 1]);

    return min;
};

console.assert(findMinDifference(["15:00", "14:15"]) === 45, "findMinDifference #1");
console.assert(findMinDifference(["23:59", "00:00"]) === 1, "findMinDifference #2");
console.assert(findMinDifference(["05:31", "22:08", "00:35"]) === 147, "findMinDifference #3");

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    const dictionary = {
        '1000': 'M',
        '900': 'CM',
        '500': 'D',
        '400': 'CD',
        '100': 'C',
        '90': 'XC',
        '50': 'L',
        '40': 'XL',
        '10': 'X',
        '9': 'IX',
        '5': 'V',
        '4': 'IV',
        '1': 'I'
    };

    let result = "";

    for (let elem of Object.keys(dictionary).sort((a, b) => b - a)) {
        let count = Math.floor(num / elem);
        if (num >= elem) {
            num -= elem * count;
            result += dictionary[elem].repeat(count);
        }
    }

    return result;
};

console.assert(intToRoman(3) === "III", "intToRoman #1");
console.assert(intToRoman(1994) === "MCMXCIV", "intToRoman #2");

const flatten = function (obj) {
    let arr = [];

    for (let elem of obj) {
        if (!Array.isArray(elem)) {
            arr = arr.concat(elem);
        } else {
            arr = arr.concat(flatten(elem))
        }
    }

    return arr;
};

const flattenStack = function (obj) {
    const stack = [...obj];
    const values = [];

    while (stack.length) {
        let current = stack.pop();

        if (!Array.isArray(current)) {
            values.push(current)
        } else {
            stack.push(...current)
        }
    }

    return values.reverse();
};

const sample = [1, 'hello', [1, 2, 3, [15, 21, ['72m', 65]]], 'function', {name: 'Anya'}];
console.assert(flattenStack(sample).join(",") === flatten(sample).join(","), "flatten");

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    return s.trim().replace(/\s{2,}/g, " ").split(" ").reverse().join(" ");
};

console.assert(reverseWords("a good   example") === "example good a", "reverseWords #1");
console.assert(reverseWords("   a   b  c d   e  ") === "e d c b a", "reverseWords #2");

/**
 * @param {string} IP
 * @return {string}
 */
var validIPAddress = function (IP) {
    function isIPv4(addr) {
        const data = addr.split(".");
        return data.length === 4 && data.every(item => (/^[1-9]+$/.test(item) || item === "0") && +item >= 0 && +item <= 255);
    }

    function isIPv6(addr) {
        const data = addr.split(":");
        return data.length === 8 && data.every(item => item.length <= 4 && /^[abcdef0-9]+$/i.test(item));
    }

    if (isIPv4(IP)) {
        return "IPv4"
    } else if (isIPv6(IP)) {
        return "IPv6";
    } else {
        return "Neither"
    }
};

console.assert(validIPAddress("1e1.4.5.6") === "Neither", "validIPAddress #1");
console.assert(validIPAddress("01.01.01.01") === "Neither", "validIPAddress #2");
console.assert(validIPAddress("1e1.4.5.6") === "Neither", "validIPAddress #3");

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
    products.sort();
    const result = [];
    let str = "";

    for (let letter of searchWord) {
        str += letter;
        result.push(
            products.filter(
                item => new RegExp(`^${str}`).test(item)
            ).slice(0, 3)
        );
    }

    return result;
};
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
    const maxNumber = Math.pow(2, 31) - 1;
    const minNumber = -Math.pow(2, 31);

    const match = str.trim().match(/^(\+|\-)?\d+/g);

    if (match) {
        const number = Number(match[0]);
        if (number > maxNumber) return maxNumber;
        if (number < minNumber) return minNumber;
        return number;
    } else {
        return 0
    }
};
