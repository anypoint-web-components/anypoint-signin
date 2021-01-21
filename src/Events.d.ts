import { TokenInfo } from "@advanced-rest-client/arc-types/src/authorization/Authorization";

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
