/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function (address) {
    return address.replace(/\./g, "[.]");
};

console.assert(defangIPaddr("1.1.1.1") === "1[.]1[.]1[.]1", "defangIPaddr #1");
console.assert(defangIPaddr("255.100.50.0") === "255[.]100[.]50[.]0", "defangIPaddr #2");

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function (J, S) {
    let cnt = 0;
    S.split("").forEach(el => {
        if (J.indexOf(el) > -1) {
            cnt++;
        }
    });

    return cnt;
};

console.assert(numJewelsInStones("aA", "aAAbbbb") === 3, "numJewelsInStones #1");
console.assert(numJewelsInStones("z", "ZZ") === 0, "numJewelsInStones #2");

/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function (pattern, str) {
    let keys = pattern.split("");
    let values = str.split(" ");
    let obj = {};

    if (new Set(keys).size !== new Set(values).size) {
        return false;
    }

    keys.forEach((elem, index) => {
        obj[elem] = values[index];
    });

    let result = keys.map(key => obj[key]);

    return result.join(" ") === str;
};

console.assert(wordPattern("abba", "dog cat cat dog") === true, "wordPattern #1");
console.assert(wordPattern("abba", "dog cat cat fish") === false, "wordPattern #2");
console.assert(wordPattern("aaaa", "dog cat cat dog") === false, "wordPattern #3");
console.assert(wordPattern("abba", "dog dog dog dog") === false, "wordPattern #4");

/**
 * Initialize your data structure here.
 */
var MyHashMap = function (state) {
    this.state = state || {};
};

/**
 * value will always be non-negative.
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
    this.state[key] = value;
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
    return this.state[key] === undefined ? -1 : this.state[key];
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
    delete this.state[key];
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

var obj = new MyHashMap();
obj.put(2, 4);
obj.get(2);
obj.remove(2);
obj.put(2, 7);
obj.put(3, 9);
obj.put(3, 10);
console.assert(
    JSON.stringify(obj) === JSON.stringify({
        state: {'2': 7, '3': 10}
    }),
    "MyHashMap #1"
);

obj.remove(4);
obj.remove(3);
console.assert(
    JSON.stringify(obj) === JSON.stringify({
        state: {'2': 7}
    }),
    "MyHashMap #2"
);

/**
 * Initialize your data structure here.
 */
var MyHashSet = function (state) {
    this.state = state || {};
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
    this.state[key] = key;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
    delete this.state[key];
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function (key) {
    return this.state[key] !== undefined;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    return s.split(" ")
        .map(
            word => word.split("").reverse().join("")
        ).join(" ")
};

console.assert(reverseWords("Let's take LeetCode contest") === "s'teL ekat edoCteeL tsetnoc", "reverseWords #1");

/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
    let candidates = [];
    emails.forEach(email => {
        let executed = /([^@]+)(.+)/.exec(email);
        candidates.push(
            executed[1].split("+")[0]
                .replace(/\./g, "") + executed[2]
        );
    });

    return new Set(candidates).size;
};

console.assert(
    numUniqueEmails([
        "test.email+alex@leetcode.com",
        "test.e.mail+bob.cathy@leetcode.com",
        "testemail+david@lee.tcode.com"
    ]) === 2,
    "numUniqueEmails #1"
);

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    let result = nums1.filter(num => {
        return nums2.indexOf(num) !== -1;
    });

    return [...new Set(result)];
};

console.assert(
    JSON.stringify(intersection([1, 2, 2, 1], [2, 2])) === JSON.stringify([2]),
    "intersection #1"
);

/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
    let output = [];

    for (let num = left; num <= right; num++) {
        let result = num.toString().split("").every(fig => {
            return +fig !== 0 && (num % +fig) === 0
        });

        if (result) {
            output.push(num)
        }
    }

    return output;
};

console.assert(JSON.stringify(
    selfDividingNumbers(1, 22)
) === JSON.stringify(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
), "selfDividingNumbers #1");

