/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement } from 'lit-element';
import '@advanced-rest-client/oauth-authorization/oauth2-authorization.js';

export const hostname = 'https://localhost:8787';

export const GRANT_TYPES = {
  AUTH_CODE: 'authorization_code',
  REFRESH: 'refresh_token',
  IMPLICIT: 'implicit'
};

export const AnypointAuth = {
  /**
   * oauth2 client ID
   */
  _clientId: null,
  // returns currently set `client_id`
  get clientId() {
    return AnypointAuth._clientId;
  },
  // Sets new `client_id`
  set clientId(val) {
    if (val && val !== AnypointAuth._clientId) {
      AnypointAuth._clientId = val;
      AnypointAuth.initAuth2();
    } else {
      AnypointAuth._clientId = val;
    }
  },
  // OAuth2 redirect URI
  _redirectUri: null,
  get redirectUri() {
    return AnypointAuth._redirectUri;
  },
  set redirectUri(val) {
    if (val && val !== AnypointAuth._redirectUri) {
      AnypointAuth._redirectUri = val;
      AnypointAuth.initAuth2();
    } else {
      AnypointAuth._redirectUri = val;
    }
  },
  // OAuth2 authorization type. e.g. implicit, authorization_code, etc.
  // By default, the authorization type is authorization_code.
  _authType: GRANT_TYPES.AUTH_CODE,
  get authType() {
    return AnypointAuth._authType;
  },
  set authType(val) {
    if (val && val !== AnypointAuth._authType) {
      AnypointAuth._authType = val;
      AnypointAuth.initAuth2();
    } else {
      AnypointAuth._authType = val;
    }
  },
  // Token authorization URL
  authorizationUri: `${hostname}/accounts/api/v2/oauth2/authorize`,
  // Code exchange endpoint
  accessTokenUri: `${hostname}/accounts/api/v2/oauth2/token`,
  // Log out URL.
  logoutUri: `${hostname}/accounts/api/logout/`,
  /** Is user signed in? */
  _signedIn: false,
  // Returns value for user signed in flag.
  get signedIn() {
    return AnypointAuth._signedIn;
  },
  /**
   * Sets signedIn value and informs awares about the change.
   *
   * @param {Boolean} val Current state of user being signed in.
   */
  set signedIn(val) {
    if (val === AnypointAuth._signedIn) {
      return;
    }
    AnypointAuth._signedIn = val;
    for (let i = 0; i < AnypointAuth.signinAwares.length; i++) {
      AnypointAuth.signinAwares[i]._signedIn = val;
    }
  },
  // User's access token.
  _accessToken: null,
  /**
   * @return {String} Access token value
   */
  get accessToken() {
    return AnypointAuth._accessToken;
  },
  /**
   * Sets accessToken value and informs awares about the change.
   *
   * @param {String} val New access token.
   */
  set accessToken(val) {
    if (val === AnypointAuth._accessToken) {
      return;
    }
    AnypointAuth._accessToken = val;
    for (let i = 0; i < AnypointAuth.signinAwares.length; i++) {
      AnypointAuth.signinAwares[i]._accessToken = val;
    }
  },
  /**
   * array of <anypoint-signin-aware>
   * state changes are broadcast to them
   */
  signinAwares: [],

  _forceOauthEvents: null,

  get forceOauthEvents() {
    return AnypointAuth._forceOauthEvents;
  },

  set forceOauthEvents(val) {
    if (AnypointAuth._forceOauthEvents === val) {
      return;
    }
    AnypointAuth._forceOauthEvents = val;
    if (val) {
      AnypointAuth._clearOauthAuthorization();
      AnypointAuth._observeWindowEvents();
    } else {
      AnypointAuth._setOauthAuthorization();
      AnypointAuth._unobserveWindowEvents();
    }
  },
  /**
   * Initialize the client.
   */
  init: function() {
    if (!AnypointAuth.forceOauthEvents) {
      AnypointAuth._setOauthAuthorization();
    }
    AnypointAuth.initAuth2();
  },

  _setOauthAuthorization() {
    let factory;
    if (AnypointAuth._oauthFactory) {
      factory = AnypointAuth._oauthFactory;
    } else {
      const selectr = 'oauth2-authorization[data-owner="anypoint-signin-aware"]';
      factory = document.body.querySelector(selectr);
    }
    if (!factory) {
      AnypointAuth._oauthFactory = document.createElement('oauth2-authorization');
      AnypointAuth._oauthFactory.dataset.owner = 'anypoint-signin-aware';
      AnypointAuth._oauthFactory.addEventListener('oauth2-error', AnypointAuth._oauth2ErrorHandler);
      AnypointAuth._oauthFactory.addEventListener('oauth2-token-response', AnypointAuth._oauth2TokenHandler);
      document.body.appendChild(AnypointAuth._oauthFactory);
    }
  },

  _clearOauthAuthorization: function() {
    if (!AnypointAuth._oauthFactory) {
      return;
    }
    AnypointAuth._oauthFactory.removeEventListener('oauth2-error', AnypointAuth._oauth2ErrorHandler);
    AnypointAuth._oauthFactory.removeEventListener('oauth2-token-response', AnypointAuth._oauth2TokenHandler);
    document.body.removeChild(AnypointAuth._oauthFactory);
    AnypointAuth._oauthFactory = undefined;
  },

  _observeWindowEvents() {
    window.addEventListener('oauth2-error', AnypointAuth._oauth2ErrorHandler);
    window.addEventListener('oauth2-token-response', AnypointAuth._oauth2TokenHandler);
  },

  _unobserveWindowEvents() {
    window.removeEventListener('oauth2-error', AnypointAuth._oauth2ErrorHandler);
    window.removeEventListener('oauth2-token-response', AnypointAuth._oauth2TokenHandler);
  },

  /**
   * Initializes OAuth2 client
   */
  initAuth2: function() {
    AnypointAuth._initSignIn();
  },

  /**
   * Generates `state` parameter for the OAuth2 call.
   *
   * @return {String} Generated state string.
   */
  generateState: function() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  _initSignIn: function() {
    if (!AnypointAuth.clientId || !AnypointAuth.redirectUri) {
      return;
    }
    AnypointAuth.signIn(false);
  },

  assertAuthInitialized: function() {
    if (!AnypointAuth.clientId) {
      throw new Error('AuthEngine not initialized. clientId has not been configured.');
    }
    if (!AnypointAuth.redirectUri) {
      throw new Error('AuthEngine not initialized. redirectUri has not been configured.');
    }
  },
  /**
   * OAuth2 authorization event settings.
   *
   * @return {Object} OAuth2 authorization settings to be dispatched to
   * `<oauth2-authorization>` element
   */
  oauth2Config: function() {
    AnypointAuth._lastState = AnypointAuth.generateState();
    const result = {
      type: AnypointAuth.authType,
      authorizationUri: AnypointAuth.authorizationUri,
      clientId: AnypointAuth.clientId,
      redirectUri: AnypointAuth.redirectUri,
      state: AnypointAuth._lastState,
      scopes: AnypointAuth.scopes
    };
    // For AUTH_CODE and REFRESH grant types, the signin-aware doesn't handle exchanging the code for the access token.
    // (since anypoint-signin-aware is running client side, it can't make the exchange anyway since
    // 1. CORS should be enabled for the /token endpoint.
    // 2. The anypoint-signin-aware should not know about the client-secret of the application.
    // Note: The oauth2-authorization module that signin-aware depends on has an option for overriding the exchange code
    // flow by setting the "overrideExchangeCodeFlow" to true.
    if (AnypointAuth.authType === GRANT_TYPES.AUTH_CODE || AnypointAuth.authType === GRANT_TYPES.REFRESH) {
      result.accessTokenUri = AnypointAuth.accessTokenUri;
      result.overrideExchangeCodeFlow = true;
    }
    return result;
  },
  /**
   * Sends `oauth2-token-requested` custom event to authorize with the
   * Exchange server.
   *
   * @param {Boolean} interactive If `false` then it performs non-interactive
   * authorization in the background.
   */
  signIn: function(interactive) {
    if (!AnypointAuth._oauthFactory && !AnypointAuth.forceOauthEvents) {
      return;
    }
    AnypointAuth.assertAuthInitialized();
    const detail = AnypointAuth.oauth2Config();
    if (interactive === false) {
      detail.interactive = interactive;
    }
    if (AnypointAuth.forceOauthEvents) {
      const ev = new CustomEvent('oauth2-token-requested', {
        bubbles: true,
        detail: detail
      });
      document.body.dispatchEvent(ev);
    } else {
      AnypointAuth._oauthFactory.authorize(detail);
    }
  },
  /**
   * Signs out the user and attempts to destroy the token.
   * Currently token destroy endpoint does not allow request from
   * different domains so this is dummy function that clears token info,
   * TODO: (jarrode) Discuss with core services to enable token revoke action
   * from the outside of domain.
   *
   * @return {Promise} Promise resolved when the token is revoked.
   */
  signOut: function() {
    return AnypointAuth._logout()
      .catch(() => {})
      .then(() => AnypointAuth.setAuthData());
  },

  _oauth2TokenHandler: function(e) {
    const info = e.detail;
    if (!info) {
      return;
    }
    if (AnypointAuth._lastState !== e.detail.state) {
      return;
    }
    if (!info.accessToken) {
      AnypointAuth.setAuthData();
      return;
    }
    return Promise.resolve(AnypointAuth.setAuthData(info.accessToken));
  },

  _oauth2ErrorHandler: function(e) {
    if (AnypointAuth._lastState !== e.detail.state) {
      return;
    }
    const message = e.detail.message;
    AnypointAuth.accessToken = null;
    AnypointAuth.signedIn = false;
    for (let i = 0; i < AnypointAuth.signinAwares.length; i++) {
      AnypointAuth.signinAwares[i]._updateStatus();
      if (e.detail.interactive !== false) {
        AnypointAuth.signinAwares[i].errorNotify({
          message: message
        });
      }
    }
  },

  setAuthData: function(token) {
    AnypointAuth.accessToken = token;
    AnypointAuth.signedIn = !!token;
    for (let i = 0; i < AnypointAuth.signinAwares.length; i++) {
      AnypointAuth.signinAwares[i]._updateStatus();
    }
  },

  _logout: function() {
    const url = AnypointAuth.logoutUri;
    /* global Promise */
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      if (AnypointAuth.accessToken) {
        xhr.setRequestHeader('Authorization', 'bearer ' + AnypointAuth.accessToken);
      }
      xhr.addEventListener('load', function(e) {
        const status = e.target.status;
        if (status > 299) {
          return reject(new Error('Delete token request failed.'));
        }
        resolve();
      });
      xhr.addEventListener('error', function(e) {
        const status = e.target.status;
        let message = 'Unable to delete the token.';
        if (status) {
          message += ' Response code is: ' + status;
        }
        reject(new Error(message));
      });
      try {
        xhr.send();
      } catch (e) {
        reject(new Error('Unable to send the request.'));
      }
    });
  },
  /**
   * attached <anypoint-signin-aware>
   * @param {!AnypointSigninAwareElement} aware element to add
   */
  attachSigninAware: function(aware) {
    if (AnypointAuth.signinAwares.indexOf(aware) === -1) {
      AnypointAuth.signinAwares.push(aware);
      if (typeof aware.forceOauthEvents !== 'undefined') {
        AnypointAuth.forceOauthEvents = aware.forceOauthEvents;
      }
      aware._signedIn = AnypointAuth.signedIn;
      aware._accessToken = AnypointAuth.accessToken;
    }
    if (!AnypointAuth._initialized) {
      AnypointAuth.init();
      AnypointAuth._initialized = true;
    }
  },

  detachSigninAware: function(aware) {
    const index = AnypointAuth.signinAwares.indexOf(aware);
    if (index !== -1) {
      AnypointAuth.signinAwares.splice(index, 1);
    }
  },

  notifyError: function(message) {
    for (let i = 0; i < AnypointAuth.signinAwares.length; i++) {
      AnypointAuth.signinAwares[i].errorNotify({
        message: message
      });
    }
  }
};

