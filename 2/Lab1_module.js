export const getRandomInt = (limit) => Math.floor(Math.random() * limit);

export const getDistribution = (amount, limit = 10) => {
    const numbers = {};
    for (let i = 0; i < amount; i++) {
        const num = getRandomInt(limit);
        numbers[num] = (numbers[num] || 0) + 1;
    }
    return numbers;
};

export const toPercentage = (value, quantity) => 
    Math.abs(quantity - value) / quantity * 100;