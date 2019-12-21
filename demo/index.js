import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-button.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-group.js';
import '@polymer/paper-toast/paper-toast.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-styles/typography.js';
import '@anypoint-web-components/anypoint-styles/din-pro.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '../anypoint-signin.js';
import htmlExample from './html-example.js';
import litExample from './lit-example.js';
import htmlCodeExample from './html-code-example.js';
import litCodeExample from './lit-code-example.js';
import nodeCodeExample from './node-server-example.js';

const apiBase = 'https://awc.dev/api/v1'
const tokenUri = `${apiBase}/auth/anypoint-token`;

class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties(['buttonWidth', 'status', 'code', 'accessToken']);
    this._componentName = 'anypoint-signin';
    this.demoStates = ['Anypoint'];
    this.buttonWidth = 'wide';
    this._demoStateHandler = this._demoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._widthHandler = this._widthHandler.bind(this);
    this._signedinChangedHandler = this._signedinChangedHandler.bind(this);
    this._oauth2CodeHandler = this._oauth2CodeHandler.bind(this);
    this._errorHandler = this._errorHandler.bind(this);

    this.scopes = 'profile';
    this.redirectUri = 'https://auth.advancedrestclient.com/oauth-popup.html';
    this.clientId = '2e38d46b60c5476584cdecba8b516711';

    window.addEventListener('oauth2-code-response', this._oauth2CodeHandler);
    window.addEventListener('anypoint-signin-aware-error', this._errorHandler);
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    this.outlined = state === 1;
    this.compatibility = state === 2;
  }

  _widthHandler(e) {
    const { checked, value } = e.target;
    if (!checked) {
      return;
    }
    this.buttonWidth = value;
  }

  _signedinChangedHandler(e) {
    const { value } = e.detail;
    this.status = String(value);
  }

  _oauth2CodeHandler(e) {
    const { code } = e.detail;
    this.code = code;
    setTimeout(() => this._exchangeCode(code));
  }

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
        this._toastEreror(data.message);
        console.error(data);
      }
    } catch (e) {
      this._toastEreror(e.message);
      console.error(e);
    }
  }

  _toastEreror(message) {
    const toast = document.getElementById('errorToast');
    toast.text = message;
    toast.opened = true;
  }

  _errorHandler(e) {
    const { message } = e.detail;
    this._toastEreror(message);
  }

  _demoTemplate() {
    const { demoStates, darkThemeActive, buttonWidth, scopes, redirectUri, clientId, status, code, accessToken } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the sign in button element with various configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-signin
            .width="${buttonWidth}"
            .clientId="${clientId}"
            .scopes="${scopes}"
            .redirectUri="${redirectUri}"
            slot="content"
            @signedin-changed="${this._signedinChangedHandler}"
          ></anypoint-signin>
          <label slot="options" id="listTypeLabel">List type</label>
          <anypoint-radio-group slot="options" selectable="anypoint-radio-button" aria-labelledby="listTypeLabel">
            <anypoint-radio-button @change="${this._widthHandler}" checked name="width" value="wide"
              >Wide width</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._widthHandler}" name="width" value="standard"
              >Standard width</anypoint-radio-button
            >
          </anypoint-radio-group>
        </arc-interactive-demo>

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
        Anypont sign in button is a web component and can be used in any
        web environment.
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
        The button starts the authorization flow and returns authorization code.
        The code should be then used the exchange it to access token using a server component.
      </p>
      <h5>In an html file</h5>
      <pre><code class="language-javascript">${htmlCodeExample}</code></pre>
      <h5>In a LitElement element</h5>
      <pre><code class="language-javascript">${litCodeExample}</code></pre>

      <h4>Exchanging the code</h4>
      <p>
        Thwe server must make a request to Anypoint authorization server
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
      /* global Prism */
      setTimeout(() => Prism.highlightAll());
    }
    return html`
      <h2>Anypoint Sign In Button</h2>
      ${this._demoTemplate()}
      ${this._usageTemplate()}
      <paper-toast id="errorToast" duration="7000"></paper-toast>
    `;
  }
}

const instance = new DemoPage();
instance.render();
