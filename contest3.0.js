/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    function traverse(tree) {
        if (!tree) {
            return [];
        }

        let values = [tree.val];

        if (tree.left) {
            values = values.concat(traverse(tree.left));
        }

        if (tree.right) {
            values = values.concat(traverse(tree.right));
        }

        return values;
    }

    const values = traverse(root);

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length; j++) {
            if (i === j) {
                continue;
            }

            if (values[i] + values[j] === k) {
                return true;
            }
        }
    }

    return false;
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
    const map = {};
    const stack = [[root, 0]];

    if (!root) {
        return []
    }

    while (stack.length) {
        const [elem, level] = stack.pop();

        if (elem.right) {
            stack.push([elem.right, level + 1])
        }

        if (elem.left) {
            stack.push([elem.left, level + 1])
        }

        if (map[level]) {
            map[level].push(elem.val)
        } else {
            map[level] = [elem.val]
        }
    }

    return Object.values(map).reverse();
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 *
 * Good explanation: https://www.youtube.com/watch?v=qq64FrA2UXQ
 */
var getSum = function (a, b) {
    let carry;
    while (b) {
        carry = a & b;
        a ^= b;
        b = carry << 1;
    }
    return a;
};

/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
    const accum = {};

    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            if (list1[i] === list2[j]) {
                const sum = i + j;

                if (accum[sum]) {
                    accum[sum].push(list1[i])
                } else {
                    accum[sum] = [list1[i]];
                }
            }
        }
    }

    const min = Math.min(Number(...Object.keys(accum)));
    return accum[min];
};

/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
    this.value = []
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.value.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    return this.value.shift()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    return this.value[0]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.value.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
    this.nums = nums.sort((a, b) => a - b);
    this.k = k;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    const insert = () => {
        let l = 0;
        let r = this.nums.length - 1;

        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (this.nums[mid] === val) {
                return mid
            }
            if (this.nums[mid] < val) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l;
    };
    this.nums.splice(insert(), 0, val);
    return this.nums[this.nums.length - this.k]
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var countElements = function (arr) {
    const map = {};
    for (let elem of arr) {
        if (elem in map) {
            map[elem] = ++map[elem];
        } else {
            map[elem] = 1;
        }
    }

    let cnt = 0;
    let prev;
    for (let key in map) {
        if (prev && +key - prev.value === 1) {
            cnt += prev.count;
        }

        prev = {value: +key, count: map[key]};
    }

    return cnt;
};

/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
    if (!expression.startsWith("-")) {
        expression = `+${expression}`;
    }
    const parsed = expression.match(/([+-])?(\d+)\/(\d+)/g);

    for (let i = 0; i < parsed.length; i++) {
        const [, sign, top, bottom] = /([+-])?(\d+)\/(\d+)/.exec(parsed[i]);
        parsed[i] = {sign, top, bottom};
    }

    let sum = 0;
    let common = parsed.reduce((total, {bottom}) => {
        return total * bottom;
    }, 1);

    for (let elem of parsed) {
        elem.top *= common / elem.bottom;
        sum += (elem.sign === "+") ? elem.top : (-elem.top);
    }

    function reduce(first, second) {
        let result = 1;

        for (let i = 0; i <= Math.abs(Math.max(first, second)); i++) {
            if (first % i === 0 && second % i === 0) {
                result = i;
            }
        }

        return result;
    }

    let reducer = reduce(sum, common);
    sum /= reducer;
    common /= reducer;

    return (Math.floor(sum / common) === sum / common) ? `${sum}/1` : `${sum}/${common}`;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
    const result = {};
    for (let i = 0; i < Math.pow(2, nums.length); i++) {
        const temp = [];
        for (let j = 0; j < nums.length; j++) {
            // & is bitwise AND
            if ((i & Math.pow(2, j))) {
                temp.push(nums[j])
            }
        }
        const key = temp.sort((a, b) => a - b).join(',');
        result[key] = temp;
    }
    return Object.values(result)
};

/**
 * initialize your data structure here.
 */
var MinStack = function () {
    this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
    this.stack.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return Math.min(...this.stack);
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    const N = Math.max(num1.length, num2.length);
    let carryOver = 0, result = '';

    // Add leading zeros
    if (num1.length > num2.length) {
        num2 = num2.padStart(num1.length, '0');
    } else if (num1.length < num2.length) {
        num1 = num1.padStart(num2.length, '0');
    }

    for (let i = N - 1; i >= 0; i--) {
        let sum = +num1[i] + +num2[i] + carryOver;

        if (carryOver) {
            carryOver--;
        }

        if (sum > 9) {
            carryOver++;
        }

        result = sum % 10 + result;
    }

    return (carryOver) ? '1' + result : result;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    const map = {
        '0': -1
    };

    let ones = 0;
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        ones += nums[i] ? 1 : -1;

        if (map[ones] != null) {
            max = Math.max(max, i - map[ones]);
        } else {
            map[ones] = i;
        }
    }

    return max;
};

/**
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
var stringShift = function (s, shift) {
    for (let [direction, amount] of shift) {
        if (direction) {
            s = s.slice(-amount) + s.slice(0, -amount)
        } else {
            s = s.slice(amount) + s.slice(0, amount)
        }
    }
    return s;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const indexes = new Array(nums.length).fill(0).map((item, index) => index);
    const result = [];

    for (let index of indexes) {
        let product = 1;

        for (let i = 0; i < nums.length; i++) {
            if (i !== index) {
                product *= nums[i];
            }
        }

        result.push(product);
        product = 1;
    }

    return result;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
    // smallest and largest possible num of '(' after current character
    let lo = 0, hi = 0;
    for (let c of s) {

        lo += c === '(' ? 1 : -1;
        hi += c !== ')' ? 1 : -1;

        // In case of '())' you already lost
        if (hi < 0) {
            break
        }

        lo = Math.max(lo, 0);
    }

    return lo === 0;
};

/**
 * @param {grid[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let count = 0;

    function depthSearch(x, y) {
        if (grid[x][y] === '1') {
            grid[x][y] = '0';
        } else {
            return;
        }

        if (x < grid.length - 1) {
            depthSearch(x + 1, y);
        }

        if (y < grid[x].length - 1) {
            depthSearch(x, y + 1);
        }

        if (x > 0 && x < grid.length) {
            depthSearch(x - 1, y);
        }

        if (y > 0 && y < grid[x].length) {
            depthSearch(x, y - 1);
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                depthSearch(i, j);
            }
        }
    }

    return count;
};

console.assert(numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
]) === 1, "numIslands #1");

var minPathSum = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // at start, do nothing
            if (row === 0 && col === 0) {
                continue;
            }

            if (row !== 0 && col !== 0) {
                // in the middle
                grid[row][col] += Math.min(grid[row - 1][col], grid[row][col - 1]);
            } else if (row === 0) {
                // up agains the ceiling
                grid[row][col] += grid[row][col - 1];
            } else if (col === 0) {
                // up agains the left wall
                grid[row][col] += grid[row - 1][col];
            }
        }
    }

    return grid[rows - 1][cols - 1]
};

/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var decodeAtIndex = function (S, K) {
    let cnt = 0;
    let i = 0;

    for (; i < S.length; i++) {
        const ch = S[i];
        if (/[a-z]/.test(ch)) {
            cnt++;
        } else {
            cnt *= +ch;
        }
        if (cnt >= K) {
            break;
        }
    }

    for (let j = i; j >= 0; j--) {
        const ch = S[j];
        if (/[a-z]/.test(ch)) {
            if (K === cnt) {
                return S[j]
            }
            cnt--;
        } else {
            cnt /= +ch;
            K %= cnt;
            if (K === 0) {
                K = cnt;
            }
        }
    }
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
const bstFromPreorder = (preorder) => {
    if (preorder.length === 0) {
        return null;
    }

    if (preorder.length === 1) {
        return new TreeNode(preorder[0]);
    }

    let res = new TreeNode(preorder[0]);

    /**
     * Iterate and insert
     */
    for (let i = 1; i < preorder.length; i++) {
        res = insert(res, preorder[i]);
    }

    return res;
};

