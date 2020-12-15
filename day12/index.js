const fs = require('fs');

const input = fs
    .readFileSync('fullinput.txt')
    .toString('utf8')
    .split('\n');

const shipLocation = {
    east: 0,
    north: 0,
    angle: 90,
    waypoint: {
        east: 0,
        north: 0
    }
};

const moveShipPartOne = (shipLocation, shipAction) => {
    const [_, action, valueStr] = shipAction.match(/([A-Z])(\d+)/);
    const value = parseInt(valueStr, 10);
    const newLocation = {...shipLocation};

    switch (action) {
        case 'N':
            newLocation.north += value;
            break;
        case 'S':
            newLocation.north -= value;
            break;
        case 'E':
            newLocation.east += value;
            break;
        case 'W':
            newLocation.east -= value;
            break;
        case 'L':
            newLocation.angle -= value;
            break;
        case 'R':
            newLocation.angle += value;
            break;
        case 'F':
            const angleInRads = shipLocation.angle * Math.PI / 180;
            const x = Math.round(Math.sin(angleInRads));
            const y = Math.round(Math.cos(angleInRads));
            newLocation.east += x * value;
            newLocation.north += y * value;
    }
    return newLocation;
}

const rotatePointBy = (x, y, angle) => {
    const angleInRads = angle * Math.PI / 180;
    const sinA = Math.sin(angleInRads);
    const cosA = Math.cos(angleInRads);
            
    return {
        x: Math.round(x * cosA - y * sinA),
        y: Math.round(x * sinA + y * cosA)
    }
}

const moveShipPartTwo = (shipLocation, shipAction) => {
    const [_, action, valueStr] = shipAction.match(/([A-Z])(\d+)/);
    const value = parseInt(valueStr, 10);
    const newLocation = {
        ...shipLocation,
        waypoint: {...shipLocation.waypoint}
    };

    let newPosition;

    switch (action) {
        case 'N':
            newLocation.waypoint.north += value;
            break;
        case 'S':
            newLocation.waypoint.north -= value;
            break;
        case 'E':
            newLocation.waypoint.east += value;
            break;
        case 'W':
            newLocation.waypoint.east -= value;
            break;
        case 'L':
            newPosition = rotatePointBy(shipLocation.waypoint.east, shipLocation.waypoint.north, value);
            newLocation.waypoint.east = newPosition.x;
            newLocation.waypoint.north = newPosition.y;
            break;
        case 'R':
            newPosition = rotatePointBy(shipLocation.waypoint.east, shipLocation.waypoint.north, -value);
            newLocation.waypoint.east = newPosition.x;
            newLocation.waypoint.north = newPosition.y;
            break;
        case 'F':
            newLocation.north += shipLocation.waypoint.north * value;
            newLocation.east += shipLocation.waypoint.east * value;
            
    }
    return newLocation;
}

const applyMovesToShipLocation = (moves, shipLocation, moveShipFunc) => {
    if (moves === undefined || moves.length === 0) {
        return shipLocation;
    }

    const moveToApply = moves[0];
    const remainingMoves = moves.slice(1);

    const newState = moveShipFunc(shipLocation, moveToApply);
    return applyMovesToShipLocation(remainingMoves, newState, moveShipFunc);
}

const calculateManhattenDistance = (shipLocation) => Math.abs(shipLocation.east) + Math.abs(shipLocation.north);


const finalState = applyMovesToShipLocation(input, shipLocation, moveShipPartOne);
const manhattenDistance = calculateManhattenDistance(finalState);

console.log(`Part one: ${manhattenDistance}`);


shipLocation.north = 0;
shipLocation.east = 0;
shipLocation.waypoint.east = 10;
shipLocation.waypoint.north = 1;

const finalStateTwo = applyMovesToShipLocation(input, shipLocation, moveShipPartTwo);
const manhattenDistanceTwo = calculateManhattenDistance(finalStateTwo);

console.log(`Part two: ${manhattenDistanceTwo}`);
