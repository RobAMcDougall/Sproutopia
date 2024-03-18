const fs = require("fs");
const db = require("./db");

const sql = fs.readFileSync(__dirname + "/setup.sql").toString();
db.query(sql).then(console.log).catch(console.error);