/**
 * recursive func to insert value into tree
 * @param {TreeNode} root
 * @param {number} val val to insert
 * @return {TreeNode} altered node
 */
const insert = (root, val) => {
    // base
    if (root === null) {
        return new TreeNode(val);
    }

    // compare value between val and root
    if (val < root.val) {
        // insert in left subtree
        root.left = insert(root.left, val);
    } else {
        // insert in right subtree
        root.right = insert(root.right, val);
    }

    return root;
};

/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * function BinaryMatrix() {
 *     @param {integer} x, y
 *     @return {integer}
 *     this.get = function(x, y) {
 *         ...
 *     };
 *
 *     @return {[integer, integer]}
 *     this.dimensions = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
var leftMostColumnWithOne = function (binaryMatrix) {
    const [rows, cols] = binaryMatrix.dimensions();

    let result = -1;

    if (!rows || !cols) {
        return result;
    }

    let r = 0;
    let c = cols - 1;

    while (r < rows && c >= 0) {
        if (binaryMatrix.get(r, c) === 1) {
            result = c;
            c--;
        } else {
            r++;
        }
    }

    return result;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    const map = {0: 1};
    let sum = 0;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (map[sum - k]) {
            count += map[sum - k];
        }
        map[sum] = ++map[sum] || 1;
    }

    return count;
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function (m, n) {
    let trailingZero = 0;
    while (m !== n) {
        m >>= 1;
        n >>= 1;
        trailingZero++;
    }

    return m << trailingZero;
};

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.cache = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.cache.has(key)) {
        return -1;
    }

    // if key exists, delete and re-add key to move it to the back
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
};


/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    // if key already in cache, delete and re-add to move it to the back
    if (this.cache.has(key)) {
        this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
        // if cache is max size, and key not already in cache, the remove the first item in the Map
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
    }

    this.cache.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > max) {
            return false;
        }

        if (i + nums[i] >= nums.length - 1) {
            return true;
        }

        max = Math.max(max, i + nums[i]);
    }
};

var longestCommonSubsequence = function (text1, text2) {
    let temp = [];
    let max = 0;
    for (let i = 0; i <= text1.length; i++) {
        temp.push(new Array(text2.length + 1).fill(0));
    }
    for (let i = 1; i < temp.length; i++) {
        for (let j = 1; j < temp[0].length; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                temp[i][j] = temp[i - 1][j - 1] + 1
            } else {
                temp[i][j] = Math.max(temp[i - 1][j], temp[i][j - 1]);
            }
            max = Math.max(max, temp[i][j]);
        }
    }
    return max;
};

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    if (!matrix.length) {
        return 0;
    }

    let solution = Math.max(...matrix[0]);

    const cache = [...matrix];
    const height = matrix.length;
    const width = matrix[0].length;

    for (let i = 0; i < matrix.length; i++) {
        solution = Math.max(solution, matrix[i][0])
    }

    for (let row = 1; row < height; row++) {
        for (let col = 1; col < width; col++) {
            if (matrix[row][col] === "1") {
                cache[row][col] = (Math.min(cache[row - 1][col], (cache[row][col - 1]), cache[row - 1][col - 1]) + 1);
                solution = Math.max(solution, cache[row][col]);
            }
        }
    }
    return solution * solution
};

/**
 * @param {number[]} nums
 */
var FirstUnique = function (nums) {
    this.map = new Map();
    this.counter = {};

    for (const num of nums) {
        this.map.set(+num, this.map.get(num) + 1 || 1);
        this.counter[num] = true;
    }

    for (const key of this.map.keys()) {
        if (this.map.get(key) > 1) {
            this.map.delete(key)
        }
    }
};

/**
 * @return {number}
 */
FirstUnique.prototype.showFirstUnique = function () {
    const result = this.map.keys().next().value;
    return (result === void 0) ? -1 : result;
};

/**
 * @param {number} value
 * @return {void}
 */
FirstUnique.prototype.add = function (value) {
    if (this.counter[value]) {
        this.map.delete(value);
    } else {
        this.map.set(value, value);
        this.counter[value] = 1;
    }
};

/**
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
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
 * @return {number}
 */
var maxPathSum = function (root) {
    // keep max negative values to deal with negatives
    let max = -Infinity;

    function dfs(node) {
        if (!node) {
            return -Infinity
        }

        //call recursiverly dfs on left and right.
        const leftSum = dfs(node.left);
        const rightSum = dfs(node.right);
        //find max of all the possible cases at that particular nodes.
        const current = Math.max(node.val, (node.val + leftSum), (node.val + rightSum), (node.val + rightSum + leftSum))
        //update max
        max = Math.max(current, max);

        // return path that parent should take to maximize sum.
        return node.val + Math.max(leftSum, rightSum, 0)
    }

    dfs(root);
    return max
};

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function (n) {
        let low = 1;
        let high = n;

        while (high > low) {
            const mid = Math.floor((low + high) / 2);

            if (isBadVersion(mid)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        return low;
    };
};

/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    this.partials = (function () {
        if (!nums.length) {
            return {};
        }
        const map = {
            0: nums[0]
        };
        for (let i = 1; i < nums.length; i++) {
            map[i] = map[i - 1] + nums[i];
        }
        return map;
    })(nums);
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
    return i > 0 ? this.partials[j] - this.partials[i - 1] : this.partials[j];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return                -1 if num is lower than the guess number
 *                         1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
    let low = 1;
    let high = n;

    while (low <= high) {

        let mid = Math.floor((low + high) / 2);

        if (guess(mid) === 0) {
            return mid;
        } else if (guess(mid) > 0) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
};

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    if (divisor === 0 || dividend > 2147483647 || dividend < -2147483648 || dividend < -2147483647 && divisor === -1) {
        return 2147483647;
    }
    const isNegative = dividend < 0 && divisor >= 0 || dividend >= 0 && divisor < 0;

    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    if (dividend === 0 || dividend < divisor) {
        return 0;
    }

    let doubling = divisor;
    let count = 1;
    while (doubling < dividend && !(doubling & (1 << 30))) {
        doubling <<= 1;
        count <<= 1;
    }
    if (doubling > dividend) {
        doubling >>>= 1;
        count >>>= 1;
    }

    const res = count + divide(dividend - doubling, divisor);
    return isNegative ? 0 - res : res;
};

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    nums2.splice(n, nums2.length - n);
    nums1.splice(m, nums1.length - m, ...nums2);
    nums1.sort((a, b) => a - b);
};

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
    let numZeroes = 0;
    for (let i = 5; i <= n; i *= 5) {
        numZeroes += Math.floor(n / i);
    }
    return numZeroes;
};

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    const square = num ** 0.5;
    return Math.floor(square) === square;
};

