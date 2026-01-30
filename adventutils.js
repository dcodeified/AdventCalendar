//util file to parse input files and provide utility classes

import fs from 'fs';

export function parseFileToArray(filePath, separator = '\n'){
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split(separator)
        .map(line => line.trim())
        .filter(line => line !== '');
}

