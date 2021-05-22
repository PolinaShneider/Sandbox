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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let temp = new ListNode(0);
    temp.next = head;
    let slow = temp,
        fast = temp;

    while (fast.next !== null) {
        fast = fast.next
        if (n-- <= 0) {
            slow = slow.next;
        }
    }
    slow.next = slow.next.next;
    return temp.next;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target, counter = 0, map = {}) {
    if (counter === nums.length) {
        return 0;
    }

    if (map[target] >= 0)
        return map[target];

    if (target === 0) {
        return 1;
    } else if (target < 0) {
        return 0;
    }

    let output = 0;
    let tCounter = 0;
    while (tCounter < nums.length) {
        output += combinationSum4(nums, target - nums[tCounter], tCounter, map);
        tCounter++;
    }
    map[target] = output;
    return output;
};

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
    if (!root) return []
    var stack = [root];
    var result = [];
    while (stack.length) {
        var node = stack.pop();
        result.push(node.val);
        while (node.children.length) {
            stack.push(node.children.pop());
        }
    }
    return result;
};

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    for (let i = triangle.length - 2; ~i; i--) {
        for (let j = 0; j < triangle.length; j++) {
            triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
        }
    }
    return triangle[0][0];
};

/**
 * @param {number[]} arr
 * @return {number}
 */
var missingNumber = function (arr) {
    let left = 0;
    let right = arr.length - 1;
    let mid;
    let diff = (arr[right] - arr[left]) / arr.length;
    while (left < right) {
        mid = Math.floor((right + left) / 2);
        if (arr[mid] == (arr[0] + mid * diff)) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return arr[0] + diff * left;
};

/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
    let prevRunLength = 0;
    let currRunLength = 1;
    let res = 0;

    for (let i = 1; i < s.length; i += 1) {
        if (s[i - 1] === s[i]) {
            currRunLength += 1;
        } else {
            prevRunLength = currRunLength;
            currRunLength = 1;
        }
        // must be a substring if length of prev 0s or 1s >= curr 0s or 1s
        if (prevRunLength >= currRunLength) {
            res += 1;
        }
    }

    return res;
};

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function (n, connections) {
    let graph = Array.from(Array(n), () => []); //Graph that will store edges of each node
    let results = [];
    let levels = []; //Holds the min level of a node reachable in a cycle
    for (let pair of connections) { //Convert connection tuples to a graph with edges
        graph[pair[0]].push(pair[1]);
        graph[pair[1]].push(pair[0]);
    }
    let dfs = (parent, curr, level) => {
        levels[curr] = level + 1;
        let currLevel = levels[curr];
        for (let next of graph[curr]) {
            if (next === parent) continue;
            if (!levels[next]) dfs(curr, next, level + 1); //Acts as a "visited" array
            levels[curr] = Math.min(levels[curr], levels[next]); //Update current node to the min value reachable
            if (currLevel < levels[next]) { //Not able to reach a node with lesser cycle value a.k.a no cycle
                results.push([curr, next]); //Critical connection
            }
        }
    };
    dfs(-1, 0, 0);
    return results;
};

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    // Firstly Transpose The Matrix
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            var Temp = matrix[j][i]
            matrix[j][i] = matrix[i][j]
            matrix[i][j] = Temp
        }
    }
    // Secondly Make Reflected Image Of Matrix
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length / 2; j++) {
            var Temp = matrix[i][j]
            matrix[i][j] = matrix[i][matrix.length - j - 1]
            matrix[i][matrix.length - j - 1] = Temp
        }
    }
};

