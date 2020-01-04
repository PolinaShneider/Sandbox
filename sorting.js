function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j]
            j -= 1
        }
        arr[j + 1] = key
    }

    return arr;
}

const list = {
    val: 4,
    next: {
        val: 2, next: {
            val: 1, next: {
                val: 3,
                next: null
            }
        }
    }
}

var insertionSortList = function (head) {
    if (!head) {
        return null;
    }
    let sorted = head;
    head = head.next;
    // «Отсортированным» считается только первый элемент списка
    sorted.next = null;
    // Итерируем по всем элементам списка
    while (head) {
        let prev = null;
        let node = sorted;
        // Итерируем по всем элементам отсортированного списка
        while (node && head.val > node.val) {
            // Ищем в отсортированном списке место для нового элемента
            prev = node;
            node = node.next;
        }
        let insert = head;
        head = head.next;
        insert.next = node;
        // Если нашли место для вставки в отсортированном списке, вставляем
        if (prev) {
            prev.next = insert;
        } else {
            // Иначе просто добавляем элемент в конец отсортированного списка
            sorted = insert;
        }
    }
    return sorted;
};

/**
* @param {ListNode} head
* @return {ListNode}
*/
var insertionSortList = function (headref) {
    // Initialize sorted linked list 
    let sorted = null;
    let current = headref;

    // Traverse the given  
    // linked list and insert every 
    // node to sorted 
    while (current != null) {
        // Store next for next iteration 
        let next = current.next;

        // insert current in sorted linked list 
        sortedInsert(current);

        // Update current 
        current = next;
    }

    function sortedInsert(newnode) {
        /* Special case for the head end */
        if (sorted == null || sorted.val >= newnode.val) {
            newnode.next = sorted;
            sorted = newnode;
        }
        else {
            current = sorted;

            /* Locate the node before the point of insertion */
            while (current.next != null &&
                current.next.val < newnode.val) {
                current = current.next;
            }
            newnode.next = current.next;
            current.next = newnode;
        }
    }

    // Update head_ref to point to sorted linked list 
    return sorted;
};
