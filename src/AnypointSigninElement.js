/* eslint-disable class-methods-use-this */
import { html, css } from 'lit';
import { AnypointButtonElement } from '@anypoint-web-components/awc/dist';
import elementStyles from './Signin.styles.js';
import { AccessTokenChangeType, SignedInChangeType } from './Events.js';
import '../anypoint-signin-aware.js';

/** @typedef {import('./AnypointSigninAwareElement').default} AnypointSigninAwareElement */
/** @typedef {import('@anypoint-web-components/awc/src/elements/button/AnypointButtonBase').EmphasisValue} EmphasisValue */

/**
 * Enum button label default values.
 * @readonly
 * @enum {string}
 */
const LabelValue = {
  STANDARD: 'Sign in',
  WIDE: 'Sign in with Anypoint Platform'
};

/**
 * Enum width values.
 * @readonly
 * @enum {string}
 */
const WidthValue = {
  STANDARD: 'standard',
  WIDE: 'wide'
};

export const accessTokenChangeEvent = Symbol('accessTokenChangeEvent');
export const signedInChangeEvent = Symbol('signedInChangeEvent');
export const materialValue = Symbol('materialValue');

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
 */
export default class AnypointSigninElement extends AnypointButtonElement {
  get styles() {
    return [
      // @ts-ignore
      super.styles,
      css`
        ${elementStyles}
      `
    ];
  }

  /**
   * @return {EventListener} Previously registered handler for `signedin-changed` event
   */
  get onsignedin() {
    return this[signedInChangeEvent];
  }

  /**
   * Registers a callback function for `signedin-changed` event
   * @param {EventListener} value A callback to register. Pass `null` or `undefined` to clear the listener.
   */
  set onsignedin(value) {
    if (this[signedInChangeEvent]) {
      this.removeEventListener(SignedInChangeType, this[signedInChangeEvent]);
    }
    if (typeof value !== 'function') {
      this[signedInChangeEvent] = null;
      return;
    }
    this[signedInChangeEvent] = value;
    this.addEventListener(SignedInChangeType, value);
  }

  /**
   * @return {EventListener} Previously registered handler for `accesstoken-changed` event
   */
  get onaccesstoken() {
    return this[accessTokenChangeEvent];
  }

  /**
   * Registers a callback function for `accesstoken-changed` event
   * @param {EventListener} value A callback to register. Pass `null` or `undefined` to clear the listener.
   */
  set onaccesstoken(value) {
    if (this[accessTokenChangeEvent]) {
      this.removeEventListener(AccessTokenChangeType, this[accessTokenChangeEvent]);
    }
    if (typeof value !== 'function') {
      this[accessTokenChangeEvent] = null;
      return;
    }
    this[accessTokenChangeEvent] = value;
    this.addEventListener(AccessTokenChangeType, value);
  }

  /**
   * @return {boolean} material property, which should represent opposite of "anypoint"
   */
  get material() {
    return this[materialValue];
  }

  /**
   * @param {boolean} value If false, button should use "anypoint" styling.
   * If true, should use material styling.
   */
  set material(value) {
    const old = this[materialValue];
    if (old === value) {
      return;
    }
    this.anypoint = !value;
    this[materialValue] = value;
  }

  static get properties() {
    return {
      /**
       * An Anypoint clientId
       */
      clientId: { type: String },
      /**
       * Authorization redirect URI
       */
      redirectUri: { type: String },
      /**
       * True if user is signed in
       */
      signedIn: { type: Boolean },
      /**
       * True if user is signed in
       */
      accessToken: { type: String },
      /**
       * An optional label for the sign-in button.
       */
      labelSignin: { type: String },
      /**
       * An optional label for the sign-out button.
       *
       * Defaults to `Sign out`
       */
      labelSignout: { type: String },
      /**
       * OAuth Scopes that the signin flow will request for.
       */
      scopes: { type: String },
      /**
       * The authorization type e.g. implicit, authorization_code, etc.
       */
      authType: { type: String },
      /**
       * The width to use for the button.
       *
       * Available options: 'standard', 'wide'.
       * @default 'wide'
       */
      width: { type: String },
      /**
       * If set to true, sets the "anypoint" property of AnypointButton to false
       * so that the button is rendered like the Anypoint Button (with material styling)
       */
      material: { type: Boolean },
      /**
       * By default this element inserts `oauth2-authorization` element to the
       * body and uses direct API to authorize the client. Set this property to
       * force the element to use events system to call the OAuth endpoint.
       *
       * It is useful when your application has it's own OAuth 2 authorization
       * mechanism.
       */
      forceOauthEvents: { type: Boolean }
    };
  }

