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
