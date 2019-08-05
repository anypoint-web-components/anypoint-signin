import { fixture, assert } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import { AuthServer } from './auth-server.js';
import { AnypointAuth } from '../anypoint-signin-aware.js';

const hostname = 'https://qax.anypoint.mulesoft.com';

describe('<anypoint-signin-aware>', () => {
  async function basicFixture() {
    return await fixture(`<anypoint-signin-aware></anypoint-signin-aware>`);
  }

  async function eventsFixture() {
    return await fixture(`<anypoint-signin-aware forceoauthevents></anypoint-signin-aware>`);
  }

  const clientId = 'test-id';
  const redirectUri = 'https://test-redirect';
  const replacedMethods = {};
  function replaceAuthMethod(method, fn) {
    const orig = AnypointAuth[method];
    AnypointAuth[method] = fn;
    replacedMethods[method] = orig;
  }

  function restoreMethod(method) {
    AnypointAuth[method] = replacedMethods[method];
    delete replacedMethods[method];
  }

  describe('Basic', function() {
    before(function() {
      AuthServer.createServer();
    });

    after(function() {
      AuthServer.restore();
    });

    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.clientId = '';
      element.redirectUri = '';
    });

    it('Auto authorize the user', function() {
      let called = 0;
      const fn = function() {
        called++;
      };
      replaceAuthMethod('_initSignIn', fn);
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      restoreMethod('_initSignIn');
      assert.equal(called, 2);
    });

    it('Auto calls signin function', function() {
      let called = false;
      let argValue;
      const fn = function(arg) {
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

    it('signIn() calls oauth factory', function() {
      let called = false;
      let argValue;
      const factory = {
        authorize: function(arg) {
          called = true;
          argValue = arg;
        }
      };
      replaceAuthMethod('_oauthFactory', factory);
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      restoreMethod('_oauthFactory');
      assert.isTrue(called);
      assert.equal(argValue.type, 'implicit');
      assert.equal(argValue.authorizationUri, `${hostname}/accounts/api/v2/oauth2/authorize`);
      assert.equal(argValue.clientId, clientId);
      assert.equal(argValue.redirectUri, redirectUri);
      assert.typeOf(argValue.state, 'string');
    });

    it('Sets properties when the response is ready', function(done) {
      let argValue;
      const factory = {
        authorize: function(arg) {
          argValue = arg;
        }
      };
      replaceAuthMethod('_oauthFactory', factory);
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      restoreMethod('_oauthFactory');
      element.addEventListener('anypoint-signin-aware-success', function clb(e) {
        element.removeEventListener('anypoint-signin-aware-success', clb);
        assert.isTrue(element.signedIn);
        assert.equal(element.accessToken, 'test-token');
        done();
      });
      const oauth = document.body.querySelector('oauth2-authorization');
      oauth.dispatchEvent(
        new CustomEvent('oauth2-token-response', {
          bubbles: true,
          composed: true,
          detail: {
            accessToken: 'test-token',
            state: argValue.state
          }
        })
      );
    });

    it('Signs out the user', function(done) {
      let argValue;
      const factory = {
        authorize: function(arg) {
          argValue = arg;
        }
      };
      replaceAuthMethod('_oauthFactory', factory);
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      restoreMethod('_oauthFactory');
      element.addEventListener('anypoint-signin-aware-success', function clb() {
        element.removeEventListener('anypoint-signin-aware-success', clb);
        element.signOut();
      });
      element.addEventListener('anypoint-signin-aware-signed-out', function clb() {
        element.removeEventListener('anypoint-signin-aware-signed-out', clb);
        assert.isUndefined(element.accessToken);
        assert.isFalse(element.signedIn);
        done();
      });
      const oauth = document.body.querySelector('oauth2-authorization');
      oauth.dispatchEvent(
        new CustomEvent('oauth2-token-response', {
          bubbles: true,
          composed: true,
          detail: {
            accessToken: 'test-token',
            state: argValue.state
          }
        })
      );
    });
  });

  describe('force-oauth-events', function() {
    let element;
    beforeEach(async () => {
      element = await eventsFixture();
    });

    it('Dispatches oauth2-token-requested custom event', function() {
      const spy = sinon.spy();
      document.body.addEventListener('oauth2-token-requested', spy);
      element.clientId = clientId;
      element.redirectUri = redirectUri;
      element.signIn();
      assert.isTrue(spy.calledOnce);
    });
  });

  describe('AnypointAuth', () => {
    describe('_oauth2ErrorHandler()', () => {
      let element;
      beforeEach(async () => {
        element = await basicFixture();
        AnypointAuth.accessToken = 'test-token';
        AnypointAuth.signedIn = true;
        AnypointAuth._lastState = 'abcd';
      });

      it('Clears token data', () => {
        AnypointAuth._oauth2ErrorHandler({
          detail: {
            state: 'abcd'
          }
        });
        assert.equal(AnypointAuth.accessToken, null);
        assert.isFalse(AnypointAuth.signedIn);
      });

      it('Passes error message to the aware', () => {
        const spy = sinon.spy(element, 'errorNotify');
        AnypointAuth._oauth2ErrorHandler({
          detail: {
            state: 'abcd',
            message: 'test-message'
          }
        });
        assert.isTrue(spy.called);
        assert.equal(spy.args[0][0].message, 'test-message');
      });

      it('Won\t report error when non-interactive', () => {
        const spy = sinon.spy(element, 'errorNotify');
        AnypointAuth._oauth2ErrorHandler({
          detail: {
            state: 'abcd',
            message: 'test-message',
            interactive: false
          }
        });
        assert.isFalse(spy.called);
      });

      it('Calls _updateStatus() on aware', () => {
        const spy = sinon.spy(element, '_updateStatus');
        AnypointAuth._oauth2ErrorHandler({
          detail: {
            state: 'abcd'
          }
        });
        assert.isTrue(spy.called);
        assert.isUndefined(spy.args[0][0]);
      });

      it('Does nothing when state is different', () => {
        const spy = sinon.spy(element, '_updateStatus');
        AnypointAuth._oauth2ErrorHandler({
          detail: {
            state: 'other'
          }
        });
        assert.isFalse(spy.called);
      });
    });

    describe('_oauth2TokenHandler()', () => {
      before(function() {
        AuthServer.createServer();
      });

      after(function() {
        AuthServer.restore();
      });

      beforeEach(async () => {
        await basicFixture();
        AnypointAuth.accessToken = null;
        AnypointAuth.signedIn = false;
        AnypointAuth._lastState = 'abcd';
      });

      it('Calls setAuthData() only when no access token', () => {
        const spy2 = sinon.spy(AnypointAuth, 'setAuthData');
        AnypointAuth._oauth2TokenHandler({
          detail: {
            state: 'abcd'
          }
        });
        AnypointAuth.setAuthData.restore();
        assert.isTrue(spy2.called);
        assert.isUndefined(spy2.args[0][0]);
      });

      it('Sets token only when profile get was error', () => {
        return AnypointAuth._oauth2TokenHandler({
          detail: {
            state: 'abcd',
            accessToken: 'no-token'
          }
        }).then(() => {
          assert.equal(AnypointAuth.accessToken, 'no-token');
        });
      });
    });

    describe('notifyError()', () => {
      let element;
      beforeEach(async () => {
        element = await basicFixture();
      });

      it('Calls errorNotify() on the aware', () => {
        const spy = sinon.spy(element, 'errorNotify');
        AnypointAuth.notifyError('test-message');
        assert.isTrue(spy.called);
      });
    });

    describe('assertAuthInitialized()', () => {
      let element;
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
        element.clientId = 'testid';
        element.redirectUri = '';
        assert.throws(() => {
          AnypointAuth.assertAuthInitialized();
        }, 'AuthEngine not initialized. redirectUri has not been configured.');
      });

      it('Passes when data is set', () => {
        element.clientId = 'testid';
        element.redirectUri = 'test-uri';
      });
    });
  });
});
