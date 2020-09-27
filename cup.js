/***
 * Task A
 * @param weights
 * @returns {*|number}
 */
var findLatestWeight = function (weights) {
    weights.sort((a, b) => a - b);

    while (weights.length > 1) {
        const first = weights.pop();
        const second = weights.pop();

        let idx = weights.length;
        if (first !== second) {
            const molecule = first - second;
            for (let i = 0; i < weights.length; i++) {
                if (molecule <= weights[i]) {
                    idx = i;
                    break;
                }
            }

            weights.splice(idx, 0, molecule);
        }
    }

    return weights[0] || 0;
};

/**
 * Task B
 * @param str
 * @returns {{elem: *, mod: *}}
 */
var plugin = function (str) {
    const delimiters = str.split(/[a-z]/i).filter(Boolean);
    const map = {};

    if (delimiters.length === 2) {
        return {
            mod: delimiters[0],
            elem: delimiters[1]
        }
    }

    for (const elem of delimiters) {
        map[elem] = ++map[elem] || 1;
    }

    const {mod, elem} = delimiters.reduce((total, item) => {
        if (map[item] > 1) {
            total['mod'] = item;
        } else {
            total['elem'] = item;
        }
        return total;
    }, {});

    return {mod, elem};
};

// console.log(plugin('block_mod__elem'));
// console.log(plugin('block_mod_mod__elem'));
// console.log(plugin('block__elem_mod_mod'));
