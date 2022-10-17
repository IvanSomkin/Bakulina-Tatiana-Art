import { CanActivate, ExecutionContext, Injectable, Session } from '@nestjs/common'
import { Error as STError } from "supertokens-node"

import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import { refreshSession } from 'supertokens-node/recipe/session'
import { Response } from 'express'
import { SessionRequest } from 'supertokens-node/framework/express'
import * as cookie from 'cookie'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp()

    let err = undefined
    const req: SessionRequest = ctx.getRequest()
    const res: Response = ctx.getResponse()

    await verifySession()(
      ctx.getRequest(),
      res,
      (res) => {
        err = res
      },
    )

    if (res.headersSent) {
      throw new STError({
        message: "RESPONSE_SENT",
        type: "RESPONSE_SENT",
      })
    }

    if (err) {
      throw err
    }

    if (req.session == undefined) {
      return false
    }

    return true
  }
}