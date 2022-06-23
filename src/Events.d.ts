import { TokenInfo, OAuth2Config } from '@advanced-rest-client/oauth';

export declare const AnypointAuthorizeEventType: string;
export declare const AnypointCodeExchangeEventType: string;
export declare const AccessTokenChangeType: string;
export declare const SignedInChangeType: string;
export declare const AnypointSignedInErrorType: string;
export declare const AnypointSignedInType: string;
export declare const AnypointSignedOutType: string;
export declare const codeValue: unique symbol;

export declare interface  AnypointCodeExchangeEventDetail {
  result?: Promise<TokenInfo>;
}

/**
 * An event that is dispatched when the application hosting the element should perform OAuth 2 code exchange
 * process.
 * The event has the readonly `code` property that carries the received code. The implementation should set
 * the `detail.result` property of the event when it's handled to a promise resolved when the TokenInfo object is ready. 
 */
export declare class AnypointCodeExchangeEvent extends CustomEvent<AnypointCodeExchangeEventDetail> {
  /**
   * @returns The code used to initialize the event
   */
  get code(): string;

  /**
   * @param code The code to exchange for the token.
   */
  constructor(code: string);
}

export declare interface ResultEventDetail<T> {
  result?: Promise<T>;
}

/**
 * An event dispatched to request OAuth2 authorization.
 */
 export declare class OAuth2AuthorizeEvent extends CustomEvent<OAuth2Config & ResultEventDetail<TokenInfo>> {
  /**
   * @param detail Authorization options.
   */
  constructor(detail: OAuth2Config);
}

/**
 * @param target A node on which to dispatch the event.
 * @param config Authorization options.
 * @return Promise resolved with authorization result
 * @throws {TokenError}
 */
export function authorizeOauth2(target: EventTarget, config: OAuth2Config): Promise<TokenInfo>;
