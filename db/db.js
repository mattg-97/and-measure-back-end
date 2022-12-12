const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    database: "ANDMeasure",
    host: "localhost",
    port: 5432
});

module.exports = pool;