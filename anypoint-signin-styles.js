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
  :host([disabled]) {
    cursor: auto;
    pointer-events: none;
  }

  iron-icon {
    width: 21px;
    height: 21px;
    margin: 6px;
  }

  .buttonText {
    display: inline-block;
    font-family: -apple-system, 'BlinkMacSystemFont', 'Helvetica Neue', 'Segoe UI', sans-serif;
    font-size: var(--arc-font-body1-font-size, 14);
    font-weight: var(--anypoint-signin-bold-font-weight, 600);
    vertical-align: middle;
    padding-right: 0.4em;
    line-height: var(--arc-font-body1-line-height);
    text-align: center;
    white-space: nowrap;
    transition: box-shadow 0.15s cubic-bezier(0.46, 0.03, 0.52, 0.96);
  }
`;
