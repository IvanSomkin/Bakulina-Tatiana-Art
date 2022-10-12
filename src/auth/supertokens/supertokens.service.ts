import { Inject, Injectable } from '@nestjs/common';
import supertokens from "supertokens-node";
import Session from 'supertokens-node/recipe/session';
import EmailPassword from "supertokens-node/recipe/emailpassword";

import { ConfigInjectionToken, AuthModuleConfig } from "../interfaces/config.interface";
import { BaseRequest, BaseResponse } from 'supertokens-node/lib/build/framework';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({}),
        Session.init({
          errorHandlers: {
            onUnauthorised: async (message, request, response) => {
              response.original.redirect("/administrator/login");
            },
        }
        }),
      ],
    });
  }
}