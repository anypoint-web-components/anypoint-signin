export default `import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';

class SampleElement extends LitElement {

  constructor() {
    super();
    this.clientId = '...';
    this.redirectUri = '...';
    this.scopes = 'profile';
  }

  render() {
    return html\`
      <anypoint-signin
        .clientId="\${this.clientId}"
        .scopes="\${this.scopes}"
        .redirectUri="\${this.redirectUri}"
        @signedinchange="\${this._signedinHandler}"
      ></anypoint-signin>
    \`;
  }

  _signedinHandler(e) {
    this.isSignedIn = e.target.signedIn;
  }
}
customElements.define('sample-element', SampleElement);
`;
