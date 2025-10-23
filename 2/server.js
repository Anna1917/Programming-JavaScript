import { createServer } from 'http';
import { readdirSync } from 'fs';
import { parse } from 'url';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getDistribution, toPercentage } from './Lab1_module.js';
import { readDataCsv } from './moduleReadData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HOST = 'localhost';
const PORT = 3000;

const onEvent = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    const { pathname } = parse(req.url);
    const filename = pathname.slice(1);
    
    // Главная страница
    if (!filename || filename === 'index') {
        const filesPath = join(__dirname, 'files');
        const csvFiles = readdirSync(filesPath).filter(file => file.endsWith('.csv'));
        
        res.write(`
            <h1>Лабораторная работа №2</h1>
            <p>Доступные CSV файлы:</p>
            <ul>
                ${csvFiles.map(file => `<li><a href="/${file}">${file}</a></li>`).join('')}
            </ul>
        `);
        return res.end();
    }
    
    // Обработка CSV файлов
    if (!filename.endsWith('.csv')) {
        res.write(`
            <p>Укажите CSV файл в запросе, например: <a href="/data1.csv">/data1.csv</a></p>
            <p><a href="/">← На главную</a></p>
        `);
        return res.end();
    }
    
    try {
        const filePath = join(__dirname, 'files', filename);
        const checkValues = readDataCsv(filePath);
        const results = Array.from({ length: 10 }, () => new Array(checkValues.length));
        
        checkValues.forEach((amount, i) => {
            const numbers = getDistribution(amount);
            Object.keys(numbers).forEach(key => {
                const per = toPercentage(numbers[key], amount / 10);
                results[key][i] = per.toFixed(2);
            });
        });
        
        const tableHTML = `
            <h1>Результаты для: ${filename}</h1>
            <p><a href="/">← На главную</a></p>
            <h2>Отклонения от равномерного распределения (%)</h2>
            <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse;">
                <tr><th>Цифра</th>${checkValues.map(v => `<th>${v}</th>`).join('')}</tr>
                ${results.map((row, ind) => `
                    <tr>
                        <td><b>${ind}</b></td>
                        ${row.map(val => `<td>${val || ''}%</td>`).join('')}
                    </tr>
                `).join('')}
            </table>
        `;
        
        res.write(tableHTML);
    } catch (err) {
        res.write(`
            <p>❌ Ошибка: ${err.message}</p>
            <p><a href="/">← На главную</a></p>
        `);
    }
    res.end();
}

createServer(onEvent).listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://${HOST}:${PORT}/`);
});