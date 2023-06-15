/* eslint-disable no-restricted-globals */
import AtroposCore from '../../build/esm/atropos.esm.js';

const styles = `
    .atropos {
      position: relative;
      display: block;
      perspective: 1200px;
      transform: translate3d(0, 0, 0);
    }
    .atropos-rotate-touch,
    .atropos-rotate-scroll-x,
    .atropos-rotate-scroll-y {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-touch-callout: none;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
    }
    .atropos-rotate-touch-scroll-y {
      touch-action: pan-y;
    }
    .atropos-rotate-touch-scroll-x {
      touch-action: pan-x;
    }
    .atropos-rotate-touch {
      touch-action: none;
    }
    .atropos-scale,
    .atropos-rotate {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition-property: transform;
      display: block;
    }
    .atropos-shadow,
    .atropos-highlight {
      position: absolute;
      pointer-events: none;
      transition-property: transform, opacity;
      display: block;
      opacity: 0;
    }
    .atropos-shadow {
      z-index: -1;
      background: #000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      filter: blur(30px);
    }
    .atropos-highlight {
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background-image: radial-gradient(circle at 50%, rgba(255, 255, 255, 0.25), transparent 50%);
      z-index: 0;
    }
    .atropos-rotate {
      position: relative;
    }
    .atropos-inner {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      transform-style: preserve-3d;
      transform: translate3d(0, 0, 0);
      display: block;
    }
    .atropos-active {
      z-index: 1;
    }
    .atropos-active .atropos-shadow {
      opacity: 1 !important;
    }
    ::slotted(img) {
      transition-property: transform, opacity;
    }
    `;

class Atropos extends HTMLElement {
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
    const props = {
      alwaysActive: this.getAttributeValidation('always-active', 'boolean', false),
      activeOffset: this.getAttributeValidation('active-offset', 'integer', 50),
      shadowOffset: this.getAttributeValidation('shadow-offset', 'integer', 50),
      shadowScale: this.getAttributeValidation('shadow-scale', 'integer', 1),
      duration: this.getAttributeValidation('duration', 'integer', 300),
      rotate: this.getAttributeValidation('rotate', 'boolean', true),
      rotateTouch: this.getAttributeValidation('rotate-touch', 'boolean', true),
      rotateXMax: this.getAttributeValidation('rotate-x-max', 'integer', 15),
      rotateYMax: this.getAttributeValidation('rotate-y-max', 'integer', 15),
      rotateXInvert: this.getAttributeValidation('rotate-x-invert', 'boolean', false),
      rotateYInvert: this.getAttributeValidation('rotate-y-invert', 'boolean', false),
      stretchX: this.getAttributeValidation('stretch-x', 'integer', 0),
      stretchY: this.getAttributeValidation('stretch-y', 'integer', 0),
      stretchZ: this.getAttributeValidation('stretch-z', 'integer', 0),
      commonOrigin: this.getAttributeValidation('common-origin', 'boolean', true),
      shadow: this.getAttributeValidation('shadow', 'boolean', true),
      highlight: this.getAttributeValidation('highlight', 'boolean', true),
    };

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
          </div>
        </div>
   `;
    this.shadow.innerHTML = '';

    // eslint-disable-next-line no-restricted-globals
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    this.shadow.appendChild(el);
    this.shadow.appendChild(styleEl);

    this.atroposRef = new AtroposCore({
      el,
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

  getAttributeValidation(attributeName, valueType, defaultValue) {
    const attributeValue = this.getAttribute(attributeName);

    if (attributeValue === null) {
      return defaultValue;
    }

    switch (valueType) {
      case 'boolean':
        return attributeValue !== 'false';
      case 'number':
        // eslint-disable-next-line no-case-declarations
        const parsedValue = parseFloat(attributeValue, 10);
        return isNaN(parsedValue) ? defaultValue : parsedValue;
      default:
        return attributeValue;
    }
  }
}
customElements.define('atropos-component', Atropos);
