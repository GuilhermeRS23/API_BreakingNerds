import Games from "../models/Games.js";

const createService = (body) => Games.create(body);
const findAllService = () => Games.find();

export default { createService, findAllService };

