import * as bcrypt from "bcrypt";

export class BcryptHelper 
{
    public static async encryptPassword(password: string)
    {
        return bcrypt.hashSync(password, 12);
    }

    public static comparePassword(hashPassword: string, password: string)
    {
        return bcrypt.compareSync(password, hashPassword);
    }
}
