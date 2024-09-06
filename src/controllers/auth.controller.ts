import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { JwtHelper } from "../helpers/jwt.helper";

export class AuthController
{
    // POST api/auth/login
    public static async login(req: Request, res: Response, next: NextFunction)
    {
        try {
            const data = req.body;
            const token = await AuthService.login(data);
            return res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    }

    // GET api/auth/user
    public static async user(req: any, res: Response, next: NextFunction)
    {
        try {
            const data = req.currentUser;
            const user = await AuthService.user(data);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    // POST api/auth/logout
    public static async logout(req: Request, res: Response, next: NextFunction)
    {
        try {
            const token = JwtHelper.getToken(req);
            await AuthService.logout(token);
            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            next(error);
        }
    }

    // GET api/auth/refresh
    public static async refresh(req: Request, res: Response, next: NextFunction)
    {
        try {
            const token = JwtHelper.getToken(req);
            const user = await AuthService.refresh(token);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
