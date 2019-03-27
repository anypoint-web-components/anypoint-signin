[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/anypoint-signin.svg)](https://www.npmjs.com/package/@advanced-rest-client/anypoint-signin)

[![Build Status](https://travis-ci.org/advanced-rest-client/anypoint-signin.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/anypoint-signin)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/anypoint-signin)

## &lt;anypoint-signin&gt;

Anypoint authentication web component

```html
<anypoint-signin></anypoint-signin>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/anypoint-signin
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/anypoint-signin/anypoint-signin.js';
    </script>
  </head>
  <body>
    <anypoint-signin></anypoint-signin>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/anypoint-signin/anypoint-signin.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <anypoint-signin></anypoint-signin>
    `;
  }

  _authChanged(e) {
    console.log(e.detail);
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/anypoint-signin
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
