import { LitElement } from 'lit';

import {
  signedInValue,
  accessTokenValue,
  redirectUriValue,
  clientIdValue,
  authTypeValue,
  scopesValue,
} from './internals.js';

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
 * ## Auto log in
 *
 * The element attempts to log in user in a non-interactive way (without
 * displaying the popup) when the element is ready. It does nothing when
 * the response is error.
 * 
 * @fires anypointsignin
 * @fires anypointsignout
 * @fires anypointsigninawareerror
 * @fires accesstokenchange
 * @fires signedinchange
 * @fires anypointcodeexchange
 */
export default class AnypointSigninAwareElement extends LitElement {
  /**
   * The authorization grant type. e.g. implicit, authorization code, etc.
   * Note for authorization code and other grant types, you should use forceOAuthEvents (see below).
   * @attribute
   */
  authType?: string;
  /**
   * An Anypoint clientId.
   * This property is required to run the authorization flow.
   * @attribute
   */
  clientId?: string;
  /**
   * Authorization redirect URI.
   * This property is required to run the authorization flow.
   * @attribute
   */
  redirectUri?: string;
  /**
   * String representing scopes that the application is requesting from the user.
   * These scopes should be a subset of the scopes enabled for the client.
   * This property is required to run the grant authorization flow.
   * @attribute
   */
  scopes?: string;
  /**
   * By default this element inserts `oauth2-authorization` element to the
   * body and uses direct API to authorize the client. Set this property to
   * force the element to use events system to call the OAuth endpoint.
   *
   * It is useful when your application has it's own OAuth 2 authorization
   * mechanism. In this case handle `oauth2-token-requested` custom event.
   * See `@advanced-rest-client/oauth` component documentation
   * for more information.
   * @attribute
   */
  forceOauthEvents?: boolean;

  /**
   * @return Current access token of authenticated user
   */
  get accessToken(): string;

  [accessTokenValue]: string;

  /**
   * @return True when user is signed in
   */
  get signedIn(): boolean;

  [signedInValue]: boolean;
  [redirectUriValue]: string;
  [clientIdValue]: string;
  [authTypeValue]: string;
  [scopesValue]: string;

  connectedCallback(): void;

  disconnectedCallback(): void;

  /** pops up the authorization dialog */
  signIn(): void;

  /**
   * Signs out the user and attempts to destroy the token.
   * Currently token destroy endpoint does not allow request from
   * different domains so this is dummy function that clears token info,
   * TODO: @jarrodek Discuss with core services to enable token revoke action
   * TODO: (leo) Calling /logout will destroy the token as well.
   *  However, CORS is not enabled for /logout for most origins.
   *  Figure out where the allowed origins list is.
   * from the outside of domain.
   *
   * @returns Promise resolved when the token is revoked.
   */
  signOut(): Promise<void>;

  /**
   * Notifies application about error.
   * @param error Error message
   */
  errorNotify(error: string): void;

  _clientIdChanged(newId?: string): void;

  _authTypeChanged(newAuthType?: string): void;

  /**
   * Sets AnypointAuth with an array of scopes, e.g. ['full','profile','email']
   * @param newScopes space separated scopes, e.g. 'full profile email'
   */
  _scopesChanged(newScopes: string): void;

  _redirectUriChanged(value: string): void;

  _updateStatus(): void;
}
