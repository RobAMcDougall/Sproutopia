import { createMockContext } from "@story-health/vitest-koa-mocks"


const plant = require("./plant")
const Plant = require("../model/plant")
const Account = require("../model/account")

describe("getPlantById", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should return plant by ID", async () => {
        const ctx = createMockContext();
        ctx.params = { id: 1 };
        const fakePlant = { id: 1, name: "Fake Plant" };
        vi.spyOn(Plant, "getPlantById").mockResolvedValueOnce(fakePlant);

        await plant.getPlantById(ctx);

        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual(fakePlant);
    });

    it("should handle error if plant not found", async () => {
        const ctx = createMockContext();
        ctx.params = { id: 999 }; 
        vi.spyOn(Plant, "getPlantById").mockResolvedValueOnce(null);

        await plant.getPlantById(ctx);

        expect(ctx.status).toBe(404);
    });

    it("should handle internal server error", async () => {
        const ctx = createMockContext();
        ctx.params = { id: 1 };
        vi.spyOn(Plant, "getPlantById").mockRejectedValueOnce(new Error("Internal Server Error"));

        await plant.getPlantById(ctx);

        expect(ctx.status).toBe(500);
    });
    
});

describe("getPlantsByUser", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should return plants by user", async () => {
        const ctx = createMockContext();
        ctx.params = { user: 1 };
        const fakePlants = [{ id: 1, name: "Fake Plant 1" }, { id: 2, name: "Fake Plant 2" }];
        vi.spyOn(Plant, "getPlantsByUser").mockResolvedValueOnce(fakePlants);

        await plant.getPlantsByUser(ctx);

        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual(fakePlants);
    });

    it("should handle error if user not found", async () => {
        const ctx = createMockContext();
        ctx.params = { user: 999 }; 
        vi.spyOn(Plant, "getPlantsByUser").mockResolvedValueOnce([]);

        await plant.getPlantsByUser(ctx);

        expect(ctx.status).toBe(404); 
    });

    it("should handle internal server error", async () => {
        const ctx = createMockContext();
        ctx.params = { user: 1 };
        vi.spyOn(Plant, "getPlantsByUser").mockRejectedValueOnce(new Error("Internal Server Error"));

        await plant.getPlantsByUser(ctx);

        expect(ctx.status).toBe(500);
    });
});

describe("getPlantsDetailsByUser", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should return plant details by user", async () => {
        const ctx = createMockContext();
        ctx.params = { user: 1 };
        const fakePlantDetails = [{ id: 1, name: "Fake Plant" }];
        vi.spyOn(Plant, "getPlantDetailsByUser").mockResolvedValueOnce(fakePlantDetails);

        await plant.getPlantsDetailsByUser(ctx);

        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual(fakePlantDetails);
    });

    it("should handle error if user not found", async () => {
        const ctx = createMockContext();
        ctx.params = { user: 999 }; 
        vi.spyOn(Plant, "getPlantDetailsByUser").mockResolvedValueOnce(null);

        await plant.getPlantsDetailsByUser(ctx);

        expect(ctx.status).toBe(404);
    });

    it("should handle internal server error", async () => {
        const ctx = createMockContext();
        ctx.params = { user: 1 };
        vi.spyOn(Plant, "getPlantDetailsByUser").mockRejectedValueOnce(new Error("Internal Server Error"));

        await plant.getPlantsDetailsByUser(ctx);

        expect(ctx.status).toBe(500);
    });
});

describe("getAllPlants", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should return all plants", async () => {
        const ctx = createMockContext();
        const fakePlants = [{ id: 1, name: "Fake Plant 1" }, { id: 2, name: "Fake Plant 2" }];
        vi.spyOn(Plant, "getAllPlants").mockResolvedValueOnce(fakePlants);

        await plant.getAllPlants(ctx);

        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual(fakePlants);
    });

    it("should handle error if fetching plants fails", async () => {
        const ctx = createMockContext();
        vi.spyOn(Plant, "getAllPlants").mockRejectedValueOnce(new Error("Query failed"));

        await plant.getAllPlants(ctx);

        expect(ctx.status).toBe(500);
    });
});

describe("addPlantForUser", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should add a plant for a user", async () => {
        const ctx = createMockContext();
        ctx.params = { user: 1, plant: 1 };
        const fakePlant = { id: 1, name: "Fake Plant" };
        vi.spyOn(Plant, "addPlantForUser").mockResolvedValueOnce(fakePlant);

        await plant.addPlantForUser(ctx);

        expect(ctx.status).toBe(201);
        expect(ctx.body).toEqual(fakePlant);
    });

    it("should handle error if adding plant fails", async () => {
        const ctx = createMockContext();
        vi.spyOn(Plant, "addPlantForUser").mockRejectedValueOnce(new Error("Query failed"));

        await plant.addPlantForUser(ctx);

        expect(ctx.status).toBe(400);
    });
});

describe("incrementGrowthStage", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should increment growth stage of a plant", async () => {
        const ctx = createMockContext({
            headers: {
                "Authorization": "00000000-0000-0000-0000-000000000000"
            }
        });
        ctx.params = { plant: 1 };
        const fakePlant = { id: 1, user: 1, name: "Fake Plant", growth_stage: 2 };
        vi.spyOn(Plant, "incrementGrowthStage").mockResolvedValueOnce(fakePlant);
        vi.spyOn(Plant, "getUserPlant").mockResolvedValueOnce(fakePlant);
        vi.spyOn(Account, "getFromSession").mockResolvedValueOnce({id: 1});

        await plant.incrementGrowthStage(ctx);
        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual(fakePlant);
    });

    it("should handle error if plant does not belong to user", async () => {
        const ctx = createMockContext({
            headers: {
                "Authorization": "00000000-0000-0000-0000-000000000000"
            }
        });
        ctx.params = { plant: 1 };
        const fakePlant = { id: 1, user: 1, name: "Fake Plant", growth_stage: 2 };
        vi.spyOn(Plant, "getUserPlant").mockResolvedValueOnce(fakePlant);
        vi.spyOn(Account, "getFromSession").mockResolvedValueOnce({id: 2});

        await plant.incrementGrowthStage(ctx);
        expect(ctx.status).toBe(403);
    });

    it("should handle error if plant not found", async () => {
        const ctx = createMockContext();
        await plant.incrementGrowthStage(ctx);
        expect(ctx.status).toBe(404);
    });
});

describe("deletePlant", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should delete a plant", async () => {
        const ctx = createMockContext();
        ctx.params = { plant: 1 };
        vi.spyOn(Plant, "deletePlant").mockResolvedValueOnce(undefined);
        vi.spyOn(Plant, "getUserPlant").mockResolvedValueOnce({id: 1, user: 1});
        vi.spyOn(Account, "getFromSession").mockResolvedValueOnce({id: 1});

        await plant.deletePlant(ctx);

        expect(ctx.status).toBe(204);
        expect(ctx.body).toBeUndefined();
    });
});

