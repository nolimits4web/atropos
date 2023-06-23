/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-named-as-default
import Atropos, { defaults } from '../atropos.js';
import styles from '../atropos.less';

class AtroposComponent extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.destroy();
  }

  init() {
    const defaultProps = {
      ...defaults,
    };

    const props = {};

    Object.keys(defaultProps).forEach((key) => {
      const attributeName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      const attributeValue = this.getAttribute(attributeName);

      if (attributeValue === null) {
        props[key] = defaultProps[key];
      } else {
        switch (typeof defaultProps[key]) {
          case 'boolean':
            props[key] = attributeValue !== 'false';
            break;
          case 'number':
            props[key] = isNaN(parseFloat(attributeValue, 10))
              ? defaultProps[key]
              : parseFloat(attributeValue, 10);
            break;
          default:
            props[key] = attributeValue;
        }
      }
    });
    const innerClass = this.cls('atropos-inner', props.innerClass);

    // eslint-disable-next-line no-restricted-globals
    const el = document.createElement('div');
    el.classList.add('atropos');

    el.innerHTML = `
        <div class="atropos-scale">
          <div class="atropos-rotate">
            <div class="${innerClass}" part="inner">
              <slot></slot>
            </div>
            <slot name="rotate"></slot>
          </div>
          <slot name="scale"></slot>
        </div>
        <slot name="root"></slot>
   `;
    this.shadow.innerHTML = '';

    // eslint-disable-next-line no-restricted-globals
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    this.shadow.adoptedStyleSheets = [styleSheet];

    this.shadow.appendChild(el);

    this.atroposRef = Atropos({
      el,
      isComponent: true,
      ...props,
      onEnter: () => {
        this.dispatchEvent(new CustomEvent('enter'));
      },
      onLeave: () => {
        this.dispatchEvent(new CustomEvent('leave'));
      },
      onRotate: (...args) => {
        this.dispatchEvent(new CustomEvent('rotate', { detail: args }));
      },
    });
    console.log('AtroposCore instance:', this.atroposRef);
  }

  destroy() {
    if (this.atroposInstance) {
      this.atroposInstance.destroy();
      this.atroposInstance = null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  cls(...args) {
    return args.filter((c) => !!c).join(' ');
  }
}
customElements.define('atropos-component', AtroposComponent);
