const Koa = require("koa");
const app = new Koa();

const cors = require("@koa/cors");
const {bodyParser} = require("@koa/bodyparser");
app.use(cors()).use(bodyParser());

module.exports = app;
