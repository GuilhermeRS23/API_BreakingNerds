const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
route.get("/:id", userController.findByID);
route.patch("/:id", userController.update);

module.exports = route;