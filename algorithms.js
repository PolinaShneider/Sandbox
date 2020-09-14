function binary(elem) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 20, 31, 44, 53, 65, 68];
    let low = 0;
    let high = arr.length - 1;

    while (high >= low) {
        let mid = Math.floor((high + low) / 2);

        if (arr[mid] === elem) {
            return elem;
        }

        if (arr[mid] < elem) {
            low = mid + 1;
        }

        if (arr[mid] > elem) {
            high = mid - 1;
        }
    }

    return null;
}

const root = {
    children: [
        {
            children: [
                {
                    children: [],
                    val: 5
                },
                {
                    children: [],
                    val: 6
                }
            ],
            val: 3
        },
        {
            children: [],
            val: 2
        },
        {
            children: [],
            val: 4
        }
    ],
    val: 1
};

function dfs(root) {
    let values = [];
    values.push(root.val);
    for (let child of root.children) {
        values = values.concat(dfs(child));
    }

    return values;
}

function bfs(root) {
    const stack = [root];
    const values = [];
    while (stack.length) {
        let current = stack.pop();
        values.push(current.val);

        for (let child of current.children) {
            stack.push(child);
        }
    }

    return values;
}

console.log(`        1
      / | \\
     2  3  4
       / \\
      5  6`);
console.log("DFS", dfs(root));
console.log("BFS", bfs(root));
console.log("\n");

/**
 * Traversal explanation: https://js-algorithms.tutorialhorizon.com/2015/10/12/binary-tree-traversal/
 *
 *          30
 *        /    \
 *      36     21
 *       \     / \
 *       35   26 15
 *        \       \
 *        33      8
 */
const binaryTree = {
    val: 30,
    left: {
        val: 36,
        right: {
            val: 35,
            left: null,
            right: {
                val: 33,
                left: null,
                right: null
            }
        },
        left: null
    },
    right: {
        val: 21,
        left: {
            val: 26,
            right: null,
            left: null
        },
        right: {
            val: 15,
            right: {
                val: 8,
                right: null,
                left: null
            },
            left: null
        }
    }
};

console.log(`           30
         /    \\
       36     21
        \\     / \\
        35   26 15
         \\       \\
         33      8`);

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

console.log("pre-order: root -> left -> right", binaryPreOrderTraversal(binaryTree));

function binaryPostOrderTraversal(root) {
    // post-order
    let values = [];

    if (root.left) {
        values = values.concat(binaryPostOrderTraversal(root.left));
    }
    if (root.right) {
        values = values.concat(binaryPostOrderTraversal(root.right));
    }

    values.push(root.val);

    return values;
}

console.log("post-order: left -> right -> root", binaryPostOrderTraversal(binaryTree));

function binaryInOrderTraversal(root) {
    // in-order
    let values = [];

    if (root.left) {
        values = values.concat(binaryInOrderTraversal(root.left));
    }

    values.push(root.val);

    if (root.right) {
        values = values.concat(binaryInOrderTraversal(root.right));
    }

    return values;
}

console.log("in-order: left -> root -> right", binaryInOrderTraversal(binaryTree));

/**
 * https://js-algorithms.tutorialhorizon.com/2015/10/23/combinations-of-an-array/
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
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
    const stack = [root];
    let sum = 0;
    if (!root) {
        return sum;
    }
    while (stack.length) {
        const node = stack.pop();

        if (node.left) {
            stack.push(node.left)
        }

        if (node.right) {
            stack.push(node.right)
        }

        if (node.left && !node.left.left && !node.left.right) {
            sum += node.left.val
        }
    }

    return sum;
};

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
    const arr = [];
    const results = [];

    function dfs(sum) {
        if (sum <= 0) {
            if (!sum && arr.length === k) {
                results.push([...arr]);
            }
            return;
        }

        for (let i = arr[arr.length - 1] + 1 || 1; i <= 9; i++) {
            arr.push(i);
            dfs(sum - i);
            arr.pop();
        }
    }

    dfs(n);

    return results;
};

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    /**
     * Insert new interval in sorted array
     */
    for (let i = 0; i < intervals.length; i++) {
        if (newInterval[0] < intervals[i][0]) {
            intervals.splice(i, 0, newInterval);
            break;
        }

        if (i === intervals.length - 1) {
            intervals.push(newInterval);
            break;
        }
    }

    /**
     * If intervals array was empty just push
     */
    if (!intervals.length) {
        intervals.push(newInterval);
    }

    const results = [intervals.shift()];
    intervals.forEach((item) => {
        if (
            item[0] <= results[results.length - 1][1]
        ) {
            results[results.length - 1][1] = Math.max(results[results.length - 1][1], item[1])
        } else {
            results.push(item)
        }
    });

    return results;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const n = nums.length;

    if (!n) {
        return 0;
    }

    if (n === 1) {
        return nums[0];
    }

    const result = [nums[0], Math.max(nums[0], nums[1])];

    for (let i = 2; i < nums.length; i++) {
        result[i] = Math.max(result[i - 1], result[i - 2] + nums[i])
    }

    return result[nums.length - 1];
};
