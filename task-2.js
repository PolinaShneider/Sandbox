// галактика/планетарная_система/планета

var test = function (input) {
    function validate(str) {
        const splitted = str.split('/');
        if (splitted.length > 3) {
            return false;
        }

        const [galaxy, system, rest] = splitted;
        const [planet, message] = rest.split(':');

        function validateGalaxy(s) {
            return /^[A-Z]{2,8}-\d{2,8}$/.test(s);
        }

        function validateSystem(s) {
            return !s.startsWith('-') && !s.endsWith('-') && !/-{2,}/.test(s) && /^[A-Z\-]+$/.test(s);
        }

        function validatePlanet(s) {
            for (let i = 0; i < s.length; i++) {
                if (s[i] === s[i + 1]) {
                    return false;
                }
            }
            return /^[A-Z]+$/.test(s);
        }

        function processMessage(s) {
            const content = s.slice(1, -1).split('');
            const indices = [];

            if (!content.length) {
                return ':' + s;
            }

            for (let i = 0; i < content.length; i++) {
                if (content[i] === '@') {
                    indices.push(i);
                }
            }

            for (let i = 0; i < indices.length; i++) {
                const index = indices[i];
                if (i % 2) {
                    content[index] = '</pirate>'
                } else {
                    content[index] = '<pirate>'
                }
            }

            return ':{' + [...content].join('') + '}';
        }

        if (validateGalaxy(galaxy) && validatePlanet(planet) && validateSystem(system)) {
            return [galaxy, system, planet].join('/') + processMessage(message);
        }
    }

    return input.map(validate).filter(Boolean)
};

console.log(test([
    "GALAXY-42/SYSTEM/PLANET:{}",
    "GALAXY-42/SYSTEM/PLANET:{Message}",
    "GALAXY-42/System/PLANET:{Message}",
    "GALAXY-42/SYSTEM/PLANET{Message}",
    "LONGGALAXY-42/SYSTEM/PLANET:{Message}",
    "GALAXY-4/SYSTEM/PLANET:{Message}",
    "GALAXY-4815162342/SYSTEM/PLANET:{Message}",
    "GALAXY-42/THE-SOLAR-SYSTEM/PLANET:{Message}",
    "GALAXY-42/-SYSTEM/PLANET:{Message}",
    "GALAXY-42/SYSTEM1/PLANET:{Message}",
    "GALAXY-42/SYS--TEM/PLANET:{Message}",
    "GALAXY-42/SYSTEM/OOP:{Message}",
    "GALAXY-42/SYSTEM/FP:{Message}",
    "GALAXY-42/SYSTEM/DDOUBLE:{Message}",
    "GALAXY-42/SYSTEM/OOOPS:{Message}",
    "GALAXY-42/SYSTEM/PLANET:{Simple text... @null == undefined@}",
    "GALAXY-42/SYSTEM/PLANET:{@typeof null@@typeof typeof null@}"
]));
