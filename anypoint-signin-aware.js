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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import '../../@api-components/oauth-authorization/oauth2-authorization.js';
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
  // OAuth2 authorization type
  authType: 'implicit',
  // Token authorization URL
  authorizationUri: 'https://anypoint.mulesoft.com/accounts/oauth2/authorize',
  // Code exchange endpoint
  accessTokenUri: 'https://anypoint.mulesoft.com/accounts/oauth2/token',
  // User info URL
  profileUrl: 'https://anypoint.mulesoft.com/exchange/api/v1/profile',
  // Log out URL.
  logoutUri: 'https://anypoint.mulesoft.com/accounts/api/access_tokens/',
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
      AnypointAuth.signinAwares[i]._setSignedIn(val);
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
      AnypointAuth.signinAwares[i]._setAccessToken(val);
    }
  },
  // Received User info.
  _user: null,
  /**
   * @return {Object} Profile information.
   */
  get user() {
    return AnypointAuth._user;
  },
  /**
   * Sets new value of user profile and informs awares about the change.
   *
   * @param {Object} val Retreived information about user profile.
   */
  set user(val) {
    AnypointAuth._user = val;
    for (let i = 0; i < AnypointAuth.signinAwares.length; i++) {
      AnypointAuth.signinAwares[i]._setUser(val);
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
      state: AnypointAuth._lastState
    };
    if (AnypointAuth.authType === 'code') {
      result.accessTokenUri = AnypointAuth.accessTokenUri;
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
    return AnypointAuth._deleteToken()
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
    return AnypointAuth._getProfile(info.accessToken)
    .catch(() => AnypointAuth.setAuthData(info.accessToken));
  },

  _oauth2ErrorHandler: function(e) {
    if (AnypointAuth._lastState !== e.detail.state) {
      return;
    }
    const message = e.detail.message;
    AnypointAuth.accessToken = null;
    AnypointAuth.user = null;
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

  setAuthData: function(token, profile) {
    AnypointAuth.accessToken = token;
    AnypointAuth.user = profile;
    AnypointAuth.signedIn = !!token;
    for (let i = 0; i < AnypointAuth.signinAwares.length; i++) {
      AnypointAuth.signinAwares[i]._updateStatus();
    }
  },
  /**
   * Gets user profile information from the authorization server.
   *
   * NOTE: Auth server does not allow XHR from other domains right now
   * so this function is never called.
   * This to be fixed when core service allows to get profile info from
   * different domains.
   *
   * @param {String} accessToken OAuth 2 access token
   * @return {Promise}
   */
  _getProfile: function(accessToken) {
    return AnypointAuth._authGet(AnypointAuth.profileUrl, accessToken)
    .then(function(response) {
      let profile;
      try {
        profile = JSON.parse(response);
      } catch (e) {}
      AnypointAuth.setAuthData(accessToken, profile);
    });
  },

  _authGet: function(url, accessToken) {
    accessToken = accessToken || AnypointAuth.accessToken;
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.setRequestHeader('Authorization', 'bearer ' + accessToken);
      xhr.addEventListener('load', function(e) {
        const status = e.target.status;
        if (status === 404) {
          return reject(new Error('Profile URL is invalid.'));
        } else if (status === 401) {
          return reject(new Error(
            'Invalid access token. Server status is 401.'));
        } else if (status >= 400 && status < 500) {
          return reject(new Error(
            'Server do not support this method. Response code is ' + status));
        } else if (status >= 500) {
          return reject(new Error(
            'Authorization server error. Response code is ' + status + '.'));
        }
        resolve(e.target.response);
      });
      xhr.addEventListener('error', function(e) {
        const status = e.target.status;
        let message = 'The request to the authorization server failed.';
        if (status) {
          message += ' Response code is: ' + status;
        }
        reject(message);
      });
      try {
        xhr.send();
      } catch (e) {
        reject('Unable to send the request.');
      }
    });
  },

  _deleteToken: function() {
    const url = AnypointAuth.logoutUri + AnypointAuth.accessToken;
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', url);
      xhr.addEventListener('load', function(e) {
        const status = e.target.status;
        if (status > 299) {
          return reject('Delete token request faioled.');
        }
        resolve();
      });
      xhr.addEventListener('error', function(e) {
        const status = e.target.status;
        let message = 'Unable to delete the token.';
        if (status) {
          message += ' Response code is: ' + status;
        }
        reject(message);
      });
      try {
        xhr.send();
      } catch (e) {
        reject('Unable to send the request.');
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
      aware._setSignedIn(AnypointAuth.signedIn);
      aware._setAccessToken(AnypointAuth.accessToken);
      aware._setUser(AnypointAuth.user);
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
 * `<anypoint-signin-aware>` is used to authenticate the user in Anypoint
 * core services API.
 *
 * The `anypoint-signin-aware-success` event is triggered when a user
 * successfully authenticates. It also sets `accessToken` property that can be
 * used to interact with Anypoint APIs.
 * The `anypoint-signin-aware-signed-out` event is triggered when a user
 * signs out via calling `signOut()` function.
 *
 * You can bind to `signedIn` property to monitor authorization state.
 * ##### Example
 *
 *     <anypoint-signin-aware signed-in="{{isSigned}}"></anypoint-signin-aware>
 *
 * The `clientId` and `redirectUri` properties has to be set before using the
 * component. `clientId` and associated with it `redirectUri` has to be set up
 * with Anypoint authorization server. Contact Anypoint Core services for
 * more information.
 *
 * ##### Example
 *
 *     <anypoint-signin-aware
 *      client-id="abc123"
 *      redirect-uri="https://auth.domain.com/oauth2/redirect"></anypoint-signin-aware>
 *
 * ## Authorization type
 *
 * This element supports `implicit` authentication flow only. Web application
 * should not contain OAuth2 secret and most OAuth2 authorization do not allow
 * web clients to authenticate from a web client. If you have to use `code`
 * authorization flow when use different method to authenticate the user.
 *
 * ## Autho log in
 *
 * The element attempts to log in user in a non-interactive way (without
 * displaying the popup) when the lement is ready. It does nothing when
 * the response is errored.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof AnypointElements
 */
export class AnypointSigninAware extends PolymerElement {
  static get is() {
    return 'anypoint-signin-aware';
  }
  static get properties() {
    return {
      /**
       * An Anypoint clientId.
       * This property is required to run the authorization flow.
       */
      clientId: {
        type: String,
        observer: '_clientIdChanged'
      },
      /**
       * Authorization redirect URI.
       * This property is required to run the authorization flow.
       */
      redirectUri: {
        type: String,
        observer: '_redirectUriChanged'
      },

      /**
       * True if user is signed in
       */
      signedIn: {
        type: Boolean,
        notify: true,
        readOnly: true
      },
      /**
       * True if user is signed in
       */
      accessToken: {
        type: String,
        notify: true,
        readOnly: true
      },
      /**
       * User profile information.
       */
      user: {
        type: Object,
        notify: true,
        readOnly: true
      },
      /**
       * By default this element inserts `oauth2-authorization` element to the
       * body and uses direct API to authorize the client. Set this property to
       * force the element to use events system to call the OAuth endpoint.
       *
       * It is useful when your application has it's own OAuth 2 authorization
       * mechanism.
       */
      forceOauthEvents: Boolean
    };
  }

  connectedCallback() {
    super.connectedCallback();
    AnypointAuth.attachSigninAware(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
   * from the outside of domain.
   *
   * @return {Promise} Promise resolved when the token is revoked.
   */
  signOut() {
    return AnypointAuth.signOut();
  }
  /**
   * Notifies application about error.
   * @param {String} error Error mesage
   */
  errorNotify(error) {
    this.dispatchEvent(new CustomEvent('anypoint-signin-aware-error', {
      bubbles: true,
      composed: true,
      detail: error
    }));
  }

  _clientIdChanged(newId) {
    AnypointAuth.clientId = newId;
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

    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: this.user
    }));
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
window.customElements.define(AnypointSigninAware.is, AnypointSigninAware);
