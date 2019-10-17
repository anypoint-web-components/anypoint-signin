import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-button.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-group.js';
import '@polymer/paper-toast/paper-toast.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-styles/typography.js';
import '@anypoint-web-components/anypoint-styles/din-pro.js';
import '../anypoint-signin.js';

class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties(['buttonWidth', 'status', 'code']);
    this._componentName = 'anypoint-signin';
    this.demoStates = ['Anypoint'];
    this.buttonWidth = 'standard';
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
  }

  _errorHandler(e) {
    const { message } = e.detail;
    const toast = document.getElementById('errorToast');
    toast.text = message;
    toast.opened = true;
  }

  _demoTemplate() {
    const { demoStates, darkThemeActive, buttonWidth, scopes, redirectUri, clientId, status, code } = this;
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
            <anypoint-radio-button @change="${this._widthHandler}" checked name="width" value="standard"
              >Standard width</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._widthHandler}" name="width" value="wide"
              >Wide width</anypoint-radio-button
            >
          </anypoint-radio-group>
        </arc-interactive-demo>

        <section class="result">
          <h3>Authorization status</h3>
          <p>User signed in: <span>${status}</span></p>
          <p>Authorization code: <span>${code}</span></p>
          ${code
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

  contentTemplate() {
    return html`
      <h2>Anypoint Sign In Button</h2>
      <paper-toast id="errorToast" duration="7000"></paper-toast>
      ${this._demoTemplate()}
    `;
  }
}

const instance = new DemoPage();
instance.render();
