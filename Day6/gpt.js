const fs = require('fs');

// Helper function to find the guard's starting position and initial direction
function findGuardPositionAndDirection(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '^') {
                return { x, y, direction: '^' };
            } else if (map[y][x] === '>') {
                return { x, y, direction: '>' };
            } else if (map[y][x] === 'v') {
                return { x, y, direction: 'v' };
            } else if (map[y][x] === '<') {
                return { x, y, direction: '<' };
            }
        }
    }
    return null;
}

// Helper function to check if a position is within bounds
function outOfBounds(x, y, map) {
    return y < 0 || y >= map.length || x < 0 || x >= map[y].length;
}

// Helper function to move the guard based on its current direction
function move(x, y, direction) {
    if (direction === '^') return { x, y: y - 1 };
    if (direction === '>') return { x: x + 1, y };
    if (direction === 'v') return { x, y: y + 1 };
    if (direction === '<') return { x: x - 1, y };
    return { x, y }; // If no valid direction, return original position
}

// Function to simulate the guard's movement based on the rules
function simulateGuardPath(map) {
    const visited = new Set();
    let { x, y, direction } = findGuardPositionAndDirection(map);
    const path = [];
    while (true) {
        // If the current position is out of bounds or an obstacle, stop
        if (outOfBounds(x, y, map) || map[y][x] === '#') break;
        
        // Mark the position as visited
        const posKey = `${x},${y},${direction}`;
        if (visited.has(posKey)) return path; // If we revisit a position, return the path
        visited.add(posKey);

        // Add the position to the path
        path.push({ x, y });

        // Move the guard based on the current direction
        const nextPos = move(x, y, direction);
        x = nextPos.x;
        y = nextPos.y;

        // If there's an obstacle in front, turn right
        if (map[y][x] === '#') {
            if (direction === '^') direction = '>';
            else if (direction === '>') direction = 'v';
            else if (direction === 'v') direction = '<';
            else if (direction === '<') direction = '^';
        }
    }
    return path;
}

// Function to find possible positions for new obstructions
function findPossiblePositions(map, visitedPositions) {
    const possiblePositions = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            // Check if the spot is empty and not visited by the guard
            if (map[y][x] === '.' && !visitedPositions.some(pos => pos.x === x && pos.y === y)) {
                possiblePositions.push({ x, y });
            }
        }
    }
    return possiblePositions;
}

// Main function to solve the puzzle
function solve(map) {
    // Simulate the guard's path
    const visitedPositions = simulateGuardPath(map);

    // Find possible positions to add an obstruction
    const possiblePositions = findPossiblePositions(map, visitedPositions);
    return possiblePositions.length;
}

// Function to read input from file
function readInputFromFile(filename) {
    const map = fs.readFileSync(filename, 'utf-8').split('\n').map(line => line.trim());
    return map;
}

// Read the map from the file 'input.txt'
const map = readInputFromFile('input.txt');

// Output the result
console.log(solve(map)); // This will print the number of possible positions for new obstructions
