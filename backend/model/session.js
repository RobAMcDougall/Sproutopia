const { v4: uuid } = require("uuid")
const db = require("../db/db")

const createSession = async (user_id) => {

    const response = await db.query(
        `INSERT INTO auth_session ("user", token) VALUES ($1, $2) RETURNING *`,
        [user_id, uuid(undefined, undefined, undefined)]
    )
    return response.rows[0]
}

const getSession = async (token) => {

    const response = await db.query(
        `SELECT * FROM auth_session WHERE token = $1`,
        [token]
    )
    try{
        return response.rows[0]
    } catch {
        throw new Error ("Token not found")
    }
}

const destroySession = async (token) => {

    return await db.query(
        `DELETE FROM auth_session WHERE token = $1`,
        [token]
    )
}


module.exports = {
    createSession,
    getSession,
    destroySession
}