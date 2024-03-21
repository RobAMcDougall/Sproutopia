const db = require('../db/db')

const getPlantById = async (id) => {
    try {
        const results = await db.query(
            'SELECT * FROM all_plants WHERE "id" = $1;',
            [id]
        )
        return results.rows[0]
    } catch {
        throw new Error('Error getting plant by id')
    }
}

const getUserPlant = async (id) => {
    try {
        const result = await db.query(
            "SELECT * FROM planted_veg WHERE id = $1",
            [id]
        );
        return result.rows[0];
    } catch {
        throw new Error("User plant not found");
    }
}

const getPlantsByUser = async (userId) => {
    try {
        const results = await db.query(
            `SELECT * FROM planted_veg WHERE "user" = $1;`,
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
            WHERE pv.user = $1;`,
            [userId]
        );
        return results.rows;
    } catch (error) {
        throw new Error('Error getting plant details by user');
    }
};

const getAllPlants = async () => {
    const results = await db.query("SELECT * FROM all_plants;");
    return results.rows;
}

const addPlantForUser = async (user, plant) => {
    // Format today's date for SQL query
    const date = (new Date()).toISOString().split("T")[0];
    
    const response = await db.query(
        `INSERT INTO planted_veg ("user", plant_id, growth_stage, date_planted)
            VALUES ($1, $2, $3, $4) RETURNING *;`,
        [user,  plant, 1, date]
    );
    return response.rows[0];
}

const incrementGrowthStage = async plant => {
    const response = await db.query(
        `UPDATE planted_veg
            SET growth_stage = growth_stage + 1
            WHERE id = $1
            RETURNING *;`, 
        [plant]);
    try {
        return response.rows[0];
    } catch {
        throw new Error("Plant not found");
    }
}

const deletePlant = async plant => {
    return await db.query("DELETE FROM planted_veg WHERE id = $1", [plant]);
}

module.exports = {
    getPlantById,
    getUserPlant,
    getPlantsByUser,
    getPlantDetailsByUser,
    getAllPlants,
    addPlantForUser,
    incrementGrowthStage,
    deletePlant
}