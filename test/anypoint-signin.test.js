import { fixture, assert, nextFrame, html } from '@open-wc/testing';
import { SignedInChangeType, AccessTokenChangeType } from '../index.js';
import '../anypoint-signin.js';

/** @typedef {import('../').AnypointSigninElement} AnypointSigninElement */

describe('<anypoint-signin>', () => {
  /**
   * @return {Promise<AnypointSigninElement>} 
   */
  async function basicFixture() {
    return fixture(html`<anypoint-signin></anypoint-signin>`);
  }

  /**
   * @return {Promise<AnypointSigninElement>} 
   */
  async function materialFixture(material=true) {
    return fixture(html`<anypoint-signin ?material="${material}"></anypoint-signin>`);
  }

  /**
   * @return {Promise<AnypointSigninElement>} 
   */
  async function setupReadyFixture() {
    return fixture(html`<anypoint-signin clientId="abc" redirectUri="https://auth.domain.com"></anypoint-signin>`);
  }

  /**
   * Returns a keyboard event. This event bubbles and is cancellable.
   *
   * @param {string} type The type of keyboard event (such as 'keyup' or 'keydown').
   * @param {number} keyCode The keyCode for the event.
   * @param {string} key The KeyboardEvent.key value for the event.
   * @param {string} code The KeyboardEvent.code value for the event.
   * @return {KeyboardEvent}
   */
  function keyboardEventFor(type, keyCode, key, code) {
    const event = new KeyboardEvent(type, {
      detail: 0,
      bubbles: true,
      cancelable: true,
      // Allows event to go outside the ShadowRoot.
      composed: true,
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
      metaKey: false,
      key,
      code,
      keyCode,
    });
    return event;
  }

  describe('material', () => {
    it('sets compatibility to false if set to true', async () => {
      const element = await materialFixture(true);
      assert.equal(element.compatibility, false);
    });

    it('defaults compatibility to true if not set', async () => {
      const element = await basicFixture();
      assert.equal(element.compatibility, true);
    });

    it('sets compatibility to true if set to false', async () => {
      const element = await basicFixture();
      assert.equal(element.compatibility, true);
    });
  });

  describe('emphasis', () => {
    it('is by default set to high', async () => {
      const element = await basicFixture();
      assert.equal(element.emphasis, 'high');
    });
  });

  describe('_computeSigninLabel()', () => {
    let element = /** @type AnypointSigninElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns defined value', () => {
      const label = 'test';
      const result = element._computeSigninLabel(label, undefined);
      assert.equal(result, label);
    });

    it('Returns "WIDE" value', () => {
      const label = '';
      const result = element._computeSigninLabel(label, undefined);
      assert.equal(result, 'Sign in with Anypoint Platform');
    });

    it('Returns "STANDARD" value', () => {
      const width = 'standard';
      const label = '';
      const result = element._computeSigninLabel(label, width);
      assert.equal(result, 'Sign in');
    });

    it('Returns default value', () => {
      const width = '';
      const label = '';
      const result = element._computeSigninLabel(label, width);
      assert.equal(result, 'Sign in with Anypoint Platform');
    });
  });

  describe('Buttons state', () => {
    let element = /** @type AnypointSigninElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
      await nextFrame();
      element.signedIn = false;
    });

    it('Sign in button is rendered', () => {
      const button = element.shadowRoot.querySelector('.signIn');
      assert.ok(button);
      const { display } = getComputedStyle(button);
      assert.notEqual(display, 'none');
    });

    it('Sign out button not rendered', () => {
      const button = element.shadowRoot.querySelector('.signOut');
      assert.notOk(button);
    });

    it('renders sign out button when auth set', async () => {
      element.signedIn = true;
      await nextFrame();
      const button = element.shadowRoot.querySelector('.signOut');
      assert.ok(button);
      const { display } = getComputedStyle(button);
      assert.notEqual(display, 'none');
    });

    it("won't render sign in button", async () => {
      element.signedIn = true;
      await nextFrame();
      const button = element.shadowRoot.querySelector('.signIn');
      assert.notOk(button);
    });
  });

  describe('signIn', () => {
    let element = /** @type AnypointSigninElement */ (null);
    beforeEach(async () => {
      element = await setupReadyFixture();
      await nextFrame();
      element.signedIn = false;
    });

    it('Calls signIn() on the aware', () => {
      let called;
      element.authAware.signIn = () => { called = true };
      element.signIn();
      assert.isTrue(called);
    });

    it('Calls signIn for click', () => {
      let called;
      element.authAware.signIn = () => { called = true };
      element.click();
      assert.isTrue(called);
    });

    it('Calls signIn for space bar press', () => {
      let called;
      element.signIn = () => { called = true };
      const e = keyboardEventFor('keydown', 32, ' ', 'Space');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signIn for enter press', () => {
      let called;
      element.signIn = () => { called = true };
      const e = keyboardEventFor('keydown', 13, 'Enter', 'Enter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signIn for numeric enter press', () => {
      let called;
      element.signIn = () => { called = true };
      const e = keyboardEventFor('keydown', 13, 'Enter', 'NumpadEnter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Ignores other keys', () => {
      let called = false;
      element.signOut = () => { called = true };
      const e = keyboardEventFor('keydown', 48, '0', '0');
      element.dispatchEvent(e);
      assert.isFalse(called);
    });
  });

  describe('signOut', () => {
    let element = /** @type AnypointSigninElement */ (null);
    beforeEach(async () => {
      element = await setupReadyFixture();
      element.signedIn = true;
    });

    it('Calls signOut() on the aware', () => {
      let called;
      element.authAware.signOut = async () => { called = true };
      element.signOut();
      assert.isTrue(called);
    });

    it('Calls signOut for click', () => {
      let called;
      element.signOut = () => { called = true };
      element.click();
      assert.isTrue(called);
    });

    it('Calls signOut for space bar press', () => {
      let called;
      element.signOut = () => { called = true };
      const e = keyboardEventFor('keydown', 32, ' ', 'Space');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signOut for enter press', () => {
      let called;
      element.signOut = () => { called = true };
      const e = keyboardEventFor('keydown', 13, 'Enter', 'Enter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Calls signIn for numeric enter press', () => {
      let called;
      element.signOut = () => { called = true };
      const e = keyboardEventFor('keydown', 13, 'Enter', 'NumpadEnter');
      element.dispatchEvent(e);
      assert.isTrue(called);
    });

    it('Ignores other keys', () => {
      let called = false;
      element.signOut = () => { called = true };
      const e = keyboardEventFor('keydown', 48, '0', '0');
      element.dispatchEvent(e);
      assert.isFalse(called);
    });
  });

  describe('onsignedin', () => {
    let element = /** @type AnypointSigninElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
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
      element.dispatchEvent(new Event(SignedInChangeType));
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
      element.dispatchEvent(new Event(SignedInChangeType));
      element.onsignedin = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onaccesstoken', () => {
    let element = /** @type AnypointSigninElement */ (null);
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
      element.dispatchEvent(new Event(AccessTokenChangeType));
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
      element.dispatchEvent(new Event(AccessTokenChangeType));
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
      assert.ok(element.getAttribute('aria-label'));
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
