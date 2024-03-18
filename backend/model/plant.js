const db = require('../db/db')

const getPlantByName = async (name) => {
    try {
        const results = await db.query(
            'SELECT * FROM all_plants WHERE name LIKE $1',
            [name]
        )
        return results.rows[0]
    } catch {
        throw new Error('Error getting plant by name')
    }
}

const getPlantsByUser = async (userId) => {
    try {
        const results = await db.query(
            `SELECT p.*
            FROM all_plants p
            INNER JOIN planted_veg pv ON p.id = pv.plant_id
            WHERE pv.user = $1`,
            [userId]
        );
        return results.rows;
    } catch (error) {
        throw new Error('Error getting plants by user');
    }
};

module.exports = {
    getPlantByName,
    getPlantsByUser
}