import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

import { errorHandler } from 'supertokens-node/framework/express'
import { Error as STError } from 'supertokens-node'

@Catch(STError)
export class SupertokensExceptionFilter implements ExceptionFilter {
  handler: ErrorRequestHandler

  constructor () {
    this.handler = errorHandler()
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const resp = ctx.getResponse<Response>()
    const next = ctx.getNext<NextFunction>()

    if (resp.headersSent) {
      return
    }

    this.handler(
      exception,
      req,
      resp,
      next,
    )
  }
}