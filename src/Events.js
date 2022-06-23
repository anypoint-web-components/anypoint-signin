/* eslint-disable max-classes-per-file */

/** @typedef {import('@advanced-rest-client/oauth').OAuth2Config} OAuth2Config */
/** @typedef {import('@advanced-rest-client/oauth').TokenInfo} TokenInfo */

export const AnypointAuthorizeEventType = 'oauth2authorize';
export const AnypointCodeExchangeEventType = 'anypointcodeexchange';
export const AccessTokenChangeType = 'accesstokenchange';
export const SignedInChangeType = 'signedinchange';
export const AnypointSignedInErrorType = 'anypointsigninawareerror';
export const AnypointSignedInType = 'anypointsignin';
export const AnypointSignedOutType = 'anypointsignout';

export const codeValue = Symbol('codeValue');

/**
 * An event that is dispatched when the application hosting the element should perform OAuth 2 code exchange
 * process.
 * The event has the readonly `code` property that carries the received code. The implementation should set
 * the `detail.result` property of the event when it's handled to a promise resolved when the TokenInfo object is ready. 
 */
export class AnypointCodeExchangeEvent extends CustomEvent {
  /**
   * @returns {string} The code used to initialize the event
   */
  get code() {
    return this[codeValue];
  }

  /**
   * @param {string} code The code to exchange for the token.
   */
  constructor(code) {
    super(AnypointCodeExchangeEventType, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        // the implementation handling the event puts the promise with the result here.
        result: undefined,
      },
    });
    this[codeValue] = code;
  }
}

/**
 * An event dispatched to request OAuth2 authorization.
 */
export class OAuth2AuthorizeEvent extends CustomEvent {
  /**
   * @param {OAuth2Config} detail Authorization options.
   */
  constructor(detail) {
    super(AnypointAuthorizeEventType, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail,
    });
  }
}


/**
 * @param {EventTarget} target A node on which to dispatch the event.
 * @param {OAuth2Config} config Authorization options.
 * @return {Promise<TokenInfo>} Promise resolved with authorization result
 * @throws {TokenError}
 */
export async function authorizeOauth2(target, config) {
  const e = new OAuth2AuthorizeEvent(config);
  target.dispatchEvent(e);
  return e.detail.result;
}
