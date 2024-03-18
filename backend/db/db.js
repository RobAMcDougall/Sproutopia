const {Pool} = require("pg");
require("dotenv").config({
    path: [".env", "../.env"]
});

module.exports = new Pool({connectionString: process.env.DB_URL});
