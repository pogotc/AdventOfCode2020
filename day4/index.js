const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n\n')
                .map(x => x.replace(/\s/g, ' ').split(' '));


const hasRequiredFields = (document) => {
    if (document.length === 8) {
        return true;
    }
    if (document.length === 7) {
        const cidField = document.filter(x => x.match(/cid:/));
        return cidField.length === 0;
    }
    return false;
}

const isValidPassport = (document) => {
    for (let i = 0; i < document.length; i++) {
        const [field, val] = document[i].split(':');
        switch (field) {
            case 'byr':
                if (val < 1920 || val > 2002) {
                    return false;
                }
                break;
            case 'iyr':
                if (val < 2010 || val > 2020) {
                    return false;
                }
                break;
            case 'eyr':
                if (val < 2020 || val > 2030) {
                    return false;
                }
                break;
            case 'hgt':
                const intVal = parseInt(val, 10);
                if (val.indexOf('cm') !== -1) {
                    if (intVal < 150 || intVal > 193) {
                        return false;
                    }
                } else if (val.indexOf('in') !== -1) {
                    if (intVal < 59 || intVal > 76) {
                        return false;
                    }
                } else {
                    return false;
                }
                break;
            case 'hcl':
                if (!val.match(/^#[0-9a-f]{6}$/)) {
                    return false;
                }
                break;
            case 'ecl':
                const eyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                if (eyeColours.indexOf(val) === -1) {
                    return false;
                }
                break;
            case 'pid':
                if (val.length !== 9) {
                    return false;
                }
                break;
        }
    }

    return true;
}

const validPassports = input
                        .filter(hasRequiredFields)
                        .filter(isValidPassport);

console.log(`Found ${validPassports.length} valid passports`);