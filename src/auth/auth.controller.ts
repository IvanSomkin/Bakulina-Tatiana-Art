import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignupAdminDto } from "../auth/dtos/signup-admin.dto";
import { deleteUser } from "supertokens-node";
import { SigninAdminDto } from "./dtos/signin-admin.dto";
import { AuthGuard } from "./guards/auth.guard";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor() { }

  @ApiOperation({
    summary: 'Log in as admin'
  })
  @ApiResponse({
    status: 200,
    description: 'The user has logged in as admin'
  })
  @Post('signin')
  signinAsAdmin(@Body() signinAdminDto: SigninAdminDto) {
    return {};
  }

  /*
  @Post('auth/signup')
  signupAsAdmin(@Body() signupAdminDto: SignupAdminDto) {
    return {};
  }
  */

  @ApiOperation({
    summary: 'Sign out as admin'
  })
  @ApiCookieAuth()
  @UseGuards(new AuthGuard())
  @Post('signout')
  signoutAsAdmin() {
    return {};
  }

  /*
  @ApiOperation({
    summary: 'Delete admin'
  })
  @UseGuards(new AuthGuard())
  @Post('auth/delete')
  removeAdmin() {
    return deleteUser("a28008f7-8de2-47b2-9090-5d895819dd42");
  }
  */
}