/**
 * `<anypoint-signin-aware>` is used to authenticate the user with the Anypoint Platform.
 *
 * The `anypoint-signin-aware-success` event is triggered when a user
 * successfully authenticates. It also sets `accessToken` property that can be
 * used to interact with Anypoint Platform APIs.
 *
 * The `anypoint-signin-aware-signed-out` event is triggered when a user
 * signs out via calling `signOut()` function.
 *
 * The `oauth2-token-response` event is triggered when a user
 * successfully authenticates for the authorization_code flow via the /authorize endpoint. An authorization code
 * is returned in the event and should be used to exchange for an access token via the /token endpoint from
 * your backend server.
 *
 * You can bind to `signedIn` property to monitor authorization state.
 * ##### Example
 *
 *     <anypoint-signin-aware signed-in="{{isSigned}}"></anypoint-signin-aware>
 *
 * The `clientId` and `redirectUri` properties has to be set before using the
 * component. `clientId` and associated with it `redirectUri` has to be set up
 * with Anypoint authorization server.
 * Contact Anypoint Access Management for more information.
 *
 * ##### Example
 *
 *      <anypoint-signin-aware
 *        client-id="abc123"
 *        redirect-uri="https://auth.domain.com/oauth2/redirect"
 *      >
 *      </anypoint-signin-aware>
 *
 * ## Authorization types
 *
 * This element supports `implicit` and `authorization_code` authentication flows.
 *
 * If you have to use the `authorization_code` authorization flow on the client side,
 * you MUST handle exchanging the authorization code for an access token.
 * The anypoint-signin-aware component will trigger the authorization flow for the user.
 * Once the user grants authorization, the authorization server will redirect the user to the redirect_uri of your app.
 *
 * Your site at the redirect_uri should send back
 * a window message (https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event)
 * via window.postMessage() that contains the authorization_code.
 *
 * See https://github.com/advanced-rest-client/oauth-authorization/blob/stage/oauth-popup.html for an example
 * of a page that the Advanced Rest Client redirect_uri goes to which handles the authorization flow correctly.
 *
 * ## Autho log in
 *
 * The element attempts to log in user in a non-interactive way (without
 * displaying the popup) when the element is ready. It does nothing when
 * the response is errored.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof AnypointElements
 */
