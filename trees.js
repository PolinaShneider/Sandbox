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

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 *
 * Explanation: https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/
 */
var deleteNode = function (root, key) {
    if (!root) {
        return null;
    }
    if (key < root.val) {
        root.left = deleteNode(root.left, key)
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key)
    } else {
        // Значение нашли
        if (!root.left) {
            // Нет левого потомка — возвращаем правого
            return root.right;
        }

        if (!root.right) {
            // Нет правого потомка — возвращаем левого
            return root.left;
        }

        // Оба потомка присутствуют
        let current = root.right;
        // Берем правого и идем вниз по левого (ищем минимум)
        while (current.left) {
            current = current.left
        }
        // Наименьший элемент в правом дереве стал корнем
        root.val = current.val;
        // Удаляем элемент, ставший корнем
        root.right = deleteNode(root.right, current.val);
    }
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
 * @return {number[]}
 */
var largestValues = function (root) {
    return levelOrder(root).map(item => Math.max(...item));
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
 * @return {number[]}
 */
var averageOfLevels = function (root) {
    return levelOrder(root).map(item => sum(item) / item.length);

    function levelOrder(tree) {
        let stack = [{node: tree, level: 0}];
        let map = {};

        while (stack.length) {
            let {node, level} = stack.pop();

            if (node.left) {
                stack.push({node: node.left, level: level + 1})
            }

            if (node.right) {
                stack.push({node: node.right, level: level + 1})
            }

            if (map[level]) {
                map[level].push(node.val)
            } else {
                map[level] = [node.val]
            }
        }

        return Object.values(map)
    }

    function sum(arr) {
        return arr.reduce((total, item) => {
            return total + item;
        }, 0)
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
 * @param {TreeNode} root
 * @return {boolean}
 * Task: https://leetcode.com/problems/balanced-binary-tree/
 */
var isValidBST = function (root) {
    if (!root) {
        return true;
    }

    let stack = [[root, -Infinity, Infinity]];
    while (stack.length) {
        let [node, lower, upper] = stack.pop();

        if (!node) {
            continue;
        }

        let val = node.val;
        if (val <= lower || val >= upper) {
            return false;
        }

        stack.push([node.right, val, upper]);
        stack.push([node.left, lower, val])
    }

    return true;
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
 * @return {boolean}
 * Iterative explanation: https://leetcode.com/problems/binary-tree-inorder-traversal/solution/
 */
var isBalanced = function (root) {
    if (!root) {
        return true;
    } else {
        let leftHeight = height(root.left);
        let rightHeight = height(root.right);
        let res = false;
        if (leftHeight > rightHeight) {
            res = leftHeight - rightHeight <= 1
        } else {
            res = rightHeight - leftHeight <= 1
        }
        return res && isBalanced(root.left) && isBalanced(root.right)
    }

    function height(root) {
        if (!root) {
            return 0;
        } else {
            let l = 1 + height(root.left);
            let r = 1 + height(root.right);
            if (r > l) {
                return r;
            } else {
                return l;
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
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    let stack = [];
    let values = [];

    let current = root;

    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        values.push(current.val);
        current = current.right;
    }

    return values;
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    function dump(tree) {
        let values = [];
        if (!root) {
            return values;
        }
        let stack = [root];
        while (stack.length) {
            let current = stack.pop();

            values.push(current.val)

            if (current.left) {
                stack.push(current.left)
            }

            if (current.right) {
                stack.push(current.right)
            }
        }

        return values
    }

    return dump(root).sort((a, b) => a - b)[k - 1];
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
 * @return {boolean}
 */
var isUnivalTree = function (root) {
    function traverse(tree) {
        let values = [tree.val];

        if (tree.left) {
            values = values.concat(traverse(tree.left));
        }

        if (tree.right) {
            values = values.concat(traverse(tree.right));
        }

        return values;
    }

    return new Set(traverse(root)).size === 1;
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
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
    function traverse(tree) {
        if (!tree) {
            return [];
        }

        let values = [tree.val];

        if (tree.right) {
            values = values.concat(traverse(tree.right))
        }

        if (tree.left) {
            values = values.concat(traverse(tree.left))
        }

        return values;
    }

    const result = Array.from(new Set(traverse(root))).sort((a, b) => a - b);

    return result[1] === undefined ? -1 : result[1];
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    return JSON.stringify(p) === JSON.stringify(q);
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
 * @return {number}
 */
var findBottomLeftValue = function (root) {
    var result = root.val;
    var resultHeight = 0;

    function dfs(node, height) {
        if (!node) {
            return;
        }
        if (node.left) {
            dfs(node.left, height + 1);
        }
        if (height > resultHeight) {
            result = node.val;
            resultHeight = height;
        }
        if (node.right) {
            dfs(node.right, height + 1);
        }
    }

    dfs(root, 1);
    return result;
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
 * @return {number}
 */
var findTilt = function (root) {
    function dfs(root, tilt) {
        if (!root) {
            return 0;
        }
        let left = dfs(root.left, tilt);
        let right = dfs(root.right, tilt);
        tilt.val += Math.abs(left - right);

        return root.val + left + right;
    }

    const tilt = {val: 0};
    dfs(root, tilt);
    return tilt.val;
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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    let diameter = 0;

    dfs(root);

    return diameter;

    function dfs(node) {
        if (!node) return 0;

        const left = dfs(node.left);
        const right = dfs(node.right);

        // update diameter at every node
        diameter = Math.max(diameter, left + right);

        // update the largest number of edge so far
        return 1 + Math.max(left, right);
    }
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
 * @param {number[]} arr
 * @return {boolean}
 */
var isValidSequence = function (root, arr) {
    return checkPath(root, arr, 0);

    function checkPath(root, arr, index) {
        if (root == null || index === arr.length)
            return false;

        if (root.left == null && root.right == null && root.val === arr[index] && index === arr.length - 1)
            return true;

        return root.val === arr[index] && (
            checkPath(root.left, arr, index + 1) || checkPath(root.right, arr, index + 1)
        );

    }
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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
    function levelOrder(node) {
        const map = {};
        const stack = [{node: node, level: 0, parent: null}];
        while (stack.length) {
            const {node, level, parent} = stack.pop();

            if (map[level]) {
                map[level].push({value: node.val, parent})
            } else {
                map[level] = [{value: node.val, parent}]
            }

            if (node.left) {
                stack.push({node: node.left, level: level + 1, parent: node.val})
            }

            if (node.right) {
                stack.push({node: node.right, level: level + 1, parent: node.val})
            }
        }

        return Object.entries(map);
    }

    const data = levelOrder(root);
    const candidates = [];

    for (const elem of data) {
        const [level, children] = elem;

        for (const child of children) {
            if (child.value === x || child.value === y) {
                candidates.push({level, child})
            }
        }
    }

    return candidates.length === 2 && candidates[0].level === candidates[1].level &&
        candidates[0].child.parent !== candidates[1].child.parent;
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
    return levelOrder(root).map((item, index) => {
        return index % 2 ? item.reverse() : item;
    })
};
