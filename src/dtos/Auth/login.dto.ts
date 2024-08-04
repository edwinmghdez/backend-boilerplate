import { Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto
{
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Expose()
  @IsNotEmpty()
  password: string
}
