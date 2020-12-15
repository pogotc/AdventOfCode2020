var { crt } = require('nodejs-chinese-remainder');
const fs = require('fs');

const input = fs
    .readFileSync('fullinput.txt')
    .toString('utf8')
    .split('\n');

const [departureTimeStr, busIdStr] = input;

const busIds = busIdStr
                .split(',')
                .filter(x => x != 'x')
                .map(x => parseInt(x, 10));

const departureTime = parseInt(departureTimeStr, 10);

const findNextDepartingBus = (timeToCheck, busIds) => {
    const matchingTimes = busIds.filter(busId => timeToCheck % busId === 0);
    if (matchingTimes.length) {
        return {
            busId: matchingTimes[0],
            departureTime: timeToCheck
        }
    }
    return findNextDepartingBus(timeToCheck + 1, busIds);
}

const nextBus = findNextDepartingBus(departureTime, busIds);
const waitTime = nextBus.departureTime - departureTime;
console.log(`Part one ${nextBus.busId * waitTime}`);

// console.log(crt([7, 13, 59, 31, 19], [0, 13-1, 59-4, 31-6, 19-7]));

// console.log(busIdStr);
// const ids = [17, 'x', 13, 19];

const nums = busIdStr.split(',').map((num, idx) => {
    let target = 0;
    if (idx > 0) {
        target = num - idx;
    }

    // console.log(`${num} - ${idx} = ${target}`)
    return {
        target,
        mod: num
    }
}).filter(x => x.mod !== 'x');

let a = [];
let n = [];

nums.forEach((val) => {
    a.push(BigInt(val.target));
    n.push(BigInt(val.mod));
})
console.log(a, n);
console.log(crt(a, n));

// 2178824463005425 == too high

// 487905974205117