/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (N, trust) {
    const map = {};

    for (const elem of trust) {
        const [first, second] = elem;
        if (map[first]) {
            map[first].push(second.toString())
        } else {
            map[first] = [second.toString()];
        }
    }

    let candidate = -1;
    const keys = Object.keys(map);
    for (let i = 1; i <= N; i++) {
        if (!keys.includes(i.toString())) {
            candidate = i.toString();
        }
    }

    for (const key in map) {
        if (!map[key].includes(candidate)) {
            return -1;
        }
    }

    return candidate;
};

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
    var dfs = (image, row, col, newColor, origColor) => {
        if (
            row >= 0
            && row < image.length
            && col >= 0
            && col < image[0].length
            && image[row][col] === origColor
        ) {

            image[row][col] = newColor;

            dfs(image, row - 1, col, newColor, origColor);  // up
            dfs(image, row + 1, col, newColor, origColor);  // down
            dfs(image, row, col - 1, newColor, origColor);  // left
            dfs(image, row, col + 1, newColor, origColor);  // right
        }
    };

    const origColor = image[sr][sc];
    if (newColor !== origColor) {
        dfs(image, sr, sc, newColor, origColor);
    }

    return image;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    let prev = nums[0];
    let cnt = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === prev) {
            cnt++
        } else {
            if (cnt < 2) {
                return nums[i - 1];
            }
            cnt = 1;
        }

        prev = nums[i];
    }

    return nums[nums.length - 1];
};

/**
 * Initialize your data structure here.
 */
var Trie = function () {
    this.root = {};
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let node = this.root;
    word.split('').forEach((char) => {
        if (!node[char]) {
            node[char] = {};
        }
        node = node[char];
    });
    node.isEnd = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    let node = this.searchNode(word);
    return (node != null) ? (node.isEnd === true) : false;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    let node = this.searchNode(prefix);
    return node != null;
};

Trie.prototype.searchNode = function (word) {
    let node = this.root;
    for (let char of word.split('')) {
        if (node[char]) {
            node = node[char]
        } else {
            return null;
        }
    }
    return node;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/**
 * @param {number[]} A
 * @return {number}
 */
var maxSubarraySumCircular = function (a) {
    const aCopy = [...a];
    const n = a.length;

    let max_sum = kadane(a); // sliding window using kadane's algo
    let max_wrap = 0;

    for (let i = 0; i < n; i++) {
        max_wrap += a[i]; // Calculate array-sum
        a[i] = -a[i];  // invert the array (change sign)
    }

    max_wrap = max_wrap + kadane(a);
    return (max_wrap > max_sum) ? max_wrap : max_sum === 0 ? max_sum = Math.max.apply(this, aCopy) : max_sum;

    // Sliding window
    function kadane(a) {
        const n = a.length;
        let max_so_far = 0, max_ending_here = 0;
        for (let i = 0; i < n; i++) {
            max_ending_here = max_ending_here + a[i];
            if (max_ending_here < 0) {
                max_ending_here = 0;
            }
            if (max_so_far < max_ending_here) {
                max_so_far = max_ending_here;
            }
        }
        return max_so_far;
    }
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
 * @return {ListNode}
 */
var oddEvenList = function (head) {
    if (!head || !head.next) return head;
    let odd = head;
    let even = evenTop = head.next;

    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }

    odd.next = evenTop;
    return head;
};

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    const l = p.length;
    const res = [];

    //Create map for target string => 'p';
    let map = new Map();
    for (const c of p) {
        if (!map.has(c)) map.set(c, 1);
        else map.set(c, map.get(c) + 1)
    }

    //Move the right edge of the 'door' until length equals to l;
    for (let i = 0; i < l; i++) {
        if (map.has(s[i])) map.set(s[i], map.get(s[i]) - 1);
    }

    //Check first 'door';
    if (isMatch(map)) res.push(0);

    //Move the 'door' to right side step by step and check;
    for (let i = l; i < s.length; i++) {
        if (map.has(s[i])) map.set(s[i], map.get(s[i]) - 1);
        if (map.has(s[i - l])) map.set(s[i - l], map.get(s[i - l]) + 1);
        if (isMatch(map)) res.push(i - l + 1);
    }

    //Validation check;
    function isMatch(map) {
        for (const [k, v] of map) {
            if (v !== 0) return false;
        }
        return true;
    }

    return res;
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
    let start = 0;
    let charsLeft = s1.length;

    //Create dictionary from s1
    let dic = {};
    for (let i = 0; i < s1.length; i++) {
        dic[s1[i]] = (dic[s1[i]] || 0) + 1;
    }


    //Iterate s2
    for (let i = 0; i < s2.length; i++) {

        //Decrease char in dictionary and check for completion
        if (--dic[s2[i]] >= 0 && --charsLeft === 0) return true;

        //check if window is broken
        while (start <= i && (isNaN(dic[s2[i]]) || dic[s2[i]] < 0)) {
            if (++dic[s2[start++]] > 0) charsLeft++;
        }

    }

    return false;
};

var StockSpanner = function () {
    this.values = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
    let count = 1;
    while (this.values.length > 0 && this.values[this.values.length - 1][0] <= price) {
        count += this.values.pop()[1];
    }
    this.values.push([price, count]);
    return count;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
var busyStudent = function (startTime, endTime, queryTime) {
    let cnt = 0;

    for (let i = 0; i < startTime.length; i++) {
        if (startTime[i] <= queryTime && endTime[i] >= queryTime) {
            cnt++;
        }
    }

    return cnt;
};

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
    let count = 0;
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[0].length; ++j) {
            if (matrix[i][j] === 0) continue;
            if (i > 0 && j > 0) {
                matrix[i][j] += Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
            }
            count += matrix[i][j];
        }
    }
    return count;
};
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        const max = Math.max(...arr.slice(i + 1));
        arr[i] = Number.isFinite(-max) ? max : -1
    }

    return arr;
};

/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
var intervalIntersection = function (A, B) {
    let Ai = 0, Bi = 0;
    let res = [];

    while (Ai < A.length && Bi < B.length) {
        let maxStart = Math.max(A[Ai][0], B[Bi][0]);
        let minEnd = Math.min(A[Ai][1], B[Bi][1]);

        if (maxStart <= minEnd) res.push([maxStart, minEnd]); // overlap found

        if (A[Ai][1] < B[Bi][1]) Ai++;
        else Bi++;
    }

    return res;
};

/**
 * @param {string} s
 * @return {string}
 */
var sortString = function (s) {
    s = s.split``.sort().join``;
    let result = '';
    while (s.length) {
        result += s.match(/([a-z])(?!\1)/gi).join``;
        s = s.replace(/([a-z])(?!\1)/gi, '');
        result += (s.match(/([a-z])(?!\1)/gi) || []).reverse().join``;
        s = s.replace(/([a-z])(?!\1)/gi, '');
    }
    return result
};

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var maxUncrossedLines = function (A, B) {
    let dp = new Array(A.length + 1);
    dp[0] = new Array(B.length + 1);
    for (let i = 0; i < A.length; i++) {
        dp[i + 1] = new Array(B.length + 1);
        for (let j = 0; j < B.length; j++) {
            if (A[i] === B[j]) dp[i + 1][j + 1] = (dp[i][j] || 0) + 1;
            else dp[i + 1][j + 1] = Math.max(dp[i][j + 1] || 0, dp[i + 1][j] || 0);
        }
    }
    return dp[A.length][B.length];
};

