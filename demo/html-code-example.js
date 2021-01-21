export default `import { AnypointCodeExchangeEventType } from '@anypoint-web-components/anypoint-signin';

/** @typedef {import('@anypoint-web-components/anypoint-signin').AnypointCodeExchangeEvent} AnypointCodeExchangeEvent */
/** @typedef {import('@advanced-rest-client/arc-types').Authorization.TokenInfo} TokenInfo */

/**
 * @param {AnypointCodeExchangeEvent} e
 */
function codeEventHandler(e) {
  const { code } = e;
  e.detail.result = this.exchangeCode(code);
}

/**
 * @param {string} code
 * @returns {Promise<TokenInfo>}
 */
async function exchangeCode(code) {
  const init = {
    method: 'POST',
    body: code,
  };
  const response = await fetch('YOUR SERVER URL', init);
  const info = await response.json();
  return {
    accessToken: info.accessToken,
    expiresAt: Date.now() + info.expiresIn,
    expiresIn: info.expiresIn,
    expiresAssumed: false,
    state: '0', // this is required by the types definition but can be anything. State is checked before this function is called
  };
};

window.addEventListener(AnypointCodeExchangeEventType, exchangeCode);
`;
