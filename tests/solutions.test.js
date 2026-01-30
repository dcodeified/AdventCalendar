/**
 * Integration tests for challenge solutions
 * Tests with known sample data to verify algorithm correctness
 * Run with: node tests/solutions.test.js
 */

import { solve as solveDay1 } from '../solutions/day1.js';
import { solve as solveDay2 } from '../solutions/day2.js';

// Simple test framework
class TestRunner {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.tests = [];
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log('\n🧪 Running Integration Tests\n');
        console.log('='.repeat(60));

        for (const { name, fn } of this.tests) {
            try {
                await fn();
                this.passed++;
                console.log(`✓ ${name}`);
            } catch (error) {
                this.failed++;
                console.log(`✗ ${name}`);
                console.log(`  Error: ${error.message}`);
            }
        }

        console.log('='.repeat(60));
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed\n`);

        return this.failed === 0;
    }
}

function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(
            message ||
            `Expected ${expected} but got ${actual}`
        );
    }
}

const runner = new TestRunner();

// =============================================================================
// Day 1 Tests: Dial Password
// =============================================================================

runner.test('Day 1 - Complete solution returns correct structure', () => {
    const result = solveDay1();

    assertEquals(typeof result, 'object', 'Result should be an object');
    assertEquals(result.day, 1, 'Day should be 1');
    assertEquals(typeof result.title, 'string', 'Title should be a string');
    assertEquals(typeof result.part1, 'number', 'Part 1 should return a number');
    assertEquals(typeof result.part2, 'number', 'Part 2 should return a number');
});

runner.test('Day 1 - Part 1 returns known answer', () => {
    const result = solveDay1();
    assertEquals(result.part1, 1074, 'Part 1 answer should be 1074');
});

runner.test('Day 1 - Part 2 returns known answer', () => {
    const result = solveDay1();
    assertEquals(result.part2, 6254, 'Part 2 answer should be 6254');
});

runner.test('Day 1 - Basic wrap around logic', () => {
    function countZeroLandings(actions) {
        let base = 50;
        let count = 0;

        for (const action of actions) {
            const direction = action[0];
            const distance = parseInt(action.slice(1));

            if (direction === 'R') base += distance;
            if (direction === 'L') base -= distance;

            base = ((base % 100) + 100) % 100;

            if (base === 0) count++;
        }

        return count;
    }

    // Test case: Should land on 0 once
    const result = countZeroLandings(['R50']);
    assertEquals(result, 1, 'R50 from position 50 should land on 0');
});

runner.test('Day 1 - Zero crossing logic', () => {
    function wrap100(x) {
        return ((x % 100) + 100) % 100;
    }

    function countZeroClicks(base, direction, distance) {
        if (!Number.isFinite(distance) || distance <= 0) return 0;

        base = wrap100(base);

        let t0;
        if (direction === 'R') {
            t0 = (100 - base) % 100;
        } else if (direction === 'L') {
            t0 = base % 100;
        }

        if (t0 === 0) t0 = 100;

        if (distance < t0) return 0;
        return 1 + Math.floor((distance - t0) / 100);
    }

    // Test: R50 from position 50 crosses 0 once
    assertEquals(countZeroClicks(50, 'R', 50), 1);

    // Test: R150 from position 50 crosses 0 twice
    assertEquals(countZeroClicks(50, 'R', 150), 2);

    // Test: R25 from position 50 doesn't cross 0
    assertEquals(countZeroClicks(50, 'R', 25), 0);

    // Test: L50 from position 50 crosses 0 once
    assertEquals(countZeroClicks(50, 'L', 50), 1);
});

// =============================================================================
// Day 2 Tests: Mirror Numbers
// =============================================================================

runner.test('Day 2 - Complete solution returns correct structure', () => {
    const result = solveDay2();

    assertEquals(typeof result, 'object', 'Result should be an object');
    assertEquals(result.day, 2, 'Day should be 2');
    assertEquals(typeof result.title, 'string', 'Title should be a string');
    assertEquals(typeof result.part1, 'number', 'Part 1 should return a number');
});

runner.test('Day 2 - Part 1 returns known answer', () => {
    const result = solveDay2();
    assertEquals(result.part1, 26255179562, 'Part 1 answer should be 26255179562');
});

runner.test('Day 2 - isMirrorNumber validation', () => {
    function isMirrorNumber(s) {
        if (s.length % 2 !== 0) return false;

        let splitIndex = s.length / 2;
        return s.slice(0, splitIndex) === s.slice(splitIndex);
    }

    // Valid mirror numbers
    assertEquals(isMirrorNumber('11'), true, '11 is a mirror');
    assertEquals(isMirrorNumber('5555'), true, '5555 is a mirror');
    assertEquals(isMirrorNumber('123123'), true, '123123 is a mirror');
    assertEquals(isMirrorNumber('89458945'), true, '89458945 is a mirror');

    // Invalid mirror numbers
    assertEquals(isMirrorNumber('12'), false, '12 is not a mirror');
    assertEquals(isMirrorNumber('123'), false, 'Odd length is not a mirror');
    assertEquals(isMirrorNumber('1234'), false, '1234 is not a mirror');
    assertEquals(isMirrorNumber('123456'), false, '123456 is not a mirror');
});

runner.test('Day 2 - Find mirrors in range', () => {
    function isMirrorNumber(s) {
        if (s.length % 2 !== 0) return false;
        let splitIndex = s.length / 2;
        return s.slice(0, splitIndex) === s.slice(splitIndex);
    }

    function findMirrorsInRange(min, max) {
        const mirrors = [];
        for (let i = min; i <= max; i++) {
            if (isMirrorNumber(`${i}`)) {
                mirrors.push(i);
            }
        }
        return mirrors;
    }

    // Test small range
    const result = findMirrorsInRange(10, 20);
    assertEquals(JSON.stringify(result), JSON.stringify([11]),
        'Range 10-20 should only contain 11');

    // Test range with multiple mirrors
    const result2 = findMirrorsInRange(10, 100);
    const expected = [11, 22, 33, 44, 55, 66, 77, 88, 99];
    assertEquals(JSON.stringify(result2), JSON.stringify(expected),
        'Range 10-100 should contain 11, 22, ..., 99');
});

runner.test('Day 2 - Sum of mirrors', () => {
    function isMirrorNumber(s) {
        if (s.length % 2 !== 0) return false;
        let splitIndex = s.length / 2;
        return s.slice(0, splitIndex) === s.slice(splitIndex);
    }

    function sumMirrorsInRange(min, max) {
        let sum = 0;
        for (let i = min; i <= max; i++) {
            if (isMirrorNumber(`${i}`)) {
                sum += i;
            }
        }
        return sum;
    }

    // Sum of 11, 22, ..., 99 = 495
    const result = sumMirrorsInRange(10, 100);
    assertEquals(result, 495, 'Sum of mirrors 10-100 should be 495');
});

// Run all tests
runner.run().then(success => {
    process.exit(success ? 0 : 1);
});