/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (N, dislikes) {
    const map = new Uint16Array(N + 1).fill(2047);
    let counter = 0;
    const len = dislikes.length;
    for (let i = 0; i < len; i++) {
        const A = map[dislikes[i][0]], B = map[dislikes[i][1]];
        const AP = A + (A % 2 ? -1 : 1), BP = B + (B % 2 ? -1 : 1);
        if (A === 2047) {
            if (B === 2047) {
                map[dislikes[i][0]] = counter++;
                map[dislikes[i][1]] = counter++;
            } else {
                map[dislikes[i][0]] = BP;
            }
        } else if (B === 2047) {
            map[dislikes[i][1]] = AP;
        } else {
            if (A === B) return false;
            if (A === BP) continue;
            for (let j = 1; j <= N; j++) {
                map[j] === B ? map[j] = AP :
                    map[j] === BP ? map[j] = A :
                        null;
            }
        }
    }
    return true;
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    if (!prerequisites.length || !prerequisites[0].length) return true;
    let indegrees = new Array(numCourses).fill(0); // 0 -> n-1
    let graph = new Map(); //HashMap<Integer, int[]>
    let queue = [];

    for (let i = 0; i < prerequisites.length; i++) {
        indegrees[prerequisites[i][0]]++;
        let key = prerequisites[i][1];
        if (graph.has(key)) {
            graph.set(key, graph.get(key).concat(prerequisites[i][0]));
        } else {
            graph.set(key, [prerequisites[i][0]]);
        }
    }
    indegrees.forEach((indegree, index) => {
        if (indegree === 0) queue.push(index);
    });
    while (queue.length) {
        let cur = queue.shift();
        let courses = graph.get(cur);
        for (let i = 0; courses && i < courses.length; i++) {
            if (--indegrees[courses[i]] === 0) queue.push(courses[i]);
        }
    }
    for (let i = 0; i < indegrees.length; i++) {
        if (indegrees[i] !== 0) {
            return false;
        }
    }
    return true;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    if (!l1 || !l2) return l1 || l2
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
};

/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
    return Array(num + 1).fill(0).map((_, i) => i === 0 ? 0 : i.toString(2).match(/1/g).length);
};

/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function (points, K) {
    const distance = ([x, y]) => {
        return Math.pow((x ** 2 + y ** 2), 0.5);
    };

    return points.sort((first, second) => distance(first) - distance(second)).slice(0, K);
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    var M = [];
    var cols = word1.length;
    var rows = word2.length;
    for (var y = rows; y >= 0; y--) {
        M[y] = [];
        for (var x = cols; x >= 0; x--) {
            if (x === cols && y === rows) { // bottom right corner
                M[y][x] = 0;
            } else if (x === cols) {       // right edge
                M[y][x] = M[y + 1][x] + 1;
            } else if (y === rows) {       // bottom edge
                M[y][x] = M[y][x + 1] + 1;
            } else {
                var A = M[y + 1][x];     // down
                var B = M[y][x + 1];     // right
                var C = M[y + 1][x + 1]; // down and right
                if (word1[x] === word2[y]) {
                    M[y][x] = Math.min(A + 1, B + 1, C);
                } else {
                    M[y][x] = Math.min(A + 1, B + 1, C + 1);
                }
            }
        }
    }
    return M[0][0];
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
var invertTree = function (root) {
    function invert(node) {
        if (!node) return;

        const temp = node.left;
        node.left = node.right;
        node.right = temp;

        invert(node.left);
        invert(node.right);
    }

    invert(root);
    return root;
};

/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
    const groupA = [], groupB = [];
    const mid = costs.length / 2;

    for (let item of costs) {
        const [a, b] = item;
        if (a <= b) groupA.push(item);
        else groupB.push(item);
    }

    if (groupA.length > mid) {
        groupA.sort((a, b) => Math.abs(b[0] - b[1]) - Math.abs(a[0] - a[1]));
        while (groupA.length > mid) groupB.push(groupA.pop());
    } else if (groupB.length > mid) {
        groupB.sort((a, b) => Math.abs(b[0] - b[1]) - Math.abs(a[0] - a[1]))
        while (groupB.length > mid) groupA.push(groupB.pop());
    }

    let total = groupA.reduce((acc, cur) => acc + cur[0], 0);
    total += groupB.reduce((acc, cur) => acc + cur[1], 0);
    return total;
};

/**
 * @param {number[]} w
 */
var Solution = function (w) {
    this.weights = new Map();
    this.sum = 0;
    for (let i = 0; i < w.length; i++) {
        this.sum += w[i];
        this.weights.set(this.sum, i);
    }
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
    let index = Math.floor(Math.random() * this.sum);
    for (let key of this.weights.keys()) {
        if (index < key) {
            return this.weights.get(key)
        }
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
    const compare = ([h1, k1], [h2, k2]) => {
        if (h1 !== h2) return h2 - h1;
        else return k1 - k2;
    };
    people.sort(compare);

    const res = [];
    for (const p of people) {
        res.splice(p[1], 0, p); // insert person at index k
    }
    return res;
};

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    const result = new Array(amount + 1).fill(0);
    result[0] = 1;

    for (const coin of coins) {
        for (let i = coin; i < result.length; i++) {
            result[i] += result[i - coin];
        }
    }

    return result[amount]
};

/**
 * Initialize your data structure here.
 */
var RandomizedSet = function () {
    this.set = []
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
    if (this.set.indexOf(val) > -1) return false;
    this.set.push(val);
    return true
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
    const index = this.set.indexOf(val);
    if (index > -1) {
        this.set.splice(index, 1);
        return true
    }
    return false
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
    const randomNum = Math.floor(Math.random() * this.set.length);
    return this.set[randomNum]
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
    if (!nums.length) return [];
    nums.sort((a, b) => a - b);
    const dp = Array.from({length: nums.length}, (_, i) => [nums[i]]);

    for (let i = nums.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < nums.length; j++) {
            if (dp[i].length <= dp[j].length && dp[j][0] % nums[i] === 0) {
                dp[i] = [nums[i], ...dp[j]];
            }
        }
    }

    return dp.reduce((a, x) => a.length > x.length ? a : x)
};

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, K) {
    const flightHash = {};
    for (let flight of flights) {
        let [from, to, price] = flight;
        if (flightHash[from] == null) flightHash[from] = {};
        flightHash[from][to] = price;
    }
    let minPrice = {src: [0]};
    let pq = [[0, 0, src]];

    while (pq.length) {
        let [price, stop, from] = pq.shift();
        if (stop > K + 1 || (minPrice[from] && price > minPrice[from][stop])) continue;
        if (from === dst) return price;
        let to = flightHash[from];
        for (let t in to) {
            if (minPrice[t] == null) minPrice[t] = [];
            let costToNext = price + to[t];
            if (costToNext > minPrice[t][stop + 1]) continue;
            minPrice[t][stop + 1] = costToNext;
            pq.push([costToNext, stop + 1, t]);
        }
        pq.sort((a, b) => a[0] - b[0]);
    }

    return -1;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
    return nums.reduce((total, item, index) => {
        const prev = total[index - 1];

        if (prev !== undefined) {
            total.push(item + prev);
        } else {
            total.push(item);
        }

        return total;
    }, []);
};

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    if (!board.length) return;

    function callDFS(r, c) {
        if (r >= board.length || r < 0 || c >= board[0].length || c < 0 || board[r][c] !== 'O') return;
        board[r][c] = 'V';
        // up
        callDFS(r - 1, c);
        // down
        callDFS(r + 1, c);
        // right
        callDFS(r, c - 1);
        // left
        callDFS(r, c + 1);
    }

    // top and bottom border
    for (let c = 0; c < board[0].length; c++) {
        if (board[0][c] === 'O') callDFS(0, c);
        if (board[board.length - 1][c] === 'O') callDFS(board.length - 1, c);
    }

    // left and right border
    for (let r = 0; r < board.length; r++) {
        if (board[r][0] === 'O') callDFS(r, 0);
        if (board[r][board[0].length - 1] === 'O') callDFS(r, board[0].length - 1);
    }

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            if (board[r][c] === 'O') board[r][c] = 'X';
            else if (board[r][c] === 'V') board[r][c] = 'O';
        }
    }
};

