const fs = require('fs');
const lines = fs.readFileSync('sem_02_labrab_01.csv', 'utf8').trim().split('\n');
console.log('Номер строки | Содержимое строки');
lines.forEach((line, i) => {
    const nums = line.split(' ').map(Number);
    const freq = {};
    nums.forEach(num => {
        freq[num] = (freq[num] || 0) + 1;
    });
    let tripleNum = null;
    const singleNums = [];
    for (const num in freq) {
        if (freq[num] === 3) {
            tripleNum = Number(num);
        } else if (freq[num] === 1) {
            singleNums.push(Number(num));
        }
    }
    if (tripleNum !== null && singleNums.length === 3) {
        const avgSingle = singleNums.reduce((sum, num) => sum + num, 0) / 3;
        if (tripleNum > avgSingle) {
            console.log(`${(i + 1).toString().padStart(12)} | ${line}`);
        }
    }
});