function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} root
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function(root, k) {
    const divMod = (arr, n) => [
        Math.floor(arr / n), 
        arr % n
    ];
    let tmp = root, size = 0;
    while (tmp) {
        size++
        tmp = tmp.next
    }
   
    let [whole, remainder] = divMod(size, k);
    let part = whole;
    let result = [];
    for (let i = 0; i < k; i++) {
        if (remainder > 0) {
            part = whole + 1
            remainder--;
        } else {
            part = whole;
        }
        let t1 = root
        while (part > 0) {
            if (part === 1) {
                let t2 = root
                root = root.next;
                t2.next = null
            } else {
                root = root.next
            }
            part--
        }
        result.push(t1)
    }
    return result;
};

const list = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5,
                    next: {
                        val: 6,
                        next: {
                            val: 7,
                            next: null
                        }
                    }
                }
            }
        }
    }
}

console.log(splitListToParts(list, 1))
