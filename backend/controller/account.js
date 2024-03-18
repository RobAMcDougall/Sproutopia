const bcrypt = require("bcryptjs");
const Account = require("../models/account");
const Session = require("../models/session")

const register = async (ctx) => {
    try {
        const data = ctx.request.body
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
        ctx.status = 201
        ctx.body = await Account.createAccount(data)
    } catch (err) {
        ctx.status = 400
        ctx.body = {
            message: err.message
        }
    }
}

const login = async (ctx) => {
    try {
        const data = ctx.request.body
        const account = await Account.getAccount(data)

        if (!await bcrypt.compare(data.password, account.password)) {
            throw new Error("Invalid credentials")
        } else {
            ctx.body = await Session.createSession(account.id)
            ctx.status = 200
        }

    } catch (err) {
        ctx.status = 400
        ctx.body = {
            message: err.message
        }
    }
}

const logout = async (ctx) => {
    try {
        await Session.destroySession(ctx.request.get("Authorization")) // Gets the authorization value from the header
        ctx.status = 204
    } catch (err) {
        ctx.status = 400
        ctx.body = {
            error: err.message
        }
    }
}

const protect = async (ctx, next) => {
    try {
        await Session.getSession(ctx.request.get("Authorization"))
        await next()
    } catch (err) {
        ctx.status = 403
        ctx.body = {
            error: err.message
        }
    }
}

module.exports = {
    register,
    login,
    logout,
    protect
}
