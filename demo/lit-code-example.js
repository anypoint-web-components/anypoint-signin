export default `import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';

class SampleElement extends LitElement {
  /**
   * @param {AnypointCodeExchangeEvent} e
   */
  codeEventHandler(e) {
    const { code } = e;
    e.detail.result = this.exchangeCode(code);
  }

  /**
   * @param {string} code
   * @returns {Promise<TokenInfo>}
   */
  async exchangeCode(code) {
    const init = {
      method: 'POST',
      body: code,
    };
    const response = await fetch('YOUR SERVER URL', init);
    const info = await response.json();
    return {
      accessToken: info.accessToken,
      expiresAt: Date.now() + info.expiresIn,
      expiresIn: info.expiresIn,
      expiresAssumed: false,
      state: '0', // this is required by the types definition but can be anything. State is checked before this function is called
    };
  }

  render() {
    return html\`
      <anypoint-signin
        @anypointcodeexchange="\${this.codeEventHandler}"
      ></anypoint-signin>
    \`;
  }
}
customElements.define('sample-element', SampleElement);
`;
