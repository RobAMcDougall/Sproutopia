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

module.exports = {
  getPlantByName
}