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
    let url = /https:\/\/anypoint\.mulesoft\.com\/exchange\/api\/v1\/profile/;
    this.srv.respondWith('GET', url, function(request) {
      switch (request.requestHeaders.Authorization) {
        case 'bearer no-token':
          request.respond(401, {}, '{"error": true}');
          break;
        case 'invalid-profile':
          request.respond(404, {}, '{"error": true}');
          break;
        case 'error-400':
          request.respond(400, {}, '{"error": true}');
          break;
        case 'error-500':
          request.respond(500, {}, '{"error": true}');
          break;
        default:
          request.respond(200, {}, '{"username": "test-user"}');
      }
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
