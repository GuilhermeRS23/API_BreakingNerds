import Games from "../models/Games.js";

const createService = (body) => Games.create(body);
const findAllService = (offset, limit) => Games.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("User");

const countGames = () => Games.countDocuments();

export default { createService, findAllService, countGames };

