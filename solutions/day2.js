/**
 * Day 2: Secret Entrance - Mirror Numbers
 *
 * Problem: Find all "mirror numbers" within given ranges and sum them.
 * Mirror Number: A number where the first half of digits exactly matches the second half.
 * No AI Used here (aside from clean up/ refactoring)
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
 * Get list of divisors of a number
 * Code completed with AI assistance
 */
function getDivisors(n) {
    const divisors = new Set();
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            divisors.add(i);
            divisors.add(n / i);
        }
    }
    return Array.from(divisors).sort((a, b) => a - b);
}   

/**
 * Check if a number is made of a repeated pattern
 */
function isRepeatedPattern(value, divisors) {
    const s = String(value);
    const n = s.length;

    for (const d of divisors) {
        // skip full length and zero
        if (d === 0 || d === n) continue;

        // must repeat at least twice
        if (n % d !== 0) continue;

        const chunk = s.slice(0, d);
        const repeats = n / d;

        if (chunk.repeat(repeats) === s) {
            return true; // matches repeated pattern
        }
    }

    return false;
}

/**
 * Part 2: Find all invalid IDs (repetitive patterns) in the ranges
 * Now checking ALL numbers in ranges, not just mirror numbers
 */
function solvePart2() {
    const ranges = parseFileToArray('./problem_files/problem_2', ',');
    let allInvalidIds = [];

    ranges.forEach(range => {
        const parts = range.split('-');

        if (parts.length !== 2) {
            console.log("Invalid input: " + range);
            return;
        }

        const min = parseInt(parts[0]);
        const max = parseInt(parts[1]);

        // Check ALL numbers in the range for repetitive patterns
        for (let i = min; i <= max; i++) {
            const string_divisors = getDivisors(i.toString().length);
            if (isRepeatedPattern(i, string_divisors)) {
                allInvalidIds.push(i);
            }
        }
    });

    const sum = allInvalidIds.reduce((total, n) => total + n, 0);

    return {
        sum
    };
}

/**
 * Solve both parts and return results
 */
export function solve() {
    const part1Result = solvePart1();
    const part2Result = solvePart2();

    return {
        day: 2,
        title: "Secret Entrance - Mirror Numbers",
        part1: part1Result.sum,
        part2: part2Result.sum, 
    };
}