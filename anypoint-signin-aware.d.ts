import { AnypointSigninAwareElement } from './src/AnypointSigninAwareElement';

declare global {
  interface HTMLElementTagNameMap {
    "anypoint-signin-aware": AnypointSigninAwareElement;
  }
}
