import * as jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";
import { Request } from "express";

export class JwtHelper
{
    public static generateToken(payload: {id: number})
    {
        return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.ttl });
    }

    public static verifyToken(token: string)
    {
        return jwt.verify(token, jwtConfig.secret) as jwt.JwtPayload;
    }

    public static getToken(req: Request)
    {
        const header = req.headers.authorization;
        return header.split(" ")[1];
    }
}