var hIndex = function (citations) {

    let start = 0, end = citations.length - 1;

    while (start <= end) {

        let mid = Math.floor((start + end) / 2);

        if (citations.length - mid - 1 < citations[mid]) {

            end = mid - 1;
        } else {

            start = mid + 1;
        }
    }

    return citations.length - start;
};

/**
 * @param {string} S
 * @return {string}
 */
var longestDupSubstring = function (S) {
    const arr = S.split('').map((c) => c.charCodeAt(0) - 'a'.charCodeAt(0));
    let left = 0;
    let right = S.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (findDuplicated(arr, mid) >= 0) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    const length = left - 1;
    const index = findDuplicated(arr, length);
    return index >= 0 ? S.substring(index, index + length) : '';
};

const base = 26;
const M = 2 ** 32;

function findDuplicated(arr, L) {
    let hash = createHash(arr, 0, L);
    const set = new Set([hash]);
    const p = pow(base, L, M);
    for (let i = 1; i <= arr.length - L; i++) {
        hash = ((hash * base - ((arr[i - 1] * p) % M) + M) % M) + (arr[i + L - 1] % M);
        if (set.has(hash)) {
            return i;
        }
        set.add(hash);
    }
    return -1;
}

function createHash(arr, start, end) {
    let hash = 0;
    for (let i = start; i < end; i++) {
        hash = (base * hash + arr[i]) % M;
    }
    return hash;
}

function pow(b, exp, mod) {
    let output = 1;
    for (let i = 0; i < exp; i++) {
        output = (output * b) % mod;
    }
    return output;
}

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    let factorial = [1];
    for (let i = 1; i <= n; i++) {
        factorial[i] = i * factorial[i - 1];
    }

    const nums = Array.from({length: n}, (v, i) => i + 1);
    let res = "";
    for (let i = n; i > 0; i--) {
        const index = Math.ceil(k / factorial[i - 1]); // decide to use which permutation set
        res += nums[index - 1];
        nums.splice(index - 1, 1);
        k -= (factorial[i - 1] * (index - 1));
    }
    return res;
};

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
    let nrows = dungeon.length;
    let ncols = dungeon[0].length;

    let dp = [];
    for (let r = 0; r < nrows + 1; r++) {
        dp[r] = [];
        for (let c = 0; c < ncols + 1; c++) {
            dp[r][c] = Number.MAX_SAFE_INTEGER;
        }
    }
    dp[nrows - 1][ncols] = dp[nrows][ncols - 1] = 1;

    for (let r = nrows - 1; r >= 0; r--) {
        for (let c = ncols - 1; c >= 0; c--) {
            dp[r][c] = Math.max(1, Math.min(dp[r + 1][c], dp[r][c + 1]) - dungeon[r][c]);
        }
    }
    return dp[0][0];
};

/**
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function (N) {
    return (N % 2 === 0);
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
var countNodes = function (root) {
    if (!root) {
        return 0;
    }
    return countNodes(root.left) + countNodes(root.right) + 1;
};

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    return factorial(2 * n) / (factorial(n + 1) * factorial(n));
};

function factorial(num) {
    return (num <= 0) ? 1 : num * factorial(num - 1);
}

var sumNumbers = function (root) {
    function traverse(node, num) {
        if (!node) {
            return null;
        }

        num += node.val;

        if (!node.left && !node.right) {
            return +num;
        }

        return traverse(node.left, num) + traverse(node.right, num);
    }

    return traverse(root, '');
};

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
        let squaredVal = i * i;
        for (let j = squaredVal; j < dp.length; j++) {
            dp[j] = Math.min(dp[j], 1 + dp[j - squaredVal])
        }
    }

    return dp[n]
};

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
    const map = {};
    const res = [];
    for (let i = 0; i < tickets.length; i++) {
        const dep = tickets[i][0];
        const des = tickets[i][1];
        if (map[dep]) {
            map[dep].push(des);
        } else {
            map[dep] = [des];
        }
    }
    for (let loc in map) {
        map[loc].sort();
    }
    var dfs = function (node) {
        const des = map[node];
        while (des && des.length > 0) {
            dfs(des.shift());
        }
        res.push(node);
    };
    dfs('JFK');
    return res.reverse();
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    // C(m + n - 2)(n - 1)
    const total = m + n - 2;
    const k = n - 1;
    if (k === 0) {
        return 1;
    }
    let top = 1;
    let bottom = 1;
    for (let i = 0; i < k; i++) {
        top *= total - i;
        bottom *= i + 1;
    }
    return top / bottom;
};

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
    let res = [];

    function buildTrie() {
        const root = {};
        for (let w of words) {
            let node = root;
            for (let c of w) {
                if (node[c] == null) node[c] = {};
                node = node[c];
            }
            node.word = w;
        }
        return root;
    }

    function search(node, i, j) {
        if (node.word != null) {
            res.push(node.word);
            node.word = null;   // make sure only print one time for each word
        }

        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
            return;
        }
        if (node[board[i][j]] == null) {
            return;
        }

        const c = board[i][j];
        board[i][j] = '#';  // mark visited
        search(node[c], i + 1, j);
        search(node[c], i - 1, j);
        search(node[c], i, j + 1);
        search(node[c], i, j - 1);
        board[i][j] = c;  // reset
    }

    const root = buildTrie();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            search(root, i, j);
        }
    }
    return res;
}

/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
    let cnt = 0;
    let m = 0;

    while (n >= 0) {
        cnt++;
        m += 1;
        n -= m;
    }

    return cnt - 1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    return [nums.indexOf(target), nums.lastIndexOf(target)];
};

/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
var prisonAfterNDays = function (cells, N) {
    N = (N % 14) ? N % 14 : 14;

    for (let i = 0; i < N; i++) {
        const copy = [...cells];

        for (let j = 0; j < copy.length; j++) {
            cells[j] = equals(copy, j) ? 1 : 0;
        }
    }

    function equals(data, index) {
        return data[index - 1] === data[index + 1] && data[index - 1] !== undefined;
    }

    return cells;
};

/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    let p2 = 0;
    let p3 = 0;
    let p5 = 0;

    const k = [];
    k[0] = 1;

    for (let i = 1; i < n; i++) {
        k[i] = Math.min(k[p2] * 2, Math.min(k[p3] * 3, k[p5] * 5));
        if (k[i] === k[p2] * 2) {
            p2++;
        }
        if (k[i] === k[p3] * 3) {
            p3++;
        }
        if (k[i] === k[p5] * 5) {
            p5++;
        }
    }
    return k[n - 1];
};

/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */
var createTargetArray = function (nums, index) {
    const target = [];
    for (let i = 0; i < index.length; i++) {
        target.splice(index[i], 0, nums[i]);
    }

    return target;
};

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i]++;
            return digits;
        } else {
            digits[i] = 0;
        }
    }
    digits.unshift(1);
    return digits;
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
var sumOfLeftLeaves = function (root) {
    // collect all left leaves
    let leaves = [];
    if (root) dfs(root, leaves);
    // sum the leaves
    return leaves.reduce((sum, val) => sum + val, 0);
};

