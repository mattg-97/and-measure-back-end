const Pool = require('pg').Pool;
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432
});

const seedQuery = fs.readFileSync('db/seeding.sql', { encoding: 'utf8' });
pool.query(seedQuery, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Seeding Complete!');
  }
});

module.exports = pool;
