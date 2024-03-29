import { OAuth2Authorization, ProcessingOptions, OAuth2Config, TokenInfo } from '@advanced-rest-client/oauth';

/**
 * Extends the OAuth 2 authorization class to tweak it to support Anypoint authorization process that does not
 * allow to exchange the code for token from the browser.
 * When the code exchange is called then it dispatches the `AnypointCodeExchangeEvent` that should be handled 
 * by the hosting application and process the request.
 */
export class ExchangeAuthorization extends OAuth2Authorization {
  eventTarget: EventTarget;
  /**
   * @param settings The authorization configuration.
   * @param options Additional processing options to configure the behavior of this library.
   */
  constructor(settings: OAuth2Config, options?: ProcessingOptions, eventTarget?: EventTarget);

  /**
   * Overrides the base class method to dispatch the code exchange event to the hosting application.
   * @param code The code received from the Anypoint authorization endpoint.
   */
  exchangeCode(code: string): Promise<TokenInfo>;
}
