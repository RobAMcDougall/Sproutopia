const db = require('../db/db')

const getPlantById = async (id) => {
    try {
        const results = await db.query(
            'SELECT * FROM all_plants WHERE "id" = $1',
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

const addPlantForUser = async (user, plant) => {
    // Format today's date for SQL query
    const date = (new Date()).toISOString().split("T")[0];
    
    const response = await db.query(
        `INSERT INTO planted_veg ("user", plant_id, growth_stage, date_planted)
            VALUES ($1, $2, $3, $4) RETURNING *`,
        [user,  plant, 1, date]
    );
    return response.rows[0];
}

module.exports = {
    getPlantById,
    getPlantsByUser,
    getPlantDetailsByUser,
    getAllPlants,
    addPlantForUser
}