/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
    if (!root) {
        return 0;
    }

    let maxDepth = -1;
    let sum = 0;

    let stack = [[root, 0]];

    while (stack.length) {
        let [node, depth] = stack.pop();

        // Нет потомков
        if (node.left == null && node.right == null) {
            // Нашли более глубокий элемент
            if (depth > maxDepth) {
                maxDepth = depth;
                sum = node.val
            } else if (depth === maxDepth) {
                // Иначе суммируем с предыдущим значением
                sum += node.val
            }
        }

        if (node.right) {
            stack.push([node.right, depth + 1])
        }

        if (node.left) {
            stack.push([node.left, depth + 1])
        }
    }

    return sum
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var constructMaximumBinaryTree = function (nums) {
    //base cases
    if (nums.length === 1) return new TreeNode(nums[0]);
    if (nums.length === 0) return null;

    //create a new TreeNode(center)
    let centerIdx = nums.indexOf(Math.max(...nums));
    let root = new TreeNode(nums[centerIdx]);

    //set left node to center of left subtree
    let leftSubtree = nums.slice(0, centerIdx);
    root.left = constructMaximumBinaryTree(leftSubtree);

    //set right node to center of right subtree
    let rightSubtree = nums.slice(centerIdx + 1, nums.length);
    root.right = constructMaximumBinaryTree(rightSubtree);

    return root;
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