console.assert(JSON.stringify(
    selfDividingNumbers(100, 109)
) === JSON.stringify(
    []
), "selfDividingNumbers #2");


/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function (S) {
    let ranges = {};
    let result = "";
    let purified = S.replace(/[\W\d_]/g, "").split("");

    for (let i = 0; i < S.length; i++) {
        if (/[\W\d_]/.test(S[i])) {
            ranges[i] = S[i];
        }
    }

    for (let i = 0; i < S.length; i++) {
        if (ranges[i]) {
            result += ranges[i];
        } else {
            result += purified.pop();
        }
    }


    return result;
};

console.assert(reverseOnlyLetters("a-bC-dEf-ghIj") === "j-Ih-gfE-dCba", "reverseOnlyLetters #1");
console.assert(reverseOnlyLetters("ab-cd") === "dc-ba", "reverseOnlyLetters #2");
console.assert(reverseOnlyLetters("Test1ng-Leet=code-Q!") === "Qedo1ct-eeLg=ntse-T!", "reverseOnlyLetters #3");
console.assert(reverseOnlyLetters("-S2,_") === "-S2,_", "reverseOnlyLetters #4");

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function (A) {
    return A.map(num => num * num).sort((a, b) => a - b)
};

console.assert(
    JSON.stringify(
        sortedSquares([-4, -1, 0, 3, 10])
    ) === JSON.stringify([0, 1, 9, 16, 100]),
    "sortedSquares #1"
);

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let obj = {};

    nums.forEach(num => {
        if (obj[num]) {
            obj[num] = ++obj[num];
        } else {
            obj[num] = 1
        }
    });

    let max = null;
    let index = null;

    for (let key in obj) {
        if (obj[key] > max) {
            max = obj[key];
            index = key;
        }
    }

    return +index;
};

console.assert(majorityElement([3, 2, 3]) === 3, "majorityElement #1");
console.assert(majorityElement([2, 2, 1, 1, 1, 2, 2]) === 2, "majorityElement #2");

/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
    let sum = 0;
    const sorted = nums.sort((a, b) => a - b);
    const length = sorted.length;

    for (let i = 0; i < length; i += 2) {
        sum += sorted[i];
    }

    return sum;
};

console.assert(arrayPairSum([1, 4, 3, 2]) === 4, "arrayPairSum #1");
console.assert(arrayPairSum([29, 8, 10, 15]) === 23, "arrayPairSum #2");

/**
 * @param {number[]} A
 * @return {number}
 */
var repeatedNTimes = function (A) {
    const limit = A.length / 2;
    const length = A.length;
    const obj = {};

    for (let i = 0; i < length; i++) {
        let elem = A[i];

        if (obj[elem]) {
            obj[elem] = ++obj[elem];

            if (obj[elem] >= limit) {
                return elem;
            }
        } else {
            obj[elem] = 1;
        }
    }
};

console.assert(repeatedNTimes([1, 2, 3, 3]) === 3, "repeatedNTimes #1");
console.assert(repeatedNTimes([2, 1, 2, 5, 3, 2]) === 2, "repeatedNTimes #2");
console.assert(repeatedNTimes([5, 1, 5, 2, 5, 3, 5, 4]) === 5, "repeatedNTimes #3");

/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function (words) {
    const morseAlphabet = {
        a: ".-",
        b: "-...",
        c: "-.-.",
        d: "-..",
        e: ".",
        f: "..-.",
        g: "--.",
        h: "....",
        i: "..",
        j: ".---",
        k: "-.-",
        l: ".-..",
        m: "--",
        n: "-.",
        o: "---",
        p: ".--.",
        q: "--.-",
        r: ".-.",
        s: "...",
        t: "-",
        u: "..-",
        v: "...-",
        w: ".--",
        x: "-..-",
        y: "-.--",
        z: "--.."
    };

    const encodedWords = new Set();

    for (let j = 0; j < words.length; j++) {
        const encodedWord = [];
        const word = words[j];

        for (let i = 0; i < word.length; i++) {
            encodedWord.push(morseAlphabet[word[i]]);
        }

        encodedWords.add(encodedWord.join(""));
    }

    return encodedWords.size;
};

