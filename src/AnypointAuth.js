/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
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
import { OAuth2Authorization as Oa2 } from '@advanced-rest-client/oauth-authorization';
import { AuthorizationEvents } from '@advanced-rest-client/arc-events';

/** @typedef {import('./AnypointSigninAwareElement').AnypointSigninAwareElement} AnypointSigninAwareElement */
/** @typedef {import('@advanced-rest-client/oauth-authorization').OAuth2AuthorizationElement} OAuth2AuthorizationElement */
/** @typedef {import('@advanced-rest-client/arc-types').Authorization.TokenInfo} TokenInfo */
/** @typedef {import('@advanced-rest-client/arc-types').Authorization.OAuth2Authorization} OAuth2Authorization */

export const hostname = 'https://anypoint.mulesoft.com';

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

  /** 
   * @type {OAuth2AuthorizationElement}
   */
  _oauthFactory: null,

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
    AnypointAuth.signinAwares.forEach((aware) => { aware._signedIn = val });
  },

  // User's access token.
  _accessToken: null,

  /**
   * @return {string} Access token value
   */
  get accessToken() {
    return AnypointAuth._accessToken;
  },

  /**
   * Sets accessToken value and informs awares about the change.
   *
   * @param {string} val New access token.
   */
  set accessToken(val) {
    if (val === AnypointAuth._accessToken) {
      return;
    }
    AnypointAuth._accessToken = val;
    AnypointAuth.signinAwares.forEach((aware) => { aware._accessToken = val });
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
   * @param {AnypointSigninAwareElement=} aware The aware that requested the init.
   */
  init(aware) {
    if (!AnypointAuth.forceOauthEvents) {
      AnypointAuth._setOauthAuthorization();
    }
    AnypointAuth.initAuth2(aware);
  },

  _setOauthAuthorization() {
    let factory;
    if (AnypointAuth._oauthFactory) {
      factory = AnypointAuth._oauthFactory;
    } else {
      const selector = 'oauth2-authorization[data-owner="anypoint-signin-aware"]';
      factory = document.body.querySelector(selector);
    }
    if (!factory) {
      AnypointAuth._oauthFactory = document.createElement('oauth2-authorization');
      AnypointAuth._oauthFactory.dataset.owner = 'anypoint-signin-aware';
      AnypointAuth._oauthFactory.addEventListener('oauth2-error', AnypointAuth._oauth2ErrorHandler);
      AnypointAuth._oauthFactory.addEventListener('oauth2-token-response', AnypointAuth._oauth2TokenHandler);
      document.body.appendChild(AnypointAuth._oauthFactory);
    }
  },

  _clearOauthAuthorization() {
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
   * @param {AnypointSigninAwareElement=} aware The aware that requested the init.
   */
  initAuth2(aware) {
    AnypointAuth._initSignIn(aware);
  },

  /**
   * Generates `state` parameter for the OAuth2 call.
   *
   * @return {String} Generated state string.
   */
  generateState() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  /**
   * @param {AnypointSigninAwareElement=} aware The aware that requested the init.
   */
  _initSignIn(aware) {
    if (!AnypointAuth.clientId || !AnypointAuth.redirectUri) {
      return;
    }
    AnypointAuth.signIn(false, aware);
  },

  assertAuthInitialized() {
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
   * @return {OAuth2Authorization} OAuth2 authorization settings to be dispatched to `<oauth2-authorization>` element
   */
  oauth2Config() {
    AnypointAuth._lastState = AnypointAuth.generateState();
    const result = /** @type OAuth2Authorization */ ({
      type: AnypointAuth.authType,
      authorizationUri: AnypointAuth.authorizationUri,
      clientId: AnypointAuth.clientId,
      redirectUri: AnypointAuth.redirectUri,
      state: AnypointAuth._lastState,
      scopes: AnypointAuth.scopes
    });
    const useAuthCodeFlow = AnypointAuth.authType === GRANT_TYPES.AUTH_CODE;
    if (useAuthCodeFlow) {
      result.accessTokenUri = AnypointAuth.accessTokenUri;
    }
    return result;
  },

  /**
   * Sends `oauth2-token-requested` custom event to authorize with the
   * Exchange server.
   *
   * @param {boolean} interactive If `false` then it performs non-interactive
   * authorization in the background.
   * @param {EventTarget=} eventTarget Event target to dispatch `oauth2-token-requested`
   * from when OAuth event is enforced. If not ser it dispatched the event on the document body.
   * @returns {Promise<void>}
   */
  async signIn(interactive, eventTarget) {
    if (!AnypointAuth._oauthFactory && !AnypointAuth.forceOauthEvents) {
      return;
    }
    AnypointAuth.assertAuthInitialized();
    const detail = AnypointAuth.oauth2Config();
    if (interactive === false) {
      detail.interactive = interactive;
    }
    let info = /** @type TokenInfo */ (null);
    try {
      if (AnypointAuth.forceOauthEvents) {
        const node = (eventTarget || document.body);
        info = await AuthorizationEvents.OAuth2.authorize(node, detail);
      } else {
        const auth = new Oa2(detail);
        auth.checkConfig();
        info = await auth.authorize();
      }
    } catch (e) {

    }
  },
  /**
   * Signs out the user and attempts to destroy the token.
   * Currently token destroy endpoint does not allow request from
   * different domains so this is dummy function that clears token info,
   * TODO: (jarrodek) Discuss with core services to enable token revoke action
   * from the outside of domain.
   *
   * @return {Promise} Promise resolved when the token is revoked.
   */
  signOut: async () => {
    try {
      await AnypointAuth._logout();
    } catch (e) {
      // 
    }
    AnypointAuth.setAuthData();
  },

  _oauth2TokenHandler(e) {
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
    AnypointAuth.setAuthData(info.accessToken);
  },

  /**
   * @param {Error} e
   */
  _handleOauthError(e) {
    const { message } = e;
    AnypointAuth.accessToken = null;
    AnypointAuth.signedIn = false;
    AnypointAuth.signinAwares.forEach((aware) => {
      aware._updateStatus();
      if (e.interactive !== false) {
        aware.errorNotify({ message });
      }
    });
  },

  _oauth2ErrorHandler(e) {
    if (AnypointAuth._lastState !== e.detail.state) {
      return;
    }
    
  },

  /**
   * @param {string=} token 
   */
  setAuthData(token) {
    AnypointAuth.accessToken = token;
    AnypointAuth.signedIn = !!token;
    AnypointAuth.signinAwares.forEach((aware) => aware._updateStatus());
  },

  _logout() {
    const url = AnypointAuth.logoutUri;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      if (AnypointAuth.accessToken) {
        xhr.setRequestHeader('Authorization', `bearer ${  AnypointAuth.accessToken}`);
      }
      xhr.addEventListener('load', (e) => {
        const { status } = /** @type XMLHttpRequest */ (e.target);
        if (status > 299) {
          reject(new Error('Delete token request failed.'));
          return;
        }
        resolve();
      });
      xhr.addEventListener('error', (e) => {
        const { status } = /** @type XMLHttpRequest */ (e.target);
        let message = 'Unable to delete the token.';
        if (status) {
          message += ` Response code is: ${  status}`;
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
   * @param {AnypointSigninAwareElement} aware The aware element to add
   */
  attachSigninAware(aware) {
    if (AnypointAuth.signinAwares.indexOf(aware) === -1) {
      AnypointAuth.signinAwares.push(aware);
      if (typeof aware.forceOauthEvents !== 'undefined') {
        AnypointAuth.forceOauthEvents = aware.forceOauthEvents;
      }
      aware._signedIn = AnypointAuth.signedIn;
      aware._accessToken = AnypointAuth.accessToken;
    }
    if (!AnypointAuth._initialized) {
      AnypointAuth.init(aware);
      AnypointAuth._initialized = true;
    }
  },

  /**
   * @param {AnypointSigninAwareElement} aware The aware element to remove
   */
  detachSigninAware(aware) {
    const index = AnypointAuth.signinAwares.indexOf(aware);
    if (index !== -1) {
      AnypointAuth.signinAwares.splice(index, 1);
    }
  },

  /**
   * @param {string} message 
   */
  notifyError(message) {
    AnypointAuth.signinAwares.forEach((aware) => {
      aware.errorNotify({ message });
    });
  }
};
