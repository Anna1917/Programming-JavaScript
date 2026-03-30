const users = [
    "Иванов Иван Иванович",
    "Петров Пётр Сергеевич",
    "Сидоров Семен Семенович",
    "Фёдоров Федор Федорович"
];
const re1 = /^([А-ЯЁ][а-яё-]+)\s+([А-ЯЁ][а-яё-]+)\s+[А-ЯЁ][а-яё-]+$/;

users.forEach(user => {
    const result = user.replace(re1, "$2 $1");
    console.log(result);
});

const re2 = /^(?<last>[А-ЯЁ][а-яё-]+)\s+(?<first>[А-ЯЁ][а-яё-]+)\s+[А-ЯЁ][а-яё-]+$/;

users.forEach(user => {
    const result = user.replace(re2, "$<first> $<last>");
    console.log(result);
});