console.assert(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]) === 2, "uniqueMorseRepresentations #1");

/**
 * @param {string} S
 * @return {number[]}
 */
var diStringMatch = function (S) {
    const N = S.length;
    const arr = new Array(N - 1).fill(0).map((item, index) => ++index);
    const result = [];

    if (S[0] === "I") {
        result.push(0);
        arr.push(N);
    } else {
        result.push(N);
        arr.unshift(0)
    }

    for (let i = 1; i <= S.length; i++) {
        if (S[i] === "D") {
            result.push(arr.pop())
        } else {
            result.push(arr.shift())
        }
    }


    return result

};

console.assert(JSON.stringify(diStringMatch("IDID")) === JSON.stringify([0, 4, 1, 3, 2]), "diStringMatch #1");
console.assert(JSON.stringify(diStringMatch("III")) === JSON.stringify([0, 1, 2, 3]), "diStringMatch #2");
console.assert(JSON.stringify(diStringMatch("DDI")) === JSON.stringify([3, 2, 0, 1]), "diStringMatch #3");

/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function (A) {
    let index = 0;
    let max = A[index];

    for (let i = 0; i < A.length; i++) {
        if (A[i] > max) {
            index = i;
            max = A[index];
        }
    }

    return index;
};

console.assert(peakIndexInMountainArray([0, 1, 0]) === 1, "peakIndexInMountainArray #1");
console.assert(peakIndexInMountainArray([0, 2, 1, 0]) === 1, "peakIndexInMountainArray #2");

/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function (A) {
    return A.map((elem) => elem.reverse().map(item => +!item));
};

console.assert(JSON.stringify(
    flipAndInvertImage([[1, 1, 0], [1, 0, 1], [0, 0, 0]])
) === JSON.stringify([[1, 0, 0], [0, 1, 0], [1, 1, 1]]), "flipAndInvertImage #1");
console.assert(JSON.stringify(
    flipAndInvertImage([[1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 1], [1, 0, 1, 0]])
) === JSON.stringify([[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 1], [1, 0, 1, 0]]), "flipAndInvertImage #2");

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParity = function (A) {
    const N = A.length;
    const result = new Array(N);
    let evenIndex = 0;
    let oddIndex = N - 1;

    A.forEach(elem => {
        if (elem % 2 === 0) {
            result[evenIndex++] = elem;
        } else {
            result[oddIndex--] = elem;
        }
    });

    return result;
};

console.assert(JSON.stringify(sortArrayByParity([3, 1, 2, 4])) === JSON.stringify([2, 4, 1, 3]), "sortArrayByParity #1");

/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
    const position = {
        x: 0,
        y: 0
    };

    for (let i = 0; i < moves.length; i++) {
        switch (moves[i]) {
            case "U":
                position.y = ++position.y;
                break;
            case "D":
                position.y = --position.y;
                break;
            case "R":
                position.x = ++position.x;
                break;
            case "L":
                position.x = --position.x;
                break;
        }
    }

    return position.x === 0 && position.y === 0;
};

console.assert(judgeCircle("UD") === true, "judgeCircle #1");
console.assert(judgeCircle("LL") === false, "judgeCircle #2");

/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function (heights) {
    let counter = 0;
    const sorted = heights.concat().sort((a, b) => a - b);

    for (let i = 0; i < heights.length; i++) {
        if (heights[i] !== sorted[i]) counter++;
    }

    return counter;
};

