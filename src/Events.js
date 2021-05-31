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
