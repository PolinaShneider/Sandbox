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
