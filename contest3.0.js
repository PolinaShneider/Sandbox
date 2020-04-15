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
var productExceptSelf = function(nums) {
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
