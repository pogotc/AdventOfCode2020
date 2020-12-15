
const fs = require('fs');

const parsePassword = (passwordString) => {
    const matches = passwordString.match(/^(\d+)-(\d+) (\w+): (\w+)$/);
    return {
        min: matches[1],
        max: matches[2],
        letter: matches[3],
        password: matches[4],
    }
}

const isValidSledPassword = (passwordInput) => {
    const { min, max, letter, password } = passwordInput;
    const regex = new RegExp(letter, 'g');
    const matches = password.match(regex);
    const occurrences = matches ? matches.length : 0;
    return occurrences >= min && occurrences <= max;
}

const isValidTobogganPassword = (passwordInput) => {
    const { min, max, letter, password } = passwordInput;
    if (password[min - 1] === letter && password[max - 1] !== letter) { 
        return true;
    }

    if (password[min - 1] !== letter && password[max - 1] === letter) { 
        return true;
    }
    return false;
}

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n')

const validSledPasswords = input
                        .map(parsePassword)
                        .filter(isValidSledPassword);
console.log(`Found ${validSledPasswords.length} valid sled passwords`);

const validTobogganPasswords = input
                        .map(parsePassword)
                        .filter(isValidTobogganPassword);
console.log(`Found ${validTobogganPasswords.length} valid toboggan passwords`);