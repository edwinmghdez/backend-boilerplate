import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../db/data-source";
import { AuthService } from "../services/auth.service";
import { JwtHelper } from "../helpers/jwt.helper";

dotenv.config();

export const authentication = async (req: any, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await AuthService.isTokenBlacklisted(token);
    if (isBlacklisted) {
        return res.status(401).send({ message: "Token invalid" });
    }

    const decode = JwtHelper.verifyToken(token);
    if (!decode) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.currentUser = decode;
    
    next();
};
