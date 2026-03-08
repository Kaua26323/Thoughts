const { Router } = require("express");
const authController = require("../controllers/AuthController");

const authRoutes = Router();

authRoutes.get("/login", authController.login);
authRoutes.post("/signin", authController.signIn);
authRoutes.get("/logout", authController.logOut);

authRoutes.get("/register", authController.registerPage);
authRoutes.post("/create-account", authController.createUser);

module.exports = authRoutes;
