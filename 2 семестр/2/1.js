const fs = require('fs');
const lines = fs.readFileSync('sem_02_labrab_01.csv', 'utf8').trim().split('\n');
lines.forEach((line, i) => {
    const nums = line.split(' ').map(Number);
    const set = new Set(nums);
    const sorted = [...nums].toSorted((a, b) => a - b);
    const allOdd = nums.every(n => n % 2 === 1);
    const allUnique = set.size === nums.length;
    const ascending = nums.join() === sorted.join();
    if (allOdd && allUnique && ascending) {
        console.log(i + 1);
    }
});