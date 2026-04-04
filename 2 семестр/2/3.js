const fs = require('fs');
console.log('Номер строки | Содержимое строки');
fs.readFileSync('sem_02_labrab_01.csv', 'utf8').trim().split('\n')
    .forEach((line, i) => {
        if (!line.trim()) return;
        const freq = new Map();
        line.split(' ').map(Number).forEach(n => freq.set(n, (freq.get(n) || 0) + 1));
        const d = [...freq].filter(([_, c]) => c === 2).map(([n]) => n);
        const s = [...freq].filter(([_, c]) => c === 1).map(([n]) => n);
        if (d.length === 2 && s.length === 2 && d[0] + d[1] < s[0] + s[1]) {
            console.log(`${(i + 1).toString().padStart(12)} | ${line}`);
        }
    });