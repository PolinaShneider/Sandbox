/**
 * @param {number} n
 * @return {number}
 */
var minOperations = function (n) {
    return Math.floor(n * n / 4);
};

/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
    const isVowel = (char) => /[aeiuo]/i.test(char);
    const countVowels = (str) => str.split('').reduce((total, item) => {
        if (isVowel(item)) {
            total++
        }

        return total;
    }, 0);
    const first = s.slice(0, s.length / 2);
    const second = s.slice(s.length / 2);

    return countVowels(first) === countVowels(second)
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
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
    const stack = [];
    let curr = root, isPassed = false;
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        if (isPassed) {
            return curr;
        }
        if (curr === p) {
            isPassed = true;
        }
        curr = curr.right;
    }
    return null;
};

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
    if (!digits.length) return [];

    let obj = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z'],
    };

    let result = [];
    const helperRecursion = str => {
        if (str.length == 0) {
            return;
        } else {
            let tempArr = [];
            if (result.length === 0) {
                tempArr = obj[str[0]];
            } else {
                const alphasArray = obj[str[0]];
                const resultLength = result.length;
                for (let i = 0; i < alphasArray.length; i++) {
                    for (let j = 0; j < resultLength; j++) {
                        tempArr.push(result[j] + alphasArray[i]);
                    }
                }
            }
            result = tempArr;
            helperRecursion(str.substring(1));
        }
    }
    helperRecursion(digits);
    return result;
};

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (M) {
    let ylen = M.length, xlen = M[0].length, ans = 0,
        memo = Array.from({length: ylen}, el => new Uint16Array(xlen))
    const dfs = (y, x) => {
        if (memo[y][x]) return memo[y][x]
        let val = M[y][x]
        memo[y][x] = 1 + Math.max(
            y < ylen - 1 && M[y + 1][x] < val ? dfs(y + 1, x) : 0,
            y > 0 && M[y - 1][x] < val ? dfs(y - 1, x) : 0,
            x < xlen - 1 && M[y][x + 1] < val ? dfs(y, x + 1) : 0,
            x > 0 && M[y][x - 1] < val ? dfs(y, x - 1) : 0)
        return memo[y][x]
    }
    for (let i = 0; i < ylen; i++)
        for (let j = 0; j < xlen; j++)
            ans = Math.max(ans, dfs(i, j))
    return ans
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var constructArray = function (n, k) {
    let ans = [], low = 1, high = k + 1

    for (let i = 1; i <= n; i++) {
        if (i <= k + 1) {
            ans[i - 1] = (i - 1) % 2 === 0 ? low++ : high--
        } else {
            ans[i - 1] = i
        }
    }

    return ans
}

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
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
// idea: retrieve of all data into array then pop one by one
function NestedIterator(nestedList) {
    let d = [];
    for (const e of nestedList) {
        if (e.isInteger()) {
            d.push(e.getInteger());
        } else {
            dfs(e);
        }
    }
    return {
        hasNext,
        next
    }

    function dfs(input) {
        if (input.isInteger()) return d.push(input.getInteger());
        let list = input.getList();
        for (const e of list) {
            dfs(e);
        }
    }

    function hasNext() {
        return d.length > 0;
    }

    function next() {
        return d.shift();
    }
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    let lessDummy = new ListNode(-1);
    let greaterDummy = new ListNode(-1);
    let current = head;
    let less = lessDummy;
    let greater = greaterDummy;
    while (current) {
        if (current.val < x) {
            less.next = current;
            less = current;
        } else if (current.val >= x) {
            greater.next = current;
            greater = current;
        }
        current = current.next;
    }
    greater.next = null;
    less.next = greaterDummy.next;
    return lessDummy.next;
};

/**
 * @param {number[]} data
 * @return {number}
 */
var minSwaps = function (data) {
    const ones = data.filter(d => d).length;
    let k = 0;
    for (let i = 0; i < ones; i += 1) k += data[i];
    let ans = ones - k;
    for (let i = ones; i < data.length; i += 1) {
        k += data[i] - data[i - ones];
        ans = Math.min(ans, ones - k);
    }
    return ans;
};

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
    let rdStk = [[s[0], 1]]; //s string is at least size 1 so init our stack
    for (let i = 1; i < s.length; i++) {
        if (rdStk.length && s[i] === rdStk[rdStk.length - 1][0]) { //is current letter same as top of stack?
            if (++rdStk[rdStk.length - 1][1] === k) rdStk.pop();
        } else {
            rdStk.push([s[i], 1]);
        }
    }
    return rdStk.reduce((str, elm) => str + elm[0].repeat(elm[1]), '');
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
    let row = matrix.length, col = matrix[0].length;
    for (let i = 1; i < row; i++) {
        for (let j = 0; j < col; j++) {
            matrix[i][j] += matrix[i - 1][j];
        }
    }
    let ans = 0;
    for (let i = 0; i < row; i++) {
        for (let j = i; j < row; j++) {
            let map = new Map(), sum = 0;
            map.set(0, 1);
            for (let k = 0; k < col; k++) {
                sum += matrix[j][k] - (i != 0 ? matrix[i - 1][k] : 0);
                ans += (map.get(sum - target) || 0);
                map.set(sum, (map.get(sum) || 0) + 1);
            }
        }
    }
    return ans;
};

