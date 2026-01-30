/**
 * Advent Calendar Challenge - Interactive Console Application
 *
 * Main entry point for running daily challenge solutions
 */

import readline from 'readline';
import { solve as solveDay1 } from './solutions/day1.js';
import { solve as solveDay2 } from './solutions/day2.js';

// Map of available days
const AVAILABLE_DAYS = {
    1: { solver: solveDay1, title: "Secret Entrance - Dial Password" },
    2: { solver: solveDay2, title: "Secret Entrance - Mirror Numbers" }
};

/**
 * Create readline interface for user input
 */
function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

/**
 * Display welcome message
 */
function displayWelcome() {
    console.log('\n' + '='.repeat(60));
    console.log('🎄 Advent Calendar Challenge Solutions 🎄');
    console.log('='.repeat(60));
    console.log('\nAvailable Days:');

    Object.entries(AVAILABLE_DAYS).forEach(([day, info]) => {
        console.log(`  ${day}. ${info.title}`);
    });

    console.log('\n' + '='.repeat(60));
}

/**
 * Display solution results
 */
function displayResults(result) {
    console.log('\n' + '='.repeat(60));
    console.log(`Day ${result.day}: ${result.title}`);
    console.log('='.repeat(60));

    if (result.part1 !== null && result.part1 !== undefined) {
        console.log(`\n📍 Part 1 Password: ${result.part1}`);
    }

    if (result.part2 !== null && result.part2 !== undefined) {
        console.log(`📍 Part 2 Password: ${result.part2}`);
    }

    // Display additional details if available
    if (result.details) {
        console.log('\nAdditional Information:');
        if (result.details.mirrorCount) {
            console.log(`  • Found ${result.details.mirrorCount} mirror numbers`);
        }
        if (result.details.sampleMirrors) {
            console.log(`  • Sample mirrors: ${result.details.sampleMirrors.join(', ')}...`);
        }
    }

    console.log('\n' + '='.repeat(60));
}

/**
 * Prompt user for day selection
 */
function promptForDay(rl) {
    return new Promise((resolve) => {
        rl.question('\nSelect a day (1-2) or "q" to quit: ', (answer) => {
            resolve(answer.trim().toLowerCase());
        });
    });
}

/**
 * Solve a specific day
 */
function solveDay(dayNumber) {
    const day = AVAILABLE_DAYS[dayNumber];

    if (!day) {
        console.log(`\n❌ Day ${dayNumber} is not available yet.`);
        return false;
    }

    try {
        console.log(`\n⏳ Solving Day ${dayNumber}...`);
        const result = day.solver();
        displayResults(result);
        return true;
    } catch (error) {
        console.log(`\n❌ Error solving Day ${dayNumber}:`);
        console.log(`   ${error.message}`);
        return false;
    }
}

/**
 * Main application loop
 */
async function main() {
    const rl = createInterface();

    displayWelcome();

    let running = true;

    while (running) {
        const input = await promptForDay(rl);

        if (input === 'q' || input === 'quit' || input === 'exit') {
            console.log('\n👋 Thanks for using Advent Calendar Challenge Solutions!');
            console.log('='.repeat(60) + '\n');
            running = false;
        } else {
            const dayNumber = parseInt(input);

            if (isNaN(dayNumber)) {
                console.log('\n❌ Invalid input. Please enter a number (1-2) or "q" to quit.');
            } else {
                solveDay(dayNumber);
            }
        }
    }

    rl.close();
}

// Run the application
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
