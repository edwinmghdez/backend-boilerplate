import { AppDataSource } from "../db/data-source";
import { User } from "../entities/user.entity";
import { buildFindManyOptions } from "../utils/query-options-builder";
import { makePagination } from "../utils/pagination";
import { mapToUserDto } from "../dtos/User/user-dto-mapping";
import { UserPaginatedResponseDto } from "../dtos/User/user-paginated-response.dto";
import { UserDto } from "../dtos/User/user.dto";
import { CreateUserDto } from "../dtos/User/create-user.dto";

export class UserService
{
    private static readonly userRepository = AppDataSource.getRepository(User);

    public static async getAllPaginated(queryParams: any): Promise<UserPaginatedResponseDto>
    {
        const [users, totalItems] = await this.userRepository.findAndCount(
            buildFindManyOptions({ queryParams })
        );

        const data = users.map((user) => mapToUserDto(user));
        const pagination = makePagination(totalItems, queryParams);
        return { data, ...pagination }
    }

    public static async findOrFail(id: User['id']): Promise<UserDto | null>
    {
        const user = await this.userRepository.findOneByOrFail({id});
        return mapToUserDto(user);
    }

    public static async create(payload: CreateUserDto): Promise<UserDto>
    {
        const data = this.userRepository.create(payload);
        const user = await this.userRepository.save(data);
        return mapToUserDto(user);
    }

    public static async update(id: User['id'], payload: Partial<User>): Promise<UserDto>
    {
        const user = await this.userRepository.findOneByOrFail({id});

        const data: Partial<User> = {
            ...user,
            ...payload
        }

        const updatedUser = await this.userRepository.save(data);
        return mapToUserDto(updatedUser);
    }

    public static async delete(id: User['id'])
    {
        const user = await this.userRepository.findOneByOrFail({id});
        return await this.userRepository.remove(user);
    }
}