/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function (heights, bricks, ladders) {
    if (ladders >= heights.length - 1)
        return heights.length - 1;

    const dp = new Array(heights.length).fill(-Infinity);
    dp[0] = bricks;

    let res = 0, diff;
    for (let i = 0; i <= ladders; i++) {
        let pre = dp[0];

        for (let j = 1; j < heights.length; j++) {
            if (heights[j] <= heights[j - 1]) {
                [pre, dp[j]] = [dp[j], dp[j - 1]];
            } else {
                diff = heights[j] - heights[j - 1];
                let temp = dp[j];

                if (i === 0)
                    dp[j] = dp[j - 1] - diff;
                else
                    dp[j] = Math.max(dp[j - 1] - diff, pre);

                if (dp[j] < 0)
                    break;

                pre = temp;

            }
            res = Math.max(j, res);
        }

        // Corner case: if we have enough remaining ladders to achieve the end of buildings, return the last index
        if (res + (ladders - i) >= heights.length - 1)
            return heights.length - 1;
    }


    return res;
};

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    const max_row = obstacleGrid.length;
    const max_col = obstacleGrid[0].length;
    const memo = new Array(max_row).fill().map(() => new Array(max_col));

    const backtrack = (row, col) => {
        // Base Case: When row/col is out of bounds or when an obstacle is met
        if (row < 0 || col < 0 || row >= max_row || col >= max_col || obstacleGrid[row][col] === 1) {
            return 0;
        }

        // If we have a record saved in memo, return that to prevent duplicate recursive calls
        if (memo[row][col] != undefined) return memo[row][col];

        // If we reached the goal
        if (row === max_row - 1 && col === max_col - 1) return 1;

        // Memoize the sum of moving down or right 1 space
        memo[row][col] = backtrack(row + 1, col) + backtrack(row, col + 1);

        return memo[row][col];
    }

    return backtrack(0, 0);
};

/**
 * @param {number[][]} slots1
 * @param {number[][]} slots2
 * @param {number} duration
 * @return {number[]}
 */
var minAvailableDuration = function (slots1, slots2, duration) {

    slots1.sort((a, b) => a[0] - b[0])
    slots2.sort((a, b) => a[0] - b[0])

    let s1 = 0, s2 = 0;

    while (s1 < slots1.length && s2 < slots2.length) {
        const [b1, e1] = slots1[s1]
        const [b2, e2] = slots2[s2]

        const start = Math.max(b1, b2)
        const end = Math.min(e1, e2);

        if (end - start >= duration) return [start, start + duration]

        if (e1 < e2) s1++;
        else s2++;
    }
    return []
};

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

/**
 * @param {string[]} words
 */
var WordFilter = function (words) {
    this.dictionary = new Map();

    words.forEach((word, indexWord) => {
        let prefixString = '';
        for (let prefix = 0; prefix < word.length; prefix++) {
            prefixString += word[prefix];

            for (let suffix = 0; suffix < word.length; suffix++) {
                this.dictionary.set(`${prefixString}-${word.substr(suffix, word.length)}`, indexWord);
            }
        }
    });


};

/**
 * @param {string} prefix
 * @param {string} suffix
 * @return {number}
 */
WordFilter.prototype.f = function (prefix, suffix) {
    const key = `${prefix}-${suffix}`;

    return this.dictionary.has(key) ? this.dictionary.get(key) : -1;
};

/**
 * @param {number[][]} courses
 * @return {number}
 */
var scheduleCourse = function (courses) {
    if (!courses.length) return 0
    // think it backwards, course with the last end date shall be taken last
    // so we sort with bigger d first
    courses.sort(([t1, d1], [t2, d2]) => d2 - d1)
    // keep note of date and course count, index=count,value = empty before day
    let arr = new Array(courses.length + 1).fill(-1)
    arr[0] = Number.MAX_SAFE_INTEGER, maxCount = 0
    // loop course
    for (let [t, d] of courses) {
        // we update from [maxCount+1] first based on maxCount, then smaller counts
        for (let i = maxCount + 1; i > 0; i--) {
            // if smaller count has enough left days for this course, then arrange it
            arr[i] = Math.max(arr[i], Math.min(arr[i - 1], d) - t)
            // if we can arrange this course, then we got a new max count
            if (arr[i] > -1 && i > maxCount) maxCount = i
        }
    }
    return maxCount
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
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function (nums) {
    let count = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) {
            if (nums[i] < nums[i - 2]) {
                nums[i] = nums[i - 1];
            }
            count++;
        }
        if (count > 1) {
            return false;
        }
    }
    return true;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    let arr = Array.from({length: nums.length}).fill(0)
    let goal = nums.length - 1

    for (let i = 0; i < nums.length; i++) {

        let maxIndex = Math.min(goal, i + nums[i])
        for (let j = maxIndex; j > i; j--) {
            if (!arr[j]) {
                arr[j] = arr[i] + 1
            } else {
                break
            }
        }

        if (arr[goal]) break
    }

    return arr.pop()
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {

    if (head === null) {
        return null;
    }

    const list = [];
    while (head !== null) {
        list.push(head.val);
        head = head.next;
    }

    return findHead(0, list.length - 1);

    function findHead(start, end) {

        if (start > end) {
            return null;
        }
        const middle = Math.ceil((start + end) / 2);

        const left = findHead(start, middle - 1);
        const right = findHead(middle + 1, end);

        return new TreeNode(list[middle], left, right);
    }
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const n1 = word1.length, n2 = word2.length;
    let f = new Array(n1 + 1).fill(0).map(x => Array(n2 + 1).fill(5000))

    for (let i = 0; i < n1 + 1; i++) {
        f[i][0] = i;
    }
    for (let i = 0; i < n2 + 1; i++) {
        f[0][i] = i
    }
    // console.log(f)

    for (let i = 1; i < n1 + 1; i++) {
        for (let j = 1; j < n2 + 1; j++) {
            f[i][j] = Math.min(f[i - 1][j], f[i][j - 1]) + 1
            if (word1[i - 1] === word2[j - 1]) {
                f[i][j] = Math.min(f[i][j], f[i - 1][j - 1])
            }
        }
    }

    // console.log(f)
    return f[n1][n2]
};

