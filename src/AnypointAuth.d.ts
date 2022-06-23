import { AuthorizationError, OAuth2Config } from '@advanced-rest-client/oauth';
import AnypointSigninAwareElement from './AnypointSigninAwareElement';
import {
  clientIdValue,
  redirectUriValue,
  authTypeValue,
  signedInValue,
  accessTokenValue,
} from './internals.js';

export declare const hostname: string;

declare interface GrantTypes {
  AUTH_CODE: string;
  REFRESH: string;
  IMPLICIT: string;
}

export const GRANT_TYPES: GrantTypes;

declare interface AnypointAuth {
  /**
   * OAuth2 client_id param
   */
  [clientIdValue]: string;

  /**
   * OAuth2 redirect URI
   */
  [redirectUriValue]: string;

  /** 
   * OAuth2 authorization type. e.g. implicit, authorization_code, etc.
   * By default, the authorization type is authorization_code.
   */
  [authTypeValue]: string;
  /**  
   * Is user signed in?
   */
  [signedInValue]: boolean;

  /** 
   * The current access token.
   */
  [accessTokenValue]: string;

  clientId: string;
  redirectUri: string;
  authType: string;

  /**
   * value for user signed in flag.
   */
  signedIn: boolean;

  /**
   * @return Access token value
   */
  accessToken: string;

  /**
   * When the `forceOauthEvents` is set then this library dispatches the OAuth2 event.
   * This can be used to force the components to dispatch the event so the application can handle the authorization process.
   * If not set then the Aware uses the `OAuth2Authorization` library from the `@advanced-rest-client/oauth` package
   * to handle the token exchange.
   * 
   * Note, Exchange does not allow to exchange the code for token in a browser environment. This library configures
   * the `OAuth2Authorization` library to dispatch the event to exchange the data by the application.
   */
  forceOauthEvents: boolean;

  /** 
   * Anypoint token authorization URL
   */
  authorizationUri: string;

  /** 
   * Code exchange endpoint
   */
  accessTokenUri: string;
  /** 
   * Log out URL.
   */
  logoutUri: string;
  /**
   * The list of scopes to use with the request
   */
  scopes?: string[];
  
  /**
   * The list of <anypoint-signin-aware> elements.
   * The state changes are broadcast to them.
   */
  signinAwares: AnypointSigninAwareElement[],
  
  /**
   * Initialize the client.
   * @param aware The aware that requested the init.
   */
  init(aware?: AnypointSigninAwareElement): void;

  /**
   * Initializes OAuth2 client
   * @param aware The aware that requested the init.
   */
  initAuth2(aware?: AnypointSigninAwareElement): void;

  /**
   * @param aware The aware that requested the init.
   */
  _initSignIn(aware?: AnypointSigninAwareElement): void;

  assertAuthInitialized(): void;

  /**
   * OAuth2 authorization event settings.
   *
   * @returns OAuth2 authorization settings to be dispatched to `<oauth2-authorization>` element
   */
  oauth2Config(): OAuth2Config;

  /**
   * Sends `oauth2-token-requested` custom event to authorize with the
   * Exchange server.
   *
   * @param interactive If `false` then it performs non-interactive authorization in the background.
   * @param eventTarget Event target to dispatch the OAuth 2 token request event.
   */
  signIn(interactive: boolean, eventTarget?: EventTarget): Promise<void>;

  /**
   * Signs out the user and attempts to destroy the token.
   * Currently token destroy endpoint does not allow request from
   * different domains so this is dummy function that clears token info,
   * TODO(@jarrodek) Discuss with core services to enable token revoke action
   * from the outside of domain.
   *
   * @returns Promise resolved when the token is revoked.
   */
  signOut(): Promise<void>

  _handleOauthError(e: AuthorizationError): void;

  setAuthData(token?: string): void;

  _logout(): Promise<void>;
  
  /**
   * @param aware The aware element to add
   */
  attachSigninAware(aware: AnypointSigninAwareElement): void;

  /**
   * @param aware The aware element to remove
   */
  detachSigninAware(aware: AnypointSigninAwareElement): void;
}

export declare const AnypointAuth: AnypointAuth;
