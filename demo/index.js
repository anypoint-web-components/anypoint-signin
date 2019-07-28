import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@polymer/paper-toast/paper-toast.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-styles/typography.js';
import '../anypoint-signin.js';

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

button.addEventListener('user-changed', (e) => {
  let { value } = e.detail;
  if (value) {
    value = JSON.stringify(value, null, 2);
  } else {
    value = 'none';
  }
  document.getElementById('userStatus').innerText = value;
});

window.addEventListener('anypoint-signin-aware-error', (e) => {
  const { message } = e.detail;
  const toast = document.getElementById('errorToast');
  toast.text = message;
  toast.opened = true;
});