export class AnypointSigninAware extends LitElement {
  static get properties() {
    return {
      /**
       * The authorization grant type. e.g. implicit, authorization code, etc.
       * Note for authorization code and other grant types, you should use forceOAuthEvents (see below).
       */
      authType: { type: String },
      /**
       * An Anypoint clientId.
       * This property is required to run the authorization flow.
       */
      clientId: { type: String },
      /**
       * Authorization redirect URI.
       * This property is required to run the authorization flow.
       */
      redirectUri: { type: String },
      /**
       * String representing scopes that the application is requesting from the user.
       * These scopes should be a subset of the scopes enabled for the client.
       * This property is required to run the grant authorization flow.
       */
      scopes: { type: String },
      /**
       * By default this element inserts `oauth2-authorization` element to the
       * body and uses direct API to authorize the client. Set this property to
       * force the element to use events system to call the OAuth endpoint.
       *
       * It is useful when your application has it's own OAuth 2 authorization
       * mechanism. In this case handle `oauth2-token-requested` custom event.
       * See `@advanced-rest-client/oauth-authorization` component documentation
       * for more information.
       */
      forceOauthEvents: { type: Boolean }
    };
  }
  /**
   * @return {String} Current access token of authenticated user
   */
  get accessToken() {
    return this._accessToken;
  }

