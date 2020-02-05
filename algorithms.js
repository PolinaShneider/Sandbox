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