console.assert(heightChecker([1, 1, 4, 2, 1, 3]) === 3, "heightChecker #1");

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function (A) {
    const result = [];
    const evens = [];
    const odds = [];

    for (let i = 0; i < A.length; i++) {
        (A[i] % 2 === 0) ? evens.push(A[i]) : odds.push(A[i]);
    }

    for (let i = 0; i < A.length; i++) {
        (i % 2 === 0) ? result[i] = evens.pop() : result[i] = odds.pop();
    }

    return result;
};

console.assert(JSON.stringify(
    sortArrayByParityII([4, 2, 5, 7])
) === JSON.stringify([2, 7, 4, 5]), "sortArrayByParityII #1");

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
    const stack = [];
    const used = [];

    if (!root) return used;

    stack.push(root);

    while (stack.length) {
        const next = stack.pop();
        used.push(next.val);

        next.children.forEach(child => stack.push(child));
    }

    return used.reverse();
};

const root = {
    "$id": "1",
    "children": [
        {
            "$id": "2",
            "children": [
                {
                    "$id": "5",
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
            "$id": "3",
            "children": [],
            "val": 2
        },
        {
            "$id": "4",
            "children": [],
            "val": 4
        }
    ],
    "val": 1
};

console.assert(
    JSON.stringify(postorder(root)) === JSON.stringify([5, 6, 3, 2, 4, 1]),
    "postorder #1"
);

console.assert(
    JSON.stringify(postorder(null)) === JSON.stringify([]),
    "postorder #2"
);

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
    // Base Cases: root is null or key is present at root
    if (root === null || root.val === val)
        return root;

    // val is greater than root's key
    if (root.val > val)
        return searchBST(root.left, val);

    // val is less than root's key
    return searchBST(root.right, val);
};

console.assert(JSON.stringify(searchBST({
    val: 4,
    left: {
        val: 2,
        left: {
            val: 1,
            right: null,
            left: null
        },
        right: {
            val: 3,
            right: null,
            left: null
        }
    },
    right: {
        val: 7,
        right: null,
        left: null
    }
}, 2)) === JSON.stringify({
    val: 2,
    left: {
        val: 1,
        right: null,
        left: null
    },
    right: {
        val: 3,
        right: null,
        left: null
    }
}), "searchBST #1");

/**
 * @param {number} N
 * @return {number}
 */
var fib = function (N) {
    if (N < 2) {
        return N;
    } else {
        return fib(N - 1) + fib(N - 2);
    }
};

console.assert(fib(2) === 1, "fib #1");
console.assert(fib(3) === 2, "fib #2");
console.assert(fib(4) === 3, "fib #3");

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
    const result = {};
    cpdomains.forEach(domain => {
        const match = domain.match(/(\d+)(?:\s)(\S+)/);
        const counter = +match[1];
        const domains = match[2].split(".");

        for (let i = 0; i < domains.length; i++) {
            const key = domains.filter((item, index) => index >= i).join(".");
            if (result[key] !== undefined) {
                result[key] += counter;
            } else {
                result[key] = counter;
            }
        }
    });

    const output = [];
    for (let key in result) {
        output.push(`${result[key]} ${key}`);
    }

    return output;
};

