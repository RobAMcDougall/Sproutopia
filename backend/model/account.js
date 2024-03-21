const db = require("../db/db");

const createAccount = async (data) =>{
    const {username, email, password, preferences} = data;
    const preferencesData = preferences || null;
    const response = await db.query(
        `INSERT INTO "user" (username, email, password, preferences)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [username, email, password, preferencesData]
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

const updatePreferences = async (data) => {
    const {id, preferences} = data
    const response = await db.query(
        `UPDATE "user"
        SET preferences = $2
        WHERE id = $1
        RETURNING *`,
        [id, preferences]
    );
    return response.rows[0];
}

const getFromSession = async (token) => {
    const response = await db.query(
        'SELECT * FROM "user" WHERE id = (SELECT "user" FROM auth_session WHERE token = $1)',
        [token]
    );
    try {
        return response.rows[0];
    } catch {
        throw new Error("User not found for session");
    }
}

module.exports = {
    createAccount,
    getAccount,
    updatePreferences,
    getFromSession
}
