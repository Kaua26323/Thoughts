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

dashboardRoutes.get(
  "/dashboard/edit-thought/:id",
  isAuthenticated,
  dashboardController.getThought,
);

dashboardRoutes.post(
  "/dashboard/update-thought",
  isAuthenticated,
  dashboardController.updateThought,
);

dashboardRoutes.post(
  "/dashboard/remove-thought",
  isAuthenticated,
  dashboardController.removeThought,
);

module.exports = dashboardRoutes;
