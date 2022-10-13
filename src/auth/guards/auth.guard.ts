import { CanActivate, ExecutionContext, Injectable, Session } from '@nestjs/common';
import { Error as STError } from "supertokens-node";

import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import { VerifySessionOptions } from 'supertokens-node/recipe/session';
import { Response } from 'express';
import { SessionRequest } from 'supertokens-node/framework/express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly verifyOptions?: VerifySessionOptions) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    let err = undefined;
    const req: SessionRequest = ctx.getRequest();
    const res: Response = ctx.getResponse();

    await verifySession(this.verifyOptions)(req, res, (res: any) => {
      err = res
    });

    if (res.headersSent) {
      throw new STError({
        message: "RESPONSE_SENT",
        type: "RESPONSE_SENT",
      });
    }

    if (err) {
      throw err;
    }

    return true;
  }
}