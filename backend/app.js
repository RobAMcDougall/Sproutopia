const Koa = require("koa");
const app = new Koa();

const cors = require("@koa/cors");
const {bodyParser} = require("@koa/bodyparser");
app.use(cors()).use(bodyParser());

const Router = require("@koa/router");
const controllers = require("./controller");

const accounts = new Router({prefix: "/account"});
accounts.post("/register", controllers.account.register);
accounts.post("/login", controllers.account.login);
accounts.delete("/logout", controllers.account.logout);
accounts.get("/", controllers.account.getFromSession);
app.use(accounts.routes()).use(accounts.allowedMethods());

const plants = new Router({prefix: "/plants"});
plants.get("/user/:user", controllers.plant.getPlantsByUser);
plants.get("/user/:user/details", controllers.plant.getPlantsDetailsByUser);
plants.post("/user/:user/:plant", controllers.plant.addPlantForUser);
plants.delete("/user/:plant", controllers.plant.deletePlant);
plants.get("/all", controllers.plant.getAllPlants);
plants.get("/:id", controllers.plant.getPlantById);
app.use(plants.routes()).use(plants.allowedMethods());

module.exports = app;
