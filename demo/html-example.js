export default `<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-signin/anypoint-signin.js';
    </script>
  </head>
  <body>
    <anypoint-signin></anypoint-signin>

    <script>
    (async () => {
      await customElements.whenDefined('anypoint-signin');
      const button = document.body.querySelector('anypoint-signin');
      button.onsignedin = (e) {
        if (e.target.signedIn) {
          console.log('User is signed in');
        } else {
          console.log('User is not signed in');
        }
      };
    })();
    </script>
  </body>
</html>`;
