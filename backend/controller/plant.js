const Plant = require("../model/plant")

const getPlantById = async (ctx) => {
    try {
        ctx.body = await Plant.getPlantById(ctx.params.id)
        ctx.status = 200
    } catch {
        ctx.status = 404
    }
}

const getPlantsByUser = async (ctx) => {
    try {
        ctx.body = await Plant.getPlantsByUser(ctx.params.user)
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

const getAllPlants = async ctx => {
    try {
        ctx.body = await Plant.getAllPlants();
        ctx.status = 200;
    } catch {
        ctx.status = 500;
    }
}


module.exports = {
    getPlantById,
    getPlantsByUser,
    getPlantsDetailsByUser,
    getAllPlants
}