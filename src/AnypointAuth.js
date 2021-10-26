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
import { AuthorizationEvents } from '@advanced-rest-client/events';
import { randomString } from '@advanced-rest-client/app/src/elements/authorization/Utils.js';
import { ExchangeAuthorization } from './ExchangeAuthorization.js';
import {
  clientIdValue,
  redirectUriValue,
  authTypeValue,
  signedInValue,
  accessTokenValue,
} from './internals.js';

/** @typedef {import('./AnypointSigninAwareElement').default} AnypointSigninAwareElement */
/** @typedef {import('@advanced-rest-client/app').OAuth2AuthorizationElement} OAuth2AuthorizationElement */
/** @typedef {import('@advanced-rest-client/app').AuthorizationError} AuthorizationError */
/** @typedef {import('@advanced-rest-client/events').Authorization.TokenInfo} TokenInfo */
/** @typedef {import('@advanced-rest-client/events').Authorization.OAuth2Authorization} OAuth2Authorization */

export const hostname = 'https://anypoint.mulesoft.com';

export const GRANT_TYPES = {
  AUTH_CODE: 'authorization_code',
  REFRESH: 'refresh_token',
  IMPLICIT: 'implicit'
};

export const AnypointAuth = {
  /**
   * OAuth2 client_id param
   * @type {string}
   */
  [clientIdValue]: null,

  /**
   * OAuth2 redirect URI
   * @type {string}
   */
  [redirectUriValue]: null,

  /** 
   * OAuth2 authorization type. e.g. implicit, authorization_code, etc.
   * By default, the authorization type is authorization_code.
   */
  [authTypeValue]: GRANT_TYPES.AUTH_CODE,
  /**  
   * Is user signed in?
   * @type {boolean}
   */
  [signedInValue]: false,

  /** 
   * The current access token.
   */
  [accessTokenValue]: null,

  /** 
   * @returns {string} currently set `client_id` param
   */
  get clientId() {
    return AnypointAuth[clientIdValue];
  },

  /** 
   * Sets new `client_id`
   * @param {string} value
   */
  set clientId(val) {
    if (val && val !== AnypointAuth[clientIdValue]) {
      AnypointAuth[clientIdValue] = val;
      AnypointAuth.initAuth2();
    } else {
      AnypointAuth[clientIdValue] = val;
    }
  },
  
  /** 
   * @returns {string} currently set redirect URI.
   */
  get redirectUri() {
    return AnypointAuth[redirectUriValue];
  },

  /** 
   * Sets the new redirect URI
   * @param {string} value
   */
  set redirectUri(val) {
    if (val && val !== AnypointAuth[redirectUriValue]) {
      AnypointAuth[redirectUriValue] = val;
      AnypointAuth.initAuth2();
    } else {
      AnypointAuth[redirectUriValue] = val;
    }
  },
  
  /** 
   * @returns {string} currently set authorization type.
   */
  get authType() {
    return AnypointAuth[authTypeValue];
  },

  /** 
   * Sets the new authorization type value
   * @param {string} value
   */
  set authType(val) {
    if (val && val !== AnypointAuth[authTypeValue]) {
      AnypointAuth[authTypeValue] = val;
      AnypointAuth.initAuth2();
    } else {
      AnypointAuth[authTypeValue] = val;
    }
  },

  /**
   * @returns {boolean} value for user signed in flag.
   */
  get signedIn() {
    return AnypointAuth[signedInValue];
  },

  /**
   * Sets signedIn value and informs awares about the change.
   *
   * @param {boolean} val Current state of user being signed in.
   */
  set signedIn(val) {
    if (val === AnypointAuth[signedInValue]) {
      return;
    }
    AnypointAuth[signedInValue] = val;
    AnypointAuth.signinAwares.forEach((aware) => { aware[signedInValue] = val });
  },

  /**
   * @return {string} Access token value
   */
  get accessToken() {
    return AnypointAuth[accessTokenValue];
  },

  /**
   * Sets accessToken value and informs awares about the change.
   *
   * @param {string} val New access token.
   */
  set accessToken(val) {
    if (val === AnypointAuth[accessTokenValue]) {
      return;
    }
    AnypointAuth[accessTokenValue] = val;
    AnypointAuth.signinAwares.forEach((aware) => { aware[accessTokenValue] = val });
  },

  /**
   * When the `forceOauthEvents` is set then this library dispatches the OAuth2 event
   * as declared in the `AuthorizationEvents` of the `@advanced-rest-client/arc-events` library.
   * This can be used to force the components to dispatch the event so the application can handle the authorization process.
   * If not set then the Aware uses the `OAuth2Authorization` library from the `@advanced-rest-client/oauth-authorization` package
   * to handle the token exchange.
   * 
   * Note, Exchange does not allow to exchange the code for token in a browser environment. This library configures
   * the `OAuth2Authorization` library to dispatch the event to exchange the data by the application.
   * 
   * @type {boolean}
   */
  forceOauthEvents: false,

  /** 
   * Anypoint token authorization URL
   * @type {string}
   */
  authorizationUri: `${hostname}/accounts/api/v2/oauth2/authorize`,

  /** 
   * Code exchange endpoint
   * @type {string}
   */
  accessTokenUri: `${hostname}/accounts/api/v2/oauth2/token`,
  /** 
   * Log out URL.
   * @type {string}
   */
  logoutUri: `${hostname}/accounts/api/logout/`,
  
  /**
   * The list of <anypoint-signin-aware> elements.
   * The state changes are broadcast to them.
   * @type {AnypointSigninAwareElement[]}
   */
  signinAwares: [],
  
  /**
   * Initialize the client.
   * @param {AnypointSigninAwareElement=} aware The aware that requested the init.
   */
  init(aware) {
    AnypointAuth.initAuth2(aware);
  },

  /**
   * Initializes OAuth2 client
   * @param {AnypointSigninAwareElement=} aware The aware that requested the init.
   */
  initAuth2(aware) {
    AnypointAuth._initSignIn(aware);
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
    const result = /** @type OAuth2Authorization */ ({
      grantType: AnypointAuth.authType,
      authorizationUri: AnypointAuth.authorizationUri,
      clientId: AnypointAuth.clientId,
      redirectUri: AnypointAuth.redirectUri,
      state: randomString(),
      scopes: AnypointAuth.scopes,
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
   * @param {EventTarget=} eventTarget Event target to dispatch the OAuth 2 token request event.
   * @returns {Promise<void>}
   */
  async signIn(interactive, eventTarget=document.body) {
    try {
      AnypointAuth.assertAuthInitialized();
      const detail = AnypointAuth.oauth2Config();
      if (interactive === false) {
        detail.interactive = interactive;
      }
      let info = /** @type TokenInfo */ (null);
      if (AnypointAuth.forceOauthEvents) {
        info = await AuthorizationEvents.OAuth2.authorize(eventTarget, detail);
        if (!info) {
          throw new Error('The exchange authorization event not handled.');
        }
      } else {
        const auth = new ExchangeAuthorization(detail, {}, eventTarget);
        auth.checkConfig();
        info = await auth.authorize();
      }
      // the state is checked in the authorization library so no need to check it here
      if (!info || !info.accessToken) {
        AnypointAuth.setAuthData();
      } else {
        AnypointAuth.setAuthData(info.accessToken);
      }
    } catch (e) {
      if (e.interactive === false) {
        return;
      }
      this._handleOauthError(e);
      // throw e;
    }
  },

  /**
   * Signs out the user and attempts to destroy the token.
   * Currently token destroy endpoint does not allow request from
   * different domains so this is dummy function that clears token info,
   * TODO: (jarrodek) Discuss with core services to enable token revoke action
   * from the outside of domain.
   *
   * @return {Promise<void>} Promise resolved when the token is revoked.
   */
  signOut: async () => {
    try {
      await AnypointAuth._logout();
    } catch (e) {
      // 
    }
    AnypointAuth.setAuthData();
  },

  /**
   * @param {AuthorizationError} e
   */
  _handleOauthError(e) {
    const { message } = e;
    AnypointAuth.accessToken = null;
    AnypointAuth.signedIn = false;
    AnypointAuth.signinAwares.forEach((aware) => {
      aware._updateStatus();
      if (e.interactive !== false) {
        aware.errorNotify(message);
      }
    });
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
          message += ` Response code is: ${status}`;
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
      if (typeof aware.forceOauthEvents === 'boolean') {
        AnypointAuth.forceOauthEvents = aware.forceOauthEvents;
      }
      aware[signedInValue] = AnypointAuth.signedIn;
      aware[accessTokenValue] = AnypointAuth.accessToken;
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
  }
};
