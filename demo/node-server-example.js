export default `const express = require('express');
const https = require('https');

const router = express.Router();

const apiBase = 'https://anypoint.mulesoft.com/accounts/api';
const tokenEndpoint = \`\${apiBase}/v2/oauth2/token\`;

/**
 * A route that support authorization for anypoint-signing button.
 */
class AuthApiRoute extends BaseApi {
  /**
   * Exchanges authorization code for access token in Anypoint service.
   * The request body is the received code.
   *
   * @param {Object} req
   * @param {Object} res
   */
  async anypointTokenRequest(req, res) {
    const { body } = req;
    if (!body || typeof body !== 'string') {
      res.status(400).send({
        error: true,
        message: 'Missing payload message'
      });
      return;
    }
    try {
      const data = await this._exchangeToken(body);
      res.status(200).send({
        error: false,
        data,
      });
    } catch (e) {
      res.status(500).send({
        error: true,
        message: e.message
      });
    }
  }
  /**
   * Exchanges code for access token.
   * @param {String} code Received authorization code
   * @return {Promise}
   */
  async _exchangeToken(code) {
    const body = this._getTokenExchangeBody(code);
    const [mediaType, rawBody] = await this._makeRequest(body);
    return this._processCodeResponse(rawBody, mediaType);
  }
  /**
   * Creates message body for OAuth 2 token exchange
   * @param {String} code Received authorization code
   * @return {String}
   */
  _getTokenExchangeBody(code) {
    const parts = [];
    parts[parts.length] = ['grant_type', 'authorization_code'];
    parts[parts.length] = ['client_id', 'YOUR CLIENT ID'];
    parts[parts.length] = ['redirect_uri', 'YOUR REDIRECT URI'];
    parts[parts.length] = ['client_secret', 'YOUR CLIENT SECRET'];
    parts[parts.length] = ['code', code];
    return parts
      .map(([key, value]) => \`\${key}=\${encodeURIComponent(value)}\`)
      .join('&');
  }
  /**
   * Makes a request to Anypoint authorization server.
   * @param {String} body
   * @return {Promise}
   */
  _makeRequest(body) {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    return new Promise((resolve, reject) => {
      const req = https.request(tokenEndpoint, options, (res) => {
        const { statusCode } = res;

        if (statusCode >= 500) {
          const message = 'Authorization server error.';
          reject(new Error(message));
          return;
        }

        res.setEncoding('utf8');
        const contentType = res.headers['content-type'];
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (statusCode >= 400 && statusCode < 500) {
            reject(new Error(\`Client error: \${data}\`));
          } else {
            resolve([contentType, data]);
          }
        });
      });

      req.on('error', (e) => {
        reject(e.message);
        logging.error(e);
      });

      req.write(body);
      req.end();
    });
  }
  /**
   * Processes token request body and produces map of values.
   *
   * @param {String} body Body received in the response.
   * @param {String} contentType Response content type.
   * @return {Object} Response as an object.
   * @throws {Error} Exception when body is invalid.
   */
  _processCodeResponse(body, contentType) {
    if (!body) {
      throw new Error('Code response body is empty.');
    }
    let tokenInfo;
    if (contentType.indexOf('json') !== -1) {
      tokenInfo = JSON.parse(body);
    } else {
      tokenInfo = {};
      body.split('&').forEach((p) => {
        const item = p.split('=');
        const name = item[0];
        const value = decodeURIComponent(item[1]);
        tokenInfo[name] = value;
      });
    }
    return tokenInfo;
  }
}

const api = new AuthApiRoute();
router.post('/token', api.anypointTokenRequest.bind(api));
module.exports = router;
`;
