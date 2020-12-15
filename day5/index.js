const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n')


const decode = (lowerString, upperString) => (rowString, lowerRange, upperRange) => {
    if (rowString.length === 1) {
        if (rowString === lowerString) {
            return lowerRange;
        } else {
            return upperRange;
        }
    }
    const head = rowString.substring(0, 1);
    const tail = rowString.substring(1);

    const range = upperRange - lowerRange;
    if (head === lowerString) {
        return decode(lowerString, upperString)(tail, lowerRange, lowerRange + Math.floor(range / 2));
    } else {
        return decode(lowerString, upperString)(tail, lowerRange + Math.ceil(range / 2), upperRange);
    }
}

const decodeRow = decode('F', 'B');
const decodeCol = decode('L', 'R');

const decodePass = (pass) => {
    const rows = pass.substring(0, 7);
    const cols = pass.substring(7);
    const row = decodeRow(rows, 0, 127);
    const col = decodeCol(cols, 0, 7);

    return { col, row };
}

const getSeatIdForPass = (pass) => {
    const { col, row } = decodePass(pass);
    return row * 8 + col;
}

const boardingPassIds = input.map(getSeatIdForPass);

const highest = boardingPassIds.reduce((highestFound, seatId) => {
    return seatId > highestFound ? seatId : highestFound;
}, 0);
console.log(`Highest seat id: ${highest}`);


for (let i = 20; i < highest; i++) {
    if (boardingPassIds.indexOf(i) === -1) {
        console.log(`Your seat is: ${i}`);
    }
}
