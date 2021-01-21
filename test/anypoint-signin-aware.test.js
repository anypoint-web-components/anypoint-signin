import { fixture, assert, html } from '@open-wc/testing';
import sinon from 'sinon';
import { AuthorizationEventTypes } from '@advanced-rest-client/arc-events';
import { AuthServer } from './auth-server.js';
import { AnypointAuth } from '../src/AnypointAuth.js';
import '../anypoint-signin-aware.js';

/** @typedef {import('../').AnypointSigninAwareElement} AnypointSigninAwareElement */

describe('<anypoint-signin-aware>', () => {
  /**
   * @return {Promise<AnypointSigninAwareElement>} 
   */
  async function basicFixture() {
    return fixture(html`<anypoint-signin-aware></anypoint-signin-aware>`);
  }

  /**
   * @return {Promise<AnypointSigninAwareElement>} 
   */
  async function eventsFixture() {
    return fixture(html`<anypoint-signin-aware forceOauthEvents></anypoint-signin-aware>`);
  }

  const clientId = 'test-id';
  const redirectUri = 'https://test-redirect';
  const replacedMethods = {};

  /**
   * @param {keyof AnypointAuth} method
   * @param {Function} fn
   */
  function replaceAuthMethod(method, fn) {
    const orig = AnypointAuth[method];
    // @ts-ignore
    AnypointAuth[method] = fn;
    replacedMethods[method] = orig;
  }

  /**
   * @param {keyof AnypointAuth} method
   */
  function restoreMethod(method) {
    // @ts-ignore
    AnypointAuth[method] = replacedMethods[method];
    delete replacedMethods[method];
  }

  describe('Basic', () => {
    before(() => {
      AuthServer.createServer();
    });

    after(() => {
      AuthServer.restore();
    });

    let element = /** @type AnypointSigninAwareElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
      element.clientId = '';
      element.redirectUri = '';
    });

    it('Auto authorize the user', () => {
      let called = 0;
      const fn = () => {
        called++;
      };
      replaceAuthMethod('_initSignIn', fn);
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      restoreMethod('_initSignIn');
      assert.equal(called, 2);
    });

    it('Auto calls signin function', () => {
      let called = false;
      let argValue;
      const fn = (arg) => {
        called = true;
        argValue = arg;
      };
      replaceAuthMethod('signIn', fn);
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      restoreMethod('signIn');
      assert.isTrue(called);
      assert.isFalse(argValue);
    });
  });

  describe('forceOauthEvents', () => {
    let element = /** @type AnypointSigninAwareElement */ (null);
    beforeEach(async () => {
      element = await eventsFixture();
    });

    it('dispatches the oauth request event (body)', () => {
      let called = false;
      document.body.addEventListener(AuthorizationEventTypes.OAuth2.authorize, (e) => {
        // @ts-ignore
        e.detail.result = Promise.resolve({});
        called = true;
      });
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      element.signIn();
      assert.isTrue(called);
    });

    it('dispatches the oauth2 request event on self', () => {
      let called = false;
      document.body.addEventListener(AuthorizationEventTypes.OAuth2.authorize, (e) => {
        // @ts-ignore
        e.detail.result = Promise.resolve({});
        called = true;
      });
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      element.signIn();
      assert.isTrue(called);
    });
  });

  describe('AnypointAuth', () => {
    describe('oauth2Config', () => {
      it('does not set accessTokenUri if the auth type is not authorization_code', () => {
        AnypointAuth.authType = 'implicit';
        AnypointAuth.scopes = ['full'];
        const config = AnypointAuth.oauth2Config();
        assert.isUndefined(config.accessTokenUri);
        assert.equal(AnypointAuth.scopes, config.scopes);
      });

      it('sets accessTokenUri if the auth type is authorization_code', () => {
        AnypointAuth.authType = 'authorization_code';
        AnypointAuth.accessTokenUri = 'tokenUri';
        AnypointAuth.scopes = ['full'];
        const config = AnypointAuth.oauth2Config();
        assert.equal(AnypointAuth.accessTokenUri, config.accessTokenUri);
        assert.equal(AnypointAuth.scopes, config.scopes);
      });
    });

    describe('properties', () => {
      let element = /** @type AnypointSigninAwareElement */ (null);
      beforeEach(async () => {
        element = await basicFixture();
      });

      it('setting authType calls authTypeChanged if its value differs from previous value', () => {
        const spy = sinon.spy(element, '_authTypeChanged');
        assert.isFalse(spy.called);
        element.authType = 'authorization_code';
        assert.isTrue(spy.called);
      });

      it('setting scopes calls scopesChanged if its value differs from previous value', () => {
        const spy = sinon.spy(element, '_scopesChanged');
        assert.isFalse(spy.called);
        element.scopes = 'profile';
        assert.isTrue(spy.called);
      });
    });

    describe('assertAuthInitialized()', () => {
      let element = /** @type AnypointSigninAwareElement */ (null);
      beforeEach(async () => {
        element = await basicFixture();
      });

      it('Throws when no clientId', () => {
        element.clientId = '';
        element.redirectUri = '';
        assert.throws(() => {
          AnypointAuth.assertAuthInitialized();
        }, 'AuthEngine not initialized. clientId has not been configured.');
      });

      it('Throws when no redirectUri', () => {
        element.clientId = 'testId';
        element.redirectUri = '';
        assert.throws(() => {
          AnypointAuth.assertAuthInitialized();
        }, 'AuthEngine not initialized. redirectUri has not been configured.');
      });

      it('Passes when data is set', () => {
        element.clientId = 'testId';
        element.redirectUri = 'test-uri';
      });
    });
  });
});
