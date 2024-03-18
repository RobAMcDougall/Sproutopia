const Plant = require("../model/plant")

const getPlantsByName = async (ctx) => {
    try {
        ctx.body = await Plant.getPlantByName(ctx.req.body)
        ctx.status = 200
    } catch {
        ctx.status = 404
    }
}

const getPlantsByUser = async (ctx) => {
    try {
        ctx.body = await Plant.getPlantByUser(ctx.params.user)
        ctx.status = 200
    } catch {
        ctx.status = 404
    }
}

const getPlantsDetailsByUser = async (ctx) => {
    try {
        ctx.body = await Plant.getPlantDetailsByUser(ctx.params.user)
        ctx.status = 200
    } catch {
        ctx.status = 404
    }
}


module.exports = {
    getPlantsByName,
    getPlantsByUser,
    getPlantsDetailsByUser
}