import * as jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";

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
}
