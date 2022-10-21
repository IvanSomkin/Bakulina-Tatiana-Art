import { Body, Controller, Injectable, Post, Put, Req, Res, UseGuards } from "@nestjs/common"
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Request, Response } from "express"
import { refreshSession } from "supertokens-node/recipe/session"
import { SignInAdminDto } from "./dtos/sign-in-admin.dto"
import { SignUpAdminDto } from "./dtos/sign-up-admin.dto"
import { AuthGuard } from "./guards/auth.guard"

@ApiTags('auth')
@Injectable()
@Controller('auth')
export class AuthController {
  constructor () { }

  @ApiOperation({
    summary: 'Sign out as admin'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post('signout')
  signOutAsAdmin(): void { }

  @ApiOperation({
    summary: 'Sign out as admin'
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post('session/refresh')
  async refreshTokenAsAdmin(@Req() req: Request, @Res() res: Response) {
    return await refreshSession(req, res)
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