import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/paper-ripple/paper-ripple.js';
import '../../@polymer/iron-icon/iron-icon.js';
import './anypoint-signin-aware.js';
import './exchange-icons.js';
import './anypoint-signin-styles.js';
/**
 * Enum button label default values.
 * @readonly
 * @enum {string}
 */
const LabelValue = {
  STANDARD: 'Sign in',
  WIDE: 'Sign in with Exchange'
};
/**
 * Enum width values.
 * @readonly
 * @enum {string}
 */
const WidthValue = {
  ICON_ONLY: 'iconOnly',
  STANDARD: 'standard',
  WIDE: 'wide'
};
/**
 * Anypoint sign in button allows to sign in the user in the Anypoint
 * core services.
 *
 * Authorization result is `accessToken` that can be used to call other APIs
 * and `user` object returned from the Exchange.
 *
 * If you do not need to show the button, use companion
 * `<anypoint-signin-aware>` element to check authentication state and
 * perform manula authentication.
 *
 * #### Examples
 *
 * ```html
 * <anypoint-signin client-id="..."
 *  redirect-uri="https://auth.domain.com/auth/redirect"></anypoint-signin>
 * <anypoint-signin label-signin="Sign-in" client-id="..."
 *  redirect-uri="https://auth.domain.com/auth/redirect"></anypoint-signin>
 * <anypoint-signin theme="dark" width="iconOnly" client-id="..."
 *  redirect-uri="https://auth.domain.com/auth/redirect"></anypoint-signin>
 * ```
 *
 * #### Notes
 *
 * The `clientId` and `redirectUri` properties has to be set before using the
 * component. `clientId` and associated with it `redirectUri` has to be set up
 * with Anypoint authorization server. Contact Anypoint Core services for
 * more information.
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
 * `--anypoint-signin` | Mixin applied to the element | `{}`
 * `--anypoint-signin-disabled-background-color` | Background color of the disabled button | `#eaeaea`
 * `--anypoint-signin-disabled-color` | Color of the disabled button | `#a8a8a8`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof AnypointElements
 */
export class AnypointSignin extends PolymerElement {
  static get template() {
    return html`
    <style include="anypoint-signin-styles iron-positioning"></style>
    <anypoint-signin-aware id="authAware"
      client-id="[[clientId]]"
      redirect-uri="[[redirectUri]]"
      signed-in="{{signedIn}}"
      user="{{user}}"
      access-token="{{accessToken}}"
      force-oauth-events="[[forceOauthEvents]]"></anypoint-signin-aware>
    <div id="authButton" class\$="[[_computeButtonClass(height, width, theme, signedIn)]]">
      <template is="dom-if" if="[[!noink]]">
        <paper-ripple id="ripple" class="fit"></paper-ripple>
      </template>
      <!-- this div is needed to position the ripple behind text content -->
      <div>
        <template is="dom-if" if="[[signedIn]]">
          <div class="button-content signOut" tabindex="0" on-click="signOut" on-keydown="_signOutKeyPress">
            <span class="icon"><iron-icon icon="exchange:exchange"></iron-icon></span>
            <span class="buttonText">[[labelSignout]]</span>
          </div>
        </template>
        <template is="dom-if" if="[[!signedIn]]">
          <div class="button-content signIn" tabindex="0" on-click="signIn" on-keydown="_signInKeyPress">
            <span class="icon"><iron-icon icon="exchange:exchange"></iron-icon></span>
            <span class="buttonText">[[_labelSignin]]</span>
          </div>
        </template>
      </div>
    </div>
`;
  }

  static get is() {return 'anypoint-signin';}
  static get properties() {
    return {
      /**
       * An Anypoint clientId
       */
      clientId: {
        type: String,
        value: ''
      },
      /**
       * Authorization redirect URI
       */
      redirectUri: {
        type: String,
        value: ''
      },
      /**
       * True if user is signed in
       */
      signedIn: {
        type: Boolean,
        notify: true
      },
      /**
       * True if user is signed in
       */
      accessToken: {
        type: String,
        notify: true
      },
      /**
       * User profile information.
       */
      user: {
        type: Object,
        notify: true
      },
      /**
       * The height to use for the button.
       *
       * Available options: short, standard, tall.
       *
       * @type {string}
       */
      height: {
        type: String,
        value: 'standard'
      },
      /**
       * An optional label for the sign-in button.
       */
      labelSignin: {
        type: String,
        value: ''
      },
      _labelSignin: {
        type: String,
        computed: '_computeSigninLabel(labelSignin, width)'
      },
      /**
       * An optional label for the sign-out button.
       */
      labelSignout: {
        type: String,
        value: 'Sign out'
      },
      /**
       * If true, the button will be styled with a shadow.
       */
      raised: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * The theme to use for the button.
       *
       * Available options: light, dark.
       *
       * @attribute theme
       * @type {string}
       * @default 'dark'
       */
      theme: {
        type: String,
        value: 'light'
      },
      /**
       * The width to use for the button.
       *
       * Available options: iconOnly, standard, wide.
       *
       * @type {string}
       */
      width: {
        type: String,
        value: 'standard'
      },
      // If set it will not render ripple effect
      noink: {
        type: Boolean,
        value: false
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

  _computeButtonClass(height, width, theme, signedIn) {
    return 'height-' + height + ' width-' + width + ' theme-' + theme +
      ' signedIn-' + signedIn;
  }
  /**
   * Determines the proper label based on the attributes.
   * @param {String} labelSignin
   * @param {Number} width
   * @return {String}
   */
  _computeSigninLabel(labelSignin, width) {
    if (labelSignin) {
      return labelSignin;
    } else {
      switch (width) {
        case WidthValue.WIDE:
          return LabelValue.WIDE;
        case WidthValue.STANDARD:
          return LabelValue.STANDARD;
        case WidthValue.ICON_ONLY:
          return '';
        default:
          console.warn('bad width value: ', width);
          return LabelValue.STANDARD;
      }
    }
  }
  /** Sign in user. Opens the authorization dialog for signing in.
   * The dialog will be blocked by a popup blocker unless called inside click handler.
   */
  signIn() {
    this.$.authAware.signIn();
  }

  _signInKeyPress(e) {
    if (e.which === 13 || e.keyCode === 13 || e.which === 32 || e.keyCode === 32) {
      e.preventDefault();
      this.signIn();
    }
  }

  /** Sign out the user */
  signOut() {
    this.dispatchEvent(new CustomEvent('anypoint-signout-attempted', {
      bubbles: true,
      composed: true
    }));
    this.$.authAware.signOut();
  }

  _signOutKeyPress(e) {
    if (e.which === 13 || e.keyCode === 13 || e.which === 32 || e.keyCode === 32) {
      e.preventDefault();
      this.signOut();
    }
  }
}
window.customElements.define(AnypointSignin.is, AnypointSignin);