console.assert(
    JSON.stringify(subdomainVisits(
        ["9001 discuss.leetcode.com"]
    )) === JSON.stringify(
    ["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
    ), "subdomainVisits #1"
);


console.assert(
    JSON.stringify(subdomainVisits(
        ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
    )) === JSON.stringify(
    ["900 google.mail.com", "901 mail.com", "951 com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org", "5 org"]
    ), "subdomainVisits #2"
);

/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function (A) {
    const N = A.length;
    /** Prepare latin alphabet hashmap */
    const obj = {};
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letters.forEach(letter => {
        obj[letter] = new Array(N).fill(0);
    });

    /** Iterate over words and fill hashmap */
    A.forEach((word, index) => {
        for (let j = 0; j < word.length; j++) {
            obj[word[j]][index] = ++obj[word[j]][index];
        }
    });

    /** Prepare output */
    const result = [];
    for (let key in obj) {
        /** Find minimum letter occurrence */
        const max = obj[key].sort((a, b) => a - b)[0];
        for (let j = 0; j < max; j++) {
            result.push(key);
        }
    }

    return result;
};

console.assert(JSON.stringify(
    commonChars(["bella", "label", "roller"])
) === JSON.stringify(
    ["e", "l", "l"]
), "commonChars #1");

console.assert(JSON.stringify(
    commonChars(["cool", "lock", "cook"])
) === JSON.stringify(
    ["c", "o"]
), "commonChars #2");

/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function (text, first, second) {
    const match = text.match(new RegExp(`(?<=\\b${first} ${second}\\s)(\\S+)`, 'g'));
    return match === null ? [] : match;
};

console.assert(
    JSON.stringify(
        findOcurrences("alice is a good girl she is a good student", "a", "good")
    ) === JSON.stringify(["girl", "student"]), "findOcurrences #1"
);
console.assert(
    JSON.stringify(
        findOcurrences("we will we will rock you", "we", "will")
    ) === JSON.stringify(["we", "rock"]), "findOcurrences #2"
);
console.assert(
    JSON.stringify(
        findOcurrences(
            "obo jvezipre obo jnvavldde jvezipre jvezipre jnvavldde jvezipre jvezipre jvezipre y jnvavldde jnvavldde obo jnvavldde jnvavldde obo jnvavldde jnvavldde jvezipre",
            "jnvavldde",
            "y"
        )
    ) === JSON.stringify([]), "findOcurrences #3"
);

/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
    let indexes = [];
    for (let i = 0; i < S.length; i++) {
        if (S[i] === S[i + 1]) {
            indexes.push(i);
            indexes.push(i + 1);
            return removeDuplicates(S.replace(S.substr(indexes[0], indexes.length), ''));
        }
    }

    return S;
};

console.assert(
    removeDuplicates("abbaca") === "ca", "removeDuplicates #1"
);

/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var transpose = function (A) {
    const cols = A.length;
    const rows = A[0].length;

    const result = [];
    for (let i = 0; i < rows; i++) {
        result.push(
            new Array(cols).fill(0)
        )
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[i][j] = A[j][i];
        }
    }

    return result;
};

console.assert(
    JSON.stringify(transpose([[1, 2, 3], [4, 5, 6]])) === JSON.stringify([[1, 4], [2, 5], [3, 6]]),
    "transpose #1"
);
console.assert(
    JSON.stringify(transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]])) === JSON.stringify([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
    "transpose #2"
);

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const dictionary = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    const exceptions = {
        I: ['V', 'X'],
        X: ['L', 'C'],
        C: ['D', 'M']
    };

    let sum = 0;
    let i = 0;

    while (i < s.length) {
        if (exceptions[s[i]] && s[i + 1] && exceptions[s[i]].indexOf(s[i + 1]) !== -1) {
            sum += (dictionary[s[i + 1]] - dictionary[s[i]]);
            i += 2;
        } else {
            sum += dictionary[s[i]];
            i++;
        }
    }

    return sum;
};

console.assert(romanToInt("III") === 3, "romanToInt #1");
console.assert(romanToInt("IV") === 4, "romanToInt #2");
console.assert(romanToInt("IX") === 9, "romanToInt #3");
console.assert(romanToInt("LVIII") === 58, "romanToInt #4");
console.assert(romanToInt("MCMXCIV") === 1994, "romanToInt #5");
console.assert(romanToInt("I") === 1, "romanToInt #6");

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let common = "";

    if (!strs.length) {
        return common;
    }

    for (let i = 0; i < strs[0].length; i++) {
        const contains = strs.every(str => str[i] && str[i].indexOf(strs[0][i]) !== -1);

        if (!contains) {
            return common;
        }

        common += strs[0][i];
    }

    return common;
};

