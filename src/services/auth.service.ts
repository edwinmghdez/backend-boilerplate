import { AppDataSource } from "../db/data-source";
import { AuthUserResponseDto } from "../dtos/Auth/aut-user-response.dto";
import { LoginDto } from "../dtos/Auth/login.dto";
import { mapToUserDto } from "../dtos/User/user-dto-mapping";
import { UserDto } from "../dtos/User/user.dto";
import { User } from "../entities/user.entity";
import { jwtConfig } from "../config/jwt.config";
import { JwtHelper } from "../helpers/jwt.helper";
import { BcryptHelper } from "../helpers/bcrypt.helper";
import { redis } from "../config/redis.config";
import { Jwt, JwtPayload } from "jsonwebtoken";

export class AuthService
{
    private static readonly userRepository = AppDataSource.getRepository(User);

    public static async login(payload: LoginDto): Promise<AuthUserResponseDto>
    {
        const { email, password } = payload;

        const user = await this.userRepository.findOne({ where: { email } });
        const isPasswordValid = BcryptHelper.comparePassword(user.password, password);
        
        if (!user || !isPasswordValid) {
            return null;
        }

        const token = JwtHelper.generateToken({ id: user.id });
        const response: AuthUserResponseDto = {
            access_token: token,
            token_type: jwtConfig.token_type,
            expires_in: jwtConfig.ttl
        }

        return response;
    }

    public static async user(payload: any): Promise<UserDto>
    {
        if (!payload) {
            return null;
        }

        const user = await this.userRepository.findOne({ where: { id: payload.id } });
        return mapToUserDto(user);
    }

    public static async logout(payload: any)
    {
        await redis.set(payload, 'blacklisted', 'EX', jwtConfig.ttl);
    }

    public static async refresh(payload: any): Promise<AuthUserResponseDto>
    {
        const data = JwtHelper.verifyToken(payload);
        if (!data) {
            return null;
        }

        const token = JwtHelper.generateToken({ id: data.id });

        await redis.set(payload, 'blacklisted', 'EX', jwtConfig.ttl);

        const response: AuthUserResponseDto = {
            access_token: token,
            token_type: jwtConfig.token_type,
            expires_in: jwtConfig.ttl
        }

        return response;
    }

    public static async isTokenBlacklisted(token: string): Promise<boolean> 
    {
        const result = await redis.get(token);
        return result === 'blacklisted';
    }
}