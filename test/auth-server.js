import sinon from 'sinon';

export const AuthServer = {
  createServer: () => {
    AuthServer.srv = sinon.fakeServer.create({
      autoRespond: true
    });
    AuthServer.mock();
  },

  mock: () => {
    AuthServer.mockLogout();
  },

  mockLogout: () => {
    const url = /^https:\/\/anypoint\.mulesoft\.com\/accounts\/api\/logout/;
    AuthServer.srv.respondWith('DELETE', url, (request) => {
      request.respond(200, {}, '{"test": true}');
    });
  },

  restore: () => {
    AuthServer.srv.restore();
  }
};
