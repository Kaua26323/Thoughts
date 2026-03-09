const { Router } = require("express");
const dashboardController = require("../controllers/DashboardController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const dashboardRoutes = Router();

dashboardRoutes.get(
  "/dashboard",
  isAuthenticated,
  dashboardController.dashboard,
);

dashboardRoutes.get(
  "/dashboard/create",
  isAuthenticated,
  dashboardController.createThoughtPage,
);

dashboardRoutes.post(
  "/dashboard/create-thought",
  isAuthenticated,
  dashboardController.createThought,
);

module.exports = dashboardRoutes;
