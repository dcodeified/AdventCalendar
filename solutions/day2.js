/**
 * Day 2: Secret Entrance - Mirror Numbers
 *
 * Problem: Find all "mirror numbers" within given ranges and sum them.
 * Mirror Number: A number where the first half of digits exactly matches the second half.
 */

import { parseFileToArray } from '../adventutils.js';

/**
 * Determine if a number is a valid mirror number
 */
function isMirrorNumber(s) {
    // Uneven digit counts cannot be mirror numbers
    if (s.length % 2 !== 0) return false;

    const splitIndex = s.length / 2;
    return s.slice(0, splitIndex) === s.slice(splitIndex);
}

/**
 * Process a range and find all mirror numbers
 */
function processMirrorRange(min, max) {
    const mirrors = [];

    for (let i = min; i <= max; i++) {
        if (isMirrorNumber(`${i}`)) {
            mirrors.push(i);
        }
    }

    return mirrors;
}

/**
 * Part 1: Find all mirror numbers in the given ranges and sum them
 * Answer: 26,255,179,562
 */
function solvePart1() {
    const ranges = parseFileToArray('./problem_files/problem_2', ',');
    let allMirrors = [];

    ranges.forEach(range => {
        // Action format expected to be n-n
        const parts = range.split('-');

        if (parts.length !== 2) {
            console.log("Invalid input: " + range);
            return;
        }

        const min = parseInt(parts[0]);
        const max = parseInt(parts[1]);

        const mirrors = processMirrorRange(min, max);
        allMirrors = allMirrors.concat(mirrors);
    });

    const sum = allMirrors.reduce((total, n) => total + n, 0);

    return {
        mirrors: allMirrors,
        sum
    };
}

/**
 * Part 2: Not yet implemented
 */
function solvePart2() {
    // Placeholder for part 2
    return null;
}

/**
 * Solve both parts and return results
 */
export function solve() {
    const part1Result = solvePart1();

    return {
        day: 2,
        title: "Secret Entrance - Mirror Numbers",
        part1: part1Result.sum,
        part2: solvePart2(),
        details: {
            mirrorCount: part1Result.mirrors.length,
            // Store first few mirrors for display
            sampleMirrors: part1Result.mirrors.slice(0, 10)
        }
    };
}
