import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

import { errorHandler } from 'supertokens-node/framework/express'
import { Error as STError } from 'supertokens-node'
import { HttpService } from '@nestjs/axios'

export class TryRefreshTokenError extends Error {
  message: string = 'please, use refresh token'
}


@Catch(STError)
export class SupertokensExceptionFilter implements ExceptionFilter {
  handler: ErrorRequestHandler

  constructor() {
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

@Catch(TryRefreshTokenError)
export class TryRefreshTokenExceptionFilter implements ExceptionFilter {
  constructor(private httpService: HttpService) { }

  async catch(exception: TryRefreshTokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()

    /*
    this.httpService.axiosRef.post(
      'http://' + ctx.getRequest<Request>().headers.host + '/auth/session/refresh',
      { withCredentials: true }
    )
      .then(function (response) {
        console.log('Удача')
        console.log(response.data.cookies)
      })
      .catch(function (error) {
        console.log('Неудача')
        console.log(error)
      })
    */
    res.send()
  }
}
