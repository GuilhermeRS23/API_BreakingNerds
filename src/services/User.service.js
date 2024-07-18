const User = require("../models/User");

//Function enline
const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id);
const updateService = (id, nome, username, email, password, avatar, background) =>
    User.findOneAndUpdate({ _id: id }, {
        id, nome, username, email, password, avatar, background
    });

module.exports = {
    createService,
    findAllService,
    findByIdService,
    updateService
}
