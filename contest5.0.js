/**
 * @param {number} n
 * @return {number}
 */
var minOperations = function(n) {
    return Math.floor(n * n / 4);
};

/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function(s) {
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
var inorderSuccessor = function(root, p) {
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
