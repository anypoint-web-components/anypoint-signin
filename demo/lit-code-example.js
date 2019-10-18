export default `import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';

class SampleElement extends LitElement {
  constructor() {
    super();
    ...
    this.exchangeCode = this.exchangeCode.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('oauth2-code-response', this.exchangeCode);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('oauth2-code-response', this.exchangeCode);
  }

  async exchangeCode(e) {
    const { code } = e.detail;
    const init = {
      method: 'POST',
      body: code
    };
    const tokenExchangeUrl = 'YOUR SERVER URL';
    const response = await fetch(tokenExchangeUrl, init);
    this.token = await response.json();
    const button = this.shadowRoot.querySelector('anypoint-signin');
    button.signedIn = !!this.token;
  }
}
customElements.define('sample-element', SampleElement);
`;
