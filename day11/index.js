const fs = require('fs');

const input = fs
                .readFileSync('fullinput.txt')
                .toString('utf8')
                .split('\n')
                .map(x => x.split(''));

const countAdjacentOccupiedCells = (grid, cellCol, cellRow) => {
    let count = 0;
    
    for (let fromCellRow = Math.max(cellRow - 1, 0); fromCellRow <= Math.min(grid.length - 1, cellRow + 1); fromCellRow++) {
        const row = grid[fromCellRow];
        for (let fromCellCol = Math.max(cellCol - 1, 0); fromCellCol <= Math.min(row.length - 1, cellCol + 1); fromCellCol++) {
            if (fromCellCol != cellCol || fromCellRow != cellRow) {
                if (row[fromCellCol] === '#') {
                    count++;
                }
            }
        }
    }
    return count;
}

const countVisibleOccupiedCells = (grid, cellCol, cellRow) => {
    const scanDir = (grid, col, row) => (colDir, rowDir) => {
        if (grid[row + rowDir] === undefined || grid[row + rowDir][col + colDir] === undefined) {
            return 0;
        }

        const cell = grid[row + rowDir][col + colDir];
        if (cell === '#') {
            return 1;
        } else if (cell === 'L') {
            return 0;
        }
        return scanDir(grid, col + colDir, row + rowDir)(colDir, rowDir);
    }
    const scan = scanDir(grid, cellCol, cellRow);
    const occupiedCells = [
        scan(-1, -1),
        scan(0, -1),
        scan(1, -1),
        scan(-1, 0),
        scan(1, 0),
        scan(-1, 1),
        scan(0, 1),
        scan(1, 1),
    ].reduce((total, count) => total + count, 0);
    return occupiedCells;
}

const applyRules = (countFn, occupiedCellThreshold) => (grid) => {
    const newState = [];
    for (let row = 0; row < grid.length; row++) {
        newState[row] = [];
        for (let col = 0; col < grid[row].length; col++) {
            const cell = grid[row][col];
            const adjacentCells = countFn(grid, col, row);
            let newCellState = cell;
            if (cell === 'L' && adjacentCells === 0) {
                newCellState = '#';
            } else if (cell === '#' && adjacentCells >= occupiedCellThreshold) {
                newCellState = 'L';
            }
            newState[row][col] = newCellState;
        }
    }
    return newState;
}

const getTotalOccupiedSeats = (state) => {
    return state.map((row) => {
        return row.reduce((total, seat) => seat === '#' ? total + 1 : total, 0);
    }).reduce((total, rowcount) => total + rowcount, 0);
}

const statesAreEqual = (a, b) => {
    const stateToStr = (state) => state.map(x => x.join('|')).join('*');
    return stateToStr(a) === stateToStr(b);
}

const findStableState = (rulesFn, input) => {
    const newState = rulesFn(input);
    if (statesAreEqual(input, newState)) {
        return newState;
    }
    return findStableState(rulesFn, newState);
}


const applyRulesWithAdjacentSeat = applyRules(countAdjacentOccupiedCells, 4);
const stableState = findStableState(applyRulesWithAdjacentSeat, input);
const totalOccupiedSeats = getTotalOccupiedSeats(stableState);
console.log(`Part one: ${totalOccupiedSeats}`);

const applyRulesWithVisibleSeats = applyRules(countVisibleOccupiedCells, 5);
const stableState2 = findStableState(applyRulesWithVisibleSeats, input);
const totalOccupiedSeats2 = getTotalOccupiedSeats(stableState2);
console.log(`Part two: ${totalOccupiedSeats2}`);
