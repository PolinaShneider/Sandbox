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

    return undefined;
}

const root = {
    "children": [
        {
            "children": [
                {
                    "children": [],
                    "val": 5
                },
                {
                    "$id": "6",
                    "children": [],
                    "val": 6
                }
            ],
            "val": 3
        },
        {
            "children": [],
            "val": 2
        },
        {
            "children": [],
            "val": 4
        }
    ],
    "val": 1
};

function dfs(root) {
    let values = [];
    values.push(root.val);
    for (let child of root.children) {
        values = values.concat(dfs(child));
    }

    return values;
}

function dfsStack(root) {
    const stack = [];
    const values = [];
    stack.push(root);
    while (stack.length) {
        let current = stack.pop();
        values.push(current.val);

        for (let child of current.children) {
            stack.push(child);
        }
    }

    return values;
}

console.log(dfs(root));
console.log(dfsStack(root));
