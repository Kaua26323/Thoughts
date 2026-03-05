const { Router } = require("express");
const homeController = require("./controllers/HomeController");

const routes = Router();

routes.get("/", homeController.index);

module.exports = routes;