function dfs(node, leaves) {
    if (node.left) dfs(node.left, leaves);
    if (node.right) dfs(node.right, leaves);
    // it's a left leave if it doesn't have child nodes
    if (node.left && !node.left.left && !node.left.right) leaves.push(node.left.val);
}

/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
var daysBetweenDates = function (date1, date2) {
    return Math.abs(new Date(date2) - new Date(date1)) / (24 * 60 * 60 * 1000);
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
var widthOfBinaryTree = function (root) {
    const minPos = [0];
    let maxWidth = 0;

    callDFS(root, 0, 0);
    return maxWidth;

    function callDFS(node, level, pos) {
        if (!node) return;
        if (minPos[level] === undefined) minPos.push(pos);

        const diff = pos - minPos[level];
        maxWidth = Math.max(maxWidth, diff + 1);

        callDFS(node.left, level + 1, diff * 2);
        callDFS(node.right, level + 1, diff * 2 + 1);
    }
};

/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
    if (!head) return head;

    function traverse(node) {
        if (!node.next && !node.child) return node;

        if (node.child) {
            const nextNode = node.next;
            node.next = node.child;
            node.next.prev = node;
            node.child = null;

            if (nextNode) {
                const tailNode = traverse(node.next);
                tailNode.next = nextNode;
                nextNode.prev = tailNode;
            }
        }
        return traverse(node.next);
    }

    traverse(head);
    return head;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    const arr = s.trim().split(' ');
    return arr[arr.length - 1].length || 0;
};

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
    return Number.parseInt(n.toString(2).split("").reverse().join("").padEnd(32, "0"), 2);
};

/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function (houses, heaters) {
    heaters.sort((a, b) => a - b);
    return Math.max(...houses.map(h => findMinDistance(h, heaters)));
};

const findMinDistance = (house, heaters) => {
    let left = 0;
    let right = heaters.length - 1;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        if (heaters[mid] <= house && house <= heaters[mid + 1]) {
            return Math.min(house - heaters[mid], heaters[mid + 1] - house);
        } else if (heaters[mid] <= house) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    if (left === 0) return heaters[0] - house;
    if (left === heaters.length) return house - heaters[heaters.length - 1];
};

/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
var angleClock = function (hour, minutes) {
    const hourAngle = (hour + (minutes / 60)) * 30;
    const minuteAngle = minutes * 6;
    const diff = Math.abs(minuteAngle - hourAngle);

    return diff > 180 ? 360 - diff : diff;
};

/**
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function (A) {
    if (A.length <= 2) {
        return false;
    }
    let direction = 1; // 1 for up and 0 for down;
    let previous = A[0];

    for (let i = 1; i < A.length; ++i) {
        let current = A[i];

        if (current > previous) {
            if (direction !== 1) {
                return false;
            }
            previous = current;
        } else if (current < previous) {
            if (i === 1) {
                return false;
            }
            direction = 0;
            previous = current;
        } else {
            return false;
        }
    }

    return direction === 0;
};

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    return (n === 1) ? x : (x * myPow(x, n - 1));
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
    let cnt = 0;

    for (let i = nums.length; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] === nums[j]) {
                cnt++;
            }
        }
    }

    return cnt;
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    const reqToCourse = {}, degreeMap = {}, res = [], queue = [];

    for (const pair of prerequisites) reqToCourse[pair[1]] ? reqToCourse[pair[1]].push(pair[0]) : reqToCourse[pair[1]] = [pair[0]];
    for (let i = 0; i < numCourses; i++) {
        degreeMap[i] = 0;
    }
    for (const req in reqToCourse) {
        for (const course of reqToCourse[req]) {
            degreeMap[course]++;
        }
    }
    for (const course in degreeMap) {
        if (degreeMap[course] === 0) {
            queue.push(course);
        }
    }

    while (queue.length) {
        const course = queue.shift();
        res.push(course);
        if (reqToCourse[course]) {
            for (const course2 of reqToCourse[course]) {
                degreeMap[course2]--;
                if (degreeMap[course2] === 0) {
                    queue.push(course2);
                }
            }
        }
    }

    return res.length === Object.keys(degreeMap).length ? res : []
};

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};

/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
    let count = 0;
    let i = 0;

    while (i < points.length - 1) {
        // destructure point1, point2
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];

        // find the distance; then return the maximum distance between the two
        count += Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));

        i++;
    }

    return count;
};

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    let result = false;
    var check = function (r, c, i) {
        if (!result) {
            if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) return; // out of boundary
            if (board[r][c] !== word[i]) return; // wrong character
            if (i === word.length - 1) { // got to the end means we found a correct path
                result = true;
                return;
            }
            board[r][c] = null; // mark our path so we dont go back and forth
            // try all directions
            check(r + 1, c, i + 1);
            check(r - 1, c, i + 1);
            check(r, c + 1, i + 1);
            check(r, c - 1, i + 1);
            board[r][c] = word[i] // reset our board , very important
        }
    };

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === word[0]) {
                check(i, j, 0);
                if (result) return result;
            }
        }
    }

    return result;
};

var maxDepth = function (root) {
    if (!root) return 0;
    let max = 0;
    for (let child of root.children) {
        max = Math.max(max, maxDepth(child));
    }
    return max + 1;
}

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
    const N = graph.length, result = [];

    function callDFS(node, arr) {
        if (node === N - 1) {
            result.push([...arr, node]);
            return;
        }

        for (let next of graph[node]) {
            callDFS(next, [...arr, node]);
        }
    }

    callDFS(0, []);
    return result;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    let low = 0;
    let high = nums.length - 1;

    if (nums.length == 1) {
        return nums[0];
    }

    if (nums[high] > nums[0]) {
        return nums[0];
    }

    while (high >= low) {
        let mid = Math.floor((high + low) / 2);

        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }

        if (nums[mid - 1] > nums[mid]) {
            return nums[mid];
        }

        if (nums[mid] > nums[0]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
};

/**
 * @param {number[]} nums
 * @return {number}
 * Follow up with duplicates
 */
var findMin2 = function (nums) {
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        const mid = Math.floor((start + end) / 2);

        if (nums[mid] < nums[end]) {
            end = mid
        } else if (nums[mid] > nums[end]) {
            start = mid + 1
        } else {
            end -= 1;
        }
    }
    return nums[start]
};

function task(m) {
    for (let i = 0; i <= 1000; i++) {
        if (i % m === 0 && helper2(i) === m) {
            return i;
        }
    }
    return -1;
}

function helper(num) {
    return num.toString().split('').map(it => Number(it)).reduce((total, item) => {
        return total + item;
    }, 0)
}

