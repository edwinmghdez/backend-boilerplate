import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto
{
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

    @IsNotEmpty({
        message: 'The email should not be empty'
    })
    @IsEmail()
    email: string

    @IsNotEmpty({
        message: 'The password should not be empty'
    })
    @IsString({
        message: 'The password must be a text'
    })
    password: string
}