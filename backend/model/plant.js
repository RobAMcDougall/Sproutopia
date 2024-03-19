const db = require('../db/db')

const getPlantById = async (id) => {
    try {
        const results = await db.query(
            'SELECT * FROM all_plants WHERE id LIKE $1',
            [id]
        )
        return results.rows[0]
    } catch {
        throw new Error('Error getting plant by name')
    }
}

const getPlantsByUser = async (userId) => {
    try {
        const results = await db.query(
            `SELECT * FROM planted_veg WHERE "user" = $1`,
            [userId]
        );
        return results.rows;
    } catch (error) {
        throw new Error('Error getting plants by user');
    }
};

const getPlantDetailsByUser = async (userId) => {
    try {
        const results = await db.query(
            `SELECT p.*, pv.growth_stage
            FROM all_plants p
            INNER JOIN planted_veg pv ON p.id = pv.plant_id
            WHERE pv.user = $1`,
            [userId]
        );
        return results.rows;
    } catch (error) {
        throw new Error('Error getting plant details by user');
    }
};

const getAllPlants = async () => {
    const results = await db.query("SELECT * FROM all_plants");
    return results.rows;
}

module.exports = {
    getPlantById,
    getPlantsByUser,
    getPlantDetailsByUser,
    getAllPlants
}