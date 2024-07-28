import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class UpdateUserDto
{
    @Expose()
    @IsNotEmpty({
        message: 'The first name should not be empty'
    })
    @IsString({
        message: 'The first name must be a text'
    })
    @MinLength(5, {
        message: 'The first name is too short and must contain at least $constraint1 character'
    })
    first_name: string

    @Expose()
    @IsNotEmpty({
        message: 'The last name should not be empty'
    })
    @IsString({
        message: 'The last name must be a text'
    })
    @MinLength(5, {
        message: 'The last name is too short and must contain at least $constraint1 character'
    })
    last_name: string

    @Expose()
    @IsNotEmpty({
        message: 'The password should not be empty'
    })
    @IsString({
        message: 'The password must be a text'
    })
    password: string
}