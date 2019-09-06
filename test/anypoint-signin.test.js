import { fixture, assert, nextFrame } from '@open-wc/testing';
import '../anypoint-signin.js';

describe('<anypoint-signin>', () => {
  async function basicFixture() {
    return await fixture(`<anypoint-signin></anypoint-signin>`);
  }

  async function setupReadyFixture() {
    return await fixture(`<anypoint-signin clientid="abc" redirecturi="https://auth.domain.com"></anypoint-signin>`);
  }

  /**
   * Returns a keyboard event. This event bubbles and is cancellable.
   *
   * @param {string} type The type of keyboard event (such as 'keyup' or
   * 'keydown').
   * @param {number} keyCode The keyCode for the event.
   * @param {string} key The KeyboardEvent.key value for the event.
   * @param {string} code The KeyboardEvent.code value for the event.
   * @return {CustomEvent}
   */
  function keyboardEventFor(type, keyCode, key, code) {
    const event = new CustomEvent(type, {
      detail: 0,
      bubbles: true,
      cancelable: true,
      // Allow event to go outside a ShadowRoot.
      composed: true
    });

    event.keyCode = keyCode;
    event.code = keyCode;
    event.shiftKey = false;
    event.altKey = false;
    event.ctrlKey = false;
    event.metaKey = false;
    event.key = key;
    event.code = code;
    return event;
  }

  describe('_computeButtonClass()', function() {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Computes classes', function() {
      const result = element._computeButtonClass('a', 'b', 'c', true);
      assert.equal(result, 'height-a width-b theme-c signedIn-true');
    });
  });

  describe('_computeSigninLabel()', function() {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns defined value', function() {
      const width = 'wide';
      const label = 'test';
      const result = element._computeSigninLabel(label, width);
      assert.equal(result, label);
    });

    it('Returns "WIDE" value', function() {
      const width = 'wide';
      const label = '';
      const icon = '';
      const result = element._computeSigninLabel(label, width, icon);
      assert.equal(result, 'Sign in with MuleSoft');
    });

    it('Returns "STANDARD" value', function() {
      const width = 'standard';
      const label = '';
      const result = element._computeSigninLabel(label, width);
      assert.equal(result, 'Sign in');
    });

    it('Returns default value', function() {
      const width = '';
      const label = '';
      const result = element._computeSigninLabel(label, width);
      assert.equal(result, 'Sign in');
    });
  });

  describe('Buttons state', function() {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      await nextFrame();
      element.signedIn = false;
    });

    it('Sign in button is rendered', function() {
      const button = element.shadowRoot.querySelector('.signIn');
      assert.ok(button);
      const display = getComputedStyle(button).display;
      assert.notEqual(display, 'none');
    });

    it('Sign out button not rendered', function() {
      const button = element.shadowRoot.querySelector('.signOut');
      assert.notOk(button);
    });

    it('renders sign out button when auth set', async () => {
      element.signedIn = true;
      await nextFrame();
      const button = element.shadowRoot.querySelector('.signOut');
      assert.ok(button);
      const display = getComputedStyle(button).display;
      assert.notEqual(display, 'none');
    });

    it("won't render sign in button", async () => {
      element.signedIn = true;
      await nextFrame();
      const button = element.shadowRoot.querySelector('.signIn');
      assert.notOk(button);
    });
  });

  describe('signIn', function() {
    let element;
    beforeEach(async () => {
      element = await setupReadyFixture();
      await nextFrame();
      element.signedIn = false;
    });

    it('Calls signIn() on the aware', function() {
      let called;
      element.authAware.signIn = () => (called = true);
      element.signIn();
      assert.isTrue(called);
    });

    it('Calls signIn for click', function() {
      let called;
      element.authAware.signIn = () => (called = true);
      element.click();
      assert.isTrue(called);
    });

    it('Calls signIn for spacebar press', () => {
      let called;
      element.signIn = () => (called = true);
      const e = keyboardEventFor('keydown', 32, ' ', 'Space');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signIn for enter press', () => {
      let called;
      element.signIn = () => (called = true);
      const e = keyboardEventFor('keydown', 13, 'Enter', 'Enter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signIn for numeric enter press', () => {
      let called;
      element.signIn = () => (called = true);
      const e = keyboardEventFor('keydown', 13, 'Enter', 'NumpadEnter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Ignores other keys', () => {
      let called = false;
      element.signOut = () => (called = true);
      const e = keyboardEventFor('keydown', 48, '0', '0');
      element.dispatchEvent(e);
      assert.isFalse(called);
    });
  });

  describe('signOut', function() {
    let element;
    beforeEach(async () => {
      element = await setupReadyFixture();
      element.signedIn = true;
    });

    it('Calls signOut() on the aware', function() {
      let called;
      element.authAware.signOut = () => (called = true);
      element.signOut();
      assert.isTrue(called);
    });

    it('Calls signOut for click', function() {
      let called;
      element.signOut = () => (called = true);
      element.click();
      assert.isTrue(called);
    });

    it('Calls signOut for spacebar press', () => {
      let called;
      element.signOut = () => (called = true);
      const e = keyboardEventFor('keydown', 32, ' ', 'Space');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signOut for enter press', () => {
      let called;
      element.signOut = () => (called = true);
      const e = keyboardEventFor('keydown', 13, 'Enter', 'Enter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signIn for numeric enter press', () => {
      let called;
      element.signOut = () => (called = true);
      const e = keyboardEventFor('keydown', 13, 'Enter', 'NumpadEnter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Ignores other keys', () => {
      let called = false;
      element.signOut = () => (called = true);
      const e = keyboardEventFor('keydown', 48, '0', '0');
      element.dispatchEvent(e);
      assert.isFalse(called);
    });
  });

  describe('onsignedin', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.signedIn = false;
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onsignedin);
      const f = () => {};
      element.onsignedin = f;
      assert.isTrue(element.onsignedin === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onsignedin = f;
      element.signedIn = true;
      element.onsignedin = null;
      assert.isTrue(called);
    });

    it('Unregisters old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onsignedin = f1;
      element.onsignedin = f2;
      element.signedIn = true;
      element.onsignedin = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onaccesstoken', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onaccesstoken);
      const f = () => {};
      element.onaccesstoken = f;
      assert.isTrue(element.onaccesstoken === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onaccesstoken = f;
      element.accessToken = 'test';
      element.onaccesstoken = null;
      assert.isTrue(called);
    });

    it('Unregisters old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onaccesstoken = f1;
      element.onaccesstoken = f2;
      element.accessToken = 'test';
      element.onaccesstoken = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('a11y', () => {
    it('passes a11y tests', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });

    it('has role attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('role'), 'button');
    });

    it('respects existing role attribute', async () => {
      const element = await fixture(`
        <anypoint-signin role="menu"></anypoint-signin>
      `);
      assert.equal(element.getAttribute('role'), 'menu');
    });

    it('has tabindex attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('tabindex'), '0');
    });

    it('respects existing tabindex attribute', async () => {
      const element = await fixture(`
        <anypoint-signin tabindex="-1"></anypoint-signin>
      `);
      assert.equal(element.getAttribute('tabindex'), '-1');
    });

    it('has aria-label attribute', async () => {
      const element = await basicFixture();
      assert.notEmpty(element.getAttribute('aria-label'));
    });

    it('respects existing aria-label attribute', async () => {
      const element = await fixture(`
        <anypoint-signin aria-label="test"></anypoint-signin>
      `);
      assert.equal(element.getAttribute('aria-label'), 'test');
    });

    it("won't set aria-label when aria-labelledby is set", async () => {
      const element = await fixture(`
        <anypoint-signin aria-labelledby="test"></anypoint-signin>
      `);
      assert.isFalse(element.hasAttribute('aria-label'));
    });
  });
});
