const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n')
                .map(x => x.split(''));




let down = 2;
let right = 1;
let col = 0;

let numTrees = 0;

for (let row = 0; row < input.length; row+= down) {
    if (input[row][col] === '#') {
        numTrees++;
    }
    col += right;
    col = col % input[row].length;
}
console.log(numTrees);