  /**
   * @returns {AnypointSigninAwareElement}
   */
  get authAware() {
    return this.shadowRoot.querySelector('anypoint-signin-aware');
  }

  constructor() {
    super();
    /** @type EmphasisValue */
    this.emphasis = 'high';
    this.width = 'wide';
    this.labelSignout = 'Sign out';
    this.authType = undefined;
    this.clientId = undefined;
    this.labelSignin = undefined;
    this.redirectUri = undefined;
    this.scopes = undefined;
    this.anypoint = true;
    this.forceOauthEvents = false;
    this.signedIn = false;

    this.addEventListener('keydown', this._keyDownHandler.bind(this));
    this.addEventListener('click', this._clickHandler.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    if (!this.hasAttribute('aria-labelledby') && !this.hasAttribute('aria-label')) {
      const text = 'Press the button to sign in with Anypoint Platform';
      this.setAttribute('aria-label', text);
    } 
  }

  /**
   * Determines the proper label based on the attributes.
   * @param {string} labelSignin - the signin label e.g. "Sign in with Anypoint Platform"
   * @param {string} width - wide, standard
   * @returns {string} - the string that the signin button should show e.g. "Sign in with Anypoint Platform"
   */
  _computeSigninLabel(labelSignin, width) {
    if (labelSignin) {
      return labelSignin;
    }
    switch (width) {
      case WidthValue.WIDE:
        return LabelValue.WIDE;
      case WidthValue.STANDARD:
        return LabelValue.STANDARD;
      default:
        return LabelValue.WIDE;
    }
  }

  /**
   * Sign in user. Opens the authorization dialog for signing in.
   * The dialog will be blocked by a popup blocker unless called inside click handler.
   */
  signIn() {
    this.authAware.signIn();
  }

  /** Sign out the user */
  signOut() {
    this.authAware.signOut();
  }

  /**
   * Handler for the `keydown` event. Activates the control when Enter or Space
   * is active.
   * @param {KeyboardEvent} e
   */
  _keyDownHandler(e) {
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      this._handleActivateEvent(e);
    }
  }

  /**
   * Handler for the `click` event. Activates the control when user click on thr button.
   */
  _clickHandler() {
    if (this.signedIn) {
      this.signOut();
    } else {
      this.signIn();
    }
  }

  /**
   * Performs sign in or out action and cancels the event
   * @param {KeyboardEvent} e
   */
  _handleActivateEvent(e) {
    e.preventDefault();
    if (this.signedIn) {
      this.signOut();
    } else {
      this.signIn();
    }
  }

  /**
   * @param {Event} e 
   */
  _atHandler(e) {
    const aware = /** @type AnypointSigninAwareElement */ (e.target);
    this.accessToken = aware.accessToken;
    this.dispatchEvent(new Event(AccessTokenChangeType));
  }

  /**
   * @param {Event} e 
   */
  _signedinHandler(e) {
    const aware = /** @type AnypointSigninAwareElement */ (e.target);
    this.signedIn = aware.signedIn;
    this.dispatchEvent(new Event(SignedInChangeType));
  }

  render() {
    const {
      authType,
      clientId,
      forceOauthEvents,
      labelSignin,
      labelSignout,
      redirectUri,
      scopes,
      signedIn,
      width,
      styles,
    } = this;
    const _labelSignin = this._computeSigninLabel(labelSignin, width);
    return html`
      <style>${styles}</style>
      <anypoint-signin-aware
        .clientId="${clientId}"
        .redirectUri="${redirectUri}"
        .scopes="${scopes}"
        .authType="${authType}"
        .forceOauthEvents="${forceOauthEvents}"
        @accesstokenchange="${this._atHandler}"
        @signedinchange="${this._signedinHandler}"
      ></anypoint-signin-aware>
      <div class="buttonText ${signedIn ? 'signOut' : 'signIn'}">${signedIn ? labelSignout : _labelSignin}</div>
    `;
  }
}
