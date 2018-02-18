[![Build Status](https://travis-ci.org/advanced-rest-client/anypoint-signin.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/anypoint-signin)  

# anypoint-signin

Anypoint sign in button allows to sign in the user in the Anypoint core services.
Authorization result is `accessToken` that can be used to call other APIs
and `user` object returned from the Exchange.

If you do not need to show the button, use companion `<anypoint-signin-aware>`
element to check authentication state and perform manula authentication.

#### Examples

    <anypoint-signin client-id="..." redirect-uri="https://auth.domain.com/auth/redirect"></anypoint-signin>
    <anypoint-signin label-signin="Sign-in" client-id="..." redirect-uri="https://auth.domain.com/auth/redirect"></anypoint-signin>
    <anypoint-signin theme="dark" width="iconOnly" client-id="..." redirect-uri="https://auth.domain.com/auth/redirect"></anypoint-signin>

#### Notes

The `clientId` and `redirectUri` properties has to be set before using the
component. `clientId` and associated with it `redirectUri` has to be set up
with Anypoint authorization server. Contact Anypoint Core services for
more information.

## Authorization type

This element supports `implicit` authentication flow only. Web application
should not contain OAuth2 secret and most OAuth2 authorization do not allow
web clients to authenticate from a web client. If you have to use `code`
authorization flow when use different method to authenticate the user.

## Autho log in

The element attempts to log in user in a non-interactive way (without
displaying the popup) when the lement is ready. It does nothing when
the response is errored.

### Styling
`<anypoint-signin>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--anypoint-signin` | Mixin applied to the element | `{}`
`--anypoint-signin-disabled-background-color` | Background color of the disabled button | `#eaeaea`
`--anypoint-signin-disabled-color` | Color of the disabled button | `#a8a8a8`