  get _accessToken() {
    return this.__accessToken;
  }

  set _accessToken(value) {
    const old = this.__accessToken;
    if (old === value) {
      return;
    }
    this.__accessToken = value;
    this.dispatchEvent(
      new CustomEvent('accesstoken-changed', {
        detail: {
          value
        }
      })
    );
  }
  /**
   * @return {String} True if user is signed in
   */
  get signedIn() {
    return this._signedIn;
  }

  get _signedIn() {
    return this.__signedIn;
  }

  set _signedIn(value) {
    const old = this.__signedIn;
    if (old === value) {
      return;
    }
    this.__signedIn = value;
    this.dispatchEvent(
      new CustomEvent('signedin-changed', {
        detail: {
          value
        }
      })
    );
  }

  get redirectUri() {
    return this._redirectUri;
  }

  set redirectUri(value) {
    const old = this._redirectUri;
    if (old === value) {
      return;
    }
    if (value) {
      value = String(value);
      // simple XSS prevention
      if (value.indexOf('http') === -1) {
        value = undefined;
      }
    }
    this._redirectUri = value;
    this._redirectUriChanged(value);
  }

  get clientId() {
    return this._clientId;
  }

  set clientId(value) {
    const old = this._clientId;
    if (old === value) {
      return;
    }
    if (value) {
      value = String(value);
    }
    this._clientId = value;
    this._clientIdChanged(value);
  }