/**
 * @param {string} left
 * @param {string} right
 * @return {number}
 */
var superpalindromesInRange = function (left, right) {
    let ans = 9 >= left && 9 <= right ? 1 : 0

    const isPal = str => {
        for (let i = 0, j = str.length - 1; i < j; i++, j--)
            if (str.charAt(i) !== str.charAt(j)) return false
        return true
    }

    for (let i = 1; i < 19684; i++) {
        let num = i.toString(3)
        if (isPal(num)) {
            let square = BigInt(num) * BigInt(num)
            if (square > right) return ans
            if (square >= left && isPal(square.toString())) ans++
        }
    }
    return ans
};

/**
 * @param {number[]} target
 * @return {boolean}
 */
var isPossible = function (T) {
    if (T.length === 1 && T[0] !== 1) return false
    let sum = T.reduce((a, b) => a + b)
    T.sort((a, b) => b - a)

    while (sum !== T.length) {
        let m = T[0] - (sum - T[0]) * (Math.trunc(T[0] / (sum - T[0]) - 1) || 1);
        [sum, T[0]] = [sum - T[0] + m, m]
        if (T[0] < 1) return false
        for (let i = 0; T[i] < T[i + 1]; i++) [T[i], T[i + 1]] = [T[i + 1], T[i]]
    }

    return true
};

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    if (n < 2) return 0;

    const sieve = new Array(n + 1).fill(true);

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= n; j += i) {
                sieve[j] = false;
            }
        }
    }

    let count = 0;

    for (let i = 2; i < n; i++) {
        if (sieve[i] == true) count++;
    }

    return count;
};

/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
    let windowSize = cardPoints.length - k, arrSum = 0, minWindowSum = Number.MAX_SAFE_INTEGER, windowSum = 0;
    for (let i = 0; i < cardPoints.length; i++) {
        arrSum += cardPoints[i];
        if (i <= windowSize - 1) {//If the window size is less then or equal to the expected size, then just keep adding the new element to the window
            windowSum += cardPoints[i];
        } else {//If window size is full then add the latest element and remove the oldest element from the window
            windowSum += cardPoints[i];
            windowSum -= cardPoints[i - windowSize];
        }
        if (i >= windowSize - 1) {//If the window size is equal to the expected size then check if this window is having the minimun sum
            minWindowSum = Math.min(minWindowSum, windowSum);
        }
    }
    return arrSum - minWindowSum;
};

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function (matrix) {
    let n = matrix.length
    if (n == 0) return
    let m = matrix[0].length

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let sum = 0
            if (i > 0) sum += matrix[i - 1][j]
            if (j > 0) sum += matrix[i][j - 1]
            if (i > 0 && j > 0) sum -= matrix[i - 1][j - 1]
            matrix[i][j] += sum
        }
    }
    this.matrix = matrix
};

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
    let matrix = this.matrix
    let res = matrix[row2][col2]

    if (row1 > 0) res -= matrix[row1 - 1][col2]
    if (col1 > 0) res -= matrix[row2][col1 - 1]
    if (row1 > 0 && col1 > 0) res += matrix[row1 - 1][col1 - 1]

    return res
};

/**
 * @param {string} s
 * @return {string[]}
 */
