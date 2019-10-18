export default `async function exchangeCode(e) {
  const { code } = e.detail;
  const init = {
    method: 'POST',
    body: code
  };
  const tokenExchangeUrl = 'YOUR SERVER URL';
  const response = await fetch(tokenExchangeUrl, init);
  const token = await response.json();
  const button = document.body.querySelector('anypoint-signin');
  button.signedIn = !!token;
};
window.addEventListener('oauth2-code-response', exchangeCode);
`;