  get authType() {
    return this._authType;
  }

  set authType(value) {
    const old = this._authType;
    if (old === value) {
      return;
    }
    if (value) {
      value = String(value);
    }
    this._authType = value;
    this._authTypeChanged(value);
  }

  get scopes() {
    return this._scopes;
  }

  set scopes(value) {
    const old = this._scopes;
    if (old === value) {
      return;
    }
    if (value) {
      value = String(value);
    }
    this._scopes = value;
    this._scopesChanged(value);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.setAttribute('aria-hidden', 'true');
    AnypointAuth.attachSigninAware(this);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    AnypointAuth.detachSigninAware(this);
  }

  /** pops up the authorization dialog */
  signIn() {
    AnypointAuth.signIn();
  }
  /**
   * Signs out the user and attempts to destroy the token.
   * Currently token destroy endpoint does not allow request from
   * different domains so this is dummy function that clears token info,
   * TODO: (jarrode) Discuss with core services to enable token revoke action
   * TODO: (leo) Calling /logout will destroy the token as well. However, CORS is not enabled for /logout for most origins.
   *  Figure out where the allowed origins list is.
   * from the outside of domain.
   *
   * @return {Promise} Promise resolved when the token is revoked.
   */
  signOut() {
    return AnypointAuth.signOut();
  }
  /**
   * Notifies application about error.
   * @param {String} error Error message
   */
  errorNotify(error) {
    this.dispatchEvent(
      new CustomEvent('anypoint-signin-aware-error', {
        bubbles: true,
        composed: true,
        detail: error
      })
    );
  }

  _clientIdChanged(newId) {
    AnypointAuth.clientId = newId;
  }

  _authTypeChanged(newAuthType) {
    AnypointAuth.authType = newAuthType;
  }

  /**
   * Sets AnypointAuth with an array of scopes, e.g. ['full','profile','email']
   * @param {String} newScopes space separated scopes, e.g. 'full profile email'
   */
  _scopesChanged(newScopes) {
    const scopes = newScopes && newScopes.split(' ');
    AnypointAuth.scopes = scopes;
  }

  _redirectUriChanged(value) {
    AnypointAuth.redirectUri = value;
  }

  _updateStatus() {
    let type;
    if (this.signedIn) {
      type = 'anypoint-signin-aware-success';
    } else {
      type = 'anypoint-signin-aware-signed-out';
    }

    this.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        composed: true,
        detail: this.user
      })
    );
  }

  /**
   * Fired when this scope has been authorized
   * @param {Object} result Authorization result.
   * @event anypoint-signin-aware-success
   */
  /**
   * Fired when this scope is not authorized
   * @event anypoint-signin-aware-signed-out
   */
  /**
   * Fired when there is an error during the signin flow.
   * @param {Object} detail The error object returned from the OAuth 2 flow.
   * @event anypoint-signin-aware-error
   */
}
window.customElements.define('anypoint-signin-aware', AnypointSigninAware);
