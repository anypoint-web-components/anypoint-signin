import { html, render } from 'lit';
import '@anypoint-web-components/awc/dist/define/anypoint-radio-button.js';
import '@anypoint-web-components/awc/dist/define/anypoint-radio-group.js';
import '@anypoint-web-components/awc/dist/define/anypoint-button.js';
import '@anypoint-web-components/awc/dist/colors.js';
import '@anypoint-web-components/awc/dist/typography.js';
import '@anypoint-web-components/awc/dist/din-pro.js';
import '../anypoint-signin.js';
import htmlExample from './html-example.js';
import litExample from './lit-example.js';
import htmlCodeExample from './html-code-example.js';
import litCodeExample from './lit-code-example.js';
import nodeCodeExample from './node-server-example.js';
import { AnypointCodeExchangeEventType, AnypointSignedInErrorType } from '../index.js';

/** @typedef {import('lit').TemplateResult} TemplateResult */
/** @typedef {import('@advanced-rest-client/oauth').TokenInfo} TokenInfo */
/** @typedef {import('../index').AnypointCodeExchangeEvent} AnypointCodeExchangeEvent */

const apiBase = 'https://awc.dev/api/v1'
const tokenUri = `${apiBase}/auth/anypoint-token`;

class ComponentDemoPage {
  constructor() {
    this.initObservableProperties(['buttonWidth', 'status', 'code', 'accessToken']);
    this.buttonWidth = 'wide';
    this._widthHandler = this._widthHandler.bind(this);
    this._signedinChangedHandler = this._signedinChangedHandler.bind(this);
    this._oauth2CodeHandler = this._oauth2CodeHandler.bind(this);
    this._errorHandler = this._errorHandler.bind(this);

    this.scopes = 'profile';
    this.redirectUri = 'https://auth.advancedrestclient.com/oauth-popup.html';
    this.clientId = '2e38d46b60c5476584cdecba8b516711';

    window.addEventListener(AnypointCodeExchangeEventType, this._oauth2CodeHandler);
    window.addEventListener(AnypointSignedInErrorType, this._errorHandler);
  }

  /**
   * Creates setters and getters to properties defined in the passed list of properties.
   * Property setter will trigger render function.
   *
   * @param {string[]} props List of properties to initialize.
   */
   initObservableProperties(props) {
    props.forEach((item) => {
      Object.defineProperty(this, item, {
        get() {
          return this[`_${item}`];
        },
        set(newValue) {
          this._setObservableProperty(item, newValue);
        },
        enumerable: true,
        configurable: true
      });
    });
  }

  /**
   * @param {string} prop
   * @param {any} value
   */
  _setObservableProperty(prop, value) {
    const key = `_${prop}`;
    if (this[key] === value) {
      return;
    }
    this[key] = value;
    this.render();
  }

  /**
   * The main render function. Sub classes should not override this method.
   * Override `_render()` instead.
   *
   * The function calls `_render()` in a timeout so it is safe to call this
   * multiple time in the same event loop.
   */
  render() {
    if (this._rendering) {
      return;
    }
    this._rendering = true;
    setTimeout(() => {
      this._rendering = false;
      this._render();
    });
  }

  _render() {
    const node = /** @type HTMLElement */ (document.querySelector('#demo'));
    render(this.pageTemplate(), node, {
      host: this
    });
  }

  /**
   * The page render function. Usually you don't need to use it.
   * It renders the header template, main section, and the content.
   * 
   * @return {TemplateResult}
   */
  pageTemplate() {
    return html`
    ${this.headerTemplate()}
    <section role="main" class="vertical-section-container centered main">
      ${this.contentTemplate()}
    </section>`;
  }

  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return {TemplateResult} HTML template for demo header
   */
  headerTemplate() {
    return html`
    <header>
      <h1 class="api-title">anypoint-signin</h1>
    </header>`;
  }

  _widthHandler(e) {
    const { checked, value } = e.target;
    if (!checked) {
      return;
    }
    this.buttonWidth = value;
  }

  _signedinChangedHandler(e) {
    const { signedIn } = e.target;
    this.status = String(signedIn);
  }

  /**
   * @param {AnypointCodeExchangeEvent} e
   */
  _oauth2CodeHandler(e) {
    const { code } = e;
    this.code = code;
    e.preventDefault();
    e.detail.result = this._exchangeCode(code);
  }

