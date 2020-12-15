const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n')
                .map(x => parseInt(x, 10));

const hasSummableNumbers = (data, target) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (i !== j && data[i] + data[j] === target) {
                return true;
            }
        }
    }
    return false;
}

const getFirstInvalidNumber = (data, preambleSize) => {
    let ingestedData = data.slice(0, preambleSize);
    let nextNumber = data[ingestedData.length];
    while (hasSummableNumbers(ingestedData.slice(-preambleSize), nextNumber)) {
        ingestedData.push(nextNumber);
        nextNumber = data[ingestedData.length];
    }
    return nextNumber;
}

const findSmallest = input => input.reduce((lowest, current) => {return current < lowest || lowest === null ? current : lowest}, null);
const findLargest = input => input.reduce((largest, current) => {return current > largest ? current : largest}, -1);


const findWeakness = (data, invalidNum) => {
    let runningTotal = 0;
    let idx = 0;
    let numbersInRange = [data[0]];
    while (runningTotal < invalidNum) {
        runningTotal += data[idx];
        idx++;
        numbersInRange.push(data[idx]);
    }

    if (runningTotal === invalidNum) {
        numbersInRange = numbersInRange.slice(0, numbersInRange.length - 1);
        const lowest = findSmallest(numbersInRange);
        const largest = findLargest(numbersInRange);
        return lowest + largest;
    } else {
        return findWeakness(data.slice(1), invalidNum);
    }
}

const firstInvalidNumber = getFirstInvalidNumber(input, 25);
console.log(`Part one: ${firstInvalidNumber}`);
console.log(`Part two: ${findWeakness(input, firstInvalidNumber)}`);