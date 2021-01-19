/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { LitElement } from 'lit-element';
import { AnypointAuth } from './AnypointAuth.js';

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
 */
export class AnypointSigninAwareElement extends LitElement {
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
      forceOauthEvents: { type: Boolean },
    };
  }

  /**
   * @return {string} Current access token of authenticated user
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
   * @return {boolean} True if user is signed in
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
    super.connectedCallback();
    this.setAttribute('aria-hidden', 'true');
    AnypointAuth.attachSigninAware(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    AnypointAuth.detachSigninAware(this);
  }

  /** pops up the authorization dialog */
  signIn() {
    AnypointAuth.signIn(true, this);
  }

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
   * @return {Promise<void>} Promise resolved when the token is revoked.
   */
  signOut() {
    return AnypointAuth.signOut();
  }

  /**
   * Notifies application about error.
   * @param {string} error Error message
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
   * @param {string} newScopes space separated scopes, e.g. 'full profile email'
   */
  _scopesChanged(newScopes) {
    const scopes = newScopes && newScopes.split(' ');
    AnypointAuth.scopes = scopes;
  }

  /**
   * @param {string} value 
   */
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
      })
    );
  }
}
