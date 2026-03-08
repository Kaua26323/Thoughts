const { Router } = require("express");
const homeController = require("../controllers/HomeController");

const homeRouter = Router();

homeRouter.get("/", homeController.index);

module.exports = homeRouter;
