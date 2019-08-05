/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function(address) {
    return address.replace(/\./g, "[.]");
};

console.assert(defangIPaddr("1.1.1.1") === "1[.]1[.]1[.]1", "defangIPaddr #1");
console.assert(defangIPaddr("255.100.50.0") === "255[.]100[.]50[.]0", "defangIPaddr #2");

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
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
var wordPattern = function(pattern, str) {
    let keys = pattern.split("");
    let values = str.split(" ");
    let obj = {};

    if (new Set(keys).size !== new Set(values).size) {
        return  false;
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
var MyHashMap = function(state) {
    this.state = state || {};
};

/**
 * value will always be non-negative.
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    this.state[key] = value;
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    return this.state[key] === undefined ? -1 : this.state[key];
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
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
obj.put(2,4);
obj.get(2);
obj.remove(2);
obj.put(2,7);
obj.put(3,9);
obj.put(3,10);
console.assert(
    JSON.stringify(obj) === JSON.stringify({
        state: { '2': 7 , '3': 10}
    }),
    "MyHashMap #1"
);

obj.remove(4);
obj.remove(3);
console.assert(
    JSON.stringify(obj) === JSON.stringify({
        state: { '2': 7 }
    }),
    "MyHashMap #2"
);

/**
 * Initialize your data structure here.
 */
var MyHashSet = function(state) {
    this.state = state || {};
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    this.state[key] = key;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    delete this.state[key];
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
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
var reverseWords = function(s) {
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
var numUniqueEmails = function(emails) {
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
var intersection = function(nums1, nums2) {
    let result = nums1.filter(num => {
        return nums2.indexOf(num) !== -1;
    });

    return [...new Set(result)];
};

console.assert(
    JSON.stringify(intersection([1,2,2,1], [2,2])) ===  JSON.stringify([2]),
    "intersection #1"
);

/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function(left, right) {
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
    selfDividingNumbers(1,22)
) === JSON.stringify(
    [1,2,3,4,5,6,7,8,9,11,12,15,22]
), "selfDividingNumbers #1");

console.assert(JSON.stringify(
    selfDividingNumbers(100,109)
) === JSON.stringify(
    []
), "selfDividingNumbers #2");


/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function(S) {
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


    return  result;
};

console.assert(reverseOnlyLetters("a-bC-dEf-ghIj") === "j-Ih-gfE-dCba", "reverseOnlyLetters #1");
console.assert(reverseOnlyLetters("ab-cd") === "dc-ba", "reverseOnlyLetters #2");
console.assert(reverseOnlyLetters("Test1ng-Leet=code-Q!") === "Qedo1ct-eeLg=ntse-T!", "reverseOnlyLetters #3");
console.assert(reverseOnlyLetters("-S2,_") === "-S2,_", "reverseOnlyLetters #4");

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
    return A.map(num => num * num).sort((a, b) => a - b)
};

console.assert(
    JSON.stringify(
        sortedSquares([-4,-1,0,3,10])
    ) === JSON.stringify([0,1,9,16,100]),
    "sortedSquares #1"
);

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
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

console.assert(majorityElement([3,2,3]) === 3, "majorityElement #1");
console.assert(majorityElement([2,2,1,1,1,2,2]) === 2, "majorityElement #2");

/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
    let sum = 0;
    const sorted = nums.sort((a,b) => a - b);
    const length = sorted.length;

    for (let i = 0; i < length; i+=2) {
        sum += sorted[i];
    }

    return sum;
};

console.assert(arrayPairSum([1,4,3,2]) === 4, "arrayPairSum #1");
console.assert(arrayPairSum([29,8,10,15]) === 23, "arrayPairSum #2");

/**
 * @param {number[]} A
 * @return {number}
 */
var repeatedNTimes = function(A) {
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

console.assert(repeatedNTimes([1,2,3,3]) === 3, "repeatedNTimes #1");
console.assert(repeatedNTimes([2,1,2,5,3,2]) === 2, "repeatedNTimes #2");
console.assert(repeatedNTimes([5,1,5,2,5,3,5,4]) === 5, "repeatedNTimes #3");

/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function(words) {
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
var diStringMatch = function(S) {
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

console.assert(JSON.stringify(diStringMatch("IDID")) === JSON.stringify([0,4,1,3,2]), "diStringMatch #1");
console.assert(JSON.stringify(diStringMatch("III")) === JSON.stringify([0,1,2,3]), "diStringMatch #2");
console.assert(JSON.stringify(diStringMatch("DDI")) === JSON.stringify([3,2,0,1]), "diStringMatch #3");

/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
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

console.assert(peakIndexInMountainArray([0,1,0]) === 1, "peakIndexInMountainArray #1");
console.assert(peakIndexInMountainArray([0,2,1,0]) === 1, "peakIndexInMountainArray #2");