const ambiguousCoordinates = function (s) {

    const ans = [];

    // outer for loop to create all combinations of numbers on left and right side
    for (let i = 2; i < s.length - 1; i++) {
        let lft = s.slice(1, i);
        let rght = s.slice(i, s.length - 1);

        //  add combinations with no decimals
        const ls = [lft];
        const rs = [rght];

        // inner for loop to find all combinations of left side with a decimal
        for (let i = 1; i < lft.length; i++) {
            temp1 = lft.slice(0, i);
            temp2 = lft.slice(i);
            ls.push(`${temp1}.${temp2}`);
        }

        // inner for loop to find all combinations of right side with a decimal
        for (let i = 1; i < rght.length; i++) {
            temp1 = rght.slice(0, i);
            temp2 = rght.slice(i, rght.length);
            rs.push(`${temp1}.${temp2}`);
        }

        // push in all valid answers that pass the regex
        for (let l of ls) {
            if (!/^([1-9]\d*|0\.\d*[1-9]|[1-9]\d*\.\d*[1-9]|0)$/i.test(l)) continue;
            for (let r of rs) {
                if (!/^([1-9]\d*|0\.\d*[1-9]|[1-9]\d*\.\d*[1-9]|0)$/i.test(r)) continue;
                ans.push(`(${l}, ${r})`);
            }
        }
    }
    return ans;
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    function binaryPreOrderTraversal(root) {
        // pre-order
        let values = [root.val];

        if (root.left) {
            values = values.concat(binaryPreOrderTraversal(root.left));
        }
        if (root.right) {
            values = values.concat(binaryPreOrderTraversal(root.right));
        }

        return values;
    }

    if (!root) {
        return [];
    }


    const data = binaryPreOrderTraversal(root).slice(1);
    let prev = root;
    for (let elem of data) {
        let node = new TreeNode(elem);
        prev.left = null;
        prev.right = node;
        prev = node;
    }
};

const stat1 = [{
    startDate: '9:00',
    endDate: '10:20',
    present: true
}, {
    startDate: '10:20',
    endDate: '10:30',
    present: false
}, {
    startDate: '10:30',
    endDate: '11:45',
    present: true
}, {
    startDate: '11:45',
    endDate: '13:15',
    present: false
}, {
    startDate: '13:15',
    endDate: '14:00',
    present: true
}, {
    startDate: '14:00',
    endDate: '15:00',
    present: false
}, {
    startDate: '15:00',
    endDate: '18:00',
    present: true
}];

const stat2 = [{
    startDate: '9:55',
    endDate: '10:15',
    present: true
}, {
    startDate: '10:15',
    endDate: '14:00',
    present: false
}, {
    startDate: '14:00',
    endDate: '15:20',
    present: true
}, {
    startDate: '15:20',
    endDate: '17:00',
    present: false
}, {
    startDate: '17:00',
    endDate: '18:20',
    present: true
}];

const arr = [
    {value: '9:55', source: 'camera', type: 'start'},
    {value: '10:55', source: 'computer', type: 'start'},
    {value: '12:50', source: 'camera', type: 'end'},
    {value: '13:10', source: 'camera', type: 'start'},
    {value: '15:10', source: 'computer', type: 'end'},
    {value: '15:30', source: 'camera', type: 'end'},
    {value: '15:50', source: 'camera', type: 'start'},
    {value: '16:05', source: 'computer', type: 'start'},
    {value: '20:00', source: 'camera', type: 'end'}
];

const getTime = (entry) => {
    const date = new Date();
    const [hours, min] = entry.split(':');
    date.setHours(hours, min, 0);
    return date.getTime();
};

function mergeAlgo(arr) {
    const combined = arr.map(it => ({...it, value: getTime(it.value)}));
    let isCamera = false;
    let isComputer = false;
    let start = null;
    const accum = [];

    combined.sort((a, b) => a.value - b.value);

    for (let i = 0; i < combined.length - 1; i++) {
        const current = combined[i];

        switch (current.source) {
            case 'computer':
                isComputer = !isComputer;
                break;
            case 'camera':
                isCamera = !isCamera;
                break;
        }

        if (isCamera && isComputer) {
            start = current.value;
        } else {
            if (start) {
                accum.push([start, current.value]);
                start = null;
            }
        }
    }

    return accum;
}

console.log(mergeAlgo(arr));

