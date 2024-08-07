import { text } from "express";
import Games from "../models/Games.js";
import { v4 as uuidv4 } from 'uuid';

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

export const likeGameService = (idGame, userId) =>
    Games.findOneAndUpdate(
        { _id: idGame, "likes.userId": { $nin: [userId] } },
        { $push: { likes: { userId, created: new Date() } } }
    );

export const deleteLikeGameService = (idGame, userId) =>
    Games.findOneAndUpdate(
        { _id: idGame },
        { $pull: { likes: { userId } } }
    );

export const addCommentService = (idGame, comment, userId) => {
    const idComment = uuidv4();

    return Games.findOneAndUpdate(
        { _id: idGame },
        {
            $push: {
                comments: { idComment, userId, comment, createAt: new Date() }
            }
        }
    )
};

export const deleteCommentService = (idGame, idComment, userId) =>
    Games.findOneAndUpdate(
        { _id: idGame }, { $pull: { comments: { idComment, userId } } }
    );
    