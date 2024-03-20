// @vitest-environment node (unnecessary)

import { createMockContext } from "@story-health/vitest-koa-mocks"
import { afterAll, describe, expect } from "vitest"
import {account} from "./index";

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

describe("login", () => {
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

    it("should return an auth session upon successful login", async () => {
        vi.spyOn(Account, "getAccount").mockResolvedValue({
            password: await bcrypt.hash("test", await bcrypt.genSalt())
        })
        vi.spyOn(Session, "createSession").mockResolvedValue({token: "00000000-0000-0000-0000-000000000000"})

        await accounts.login(ctx)
        expect(Account.getAccount).toHaveBeenCalledTimes(1)
        expect(Session.createSession).toHaveBeenCalledTimes(1)
        expect(ctx.status).toBe(200)
        expect(ctx.body).toStrictEqual({token: "00000000-0000-0000-0000-000000000000"})
    })

    it("should throw an error if password does not match", async () => {
        vi.spyOn(Account, "getAccount").mockResolvedValue({password: ""})
        await accounts.login(ctx)
        expect(Account.getAccount).toHaveBeenCalledTimes(1)
        expect(Session.createSession).toHaveBeenCalledTimes(0)
        expect(ctx.status).toBe(400)
        expect(ctx.body).toStrictEqual({message: "Invalid credentials"})
    })
})

describe("updatePreferences", () => {
    const testPreferences = {
        allergies: ["peanuts"],
        favourites: ["cheese"]
    };
    
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks();
        ctx = createMockContext({
            requestBody: testPreferences,
            headers: {
                "Content-Type": "application/json"
            }
        });
        ctx.params = { id: 1 };
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should successfully update a user's preferences", async () => {
        const testAccount = {
            id: 1,
            username: "test",
            password: "test",
            email: "test@test.com",
            preferences: testPreferences
        };
        
        vi.spyOn(Account, "updatePreferences").mockResolvedValueOnce(testAccount);
        await account.updatePreferences(ctx);
        expect(ctx.status).toBe(200);
    });

    it("should throw an error if id or preferences are not passed", async () => {

        vi.spyOn(Account, "updatePreferences").mockResolvedValueOnce(undefined);

        ctx.params = {};
        await account.updatePreferences(ctx);
        expect(ctx.status).toBe(400);
        expect(ctx.body).toEqual({ message: "No id was passed" });
        
        
    });

});

describe("logout", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks()
        ctx = createMockContext({headers: {
            "Authorization": "00000000-0000-0000-0000-000000000000"
        }})
    })

    afterAll(() => {
        vi.resetAllMocks()
    })

    it("should delete an auth session on logout", async () => {
        vi.spyOn(Session, "destroySession").mockResolvedValue(null)
        await accounts.logout(ctx)
        expect(ctx.status).toBe(204)
    })

    it("should throw an error on invalid logout requests", async () => {
        vi.spyOn(Session, "destroySession").mockRejectedValue(new Error("Something went wrong"))
        await accounts.logout(ctx)
        expect(ctx.status).toBe(400)
    })
})

describe("protect", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks()
        ctx = createMockContext({headers: {
            "Authorization": "00000000-0000-0000-0000-000000000000"
        }})
    })

    afterAll(() => {
        vi.resetAllMocks()
    })

    it("should allow access if logged in with a valid session token", async () => {
        vi.spyOn(Session, "getSession").mockResolvedValue(null)
        await accounts.protect(ctx, async () => ctx.body = "Approved")
        expect(Session.getSession).toHaveBeenCalledTimes(1)
        expect(ctx.status).toBe(200)
        expect(ctx.body).toBe("Approved")
    })

    it("should deny access for any invalid session token", async () =>{
        vi.spyOn(Session, "getSession").mockRejectedValue(new Error("Denied"))
        await accounts.protect(ctx, async () => ctx.body = "Approved")
        expect(ctx.status).toBe(403)
        expect(ctx.body).toStrictEqual({error: "Denied"})
    })
})



describe("getFromSession", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks();
        ctx = createMockContext({
            request: { get: () => "00000000-0000-0000-0000-000000000000" },
            headers: { "Content-Type": "application/json" }
        });
    });

    afterAll(() => {
        vi.resetAllMocks();
    });

    it("should get user data from session", async () => {
        vi.spyOn(Account, "getFromSession").mockResolvedValueOnce({});
        await accounts.getFromSession(ctx);
        expect(Account.getFromSession).toHaveBeenCalledTimes(1);
        expect(ctx.status).toBe(200);
        expect(ctx.body).toEqual({});
    });

    it("should handle error if session token is invalid", async () => {
        vi.spyOn(Account, "getFromSession").mockRejectedValueOnce(new Error("Invalid session"));
        await accounts.getFromSession(ctx);
        expect(Account.getFromSession).toHaveBeenCalledTimes(1);
        expect(ctx.status).toBe(404);
        expect(ctx.body).toEqual({ error: "Invalid session" });
    });
});
