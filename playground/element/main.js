import AtroposCore from '../../build/esm/atropos.esm.js';

class Atropos extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.destroy();
  }

  init() {
    const shadow = this.attachShadow({ mode: 'open' });
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
    console.log(props);

    const innerClass = this.cls('atropos-inner', props.innerClass);
    // const scaleClass = this.cls('atropos-scale', props.scaleClass);
    // const rotateClass = this.cls('atropos-rotate', props.rotateClass);

    // eslint-disable-next-line no-restricted-globals
    const el = document.createElement('div');
    el.classList.add('atropos');
    el.classList.add('atropos-banner');
    // el.classList.add(scaleClass);
    // el.classList.add(rotateClass);

    el.innerHTML = `
        <div class="atropos-scale">
          <div class="atropos-rotate">
            <div class="${innerClass}">
              <slot name="img-1"></slot>
              <slot name="img-2"></slot>
              <slot name="img-3"></slot>
              <slot name="img-4"></slot>
              <slot name="img-5"></slot>
              <slot name="img-6"></slot>
              <slot name="img-7"></slot>
            </div>
          </div>
        </div>
   `;

    shadow.innerHTML = '';
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
    [data-atropos-offset] {
      transition-property: transform;
    }
    [data-atropos-opacity] {
      transition-property: opacity;
    }
    [data-atropos-offset][data-atropos-opacity] {
      transition-property: transform, opacity;
    }
    html,
    body {
      position: relative;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
      min-height: 100vh;
    }
    body {
      background-image: linear-gradient(to bottom, #ad3ef5, #5814a2);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .container {
      padding: 0px 40px;
      max-width: 960px;
      margin: 32px auto;
      display: flex;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
    }
    .atropos-banner {
      width: 100%;
    }
    .atropos-banner .atropos-inner {
      border-radius: 10px;
    }
    .atropos-banner img {
      position: absolute;
      left: -5%;
      top: -5%;
      width: 110%;
      height: 110%;
      object-fit: contain;
      display: block;
      z-index: 1;
      transform-style: preserve-3d;
      pointer-events: none;
    }
    .atropos-banner img.atropos-banner-spacer {
      position: relative;
      width: 100%;
      height: auto;
      left: 0;
      top: 0;
      visibility: hidden;
    }
    .atropos-banner .atropos-shadow {
      filter: blur(50px);
      opacity: 0.5;
    }
    .atropos-banner .atropos-highlight {
      z-index: 100;
    }

    .atropos-banner-text {
      position: absolute;
      color: #fff;
      font-weight: bold;
      left: 0%;
      top: 0%;
    }
    .atropos-active .atropos-banner-text {
    }

    `;

    // eslint-disable-next-line no-restricted-globals
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    shadow.appendChild(el);
    shadow.appendChild(styleEl);

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
    this.innerHTML = '';
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
      case 'integer':
        // eslint-disable-next-line no-case-declarations
        const parsedValue = parseInt(attributeValue, 10);
        return isNaN(parsedValue) ? defaultValue : parsedValue;
      default:
        return attributeValue;
    }
  }
}
customElements.define('atropos-component', Atropos);
