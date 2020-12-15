
const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n')
                .map(x => parseInt(x, 10));

let n1;
let n2;
let n3; 

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        for (let k = 0; k < input.length; k++) {
            if (i != j && j != k && input[i] + input[j] + input[k] === 2020) {
                n1 = input[i];
                n2 = input[j];
                n3 = input[k];
                break;
            }
        }
    }
}

console.log(`Answer: ${n1 * n2 * n3}`);