  /**
   * @param {string} code
   * @returns {Promise<TokenInfo>}
   */
  async _exchangeCode(code) {
    const body = {
      code,
      redirectUri: this.redirectUri,
      clientId: this.clientId
    };
    const init = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    };
    try {
      const response = await fetch(tokenUri, init);
      const data = await response.json();
      if (response.ok) {
        this.accessToken = data.data.accessToken;
      } else {
        throw new Error('No token response received');
      }
      return {
        accessToken: data.data.accessToken,
        expiresAt: 0,
        expiresIn: data.data.expiresIn,
        expiresAssumed: true,
        state: '0',
      }
    } catch (e) {
      console.error(e.detail);
      throw e;
    }
  }

  _errorHandler(e) {
    console.error(e.detail);
  }

  _demoTemplate() {
    const { buttonWidth, scopes, redirectUri, clientId, status, code, accessToken } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the sign in button element with various configuration options.
        </p>
        
        <anypoint-signin
          .width="${buttonWidth}"
          .clientId="${clientId}"
          .scopes="${scopes}"
          .redirectUri="${redirectUri}"
          @signedinchange="${this._signedinChangedHandler}"
        ></anypoint-signin>
        
        <label id="listTypeLabel">List type</label>
        <anypoint-radio-group selectable="anypoint-radio-button" aria-labelledby="listTypeLabel">
          <anypoint-radio-button @change="${this._widthHandler}" checked name="width" value="wide"
            >Wide width</anypoint-radio-button
          >
          <anypoint-radio-button @change="${this._widthHandler}" name="width" value="standard"
            >Standard width</anypoint-radio-button
          >
        </anypoint-radio-group>

        <section class="result">
          <h3>Authorization status</h3>
          <p>User signed in: <span>${status}</span></p>
          <p>Authorization code: <span>${code}</span></p>
          ${accessToken ? html`<p>Access token: <span>${accessToken}</span></p>` : ''}
          ${code && !accessToken
            ? html`
                <p>
                  You should exchange this code for an access token.
                </p>
                <p>
                  Once exchanged, you can set the button signedIn attribute to true so that the button becomes a signout
                  button.
                </p>
                <p>
                  You can also just remove the button at this point or go to the next page in your flow.
                </p>
              `
            : ''}
        </section>
      </section>
    `;
  }

  _usageTemplate() {
    return html`<section class="documentation-section">
      <h3>Usage</h3>
      <p>
        Anypoint sign in button is a web component and can be used in any web environment.
      </p>
      <p>
        Learn more about using web components at <a href="https://open-wc.org/" target="_blank">Open WC project</a>.
      </p>

      <h4>Installation</h4>
      <pre><code class="language-bash">npm install --save @anypoint-web-components/anypoint-signin</code></pre>

      <h4>In an html element</h4>
      <pre><code class="language-html">${htmlExample}</code></pre>
      <h4>In a LitElement template</h4>
      <pre><code class="language-javascript">${litExample}</code></pre>

      <h4>Requesting a token</h4>
      <p>
        At the moment Anypoint authorization server only supports <b>authorization code</b>
        OAuth 2 flow.
      </p>
      <p>
        The button starts the authorization flow and returns the authorization code.
        The code should be then used to exchange it to the access token using a server component.
      </p>
      <h5>In an html file</h5>
      <pre><code class="language-javascript">${htmlCodeExample}</code></pre>
      <h5>In a LitElement element</h5>
      <pre><code class="language-javascript">${litCodeExample}</code></pre>

      <h4>Exchanging the code</h4>
      <p>
        The server must make a request to Anypoint authorization server
        with OAuth 2 standard parameters in the request body.
        These are:
      </p>

      <ul>
        <li>"grant_type" - Always set to "authorization_code"</li>
        <li>"client_id" - The same client ID used in the button</li>
        <li>"code" - Received from the authorization server code</li>
        <li>"redirect_uri" - Registered in authorization server settings redirect URI</li>
        <li>"client_secret" - You will find client secret in your OAuth application details</li>
      </ul>

      <p>
        This parameters have to be sent to token endpoint as <code>application/x-www-form-urlencoded</code>
        request.
      </p>

      <h5>Authorization endpoint</h5>
      <pre><code class="language-http">https://anypoint.mulesoft.com/accounts/api/v2/oauth2/token</code></pre>

      <p>
        You can choose any language and library you like to create an API to exchange the code for token.
        Below we present Express route for Node.
      </p>

      <details>
        <summary>Express.js example</summary>
        <pre><code class="language-javascript">${nodeCodeExample}</code></pre>
      </details>
    </section>`;
  }

  contentTemplate() {
    if (!this._initialized) {
      this._initialized = true;
    }
    return html`
      <h2>Anypoint Sign In Button</h2>
      ${this._demoTemplate()}
      ${this._usageTemplate()}
    `;
  }
}

const instance = new ComponentDemoPage();
instance.render();
