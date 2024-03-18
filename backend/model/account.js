const db = require("../db/db");

const createAccount = async (data) =>{
    const {username, email, password} = data;
    const response = await db.query(
        `INSERT INTO "user" (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [username, email, password]
    );
    return response.rows[0];

}

const getAccount = async (data) => {
    const {username, email } = data;
    const response = await db.query(
        `SELECT * FROM "user" WHERE username = $1 OR email = $2`,
        [username, email]
    );
    try {
        return response.rows[0]
    } catch {
        throw new Error("User not found")
    }
}


module.exports = {
    createAccount,
    getAccount,
}
