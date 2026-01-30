# Advent Calendar Challenge Solutions

A collection of solutions for Advent-style programming challenges, implemented in JavaScript using ES modules.

## Project Structure

```
Adventcal/
├── index.js              # Interactive console application (main entry point)
├── solutions/            # Individual solution files for each day
│   ├── day1.js          # Day 1: Dial Password
│   └── day2.js          # Day 2: Mirror Numbers
├── adventutils.js        # Utility functions for file parsing and data processing
├── problem_files/        # Input data files for each challenge
├── tests/                # Test suite for all solutions
│   ├── adventutils.test.js   # Unit tests for utilities
│   └── solutions.test.js     # Integration tests for solutions
├── package.json          # Project configuration and dependencies
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Setup

### Prerequisites
- Node.js v14 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/derekhurrenkelly/adventcal.git
cd Adventcal

# Install dependencies (if any added later)
npm install
```

## Running Solutions

### Interactive Console Application

The main application provides an interactive menu to run solutions for any day:

```bash
npm start
# or
node index.js
```

This will:
1. Display a menu of available days
2. Prompt you to select a day (1-2)
3. Display both Part 1 and Part 2 passwords for that day
4. Allow you to run another day or quit with 'q'

### Run Tests

```bash
# Run all tests (utils + solutions)
npm test

# Run only utility tests
npm run test:utils

# Run only solution tests
npm run test:solutions
```

## Challenge Solutions

### Day 1: Secret Entrance - Dial Password

**Problem:** Calculate how many times a series of dial instructions (L/R + number) causes the password to land on 0.

**Input Format:** Text file with directions like `R10`, `L25`, etc.

**Part 1:** Count how many times the dial lands exactly on 0 after completing each action.
- Starting position: 50
- Dial range: 0-99 (wraps around)
- **Solution:** 1074

**Part 2:** Count how many times the dial passes through 0 during actions (including intermediate positions).
- Must account for multiple wraps within a single action
- **Solution:** 6254

**Key Concepts:**
- Modular arithmetic for circular dial behavior
- Counting zero-crossings in circular motion
- Edge cases: starting on 0, distance > 100

**Implementation:**
Located in `solutions/day1.js` with exported `solve()` function that returns both parts.

---

### Day 2: Secret Entrance - Mirror Numbers

**Problem:** Find all "mirror numbers" within given ranges and sum them.

**Input Format:** Comma-separated ranges like `1-100`, `500-1000`

**Mirror Number Definition:** A number where the first half of digits exactly matches the second half.
- Examples: `11`, `5555`, `123123`, `89458945`
- Must have even number of digits

**Part 1:** Find all mirror numbers in the given ranges and sum them.
- **Solution:** 26,255,179,562...

**Key Concepts:**
- String manipulation for digit comparison
- Range iteration and validation
- Even-length number filtering

**Implementation:**
Located in `solutions/day2.js` with exported `solve()` function.

Helper functions:
- `isMirrorNumber(s)` - Validates if a number is a mirror number
- `processMirrorRange(min, max)` - Finds all mirrors in a range

---

## Utilities

### `adventutils.js`

#### `parseFileToArray(filePath, separator = '\n')`
Reads a file and returns an array of non-empty lines.

**Parameters:**
- `filePath` (string): Path to the file relative to project root
- `separator` (string): Character(s) to split on (default: newline)

**Returns:** Array of strings

**Example:**
```javascript
import { parseFileToArray } from './adventutils.js';

// Parse line-by-line
const lines = parseFileToArray('./problem_files/problem_1');

// Parse comma-separated
const values = parseFileToArray('./problem_files/problem_2', ',');
```

## Development Guidelines

### Code Style
- Use ES modules (`import`/`export`)
- Descriptive function names indicating the challenge
- Comments explaining complex logic
- Separate helper functions for reusable logic

### Testing
- Unit tests for all utility functions
- Integration tests for complete solutions
- Edge case validation
- Example data tests

### Version Control
- Commit working solutions incrementally
- Tag each completed challenge
- Document approach in commit messages

## Adding New Days

To add a new day's solution:

1. Create a new file in `solutions/` (e.g., `day3.js`)
2. Implement the solution with an exported `solve()` function:
   ```javascript
   export function solve() {
       return {
           day: 3,
           title: "Your Challenge Title",
           part1: solvePart1(),
           part2: solvePart2()
       };
   }
   ```
3. Import and add to `AVAILABLE_DAYS` in `index.js`
4. Add tests to `tests/solutions.test.js`
5. Update this README

## Future Enhancements

- [ ] Add more comprehensive test coverage
- [ ] Add performance benchmarking
- [ ] Visualizations for problem solutions
- [ ] Support for alternate input formats

## License

ISC

## Author

Derek Hurren Kelly <d.abrenyx@gmail.com>
