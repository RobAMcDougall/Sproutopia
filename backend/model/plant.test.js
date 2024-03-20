const db = require("../db/db")
const plant = require("./plant")

beforeEach(() => {
    vi.clearAllMocks()
})

afterAll(() => {
    vi.resetAllMocks()
})

describe("getPlantById", () => {
    it("should return plant by id", async () => {
        const fakePlant = { id: 1, name: "Fake Plant" };
        vi.spyOn(db, "query").mockResolvedValueOnce({ rows: [fakePlant] });

        const result = await plant.getPlantById(1);

        expect(result).toEqual(fakePlant);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if query fails", async () => {
        vi.spyOn(db, "query").mockRejectedValueOnce(new Error("Query failed"));

        await expect(plant.getPlantById(1)).rejects.toThrow("Error getting plant by id");
    });
});

describe("getPlantsByUser", () => {
    it("should return plants by user", async () => {
        const fakePlants = [{ id: 1, name: "Fake Plant 1" }, { id: 2, name: "Fake Plant 2" }];
        vi.spyOn(db, "query").mockResolvedValueOnce({ rows: fakePlants });

        const result = await plant.getPlantsByUser(1);

        expect(result).toEqual(fakePlants);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if query fails", async () => {
        vi.spyOn(db, "query").mockRejectedValueOnce(new Error("Query failed"));

        await expect(plant.getPlantsByUser(1)).rejects.toThrow("Error getting plants by user");
    });
});

describe("getPlantDetailsByUser", () => {
    it("should return plant details by user", async () => {
      const userId = 1;
      const fakePlantsDetails = [
        { id: 1, name: "Fake Plant 1", growth_stage: 2 },
        { id: 2, name: "Fake Plant 2", growth_stage: 1 }
      ];
      vi.spyOn(db, "query").mockResolvedValueOnce({ rows: fakePlantsDetails });
  
      const result = await plant.getPlantDetailsByUser(userId);
  
      expect(result).toEqual(fakePlantsDetails);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  
    it("should throw an error if query fails", async () => {
      const userId = 1;
      vi.spyOn(db, "query").mockRejectedValueOnce(new Error("Query failed"));
  
      await expect(plant.getPlantDetailsByUser(userId)).rejects.toThrow("Error getting plant details by user");
    });
  });
  
  describe("getAllPlants", () => {
    it("should return all plants", async () => {
      const fakePlants = [
        { id: 1, name: "Fake Plant 1" },
        { id: 2, name: "Fake Plant 2" }
      ];
      vi.spyOn(db, "query").mockResolvedValueOnce({ rows: fakePlants });
  
      const result = await plant.getAllPlants();
  
      expect(result).toEqual(fakePlants);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  
    it("should throw an error if query fails", async () => {
      vi.spyOn(db, "query").mockRejectedValueOnce(new Error("Error getting all plants"));
  
      await expect(plant.getAllPlants()).rejects.toThrow("Error getting all plants");
    });
  });
  
  describe("addPlantForUser", () => {
    it("should add a plant for a user", async () => {
      const userId = 1;
      const plantId = 1;
      const fakePlant = { id: 1, name: "Fake Plant" };
      const date = new Date().toISOString().split("T")[0];
      vi.spyOn(db, "query").mockResolvedValueOnce({ rows: [{...fakePlant, user: userId, plant_id: plantId, growth_stage: 1, date_planted: date}] });
  
      const result = await plant.addPlantForUser(userId, plantId);
  
      expect(result).toEqual({...fakePlant, user: userId, plant_id: plantId, growth_stage: 1, date_planted: date});
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  
    
  });
  
  describe("incrementGrowthStage", () => {
    it("should increment growth stage of a plant", async () => {
      const plantId = 1;
      const fakePlant = { id: 1, name: "Fake Plant", growth_stage: 2 };
      vi.spyOn(db, "query").mockResolvedValueOnce({ rows: [fakePlant] });
  
      const result = await plant.incrementGrowthStage(plantId);
  
      expect(result).toEqual(fakePlant);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  
    
  });
  
  describe("deletePlant", () => {
    it("should delete a plant", async () => {
      const plantId = 1;
      vi.spyOn(db, "query").mockResolvedValueOnce({});
  
      const result = await plant.deletePlant(plantId);
  
      expect(result).toEqual({});
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  
    
  });