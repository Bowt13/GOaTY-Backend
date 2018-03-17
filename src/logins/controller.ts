import { IsString } from 'class-validator'
import {BadRequestError, Body, JsonController, Post} from "routing-controllers";
import {sign} from "../jwt";
import User from "../users/entity";

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {
  @Post('/logins')
  async authenticate (
    @Body() {email, password}: AuthenticatePayload
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user) throw new BadRequestError('No user with that email found')

    if (!await user.checkPassword(password)) throw new BadRequestError('Incorrect password')

    const jwt = sign({ id: user.id! })
    return { jwt }
  }
}