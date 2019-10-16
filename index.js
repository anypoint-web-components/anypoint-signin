const button = document.getElementById('b1');
button.addEventListener('signedin-changed', (e) => {
  const { value } = e.detail;
  document.getElementById('signInStatus').innerText = String(value);
});

button.addEventListener('accesstoken-changed', (e) => {
  let { value } = e.detail;
  if (value) {
    value = String(value);
  } else {
    value = 'none';
  }
  document.getElementById('atStatus').innerText = value;
});

window.addEventListener('anypoint-signin-aware-error', (e) => {
  const { message } = e.detail;
  const toast = document.getElementById('errorToast');
  toast.text = message;
  toast.opened = true;
});

// This is an example of handling the authorization-code once the authorization flow is completed and
// the page that the user is redirected sends back the authorization code from the authorization code flow.
window.addEventListener('oauth2-code-response', (e) => {
  console.log('Code Info', e.detail);
  console.log('The authorization code is', e.detail.code);
  console.log(
    'You should exchange this code for an access token. ' +
      'Once exchanged, you can set the button signedIn attribute to true so that the button becomes a signout button.' +
      'You can also just remove the button at this point or go to the next page in your flow.'
  );
  const authCode = document.getElementById('authorizationCode');
  authCode.innerText = e.detail.code;
});
