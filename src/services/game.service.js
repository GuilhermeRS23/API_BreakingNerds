import Games from "../models/Games.js";

export const createService = (body) => Games.create(body);

export const findAllService = (offset, limit) => Games.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("User");

export const countGamesService = () => Games.countDocuments();

export const topGameService = () => Games.findOne().sort({ _id: -1 }).populate("User");

export const findByIdService = (id) => Games.findById(id).populate("User");

export const searchByTitleService = (title) => Games.find({
    title: { $regex: `${title || ""}`, $options: "i" }
})
    .sort({ _id: -1 }).populate("User");

export const searchByUserService = (id) =>
    Games.find({ User: id }).sort({ _id: -1 }).populate("User");

export const updateGameService = (id, title, description, cover) =>
    Games.findOneAndUpdate(
        { _id: id },
        { title, description, cover },
        { rawResult: true }
    );

export const deleteGameService = (id) => Games.findByIdAndDelete({ _id: id });