console.assert(longestCommonPrefix(["flower", "flow", "flight"]) === "fl", "longestCommonPrefix #1");
console.assert(longestCommonPrefix(["dog", "racecar", "car"]) === "", "longestCommonPrefix #2");
console.assert(longestCommonPrefix([]) === "", "longestCommonPrefix #3");

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    while (nums.indexOf(val) !== -1) {
        nums.splice(nums.indexOf(val), 1);
    }

    return nums.length;
};

console.assert(removeElement([3, 2, 2, 3], 3) === 2, "removeElement #1");
console.assert(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2) === 5, "removeElement #2");

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    const map = {};
    for (let i = nums.length; i >= 0; i--) {
        if (map[nums[i]]) {
            nums.splice(i, 1);
        } else {
            map[nums[i]] = 1;
        }
    }

    return nums.length;
};

console.assert(removeDuplicates([1, 1, 2]) === 2, "removeDuplicates #1");
console.assert(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]) === 5, "removeDuplicates #2");

var searchInsert = function (nums, target) {
    if (nums.indexOf(target) !== -1) {
        return nums.indexOf(target);
    } else {
        if (!nums.length || target < nums[0]) return 0;
        if (target > nums[nums.length - 1]) return nums.length;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i + 1] > target) {
                return i + 1;
            }
        }
    }
};

console.assert(searchInsert([1, 3, 5, 6], 5) === 2, "searchInsert #1");
console.assert(searchInsert([1, 3, 5, 6], 2) === 1, "searchInsert #2");
console.assert(searchInsert([1, 3, 5, 6], 7) === 4, "searchInsert #3");
console.assert(searchInsert([1, 3, 5, 6], 0) === 0, "searchInsert #4");
console.assert(searchInsert([1, 3, 5, 5, 5, 5, 7, 7, 7], 6) === 6, "searchInsert #5");
console.assert(searchInsert([], 6) === 0, "searchInsert #6");

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    const match = new RegExp(needle).exec(haystack);
    return match ? match.index : -1;
};

console.assert(strStr("hello", "ll") === 2, "strStr #1");
console.assert(strStr("aaaaa", "ll") === -1, "strStr #2");
console.assert(strStr("aaaaa", "") === 0, "strStr #3");

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    let result = 1;

    if (n) {
        const pow = Math.abs(n);

        result = (pow % 2 === 0) ?
            myPow(x * x, pow / 2) :
            myPow(x * x, (pow - 1) / 2) * x;
    }
    return (n < 0) ? +(1 / result).toFixed(10) : +result.toFixed(10);
};

console.assert(myPow(2.00000, 10) === 1024, "myPow #1");
console.assert(myPow(2.10000, 3) === 9.26100, "myPow #2");
console.assert(myPow(2.00000, -2) === 0.25000, "myPow #3");

/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 5 === 0 && i % 3 === 0) {
            result.push("FizzBuzz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else {
            result.push(i.toString());
        }
    }

    return result;
};

console.assert(JSON.stringify(fizzBuzz(1)) === JSON.stringify(["1"]), "fizzBuzz #1");
console.assert(JSON.stringify(fizzBuzz(5)) === JSON.stringify(["1", "2", "Fizz", "4", "Buzz"]), "fizzBuzz #2");

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let i = 0;
    const map = {};
    while (i < nums.length) {
        if (map[nums[i]] === undefined) {
            map[nums[i]] = true;
        } else {
            delete map[nums[i]];
        }
        i++;
    }

    return +Object.keys(map).pop();
};

console.assert(singleNumber([2, 2, 1]) === 1, "singleNumber #1");
console.assert(singleNumber([4, 1, 2, 1, 2]) === 4, "singleNumber #2");

/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
    const N = arr.length;

    for (let i = N; i >= 0; i--) {
        if (arr[i] === 0) {
            arr.splice(i, 0, 0);
        }
    }

    arr.length = N;

    /** For assert tests */
    return arr;
};

