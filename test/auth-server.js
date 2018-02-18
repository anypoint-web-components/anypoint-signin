/* global sinon */
const AuthServer = {
  createServer: function() {
    this.srv = sinon.fakeServer.create({
      autoRespond: true
    });
    this.mock();
  },

  mock: function() {
    this.mockProfile();
    this.mockLogout();
  },

  mockProfile: function() {
    let url = /^https:\/\/anypoint\.mulesoft\.com\/exchange\/api\/v1\/profile*/;
    this.srv.respondWith('GET', url, function(request) {
      request.respond(200, {}, '{"test": true}');
    });
  },

  mockLogout: function() {
    let url = /^https:\/\/anypoint\.mulesoft\.com\/accounts\/api\/access_tokens/;
    this.srv.respondWith('DELETE', url, function(request) {
      request.respond(200, {}, '{"test": true}');
    });
  },

  restore: function() {
    this.srv.restore();
  }
};
