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
