const fs = require('fs');
const clients = JSON.parse(fs.readFileSync('./5/json/clients.json', 'utf8')).clients;

console.log(JSON.stringify(
  clients
    .filter(client => client.address.city === 'Кунгур')
    .sort((a, b) => 
      a.gender !== b.gender 
        ? (a.gender === 'female' ? -1 : 1)
        : (a.age !== b.age 
          ? b.age - a.age 
          : a.name.localeCompare(b.name, 'ru'))
    ),
  null, 
  4
));
