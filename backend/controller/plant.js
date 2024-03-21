const Plant = require("../model/plant")
const Account = require("../model/account");

const isOwnPlant = async ctx => {
    try {
        const currentUser = await Account.getFromSession(ctx.request.get("Authorization"));
        const plant = await Plant.getUserPlant(ctx.params.plant);
        const belongsToUser = plant.user === currentUser.id;
        
        if (!belongsToUser) {
            ctx.status = 403;
        }
        
        return belongsToUser;
    } catch {
        throw new Error("User or plant not found");
    }
}

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
        if (await isOwnPlant(ctx)) {
            ctx.body = await Plant.incrementGrowthStage(ctx.params.plant);
            ctx.status = 200;
        }
    } catch {
        ctx.status = 404;
    }
}

const deletePlant = async ctx => {
    if (await isOwnPlant(ctx)) {
        ctx.body = await Plant.deletePlant(ctx.params.plant);
        ctx.status = 204;
    }
}

module.exports = {
    getPlantById,
    getPlantsByUser,
    getPlantsDetailsByUser,
    getAllPlants,
    addPlantForUser,
    incrementGrowthStage,
    deletePlant,
    isOwnPlant
}