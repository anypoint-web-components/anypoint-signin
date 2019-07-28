/**
@license
Copyright 2019 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { css } from 'lit-element';
// import '../../@advanced-rest-client/anypoint-styles/colors.js';
export default css`
  :host {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin: 0 0.29em;
    background: transparent;
    text-align: center;
    font: inherit;
    outline: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    z-index: 0;
  }

  :host([disabled]) {
    cursor: auto;
    pointer-events: none;
  }

  :host([disabled]) #authButton {
    background: var(--anypoint-signin-disabled-background-color, #eaeaea);
    color: var(--anypoint-signin-disabled-color, #a8a8a8);
  }

  #authButton {
    position: relative;
    outline: none;
    font-size: var(--arc-font-body1-font-size);
    font-weight: var(--arc-font-body1-font-weight);
    line-height: var(--arc-font-body1-line-height);
    font-size: 14px;
    white-space: nowrap;
    border-radius: inherit;
    -webkit-transition: background 0.3s, background-color 0.3s, color 0.3s;
    transition: background 0.3s, background-color 0.3s, color 0.3s;
  }

  iron-icon {
    width: 22px;
    height: 22px;
    margin: 6px;
  }

  .icon {
    display: inline-block;
    vertical-align: middle;
  }

  #ripple {
    pointer-events: none;
  }

  :host([raised]) {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }

  .button-content {
    outline: none;
  }

  .buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-right: 0.8em;
  }

  /*
 * Icon Only Width
 */

  .width-iconOnly .buttonText {
    display: none;
  }

  /*
 * Tall Height
 */

  .height-tall .buttonText {
    font-size: 15px;
    font-weight: 700;
  }

  .height-tall iron-icon {
    width: 30px;
    height: 30px;
    margin: 8px;
  }

  /*
   * Short Height
   */

  .height-short .buttonText {
    font-size: 11px;
  }

  .height-short iron-icon {
    width: 16px;
    height: 16px;
    margin: 3px;
  }

  /*
 * Light Theme
 */

  .theme-light {
    background: #fff;
    color: var(--anypoint-color-robustBlue4);
    border: 1px solid var(--anypoint-color-robustBlue1);
  }

  :host([focused]:not([disabled])) .theme-light {
    border: 1px solid var(--anypoint-color-coreBlue3);
  }

  .theme-light:hover,
  .theme-light:focus {
    color: var(--anypoint-color-coreBlue3);
  }

  /*
 * Dark Theme
 */

  .theme-dark {
    background: var(--anypoint-color-coreBlue3);
    color: var(--anypoint-color-tertiary);
    border: 1px solid transparent;
  }

  :host([focused]:not([disabled])) .theme-dark {
    border: 1px solid var(--anypoint-color-coreBlue5);
  }

  .theme-dark:hover,
  .theme-dark:focus {
    background: var(--anypoint-color-coreBlue2);
  }
`;
