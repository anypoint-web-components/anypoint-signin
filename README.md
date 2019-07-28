[![Published on NPM](https://img.shields.io/npm/v/@anypoint-web-components/anypoint-signin.svg)](https://www.npmjs.com/package/@anypoint-web-components/anypoint-signin)

[![Build Status](https://travis-ci.org/anypoint-web-components/anypoint-signin.svg?branch=stage)](https://travis-ci.org/anypoint-web-components/anypoint-signin)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@anypoint-web-components/anypoint-signin)

## &lt;anypoint-signin&gt;

Anypoint authentication web component.

```html
<anypoint-signin redirecturi="https://auth.advancedrestclient.com/oauth-popup.html" clientid="..."></anypoint-signin>
```

Use `anypoint-signin-aware` inside your application to receive events when the user is authenticated.

## Usage

### Installation

```
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
        // the same as e.target.signedIn
        if (e.detail.value) {
          console.log('User is signed in');
        } else {
          console.log('User is not signed in');
        }
      };
      button.onaccesstoken = (e) {
        if (e.detail.value) {
          // the same as e.target.accessToken
          console.log('Has new access token', e.detail.value);
        }
      };
      button.onuser = (e) {
        if (e.detail.value) {
          // the same as e.target.user
          console.log('Profile data', e.detail.value);
        }
      };
    });
    </script>
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
        @signedin-changed="${this._signedinHandler}"
        @accesstoken-changed="${this._atHandler}"
        @user-changed="${this._userHandler}"></anypoint-signin>
    `;
  }

  _signedinHandler(e) {
    this.isSignedIn = e.target.signedIn;
  }

  _atHandler(e) {
    this.accessToken = e.target.accessToken;
  }

  _userHandler(e) {
    this.user = e.target.user;
  }
}
customElements.define('sample-element', SampleElement);
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