function helper2(num) {
    let sum = 0;
    while (num > 0) {
        sum += (num % 10);
        num = Math.floor(num / 10);
    }

    return sum;
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
    function callDFS(arr) {
        if (!arr.length) return null;
        const val = postorder.pop();
        const index = arr.indexOf(val);
        const node = new TreeNode(val);
        node.right = callDFS(arr.slice(index + 1));
        node.left = callDFS(arr.slice(0, index));
        return node;
    }

    return callDFS(inorder);
};

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
    const tasksMap = Array(26).fill(0);
    for (const task of tasks) {
        tasksMap[task.charCodeAt(0) - 65] += 1;
    }

    // sort in reverse order
    tasksMap.sort((a, b) => b - a);

    const maxVal = tasksMap[0] - 1;
    let idleSlots = maxVal * n;

    for (let i = 1; i < 26; i++) {
        if (tasksMap[i] === 0) {
            break;
        }

        idleSlots -= Math.min(tasksMap[i], maxVal);
    }

    return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length <= 1) {
        return 0;
    }
    const calProfit = (prev, price) => {
        const hold = Math.max(prev.hold, prev.rest - price);
        const sold = prev.hold + price;
        const rest = Math.max(prev.rest, prev.sold);
        return {hold, sold, rest};
    };
    const profits = prices.reduce(calProfit, {hold: -Infinity, sold: 0, rest: 0});
    return Math.max(profits.sold, profits.rest);
};

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
    const data = [];
    const result = [];

    function dfs(start) {
        if (start === s.length) {
            data.push([...result].join(" "));
            return;
        }

        for (let j = 0; j < wordDict.length; j++) {
            const wordIndex = s.indexOf(wordDict[j], start);

            if (wordIndex === start) {
                result.push(wordDict[j]);
                dfs(wordIndex + wordDict[j].length);
                result.pop();
            }
        }
    }

    dfs(0);
    return data;
};

var wordBreakMemo = function (s, wordDict) {

    const dictSet = new Set(wordDict);
    const memo = {};

    function dfs(start) {

        if (start > s.length - 1) {
            return [[]];
        }

        if (memo[start] !== undefined) {
            return memo[start];
        }

        const out = [];

        for (let i = start; i < s.length; i++) {
            const substr = s.substring(start, i + 1);
            if (dictSet.has(substr)) {
                let next = dfs(i + 1);
                for (let n of next) {
                    out.push([substr, ...n]);
                }
            }
        }
        return memo[start] = out;

    }

    const res = dfs(0);

    return res.filter(a => a.join('') === s).map(a => a.join(' '));
};

const memo = new Map();
for (let n = 0; n < 4; n++) {
    memo.set(n, n);
}

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    if (memo.has(n)) {
        return memo.get(n);
    }
    memo.set(n, climbStairs(n - 2) + climbStairs(n - 1));
    return memo.get(n);
};

/**
 * Initialize your data structure here.
 */
var WordDictionary = function () {
    this.root = {};
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
    const node = this.root[word.length] = this.root[word.length] || [];
    node.push(word)
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
    let wordArr = this.root[word.length] || false;

    if (!wordArr) {
        return false
    }

    // Go over all added workds that have n characters
    // Filter out words where every letter doesn't match with search or "."
    // Returns an array with all the matching words
    return wordArr.filter(currentWord => {
        return currentWord.split("").every((letter, idx) => (letter === word[idx] || word[idx] === "."))
    }).length > 0
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
    const map = {};
    const dfs = (node, x = 0, y = 0) => {
        if (!node) return;
        if (map[x] === undefined) {
            map[x] = {}
        }
        if (map[x][y] === undefined) {
            map[x][y] = []
        }
        map[x][y].push(node.val);
        dfs(node.left, x - 1, y + 1);
        dfs(node.right, x + 1, y + 1);
    };
    dfs(root);
    const result = [];
    const x = Object.keys(map).sort((a, b) => a - b);
    for (const i of x) {
        const column = [];
        const y = Object.keys(map[i]).sort((a, b) => a - b);
        for (const j of y) {
            column.push(...map[i][j].sort((a, b) => a - b))
        }
        result.push(column)
    }
    return result
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
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
    if (!root) return 0;
    return (
        pathSumOnlyStart(root, sum) +
        pathSum(root.left, sum) +
        pathSum(root.right, sum)
    );
};

const pathSumOnlyStart = (root, sum) => {
    if (!root) return 0;
    const self = root.val === sum ? 1 : 0;
    return (
        self +
        pathSumOnlyStart(root.left, sum - root.val) +
        pathSumOnlyStart(root.right, sum - root.val)
    );
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    return rotting(grid);
};

function rotting(grid, prevRemainsCounter = 0, minutes = 0) {
    let remainsCounter = 0;
    const nextGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 2) {
                if (i > 0) {
                    nextGrid[i - 1][j] = grid[i - 1][j] !== 0 ? 2 : 0;
                }
                if (i < grid.length - 1) {
                    nextGrid[i + 1][j] = grid[i + 1][j] !== 0 ? 2 : 0;
                }
                if (j > 0) {
                    nextGrid[i][j - 1] = grid[i][j - 1] !== 0 ? 2 : 0;
                }
                if (j < grid[i].length - 1) {
                    nextGrid[i][j + 1] = grid[i][j + 1] !== 0 ? 2 : 0;
                }
            }
            if (grid[i][j] === 1) {
                remainsCounter++;
            }
        }
    }
    const someCanNotReach = remainsCounter === prevRemainsCounter;
    if (someCanNotReach) {
        if (remainsCounter === 0) {
            return 0;
        }
        return -1;
    }
    const keepContinue = remainsCounter > 0;
    if (keepContinue) {
        return rotting(nextGrid, remainsCounter, minutes + 1);
    }
    return minutes;
}

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let cost1 = Infinity;
    let cost2 = Infinity;

    return prices.reduce(
        ([profit1, profit2], price) => {
            cost1 = Math.min(cost1, price);
            profit1 = Math.max(profit1, price - cost1);

            cost2 = Math.min(cost2, price - profit1);
            profit2 = Math.max(profit2, price - cost2);

            return [profit1, profit2]
        },
        [0, 0]
    )[1];
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    // 1. find the middle node
    function findMiddle(fast, slow) {
        if (!fast || !fast.next) return slow;
        return findMiddle(fast.next.next, slow.next);
    }

    // 2. reverse the second half
    function reverseList(node, prev) {
        if (!node) return prev;
        const temp = node.next;
        node.next = prev;
        return reverseList(temp, node);
    }

    // 3. merge first and second half
    function reorder(l1, l2) {
        if (!l1 || !l2 || !l2.next) return l1;
        const temp = l1.next;
        l1.next = l2;
        l2.next = reorder(temp, l2.next);
        return l1;
    }

    let mid = findMiddle(head, head);
    mid = reverseList(mid, null);
    return reorder(head, mid);
};

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParity = function (A) {
    return A.reduce((total, item) => {
        if (item % 2) {
            total[1].push(item);
        } else {
            total[0].push(item);
        }

        return total;
    }, [[], []]).flat();

};

/**
 /**
 * @param {number[][]} rects
 */
var Solution = function (rects) {
    this.rects = rects;
    this.map = {};
    this.sum = 0;
    // we put in the map the number of points that belong to each rect
    for (let i in rects) {
        const rect = rects[i];
        // the number of points can be picked in this rectangle
        this.sum += (rect[2] - rect[0] + 1) * (rect[3] - rect[1] + 1);
        this.map[this.sum] = i;
    }
    this.keys = Object.keys(this.map);
};

/**
 * @return {number[]}
 */