console.assert(
    JSON.stringify(
        duplicateZeros([1, 0, 2, 3, 0, 4, 5, 0])
    ) === JSON.stringify([1, 0, 0, 2, 3, 0, 0, 4]),
    "duplicateZeros #1"
);
console.assert(
    JSON.stringify(
        duplicateZeros([1, 2, 3])
    ) === JSON.stringify([1, 2, 3]),
    "duplicateZeros #2"
);

/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function (S) {
    return S.split('').reduce((previous, current) => {
        /** If symbol not a letter */
        if (!/[a-z]/i.test(current)) {
            return previous.map(str => str + current);
        }

        const lower = current.toLowerCase();
        const upper = current.toUpperCase();
        const withLower = previous.slice().map(str => str + lower);
        const withUpper = previous.slice().map(str => str + upper);

        // debug(current, withLower, withUpper);

        return withLower.concat(withUpper);
    }, ['']);
};

/** letterCasePermutation debugger */
function debug(current, withLower, withUpper) {
    console.group('Iteration:');
    console.log('current', current);
    console.log('lower:', withLower);
    console.log('upper:', withUpper);
    console.log('combined:', withLower.concat(withUpper));
    console.groupEnd();
}

console.assert(JSON.stringify(
    letterCasePermutation("a1b2")) === JSON.stringify(
    ["a1b2", "A1b2", "a1B2", "A1B2"]
), "letterCasePermutation #1");

console.assert(JSON.stringify(
    letterCasePermutation("3z4")) === JSON.stringify(
    ["3z4", "3Z4"]
), "letterCasePermutation #2");

console.assert(JSON.stringify(
    letterCasePermutation("12345")) === JSON.stringify(
    ["12345"]
), "letterCasePermutation #3");

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
    while (stones.length > 1) {
        stones.sort((a, b) => a - b);
        let first = stones.pop();
        let second = stones.pop();

        if (first > second) {
            stones.push(first - second);
        } else if (second > first) {
            stones.push(second - first);
        }
    }

    return stones.length ? stones.pop() : 0;
};

console.assert(lastStoneWeight([2, 7, 4, 1, 8, 1]) === 1, "lastStoneWeight #1");
console.assert(lastStoneWeight([2, 2]) === 0, "lastStoneWeight #2");

/**
 * @param {string} S
 * @return {string}
 */
var toGoatLatin = function (S) {
    const words = S.split(" ");

    words.forEach((word, index) => {
        if (/[aeiou]/.test(word.charAt(0))) {
            word += "ma";
        } else {
            word = word.substr(1) + word.charAt(0) + "ma";
        }

        words[index] = word + "a".repeat(index + 1);
    });

    return words.join(" ");
};

console.assert(
    toGoatLatin("I speak Goat Latin") === "Imaa peaksmaaa oatGmaaaa atinLmaaaaa",
    "toGoatLatin #1"
);
console.assert(
    toGoatLatin("The quick brown fox jumped over the lazy dog")
    === "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa",
    "toGoatLatin #2"
);

/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function (A) {
    const increasing = A[0] < A[A.length - 1];
    for (let i = 0; i < A.length - 1; i++) {
        if ((increasing && A[i] > A[i + 1]) || (!increasing && A[i] < A[i + 1])) {
            return false;
        }
    }

    return true;
};

console.assert(isMonotonic([1, 2, 2, 3]) === true, "isMonotonic #1");
console.assert(isMonotonic([6, 5, 4, 4]) === true, "isMonotonic #2");
console.assert(isMonotonic([1, 3, 2]) === false, "isMonotonic #3");
console.assert(isMonotonic([1, 2, 4, 5]) === true, "isMonotonic #4");
console.assert(isMonotonic([1, 1, 1]) === true, "isMonotonic #5");
console.assert(isMonotonic([1]) === true, "isMonotonic #6");
