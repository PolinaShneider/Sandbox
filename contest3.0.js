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