/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
    const n = s.trim();
    return /^[+-]?([0-9]+|[0-9]+\.[0-9]*|[0-9]*\.[0-9]+)(e[+-]?[0-9]+)?$/i.test(n);
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
var minCameraCover = function (root) {
    var result = 0;
    /** tree travel function that return the state of a node */
    var travel = function (node) {
        if (!node) {
            return 2;
            //if return 0, we will need to add camera on leaf,
            //if return 1, means the leaf nodes will be monitored, and we will not add camera on leaf's parent node, so we have to return 2 here
        }
        var left = travel(node.left);
        var right = travel(node.right);
        // both childs are monitored
        if (left === 2 && right === 2) {
            return 0;
        }
        // one of the child is not monitored
        if (left === 0 || right === 0) {
            result++;
            return 1
        }
        // one of the child has camera
        if (left === 1 || right === 1) {
            return 2;
        }
        return; //I add a return here for my coding style, we have covered all the cases of childs, we must return either 0 or 1 or 2
    }
    //in case the root doesn't get monitored
    if (travel(root) === 0) result++;
    return result;
};

/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
    const memory = {};
    words.sort((a, b) => a.length - b.length);

    for (const word of words) {
        let longest = 0;
        for (let i = 0; i < word.length; i++) {
            const pre = word.slice(0, i) + word.slice(i + 1);
            longest = Math.max(longest, (memory[pre] || 0) + 1);
        }
        memory[word] = longest
    }

    return Math.max(...Object.values(memory));
};

/**
 * @param {string[]} paths
 * @return {string[][]}
 */
const findDuplicate = (paths) => {
    let m = new Map();
    for (const p of paths) {
        let pa = p.split(" ");
        for (let i = 1; i < pa.length; i++) {
            let start = pa[i].indexOf('(');
            let fileName = pa[i].slice(0, start);
            let content = pa[i].slice(start + 1, -1);
            if (!m.has(content)) m.set(content, []);
            m.get(content).push(pa[0] + '/' + fileName);
        }
    }
    return Array.from(m.values()).filter(x => x.length > 1);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves2 = function (nums) {
    const mid = nums.sort((a, b) => a - b)[~~(nums.length / 2)]
    return nums.reduce((a, c) => a + Math.abs(mid - c), 0)
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
var levelOrder = function (root) {
    if (!root) {
        return [];
    }

    const stack = [[root, 0]];
    const map = {};

    while (stack.length) {
        let [node, level] = stack.pop();

        if (map[level]) {
            map[level].push(node.val);
        } else {
            map[level] = [node.val];
        }

        if (node.right) {
            stack.push([node.right, level + 1])
        }

        if (node.left) {
            stack.push([node.left, level + 1])
        }
    }

    return Object.values(map);
};

/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
var findAndReplacePattern = function (words, pattern) {
    function encode(str) {
        const result = [];
        const map = {};
        const source = str.split('');
        let cnt = 0;
        for (let symb of source) {
            if (map[symb]) {
                cnt++;
            }
            map[symb] = symb;
            if (source.indexOf(symb) === source.lastIndexOf(symb)) {
                result.push(`u${cnt}`);
            } else {
                result.push(`n${cnt}`);
            }
        }
        return result.join('');
    }

    const referrer = encode(pattern);
    return words.filter(word => encode(word) === referrer);
};

/**
 * Initialize your data structure here.
 * @param {number} n
 */
var TicTacToe = function (n) {
    this.row = new Array(n).fill(0);
    this.col = new Array(n).fill(0);
    this.diagonal = new Array(2).fill(0);
    this.size = n;
};

/**
 * Player {player} makes a move at ({row}, {col}).
 @param row The row of the board.
 @param col The column of the board.
 @param player The player, can be either 1 or 2.
 @return The current winning condition, can be either:
 0: No one wins.
 1: Player 1 wins.
 2: Player 2 wins.
 * @param {number} row
 * @param {number} col
 * @param {number} player
 * @return {number}
 */
TicTacToe.prototype.move = function (row, col, player) {
    let update = player == 1 ? 1 : -1
    this.row[row] += update
    this.col[col] += update
    if (row == col) this.diagonal[0] += update;
    if (row == this.size - col - 1) this.diagonal[1] += update;
    if (Math.abs(this.row[row]) == this.size || Math.abs(this.col[col]) == this.size || Math.abs(this.diagonal[0]) == this.size || Math.abs(this.diagonal[1]) == this.size) {
        return player;
    }
    return 0;
};

/**
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */
