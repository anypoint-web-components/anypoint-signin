import sinon from 'sinon/pkg/sinon-esm.js';
export const AuthServer = {
  createServer: function() {
    this.srv = sinon.fakeServer.create({
      autoRespond: true
    });
    this.mock();
  },

  mock: function() {
    this.mockLogout();
  },

  mockLogout: function() {
    const url = /^https:\/\/anypoint\.mulesoft\.com\/accounts\/api\/logout/;
    this.srv.respondWith('DELETE', url, function(request) {
      request.respond(200, {}, '{"test": true}');
    });
  },

  restore: function() {
    this.srv.restore();
  }
};