Solution.prototype.pick = function () {
    // random point pick between [1, this.sum]
    const randomPointPick = Math.floor(Math.random() * this.sum) + 1;

    // we look for the randomPointPick in the keys of the map
    let pointInMap;
    // the keys exists in map
    if (this.map[randomPointPick]) pointInMap = randomPointPick;
    // the key is the first in the map (we do this check before doing binary search because its out of boundery)
    else if (randomPointPick < this.keys[0]) pointInMap = this.keys[0];
    let high = this.keys.length;
    let low = 1;
    // binary search to find the closest key that bigger than randomPointPick
    while (low <= high && !pointInMap) {
        const mid = Math.floor((low + (high - low) / 2));
        if (randomPointPick > this.keys[mid - 1] && randomPointPick < this.keys[mid]) {
            pointInMap = this.keys[mid];
            break;
        } else if (randomPointPick > this.keys[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    // we have the point, now we can get which rect belong to that point
    const pointInRects = this.map[pointInMap];
    const chosen = this.rects[pointInRects];
    const rightX = chosen[2];
    const leftX = chosen[0];
    const topY = chosen[3];
    const bottomY = chosen[1];
    const pickX = Math.floor(Math.random() * (rightX - leftX + 1)) + leftX;
    const pickY = Math.floor(Math.random() * (topY - bottomY + 1)) + bottomY;
    return [pickX, pickY]
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(rects)
 * var param_1 = obj.pick()
 */

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
const hasPath = (maze, start, destination) => {
    maze[start[0]][start[1]] = 2;
    return dfs(maze, start, destination);
};

// 0-up 1-down 2-left 3-right
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

var dfs = (maze, start, destination) => {
    const [origRow, origCol] = start;

    for (const dir of dirs) {
        let row = origRow;
        let col = origCol;

        // throw a ball, see if we hit a wall
        while (
            row + dir[0] >= 0
            && row + dir[0] < maze.length
            && col + dir[1] >= 0
            && col + dir[1] < maze[0].length
            && maze[row + dir[0]][col + dir[1]] !== 1
            ) {
            row += dir[0];
            col += dir[1];
            if (maze[row][col] === 2) break; // I hit a visited path
        }
        // couldn't move, try next
        if (
            row === origRow && col === origCol
            || maze[row][col] === 2
        ) continue;

        maze[row][col] = 2; // visited

        if (row === destination[0] && col === destination[1]) return true;

        const possible = dfs(maze, [row, col], destination);
        if (possible) return true;
    }

    // none of my attempts found target
    return false;
};

/**
 * @param {string[]} words
 */
var StreamChecker = function (words) {
    this.root = {};
    for (let w of words) {
        w = w.split('').reverse().join('');
        let node = this.root;
        for (let c of w) {
            if (!node[c]) node[c] = {};
            node = node[c];
        }
        node.word = w;
    }
    this.letters = [];
};

/**
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
    this.letters.push(letter);
    let lookingIn = this.root;
    for (let i = this.letters.length - 1; i >= 0; i--) {
        if (lookingIn[this.letters[i]]) {
            lookingIn = lookingIn[this.letters[i]];
            if (lookingIn.word) return true;
        } else {
            return false;
        }
    }
    return false
};

/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */

function partial(func, ...argsBound) {
    return function (...args) { // (*)
        return func.call(this, ...argsBound, ...args);
    }
}

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
    const lastDay = days[days.length - 1];
    const set = new Set(days);

    const dp = new Array(lastDay + 1).fill(0);

    for (let i = 1; i <= lastDay; i++) {
        if (!set.has(i)) dp[i] = dp[i - 1];
        else dp[i] = Math.min(
            dp[i - 1] + costs[0],
            dp[Math.max(0, i - 7)] + costs[1],
            dp[Math.max(0, i - 30)] + costs[2]
        );
    }

    return dp[lastDay];
};

function PromiseAll(promises) {
    const data = [];
    promises.forEach((item, index, arr) => {
        item((resolve) => {
            resolve()
        })
    });

    if (data.length === promises.length) {
        return data;
    }
}

function all(promises) {
    return new Promise(function (resolve, reject) {
        let count = promises.length;
        const result = [];
        const checkDone = function () {
            if (--count === 0) resolve(result)
        };
        promises.forEach(function (p, i) {
            p.then(function (x) {
                result[i] = x
            }, reject).then(checkDone)
        })
    })
}

Promise.prototype.finally = function (fn) {
    const onFinally = callback => Promise.resolve(fn()).then(callback);
    return this.then(
        result => onFinally(() => result),
        reason => onFinally(() => Promise.reject(reason))
    );
};

Promise.prototype.finally = function (cb) {
    const res = () => this;
    const fin = () => Promise.resolve(cb()).then(res);
    return this.then(fin, fin);
};

Promise.prototype.myAllSettled = function (arr = []) {
    return new Promise(function processIterable(resolve, reject) {
        let result = [];
        arr.forEach((item) => {
            item
                .then((value) => {
                    result.push({status: "fulfilled", value: value});
                    if (arr.length === result.length) resolve(result);
                })
                .catch((err) => {
                    result.push({status: "rejected", reason: `${err}`});
                    if (arr.length === result.length) resolve(result);
                });
        });
    });
};

/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function () {
    return (rand7() + rand7() + rand7() + rand7() + rand7()) % 10 + 1;
};

async function fetchUrlAsync(url) {
    for (let n = 0; n < 5; n++) {
        try {
            return await fetch(url)
        } catch (err) {
        }
    }
    throw new Error('Fetch failed after 5 attempts')
}

function fetchUrl(url, attempt = 5) {
    return Promise.resolve()
        .then(() => fetch(url))
        .catch(() => attempt-- ? fetchUrl(url, attempt) : Promise.reject('Fetch failed after 5 attempts'))
}

function canOrderN(N) {
    const arr = new Array(N + 21).fill(false);

    arr[6] = true;
    arr[9] = true;
    arr[20] = true;

    for (let i = 1; i <= N; i++) {
        if (arr[i]) {
            arr[i + 6] = true;
            arr[i + 9] = true;
            arr[i + 20] = true;
        }
    }

    return arr[N];
}

/**
 * @param {Robot} robot
 * @return {void}
 */
var cleanRoom = function (robot) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]], visited = new Set();

    /**
     * @return {void}
     */
    function goBack() {
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
    }

    /**
     * @param {number[]} cell
     * @param {numver} prev
     * @return {void}
     */
    function backtrack(cell, prev) {
        visited.add(cell.join());
        robot.clean();
        for (let d = 0; d < 4; d++) {
            const next = (prev + d) % 4;
            const nextCell = [cell[0] + directions[next][0], cell[1] + directions[next][1]];
            if (!visited.has(nextCell.join()) && robot.move()) {
                backtrack(nextCell, next);
                goBack();
            }
            robot.turnRight();
        }
    }

    backtrack([0, 0], 0);
};

/**
 * @param {number[]} A
 * @return {number[]}
 */
var pancakeSort = function (A) {
    const results = [];

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length - 1; j++) {
            if (A[j + 1] > A[j]) {
                const temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
                results.push(j + 1);
            }
        }
    }

    return results;
};

/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function (salary) {
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;

    for (let i = 0; i < salary.length; i++) {
        if (salary[i] > max) {
            max = salary[i];
        }

        if (salary[i] < min) {
            min = salary[i];
        }

        sum += salary[i];
    }

    return (sum - min - max) / (salary.length - 2)
};
