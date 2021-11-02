import { OAuth2Authorization } from '@advanced-rest-client/oauth';
import { AnypointCodeExchangeEvent } from './Events.js';

/** @typedef {import('@advanced-rest-client/events').Authorization.TokenInfo} TokenInfo */
/** @typedef {import('@advanced-rest-client/events').Authorization.OAuth2Authorization} OAuth2Settings */
/** @typedef {import('@advanced-rest-client/oauth').ProcessingOptions} ProcessingOptions */

/**
 * Extends the OAuth 2 authorization class to tweak it to support Anypoint authorization process that does not
 * allow to exchange the code for token from the browser.
 * When the code exchange is called then it dispatches the `AnypointCodeExchangeEvent` that should be handled 
 * by the hosting application and process the request.
 */
export class ExchangeAuthorization extends OAuth2Authorization {
  /**
   * @param {OAuth2Settings} settings The authorization configuration.
   * @param {ProcessingOptions=} options Additional processing options to configure the behavior of this library.
   * @param {EventTarget=} eventTarget
   */
  constructor(settings, options={}, eventTarget) {
    super(settings, options);
    this.eventTarget = eventTarget || document.body;
  }

  /**
   * Overrides the base class method to dispatch the code exchange event to the hosting application.
   * @param {string} code The code received from the Anypoint authorization endpoint.
   * @returns {Promise<TokenInfo>}
   */
  async exchangeCode(code) {
    const e = new AnypointCodeExchangeEvent(code);
    this.eventTarget.dispatchEvent(e);
    return e.detail.result;
  }
}
