const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = express.Router();

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashboardController = require("./app/controllers/DashboardController");
const FileController = require("./app/controllers/FileController");
const AppointmentsController = require("./app/controllers/AppointmentsController");
const AvailableController = require("./app/controllers/AvailableController");

const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("success");
  res.locals.flashError = req.flash("error");

  return next();
});

routes.get("/files/:file", FileController.show);

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/login", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.use("/app", authMiddleware);

routes.get("/app/dashboard", DashboardController.index);

routes.get("/app/logout", SessionController.destroy);

routes.get("/app/appointments/create/:provider", AppointmentsController.create);
routes.post("/app/appointments/create/:provider", AppointmentsController.store);

routes.get("/app/available/:provider", AvailableController.index);

module.exports = routes;
