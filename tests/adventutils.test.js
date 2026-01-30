/**
 * Unit tests for adventutils.js
 * Run with: node tests/adventutils.test.js
 */

import { parseFileToArray } from '../adventutils.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        console.log('\n🧪 Running Tests for adventutils.js\n');
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

function assertArrayEquals(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
            message ||
            `Expected [${expected.join(', ')}] but got [${actual.join(', ')}]`
        );
    }
}

// Create test runner
const runner = new TestRunner();

// Create temporary test files
const testDir = join(__dirname, 'temp');
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
}

// Test 1: Parse newline-separated file
runner.test('parseFileToArray - newline separator', () => {
    const testFile = join(testDir, 'test_newlines.txt');
    fs.writeFileSync(testFile, 'line1\nline2\nline3\n');

    const result = parseFileToArray(testFile);
    assertArrayEquals(result, ['line1', 'line2', 'line3']);

    fs.unlinkSync(testFile);
});

// Test 2: Parse comma-separated file
runner.test('parseFileToArray - comma separator', () => {
    const testFile = join(testDir, 'test_commas.txt');
    fs.writeFileSync(testFile, 'val1,val2,val3');

    const result = parseFileToArray(testFile, ',');
    assertArrayEquals(result, ['val1', 'val2', 'val3']);

    fs.unlinkSync(testFile);
});

// Test 3: Handle empty lines
runner.test('parseFileToArray - filters empty lines', () => {
    const testFile = join(testDir, 'test_empty.txt');
    fs.writeFileSync(testFile, 'line1\n\nline2\n  \nline3');

    const result = parseFileToArray(testFile);
    assertArrayEquals(result, ['line1', 'line2', 'line3']);

    fs.unlinkSync(testFile);
});

// Test 4: Handle whitespace trimming
runner.test('parseFileToArray - trims whitespace', () => {
    const testFile = join(testDir, 'test_whitespace.txt');
    fs.writeFileSync(testFile, '  line1  \n  line2  \n  line3  ');

    const result = parseFileToArray(testFile);
    assertArrayEquals(result, ['line1', 'line2', 'line3']);

    fs.unlinkSync(testFile);
});

// Test 5: Handle file with only empty content
runner.test('parseFileToArray - empty file returns empty array', () => {
    const testFile = join(testDir, 'test_empty_file.txt');
    fs.writeFileSync(testFile, '\n\n\n');

    const result = parseFileToArray(testFile);
    assertArrayEquals(result, []);

    fs.unlinkSync(testFile);
});

// Test 6: Handle single value
runner.test('parseFileToArray - single value', () => {
    const testFile = join(testDir, 'test_single.txt');
    fs.writeFileSync(testFile, 'single');

    const result = parseFileToArray(testFile);
    assertArrayEquals(result, ['single']);

    fs.unlinkSync(testFile);
});

// Run all tests
runner.run().then(success => {
    // Cleanup
    if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true });
    }

    process.exit(success ? 0 : 1);
});
