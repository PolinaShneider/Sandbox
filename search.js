/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * Explanation: https://leetcode.com/problems/search-in-rotated-sorted-array/discuss/273622/Javascript-Simple-O(log-N)-Binary-Search-Solution
 */
function search(nums, target) {
    let right = nums.length - 1;
    let left = 0;

    while (right >= left) {
        let mid = Math.floor((right + left) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Check if the left side is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target <= nums[mid]) {
                // target is in the left
                right = mid - 1;

            } else {
                // target is in the right
                left = mid + 1;
            }
        } else {
            // Otherwise, the right side is sorted
            if (nums[mid] <= target && target <= nums[right]) {
                // target is in the right
                left = mid + 1;
            } else {
                // target is in the left
                right = mid - 1;
            }
        }
    }

    return -1;
}
