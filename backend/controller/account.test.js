// @vitest-enviroment node
import { createMockContext } from "@story-health/vitest-koa-mocks"
import { afterAll } from "vitest"

const bcrypt = require("bcryptjs")
const accounts = require("./account")
const Account = require("../model/account")
const Session = require("../model/session")

describe("register", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks()
        ctx = createMockContext({
            requestBody: {
                username: "test",
                email: "test@example.com",
                password: "test"
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
    })

    afterAll(() => {
        vi.resetAllMocks()
    })

    it("should create an account upon successful request", async () => {
        vi.spyOn(Account, "createAccount").mockResolvedValue({})
        await accounts.register(ctx)
        expect(Account.createAccount).toHaveBeenCalledTimes(1)
        expect(ctx.status).toBe(201)
        expect(ctx.body).toStrictEqual({})
    })

    it("should hash password upon account creation", async () =>{
        await accounts.register(ctx)
        expect(Account.createAccount).toHaveBeenCalledTimes(1)
        expect(ctx.request.body.password).not.toBe("test")
        expect(await bcrypt.compare("test", ctx.request.body.password)).toBe(true)
    })

    it("should throw an error upon invalid request", async () => {
        vi.spyOn(Account, "createAccount").mockRejectedValue(new Error("Something went wrong"))
        await accounts.register(ctx)
        expect(Account.createAccount).toHaveBeenCalledTimes(1)
        expect(ctx.status).toBe(400)
        expect(ctx.body).toStrictEqual({ message: "Something went wrong" } ) 
    })

})
