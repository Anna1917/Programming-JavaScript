import { readFileSync } from 'fs';

export const readDataCsv = (filename) => 
    readFileSync(filename, 'utf8')
        .split(/\r?\n/)
        .filter(line => line.trim())
        .map(Number);