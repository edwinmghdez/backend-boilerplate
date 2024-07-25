import { Request,Response } from "express"
import { UserService } from "../services/user.service";

export class UserController 
{
    // GET api/v1/users
    public static async index(req: Request, res: Response)
    {
        const queryParams = req.query;
        const users = await UserService.getAllPaginated(queryParams);
        return res.status(200).json(users);
    }

    // GET api/v1/users/:id
    public static async show(req: Request, res: Response)
    {
        const id = parseInt(req.params.id, 10);
        const user = await UserService.findOrFail(id);
        return res.status(200).json(user);
    }

    // POST api/v1/users
    public static async store(req: Request, res: Response)
    {
        const data = req.body;
        const user = await UserService.create(data);
        return res.status(201).json(user)
    }

    // PUT api/v1/users/:id
    static async update(req: Request, res: Response)
    {
        const id = parseInt(req.params.id, 10);
        const data = req.body;

        const user = await UserService.update(id, data);
        return res.status(200).json(user);
    }

    // DELETE api/v1/users/:id
    static async delete(req: Request, res: Response)
    {
        const id = parseInt(req.params.id, 10);
        await await UserService.delete(id);
        return res.status(204).json(null);
    }
}