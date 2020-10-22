// WARNING! This file contains some subset of JS that is not supported by type inference.
// You can try checking 'Transpile to ES5' checkbox if you want the types to be inferred
'use strict';
var _0x24bc = ["length", "push"];
(function (data, i) {
    var write = function (isLE) {
        for (; --isLE;) {
            data["push"](data["shift"]());
        }
    };
    write(++i);
})(_0x24bc, 158);
var _0x2fab = function (level, ai_test) {
    level = level - 0;
    var rowsOfColumns = _0x24bc[level];
    return rowsOfColumns;
};

function* sort(array, $l12 = 4) {
    var counts = [[]];
    var $i12 = 0;
    var length = 9;
    var rowHeight = 1;
    for (; $i12 < $l12; $i12++, rowHeight = rowHeight * 10, length = length * 10) {
        var i = 0;
        for (; i < array[_0x2fab("0x0")]; i++) {
            var firstChar = parseInt(array[i] % length / rowHeight);
            if (counts[firstChar] == null) {
                counts[firstChar] = [];
            }
            counts[firstChar][_0x2fab("0x1")](array[i]);
        }
        var item = 0;
        i = 1;
        for (; i <= counts[_0x2fab("0x0")]; i++) {
            var entry = null;
            if (counts[i] != null) {
                for (; (entry = counts[i]["pop"]()) != null;) {
                    array[item++] = entry;
                    yield array;
                }
            }
        }
    }
    return array;
}

module.exports = sort;

const data = sort([1, 53, -222, 3, 4, 4, 4, 4, -38]);
for (let elem of data) {
    console.log(elem);
}
