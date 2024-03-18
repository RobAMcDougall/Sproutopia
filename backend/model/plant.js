const db = require('../db/db')

const getPlantById = async (id) => {
  try {
    const results = await db.query(
      'SELECT * FROM all_plants WHERE id = $1',
      [id]
    )
    return results.rows[0]
  } catch {
    throw new Error('Error getting all plants')
  }
}

module.exports = {
  getPlantById
}