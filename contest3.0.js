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
    const dfs = (image, row, col, newColor, origColor) => {
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
