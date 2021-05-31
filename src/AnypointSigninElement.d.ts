import { CSSResult, TemplateResult } from 'lit-element';
import { AnypointButton } from '@anypoint-web-components/anypoint-button';
import { AnypointSigninAwareElement } from './AnypointSigninAwareElement';

export declare const accessTokenChangeEvent: unique symbol;
export declare const signedInChangeEvent: unique symbol;
export declare const materialValue: unique symbol;

/**
 * ## Overview
 *
 * The Anypoint SignIn button allows you to sign users into the Anypoint Platform.
 *
 * ## Scopes
 *
 * If you require OAuth 2.0 authorization for certain scopes for your application, the SignIn button supports
 * requesting authorization for scopes from the user and will initialize an authorization flow for those scopes.
 * Simply pass a space separated list of scopes as an attribute to the anypoint-signin element.
 *
 * Example
 * ```
 * <anypoint-signin redirectUri="YOUR_REDIRECT_URI" scopes="profile openid ..." clientId="YOUR_CLIENT_ID"></anypoint-signin>
 * ```
 *
 * #### Notes
 *
 * The `clientId`, `redirectUri`, and `authType` properties has to be set before using the component.
 *
 * Note: `authType` determines what grant type flow to use for authentication.
 * Contact the Anypoint Access Management team for more information.
 * By default, the `authType` will be "authorization_code".
 *
 * Note: `scopes` is an optional property that tells the button which scopes to request authorization for.
 *
 * Note: The Anypoint Platform, for security reasons, does not support the `implicit` flow.
 * Please use the "authorization_code" flow.
 *
 * `clientId` and `redirectUri` has to be set up in the Anypoint Platform when registering an application.
 *
 *  If you do not need to show the button, use the companion
 * `<anypoint-signin-aware>` element to check authentication state and perform manual authentication.
 *
 * ## Authorization type
 *
 * This element supports `implicit` and `authorization_code` authentication flows.
 * It potentially also supports `refresh_token` (use at your discretion, this hasn't been thoroughly tested).
 *
 * The authorization result via the `implicit` flow is an `accessToken` that can be used to call other APIs.
 *
 * The authorization result via the `authorization_code` flow will dispatch an event "oauth2-code-response" with the
 * authorization "code" which you can exchange (e.g. via a backend service) for an `accessToken`.
 *
 * If you have to use the `authorization_code` authorization flow, you MUST handle exchanging the authorization code
 * for an access token. The anypoint-signin-aware element that the anypoint-signin button uses will trigger the
 * authorization flow. Once the user grants authorization, the authorization server will redirect the user to the
 * redirect_uri of the application. The page at the redirect_uri will have the authorization code in the "code"
 * query parameter of the url. The page should parse through the query parameters and send this via a
 * window.postMessage() call back to the page with the anypoint-signin button. The anypoint-signin-aware
 * uses the oauth2-authorization module has an event listener for the window message event and will dispatch
 * the "oauth2-code-response" event with the authorization code for you to exchange for the access token.
 *
 * See https://github.com/advanced-rest-client/oauth-authorization/blob/stage/oauth-popup.html for an example
 * of a page that the Advanced Rest Client redirect_uri goes to which handles the authorization flow correctly.
 *
 * See the demo page for an event listener for the "oauth2-code-response". This should be what you implement
 * for getting the code back.
 *
 * The "oauth2-code-response" will have the following properties if you dispatch a message
 * correctly from the redirect uri popup window after a user successfully grants authorization to your application.
 *
 * code: "THE_AUTHORIZATION_CODE"
 * oauth2response: true
 * state: "YOUR_STATE_QUERY_PARAMETER"
 * tokenTime: 1566413156116
 *
 * #### Examples
 *
 * ```html
 * <anypoint-signin
 *    scopes="openid"
 *    client-id="YOUR APPLICATION CLIENT ID"
 *    redirect-uri="https://auth.domain.com/auth/redirect"
 *  />
 * <anypoint-signin
 *    label-signin="Sign-in" client-id="..."
 *    redirect-uri="https://auth.domain.com/auth/redirect"
 * />
 * <anypoint-signin
 *    width="standard"
 *    client-id="..."
 *    redirect-uri="https://auth.domain.com/auth/redirect"
 *  />
 * ```
 *
 * ## Auto log in
 *
 * The element attempts to log in user in a non-interactive way (without
 * displaying the popup) when the element is ready. It does nothing when
 * the response is an error.
 * 
 * @fires signedinchange
 * @fires accesstokenchange
 * @fires anypointcodeexchange
 * @fires anypointsignin
 * @fires anypointsignout
 * @fires anypointsigninawareerror
 */
export declare class AnypointSigninElement extends AnypointButton {
  get styles(): CSSResult[];

  /**
   * Previously registered handler for `signedin-changed` event
   */
  onsignedin: EventListener;

  /**
   * Previously registered handler for `accesstoken-changed` event
   */
  onaccesstoken: EventListener;

  /**
   * An Anypoint clientId
   * @attribute
   */
  clientId: string;
  /**
   * Authorization redirect URI
   * @attribute
   */
  redirectUri: string;
  /**
   * True if user is signed in
   * @attribute
   */
  signedIn: boolean
  /**
   * True if user is signed in
   * @attribute
   */
  accessToken: string;
  /**
   * An optional label for the sign-in button.
   * @attribute
   */
  labelSignin: string;
  /**
   * An optional label for the sign-out button.
   *
   * Defaults to `Sign out`
   * 
   * @attribute
   */
  labelSignout: string;
  /**
   * OAuth Scopes that the signin flow will request for.
   * @attribute
   */
  scopes: string;
  /**
   * The authorization type e.g. implicit, authorization_code, etc.
   * @attribute
   */
  authType: string;
  /**
   * The width to use for the button.
   *
   * Available options: 'standard', 'wide'.
   * @default 'wide'
   * @attribute
   */
  width: string;
  /**
   * If set to true, sets the compatibility property of AnypointButton to false
   * so that the button is rendered like the Anypoint Button (with material styling)
   * @attribute
   */
  material: boolean;
  /**
   * By default this element inserts `oauth2-authorization` element to the
   * body and uses direct API to authorize the client. Set this property to
   * force the element to use events system to call the OAuth endpoint.
   *
   * It is useful when your application has it's own OAuth 2 authorization
   * mechanism.
   * @attribute
   */
  forceOauthEvents: boolean;

  get authAware(): AnypointSigninAwareElement;

  constructor();

  connectedCallback(): void

  disconnectedCallback(): void

  /**
   * Determines the proper label based on the attributes.
   * @param labelSignin - the signin label e.g. "Sign in with Anypoint Platform"
   * @param width - wide, standard
   * @returns the string that the signin button should show e.g. "Sign in with Anypoint Platform"
   */
  _computeSigninLabel(labelSignin: string, width: string): string;

  /**
   * Sign in user. Opens the authorization dialog for signing in.
   * The dialog will be blocked by a popup blocker unless called inside click handler.
   */
  signIn(): void

  /** Sign out the user */
  signOut(): void

  /**
   * Handler for the `keydown` event. Activates the control when Enter or Space
   * is active.
   */
  _keyDownHandler(e: KeyboardEvent): void

  /**
   * Handler for the `click` event. Activates the control when user click on thr button.
   */
  _clickHandler(): void

  /**
   * Performs sign in or out action and cancels the event
   */
  _handleActivateEvent(e: KeyboardEvent): void

  _atHandler(e: Event): void;
  _signedinHandler(e: Event): void;
  render(): TemplateResult;
}
