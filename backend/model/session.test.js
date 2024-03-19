const db = require("../db/db")
const session = require("./session")

beforeEach(() => {
    vi.clearAllMocks()
})

afterAll(() => {
    vi.resetAllMocks()
})

describe("createSession", () => {
    it("should create a user session on success", async () => {
        const testSession = { token: "00000000-0000-0000-0000-000000000000" }
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [testSession]
        })

        const result = await session.createSession(0)
        expect(result.token).toBe("00000000-0000-0000-0000-000000000000")
    })

    it("should throw an error on db query error", async () => {
        vi.spyOn(db, "query").mockRejectedValue(new Error("Something went wrong"))

        try{
            await session.createSession(0)
        } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("Something went wrong")
        }
    })
})

describe("getSession", () => {
    it("should resolve with a required session on success", async () => {
        const testSession = {
            account: 0,
            token: "00000000-0000-0000-0000-000000000000"
        }
        vi.spyOn(db, "query").mockResolvedValueOnce({rows: [testSession]})

        const result = await session.getSession("00000000-0000-0000-0000-000000000000")
        expect(result.account).toBe(0)
    })

    it("should throw an error on non-existent session tokens", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null)

        try{
            await session.getSession("00000000-0000-0000-0000-000000000000")
        } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("Token not found")
        }
    })
})

describe("destroySession", () => {
    it('should remove a user session on success', async () => {
        const testToken = {
            account: 0,
            token: "00000000-0000-0000-0000-000000000000"
        }
        vi.spyOn(db, "query").mockResolvedValueOnce({rows: [testToken]})
        const result = await session.destroySession("00000000-0000-0000-0000-000000000000")
        expect(result).toBeDefined()
    })
})