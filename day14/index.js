const fs = require('fs');

const input = fs
    .readFileSync('fullinput.txt')
    .toString('utf8')
    .split('\n');

const decToBin = (dec) => Number(dec).toString(2);

const addValueToMask = (value, mask) => {
    if (mask === '') {
        return '';
    }

    const maskDigitToCheck = mask.slice(-1);
    const maskInit = mask.slice(0, -1);
    
    const valueLast = value !== '' ? value.slice(-1) : '0';
    const valueInit = value !== '' ? value.slice(0, -1) : '';

    let result;

    if (maskDigitToCheck === 'X') {
        result = valueLast;
    } else {
        result = maskDigitToCheck;
    }
 
    return addValueToMask(valueInit, maskInit) + result;
}

const addMemoryLocationToMask = (value, mask) => {
    if (mask === '' || mask === undefined) {
        return '';
    }

    const maskDigitToCheck = mask.slice(-1);
    const maskInit = mask.slice(0, -1);
    
    const valueLast = value !== '' ? value.slice(-1) : '0';
    const valueInit = value !== '' ? value.slice(0, -1) : '';

    let result;

    if (maskDigitToCheck === '0') {
        result = valueLast;
    } else {
        result = maskDigitToCheck;
    }
 
    return addMemoryLocationToMask(valueInit, maskInit) + result;
}

const getMemoryAddressesToUpdate = (memoryAddress, decoderVersion, mask) => {
    if (decoderVersion === 1) {
        return [memoryAddress];
    }
    const floatingAddress = addMemoryLocationToMask(decToBin(memoryAddress), mask);
    const getAddresses = (floatingAddress) => {
        
        const nextFloatingDigit = floatingAddress.indexOf('X');
        if (nextFloatingDigit === -1) {
            return [parseInt(floatingAddress, 2)];
        }

        const addressWithZero = floatingAddress.replace(/X/, '0');
        const addressWithOne = floatingAddress.replace(/X/, '1');
        return getAddresses(addressWithZero).concat(getAddresses(addressWithOne));
    }
    return getAddresses(floatingAddress);
}

const runProgram = (input, decoderVersion, currentMask = '', memory = []) => {
    if (input.length === 0) {
        return memory;
    }

    const commandToRun = input[0];
    const parsedCommand = commandToRun.match(/^(\w+)([\[\d+\]]*) = (.*)/);
    const [_, command, param, arg] = parsedCommand;

    if (command === 'mask') {
        currentMask = arg;
    } else if (command === 'mem') {
        const memoryAddress = parseInt(param.replace('[', '').replace(']', ''), 10);
        const addressesToUpdate = getMemoryAddressesToUpdate(memoryAddress, decoderVersion, currentMask);
        const valToSet = decoderVersion === 2 ? decToBin(arg) : addValueToMask(decToBin(arg), currentMask);
        addressesToUpdate.forEach((address) => memory[address] = valToSet);
    }

    return runProgram(input.slice(1), decoderVersion, currentMask, memory);

}

const sumValuesInMemory = (memory) => 
    Object.values(memory).reduce((total, binVal) => binVal != '' ? total + parseInt(binVal, 2) : 0, 0);

const finalMemoryPartOne = runProgram(input, 1);
console.log(`Part one: ${sumValuesInMemory(finalMemoryPartOne)}`);

const finalMemoryPartTwo = runProgram(input, 2);
console.log(`Part two: ${sumValuesInMemory(finalMemoryPartTwo)}`);