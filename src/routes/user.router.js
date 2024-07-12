const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.get("/", userController.hello);
route.get("/soma", userController.soma);

module.exports = route;