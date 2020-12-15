const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n');

const parseCode = (input) => {
    return input.map((lineOfCode) => {
        const parsedCode = lineOfCode.match(/([a-z]+) ([-+0-9]+)/);
        return {
            op: parsedCode[1],
            arg: parsedCode[2],
        }
    })
}

const runCode = (code, maxAllowedRepeats) => {
    let acc = 0;

    let shouldExit = false;
    let ptr = 0;

    let commandsRan = {};

    while (!shouldExit) {
        const { op, arg } = code[ptr];
        if (commandsRan[ptr] === undefined) {
            commandsRan[ptr] = 0;
        } else {
            commandsRan[ptr]++;
        }

        if (commandsRan[ptr] >= maxAllowedRepeats) {
            return { completed: false, acc };
        }

        switch (op) {
            case 'acc':
                acc += parseInt(arg, 10);
                ptr++;
                break;
            case 'jmp':
                ptr += parseInt(arg, 10);
                break;
            case 'nop':
                ptr++;
                break;
        }

        shouldExit = code[ptr] === undefined;
    }
    return { completed: true, acc };
}

const code = parseCode(input);

// Part one
console.log('** Part One **');
const { completed, acc } = runCode(code, 1);
console.log(`Terminated with acc ${acc}`);

// Part two - Brute force
console.log('** Part Two **');
for (let i = 0; i < code.length; i++) {
    
    if (code[i]['op'] === 'jmp' || code[i]['op'] === 'nop') {
        let oldOp = code[i]['op'];
        code[i]['op'] = code[i]['op'] === 'jmp' ? 'nop' : 'jmp';
        const { completed, acc } = runCode(code, 100);
        if (completed) {
            console.log(`Completed! changed code on line ${i} with accumulator of ${acc}`);
            process.exit();
        }
        code[i]['op'] = oldOp;
    }
}
