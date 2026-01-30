/**
 * Day 1: Secret Entrance - Dial Password
 *
 * Problem: Calculate how many times a series of dial instructions
 * causes the password to land on or pass through 0.
 */

import { parseFileToArray } from '../adventutils.js';

/**
 * Part 1: Count how many times the dial lands exactly on 0
 * Answer: 1074
 * AI only used for restructuring
 */
function solvePart1() {
    const actions = parseFileToArray('./problem_files/problem_1');

    let base = 50; // Starting position
    let password = 0;

    actions.forEach(action => {
        const direction = action[0];
        const distance = parseInt(action.slice(1));

        // Sanity checks
        if (!['L', 'R'].includes(direction) || isNaN(distance)) {
            console.log("Invalid action detected: " + action);
            return;
        }

        if (direction === 'R') {
            base += distance;
        } else if (direction === 'L') {
            base -= distance;
        }

        // Wrap around (manage negative numbers)
        base = ((base % 100) + 100) % 100;

        if (base === 0) {
            password += 1;
        }
    });

    return password;
}

/**
 * Part 2: Count how many times the dial passes through 0 (including intermediate positions)
 * Rubber duck solutioned with Claude
 * Answer: 6254
 */
function solvePart2() {
    function wrap100(x) {
        return ((x % 100) + 100) % 100;
    }

    // Count how many clicks within this action land exactly on 0
    function countZeroClicks(base, direction, distance) {
        if (!Number.isFinite(distance) || distance <= 0) return 0;

        base = wrap100(base);

        let t0;
        if (direction === 'R') {
            t0 = (100 - base) % 100;
        } else if (direction === 'L') {
            t0 = base % 100;
        } else {
            throw new Error(`Invalid direction: ${direction}`);
        }

        // t0 == 0 means "starting on 0", which is not a click
        // First click that lands on 0 is at t=100
        if (t0 === 0) t0 = 100;

        if (distance < t0) return 0;
        return 1 + Math.floor((distance - t0) / 100);
    }

    const actions = parseFileToArray('./problem_files/problem_1');

    let base = 50;
    let password = 0;

    for (const action of actions) {
        const direction = action[0];
        const distance = parseInt(action.slice(1), 10);

        if (!['L', 'R'].includes(direction) || Number.isNaN(distance)) {
            throw new Error(`Invalid action: ${action}`);
        }

        const hits = countZeroClicks(base, direction, distance);
        password += hits;

        // Update base using the full distance
        base = direction === 'R'
            ? wrap100(base + distance)
            : wrap100(base - distance);
    }

    return password;
}

/**
 * Solve both parts and return results
 */
export function solve() {
    const part1 = solvePart1();
    const part2 = solvePart2();

    return {
        day: 1,
        title: "Secret Entrance - Dial Password",
        part1,
        part2
    };
}
