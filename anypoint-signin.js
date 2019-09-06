import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/iron-icon/iron-icon.js';
import {
  ButtonStateMixin,
  ControlStateMixin
} from '@anypoint-web-components/anypoint-control-mixins/anypoint-control-mixins.js';
import './anypoint-signin-aware.js';
import './mulesoft-icons.js';
import styles from './anypoint-signin-styles.js';
/**
 * Enum button label default values.
 * @readonly
 * @enum {string}
 */
const LabelValue = {
  STANDARD: 'Sign in',
  WIDE: 'Sign in with MuleSoft'
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
 * <anypoint-signin redirecturi="YOUR_REDIRECT_URI" scopes="profile openid ..." clientid="YOUR_CLIENT_ID"></anypoint-signin>
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
 *    theme="dark"
 *    width="iconOnly"
 *    client-id="..."
 *    redirect-uri="https://auth.domain.com/auth/redirect"
 *  />
 * ```
 *
 * ## Autho log in
 *
 * The element attempts to log in user in a non-interactive way (without
 * displaying the popup) when the element is ready. It does nothing when
 * the response is errored.
 *
 * ## New in version 2.0
 *
 * - The element does not include polyfills library. If you targeting legacy
 * browsers you can include polyfills library from `advanced-rest-client/arc-polyfills`
 * - The element works with Polymer 2.0 library
 *
 * ## Styling
 *
 * `<anypoint-signin>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--anypoint-signin-disabled-background-color` | Background color of the disabled button | `#eaeaea`
 * `--anypoint-signin-disabled-color` | Color of the disabled button | `#a8a8a8`
 *
 * @customElement
 * @demo demo/index.html
 * @memberof AnypointElements
 */
export class AnypointSignin extends ControlStateMixin(ButtonStateMixin(LitElement)) {
  static get styles() {
    return css`
      ${styles}

      .fit {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    `;
  }

  render() {
    const {
      height,
      width,
      theme,
      signedIn,
      clientId,
      redirectUri,
      forceOauthEvents,
      labelSignout,
      labelSignin,
      scopes,
      authType,
      icon
    } = this;
    const buttonIcon = 'anypoint:anypoint';
    const buttonClass = this._computeButtonClass(height, width, theme, signedIn);
    const _labelSignin = this._computeSigninLabel(labelSignin, width, icon);
    return html`
      <anypoint-signin-aware
        .clientId="${clientId}"
        .redirectUri="${redirectUri}"
        .scopes="${scopes}"
        .authType="${authType}"
        .forceOauthEvents="${forceOauthEvents}"
        @accesstoken-changed="${this._atHandler}"
        @signedin-changed="${this._signedinHandler}"
      ></anypoint-signin-aware>
      <div id="authButton" class="${buttonClass}">
        ${signedIn
          ? html`
              <div class="button-content signOut">
                <span class="icon"><iron-icon icon=${buttonIcon}></iron-icon></span>
                <span class="buttonText">${labelSignout}</span>
              </div>
            `
          : html`
              <div class="button-content signIn">
                <span class="icon"><iron-icon icon=${buttonIcon}></iron-icon></span>
                <span class="buttonText">${_labelSignin}</span>
              </div>
            `}
      </div>
    `;
  }

  get signedIn() {
    return this._signedIn;
  }

  set signedIn(value) {
    const old = this._signedIn;
    if (old === value) {
      return;
    }
    this._signedIn = value;
    this.requestUpdate('signedIn', old);
    this.dispatchEvent(
      new CustomEvent('signedin-changed', {
        detail: {
          value
        }
      })
    );
  }

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(value) {
    const old = this._accessToken;
    if (old === value) {
      return;
    }
    this._accessToken = value;
    this.requestUpdate('accessToken', old);
    this.dispatchEvent(
      new CustomEvent('accesstoken-changed', {
        detail: {
          value
        }
      })
    );
  }

  /**
   * @return {Function} Previously registered handler for `signedin-changed` event
   */
  get onsignedin() {
    return this['_onsignedin-changed'];
  }
  /**
   * Registers a callback function for `signedin-changed` event
   * @param {Function} value A callback to register. Pass `null` or `undefined`
   * to clear the listener.
   */
  set onsignedin(value) {
    this._registerCallback('signedin-changed', value);
  }
  /**
   * @return {Function} Previously registered handler for `accesstoken-changed` event
   */
  get onaccesstoken() {
    return this['_onaccesstoken-changed'];
  }
  /**
   * Registers a callback function for `accesstoken-changed` event
   * @param {Function} value A callback to register. Pass `null` or `undefined`
   * to clear the listener.
   */
  set onaccesstoken(value) {
    this._registerCallback('accesstoken-changed', value);
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
       * The theme to use for the button.
       *
       * Available options: light, dark.
       *
       * @attribute theme
       * @type {string}
       * @default 'dark'
       */
      theme: { type: String, reflect: true },
      /**
       * The width to use for the button.
       *
       * Available options: iconOnly, standard, wide.
       *
       * @type {string}
       * @default 'standard'
       */
      width: { type: String },
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

  get authAware() {
    return this.shadowRoot.querySelector('anypoint-signin-aware');
  }

  constructor() {
    super();
    this.height = 'standard';
    this.width = 'standard';
    this.labelSignout = 'Sign out';
    this.theme = 'dark';

    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    if (!this.hasAttribute('aria-labelledby') && !this.hasAttribute('aria-label')) {
      const text = 'Press the button to sign in with MuleSoft';
      this.setAttribute('aria-label', text);
    }
    this.addEventListener('keydown', this._keyDownHandler);
    this.addEventListener('click', this._clickHandler);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this.removeEventListener('keydown', this._keyDownHandler);
    this.removeEventListener('click', this._clickHandler);
  }

  /**
   * Registers an event handler for given type
   * @param {String} eventType Event type (name)
   * @param {Function} value The handler to register
   */
  _registerCallback(eventType, value) {
    const key = `_on${eventType}`;
    if (this[key]) {
      this.removeEventListener(eventType, this[key]);
    }
    if (typeof value !== 'function') {
      this[key] = null;
      return;
    }
    this[key] = value;
    this.addEventListener(eventType, value);
  }

  _computeButtonClass(height, width, theme, signedIn) {
    return 'height-' + height + ' width-' + width + ' theme-' + theme + ' signedIn-' + signedIn;
  }
  /**
   * Determines the proper label based on the attributes.
   * @param {String} labelSignin
   * @param {Number} width
   * @param {String} icon
   * @return {String}
   */
  _computeSigninLabel(labelSignin, width, icon) {
    if (labelSignin) {
      return labelSignin;
    } else {
      switch (width) {
        case WidthValue.WIDE:
          return LabelValue.WIDE;
        case WidthValue.STANDARD:
          return LabelValue.STANDARD;
        default:
          return LabelValue.STANDARD;
      }
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
    this.dispatchEvent(
      new CustomEvent('anypoint-signout-attempted', {
        bubbles: true,
        composed: true
      })
    );
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
   * @param {KeyboardEvent} e
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

  _atHandler(e) {
    this.accessToken = e.detail.value;
  }

  _signedinHandler(e) {
    this.signedIn = e.detail.value;
  }
}
window.customElements.define('anypoint-signin', AnypointSignin);
