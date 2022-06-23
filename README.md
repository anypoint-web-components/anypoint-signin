# anypoint-signin

Anypoint platform authentication web components.

```html
<anypoint-signin redirectUri="https://auth.advancedrestclient.com/oauth-popup.html" clientId="..."></anypoint-signin>
```

Use `anypoint-signin-aware` inside your application to receive events when the user is authenticated.

[![Published on NPM](https://img.shields.io/npm/v/@anypoint-web-components/anypoint-signin.svg)](https://www.npmjs.com/package/@anypoint-web-components/anypoint-signin)

[![tests](https://github.com/anypoint-web-components/anypoint-signin/actions/workflows/deployment.yml/badge.svg)](https://github.com/anypoint-web-components/anypoint-signin/actions/workflows/deployment.yml)

## Usage

### Installation

```sh
npm install --save @anypoint-web-components/anypoint-signin
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';
    </script>
  </head>
  <body>
    <anypoint-signin></anypoint-signin>
    <script>
    customElements.whenDefined('anypoint-signin')
    .then(() => {
      const button = document.body.querySelector('anypoint-signin');
      button.onsignedin = (e) {
        if (e.target.signedIn) {
          console.log('User is signed in');
        } else {
          console.log('User is not signed in');
        }
      };
      button.onaccesstoken = (e) {
        console.log('Has new access token', e.target.value);
      };
    });
    </script>
  </body>
</html>
```

### Styling with Material Design

Note: The material attribute is used to set the anypoint button compatibility property to false.

```html
<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';
    </script>
  </head>
  <body>
    <!-- Material set to true will use compatibility=false on the base anypoint-button --> 
    <anypoint-signin material></anypoint-signin>
  </body>
</html>
```

### In a LitElement template

```js
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';

class SampleElement extends LitElement {

  render() {
    return html`
      <anypoint-signin
        @signedinchange="${this._signedinHandler}"
        @accesstokenchange="${this._atHandler}"
      ></anypoint-signin>
    `;
  }

  _signedinHandler(e) {
    this.isSignedIn = e.target.signedIn;
  }

  _atHandler(e) {
    this.accessToken = e.target.accessToken;
  }
}
customElements.define('sample-element', SampleElement);
```

### Handling the code exchange

Anypoint platform does not allow to exchange code in a browser (which is expected) but does not allow the browser flow neither. Because of that the aware element customizes the `@advanced-rest-client/oauth` library and dispatches a DOM event that should be handled by the application, which is expected to perform token exchange.

The event to handle is the `anypointcodeexchange` type. The event is the `AnypointCodeExchangeEvent` class extending the `CustomEvent` interface. It has the `code` property with the value of the received from the authorization server authorization code.
The implementation should exchange the code to the access token. The result should be resolved in the promise set on the `detail.result` property of the event.

The `anypointcodeexchange` event bubbles and is cancelable. This means it can be handled anywhere between the signin element and the top `Window` object. For convenience the `anypointcodeexchange` value is exported as `AnypointCodeExchangeEventType` constant.

#### Example

```html
<html>
  <body>
    <anypoint-signin></anypoint-signin>

    <script type="module">
      import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';
      import { AnypointCodeExchangeEventType } from '@anypoint-web-components/anypoint-signin';

      /**
       * @param {AnypointCodeExchangeEvent} e
       */
      function codeEventHandler(e) {
        const { code } = e;
        e.detail.result = this.exchangeCode(code);
      }

      /**
       * @param {string} code
       * @returns {Promise<TokenInfo>}
       */
      async function exchangeCode(code) {
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
      };

      window.addEventListener(AnypointCodeExchangeEventType, exchangeCode);
    </script>
  </body>
</html>
```

## Development

```sh
git clone https://github.com/anypoint-web-components/anypoint-signin
cd anypoint-signin
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
