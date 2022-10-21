import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common"
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Request, Response } from "express"
import { signIn } from "supertokens-node/recipe/emailpassword"
import { refreshSession } from "supertokens-node/recipe/session"
import { SignInAdminDto } from "./dtos/signin-admin.dto"
import { AuthGuard } from "./guards/auth.guard"

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor () { }

  @ApiOperation({
    summary: 'Sign in as admin'
  })
  @Post('signin')
  async signInAdmin(@Body() signInAdminDto: SignInAdminDto) {
    return await signIn(signInAdminDto.formFields[0].value, signInAdminDto.formFields[1].value)
  }

  /*
  @ApiOperation({
    summary: 'Delete admin'
  })
  @UseGuards(new AuthGuard(this))
  @Post('auth/delete')
  removeAdmin() {
    return deleteUser("a28008f7-8de2-47b2-9090-5d895819dd42");
  }
  */
}