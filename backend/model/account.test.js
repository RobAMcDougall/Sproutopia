const db = require("../db/db")
const account = require("./account")

beforeEach(()=>{
    vi.clearAllMocks()
})

afterAll(() =>{
    vi.resetAllMocks()
})

describe("createAccount", () =>{
    it("should create a new account", async () =>{
        const testAccount = {username: "test", email: "test@test.com", password: "test"}
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{...testAccount, id: 1}]
        })

        const result = await account.createAccount(testAccount)
        expect(result).toBeTruthy()
        expect(result).toHaveProperty("id")

        expect(result.username).toBe("test")
        expect(result.email).toBe("test@test.com")
    })

    it("should throw an error on db query error", async () => {
        vi.spyOn(db, "query").mockRejectedValue(new Error("Something went wrong"))

        try {
            await account.createAccount({})
        } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("Something went wrong")
        }
    })
})

describe("getAccount", () => {
    it("should get an account by name", async () => {
        const testAccount = {id: 1, username: "test", password: "test"}
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [testAccount]
        })

        const result = await account.getAccount("test")
        expect(result.username).toBe("test")
        expect(result.id).toBe(1)
    })

    it("should get an account by email", async () => {
        const testAccount = {id: 1, email: "test@test.com", password: "test"}
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [testAccount]
        })

        const result = await account.getAccount("test@test.com")
        expect(result.email).toBe("test@test.com")
        expect(result.id).toBe(1)
    })

    it("should throw an error on non-existing account", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null)

        try {
            await account.getAccount("test")
        } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("User not found")
        }
    })

})

describe("updatePreferences", () => {
    it("should update preferences for an account", async () => {
        const testAccount = { id: 1, preferences: { favorite_foods: ["pizza", "burger"], allergies: ["nuts"] } };
        const updatedPreferences = { favorite_foods: ["sushi", "pasta"], allergies: ["dairy"] };
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{ ...testAccount, preferences: updatedPreferences }]
        });

        const result = await account.updatePreferences({ id: 1, preferences: updatedPreferences });
        expect(result.id).toBe(1);
        expect(result.preferences).toEqual(updatedPreferences);
    });

    it("should throw an error on db query error", async () => {
        vi.spyOn(db, "query").mockRejectedValue(new Error("Something went wrong"));

        try {
            await account.updatePreferences({ id: 1, preferences: { favorite_foods: ["pizza", "burger"], allergies: ["nuts"] } });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Something went wrong");
        }
    });
});

describe("getFromSession", () => {
    it("should get an account from session token", async () => {
        const testAccount = { id: 1, username: "test", email: "test@test.com", password: "test" };
        const sessionToken = "some-session-token";
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [testAccount]
        });

        const result = await account.getFromSession(sessionToken);
        expect(result.id).toBe(1);
        expect(result.username).toBe("test");
        expect(result.email).toBe("test@test.com");
    });

    it("should throw an error on non-existing session", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null);

        try {
            await account.getFromSession("invalid-session-token");
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("User not found for session");
        }
    });

    it("should throw an error on db query error", async () => {
        vi.spyOn(db, "query").mockRejectedValue(new Error("Database error"));

        try {
            await account.getFromSession("some-valid-session-token");
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Database error");
        }
    });
});