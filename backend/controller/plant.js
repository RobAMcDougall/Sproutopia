const Plant = require("../model/plant")

const getPlantById = async (ctx) => {
    try {
        const plant = await Plant.getPlantById(ctx.params.id);
        if (!plant) {
            ctx.status = 404; 
            return;
        }
        ctx.body = plant;
        ctx.status = 200;
    } catch {
        ctx.status = 500
    }
}

const getPlantsByUser = async (ctx) => {
    try {
        const plants = await Plant.getPlantsByUser(ctx.params.user);
        if (!plants || plants.length === 0) {
            ctx.status = 404; 
        } else {
            ctx.body = plants;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500; 
    }
}

const getPlantsDetailsByUser = async (ctx) => {
    try {
        const plantDetails = await Plant.getPlantDetailsByUser(ctx.params.user);
        if (!plantDetails) {
            ctx.status = 404;
            return;
        }
        ctx.body = plantDetails;
        ctx.status = 200;
    } catch {
        ctx.status = 500; 
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

const addPlantForUser = async ctx => {
    try {
        ctx.body = await Plant.addPlantForUser(ctx.params.user, ctx.params.plant);
        ctx.status = 201;
    } catch {
        ctx.status = 400;
    }
}

const incrementGrowthStage = async ctx => {
    try {
        ctx.body = await Plant.incrementGrowthStage(ctx.params.plant);
        ctx.status = 200;
    } catch {
        ctx.status = 404;
    }
}

const deletePlant = async ctx => {
    ctx.body = await Plant.deletePlant(ctx.params.plant);
    ctx.status = 204;
}

module.exports = {
    getPlantById,
    getPlantsByUser,
    getPlantsDetailsByUser,
    getAllPlants,
    addPlantForUser,
    incrementGrowthStage,
    deletePlant
}