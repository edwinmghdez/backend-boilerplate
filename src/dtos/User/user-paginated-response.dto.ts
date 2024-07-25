import { PaginationDto } from "../pagination.dto";
import { UserDto } from "./user.dto";

export class UserPaginatedResponseDto extends PaginationDto
{
    data: UserDto[]
}