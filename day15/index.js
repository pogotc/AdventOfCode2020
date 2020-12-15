
const testInput = [3,1,2];
const fullInput = [2,0,1,9,5,19];

const getAgeOfNumber = (number, history) => {
    const historyOfNumber = history[number];
    if (historyOfNumber.length === 1) {
        return 0;
    }

    return historyOfNumber[historyOfNumber.length - 1] - historyOfNumber[historyOfNumber.length - 2];
}

const recordNumberWithTurnInHistory = (number, turn, history) => {
    if (history[number] === undefined) {
        history[number] = [];
    }
    history[number].push(turn);

    if (history[number].length > 2) {
        history[number].shift();
    }
}

const findNextNumber = (sequence, history, turnsRemaining) => {
    for (let i = 0; i < turnsRemaining; i++) {
        const age = getAgeOfNumber(sequence[sequence.length - 1], history);
        recordNumberWithTurnInHistory(age, sequence.length, history);
        sequence.push(age);
        if (i % 1000000 === 0) {
            console.log('.');
        }
    }

    return sequence[sequence.length - 1];
}

// const input = testInput;
const input = fullInput;

const history = {}
input.forEach((n, idx) => history[n] = [idx]);

const turnsToPerformPartOne = 2020;
const nextNumPartOne = findNextNumber(input, history, turnsToPerformPartOne - input.length);
console.log(`Part one: ${nextNumPartOne}`);

const turnsToPerformPartTwo = 30000000;
const nextNumPartTwo = findNextNumber(input, history, turnsToPerformPartTwo - input.length);
console.log(`Part two: ${nextNumPartTwo}`);
