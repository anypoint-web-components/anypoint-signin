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
    font-size: var(--arc-font-body1-font-size);
    font-weight: var(--arc-font-body1-font-weight);
    line-height: var(--arc-font-body1-line-height);
    font-size: 14px;
    text-align: center;
    user-select: none;
    white-space: nowrap;
    border-radius: 2px;
    -webkit-transition: background 0.3s, background-color 0.3s, color 0.3s;
    transition: box-shadow 0.15s cubic-bezier(0.46, 0.03, 0.52, 0.96);
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

  .button-content {
    outline: none;
  }

  .buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-right: 0.8em;
  }

  /*
   * Dark Theme
   */

  .theme-dark {
    background: var(--anypoint-color-coreBlue3);
    color: var(--anypoint-color-tertiary);
    border: 0;
    border-radius: 2px;
  }

  .theme-dark::after {
    border-radius: 2px;
    bottom: 0;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  }

  .theme-dark:hover {
    background: var(--anypoint-color-coreBlue4);
  }

  .theme-dark:active {
    background: var(--anypoint-color-coreBlue5);
  }

  .theme-dark:focus {
    outline: 0;
    box-shadow: 0 0 0 3px var(--anypoint-color-coreBlue1);
  }
`;
