import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import userService from '../services/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            res.status(401)
                .send({ message: "Route not authorization" })
        };

        const parts = authorization.split(' ');
        if (parts.length !== 2) {
            return res.status(401)
                .send({ message: "Authorization invalid" })
        }

        const [schema, token] = parts;
        if (schema !== "Bearer") {
            return res.status(401)
                .send({ message: "Authorization invalid" })
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401)
                    .send({ message: "Token invalid" });
            }

            const user = await userService.findByIdService(decoded.id);
            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid Token" })
            }

            req.userId = user.id;
            
            next();
        });

    } catch (error) {
        res.status(500).send(error.message);
    };
}