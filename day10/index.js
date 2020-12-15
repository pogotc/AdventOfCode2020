const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n')
                .map(x => parseInt(x, 10))
                .sort((a, b) => a < b ? -1 : 1);

const getDeviceJoltage = (sortedJoltages) => {
    return sortedJoltages[sortedJoltages.length-1] + 3;
}

const chainAdapter = (adapters, currentAdapter, targetJoltage, result = {'joltdiffs': {}, adapters: []}) => {
    if (adapters.length === 0) {
        const diff = targetJoltage - currentAdapter;
        result['joltdiffs'][diff]++;
        return result;
    }

    const compatibleAdapters = adapters.filter(x => x <= currentAdapter + 3);
    const adapterToUse = compatibleAdapters[0];
    const diff = adapterToUse - currentAdapter;
    if (result['joltdiffs'][diff] === undefined) {
        result['joltdiffs'][diff] = 0;
    }
    result['joltdiffs'][diff]++;
    result['adapters'].push(adapterToUse);
    const remainingAdapters = adapters.filter(x => x != adapterToUse);
    
    return chainAdapter(remainingAdapters, adapterToUse, targetJoltage, result);
}

const tribonacciSequence = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149];
function getTribonacci(num) {
  if (num > tribonacciSequence.length)
    throw `Can't calculate tribonacci number for ${num}`;

  return tribonacciSequence[num - 1];
}

const countCombinations = (adapters) => {
    const maxJoltage = adapters.sort((x, y) => x - y)[adapters.length - 1];    
    const a = adapters.concat([0, maxJoltage + 3]).sort((x, y) => x - y);
    let multiplier = 1;
    let currentRun = 1;
    for (let joltage of a) {
        if (adapters.includes(joltage + 1)) {
            currentRun++;
        } else {
            multiplier *= getTribonacci(currentRun);
            currentRun = 1;
        }
    }
    return multiplier;
}



const deviceJoltage = getDeviceJoltage(input);
const output = chainAdapter(input, 0, deviceJoltage);
console.log(`Part one: ${output['joltdiffs']['1'] * output['joltdiffs']['3']}`);

let adapters = output.adapters;
console.log(`Part two: ${countCombinations(adapters)}`);
