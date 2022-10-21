import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import supertokens from "supertokens-node"
import EmailPassword from "supertokens-node/recipe/emailpassword"
import Session, { refreshSession, SessionContainer } from "supertokens-node/recipe/session"
import { ConfigInjectionToken, AuthModuleConfig } from "../interfaces/config.interface"
import { TryRefreshTokenError } from '../filters/auth.filter'

@Injectable()
export class SupertokensService {
  constructor (@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init(),
        Session.init({
          errorHandlers: {
            onUnauthorised: async (message, request, response) => {
              response.original.redirect("/administrator/login")
            },
            onInvalidClaim: async (message, request, response) => {
              response.original.redirect("/administrator/login")
            },
            onTokenTheftDetected: async (message, request, response) => {
              response.original.redirect("/administrator/login")
            },
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                async verifySession({ verifySessionOptions, options, userContext }) {
                  /*if (
                    options.req.getCookieValue('sIdRefreshToken') != undefined &&
                    options.req.getCookieValue('sAccessToken') == undefined
                  ) {
                    console.log('Refreshing this')
                    let input = {
                      req: options.req,
                      res: options.res,
                      userContext
                    }
                    let result: SessionContainer
                    try {
                      result = await options.recipeImplementation.refreshSession({
                        req: options.req,
                        res: options.res,
                        userContext,
                      })
                    } catch (err) {
                      console.log(err)
                    }
                    console.log(result)
                    return result
                    throw new TryRefreshTokenError()
                  }*/
                  /*console.log('Start verify')
                  let method = normaliseHttpMethod(options.req.getMethod())

                  if (method === "options" || method === "trace") {
                    return undefined
                  }

                  let incomingPath = new NormalisedURLPath(options.req.getOriginalURL())
                  let refreshTokenPath = options.config.refreshTokenPath

                  if (incomingPath.equals(refreshTokenPath) && method === "post") {
                    console.log('Refresh')
                    return await originalImplementation.refreshPOST({
                      options,
                      userContext,
                    })
                  } else {
                    console.log('Session')
                    let session: SessionContainer
                    try {
                      session = await options.recipeImplementation.getSession({
                        req: options.req,
                        res: options.res,
                        options: verifySessionOptions,
                        userContext,
                      })
                    } catch (err) {
                      if (err.type == 'TRY_REFRESH_TOKEN') {

                        throw err
                      } else {
                        console.log(err)
                        throw err
                      }
                    }
                    console.log('Session complete')
                    if (session !== undefined) {
                      console.log('Good session')
                      const claimValidators = await getRequiredClaimValidators(
                        session,
                        verifySessionOptions?.overrideGlobalClaimValidators,
                        userContext
                      )

                      await session.assertClaims(claimValidators, userContext)
                    }
                  }*/
                  return originalImplementation.verifySession({ verifySessionOptions, options, userContext })
                },
              }
            },
          },
        }),
      ],
    })
  }
}