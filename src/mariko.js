import { getDocument } from 'ssr-window/ssr-window.esm.js';

const $ = (el, sel) => el.querySelector(sel);
const $$ = (el, sel) => el.querySelectorAll(sel);
const $setDuration = (el, duration) => {
  el.style.transitionDuration = duration;
};
const $setTransform = (el, transform) => {
  el.style.transform = transform;
};
const $setOpacity = (el, opacity) => {
  el.style.opacity = opacity;
};
const $on = (el, event, handler, props) => el.addEventListener(event, handler, props);
const $off = (el, event, handler, props) => el.removeEventListener(event, handler, props);

const removeUndefinedProps = (obj = {}) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') result[key] = obj[key];
  });
  return result;
};

function Mariko(originalParams = {}) {
  let document;

  if (process.env.BROWSER) {
    // eslint-disable-next-line
    document = window.document;
  } else {
    document = getDocument();
  }

  let { el, eventsEl } = originalParams;

  const self = {
    params: {
      activeOffset: 50,
      shadowOffset: 50,
      shadowScale: 1,
      durationEnter: 300,
      durationLeave: 600,
      rotateLock: true,
      rotate: true,
      rotateTouch: true,
      rotateXMax: 15,
      rotateYMax: 15,
      rotateXInvert: false,
      rotateYInvert: false,
      shadow: true,
      highlight: true,
      onEnter: null,
      onLeave: null,
      ...removeUndefinedProps(originalParams || {}),
    },
    destroyed: false,
    isActive: false,
  };

  const { params } = self;

  let rotateEl;
  let scaleEl;
  let innerEl;

  let enterRotateX;
  let enterRotateY;

  let rotateXLock = true;
  let rotateYLock = true;

  let shadowEl;
  let highlightEl;

  const createShadow = () => {
    shadowEl = $(el, '.mariko-shadow');
    if (shadowEl) return;
    shadowEl = document.createElement('span');
    shadowEl.classList.add('mariko-shadow');
    $setTransform(
      shadowEl,
      `translate3d(0,0,-${params.shadowOffset}px) scale(${params.shadowScale})`,
    );
    rotateEl.appendChild(shadowEl);
  };
  const createHighlight = () => {
    highlightEl = $(el, '.mariko-highlight');
    if (highlightEl) return;
    highlightEl = document.createElement('span');
    highlightEl.classList.add('mariko-highlight');
    $setTransform(highlightEl, `translate3d(0,0,0)`);
    innerEl.appendChild(highlightEl);
  };

  const setChildrenOffset = ({
    rotateXPercentage = 0,
    rotateYPercentage = 0,
    duration,
    opacityOnly,
  }) => {
    const getOpacity = (element) => {
      if (element.dataset.marikoOpacity && typeof element.dataset.marikoOpacity === 'string') {
        return element.dataset.marikoOpacity.split(';').map((v) => parseFloat(v));
      }
      return undefined;
    };
    $$(el, '[data-mariko-offset], [data-mariko-opacity]').forEach((childEl) => {
      $setDuration(childEl, duration);
      const elementOpacity = getOpacity(childEl);
      if (rotateXPercentage === 0 && rotateYPercentage === 0) {
        if (!opacityOnly) $setTransform(childEl, `translate3d(0, 0, 0)`);
        if (elementOpacity) $setOpacity(childEl, elementOpacity[0]);
      } else {
        const childElOffset = parseFloat(childEl.dataset.marikoOffset) / 100;
        if (!Number.isNaN(childElOffset) && !opacityOnly) {
          $setTransform(
            childEl,
            `translate3d(${-rotateYPercentage * -childElOffset}%, ${
              rotateXPercentage * -childElOffset
            }%, 0)`,
          );
        }
        if (elementOpacity) {
          const [min, max] = elementOpacity;
          const rotatePercentage = Math.max(
            Math.abs(rotateXPercentage),
            Math.abs(rotateYPercentage),
          );
          $setOpacity(childEl, min + ((max - min) * rotatePercentage) / 100);
        }
      }
    });
  };

  const onPointerEnter = (e) => {
    if (e.type === 'pointerdown' && e.pointerType === 'mouse') return;
    if (e.type === 'pointerenter' && e.pointerType !== 'mouse') return;
    if (e.type === 'pointerdown') {
      e.preventDefault();
    }
    el.classList.add('mariko-active');
    $setDuration(rotateEl, '0ms');
    enterRotateX = undefined;
    enterRotateY = undefined;
    rotateXLock = true;
    rotateYLock = true;
    $setTransform(scaleEl, `translate3d(0,0, ${params.activeOffset}px)`);
    $setDuration(scaleEl, `${params.rotateLock ? params.durationEnter : 0}ms`);
    if (shadowEl) {
      $setDuration(shadowEl, `${params.rotateLock ? params.durationEnter : 0}ms`);
    }

    self.isActive = true;
    if (typeof params.onEnter === 'function') params.onEnter();
  };

  const onPointerMove = (e) => {
    if (!params.rotate) return;
    if (e.pointerType !== 'mouse') {
      if (!params.rotateTouch) return;
      e.preventDefault();
    }
    const { clientX, clientY } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const coordX = clientX - left;
    const coordY = clientY - top;

    let rotateY = ((params.rotateYMax * (coordX - centerX)) / (width / 2)) * -1;
    let rotateX = (params.rotateXMax * (coordY - centerY)) / (height / 2);
    if (params.rotateLock) {
      if (typeof enterRotateY === 'undefined') {
        enterRotateY = rotateY;
        rotateYLock = true;
      }
      if (typeof enterRotateX === 'undefined') {
        enterRotateX = rotateX;
        rotateXLock = true;
      }
      if (rotateYLock) {
        if (enterRotateY < 0) {
          if (rotateY < 0) rotateY = 0;
          if (rotateY > 0) rotateYLock = false;
        }
        if (enterRotateY > 0) {
          if (rotateY > 0) rotateY = 0;
          if (rotateY < 0) rotateYLock = false;
        }
      }
      if (rotateXLock) {
        if (enterRotateX < 0) {
          if (rotateX < 0) rotateX = 0;
          if (rotateX > 0) rotateXLock = false;
        }
        if (enterRotateX > 0) {
          if (rotateX > 0) rotateX = 0;
          if (rotateX < 0) rotateXLock = false;
        }
      }
    }

    rotateX = Math.min(Math.max(-rotateX, -params.rotateXMax), params.rotateXMax);
    if (params.rotateXInvert) rotateX = -rotateX;
    rotateY = Math.min(Math.max(-rotateY, -params.rotateYMax), params.rotateYMax);
    if (params.rotateYInvert) rotateY = -rotateY;
    $setTransform(rotateEl, `translate3d(0,0,0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    const rotateXPercentage = (rotateX / params.rotateXMax) * 100;
    const rotateYPercentage = (rotateY / params.rotateYMax) * 100;

    if (highlightEl) {
      $setDuration(highlightEl, '0ms');
      $setTransform(
        highlightEl,
        `translate3d(${-rotateYPercentage * 0.25}%, ${rotateXPercentage * 0.25}%, 0)`,
      );
      highlightEl.style.opacity =
        Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) / 100;
    }

    setChildrenOffset({ rotateXPercentage, rotateYPercentage, duration: '0ms' });
  };

  const onPointerLeave = (e) => {
    if (!self.isActive) return;
    if (e && e.type === 'pointerup' && e.pointerType === 'mouse') return;
    if (e && e.type === 'pointerleave' && e.pointerType !== 'mouse') return;
    el.classList.remove('mariko-active');
    $setTransform(scaleEl, `translate3d(0,0, ${0}px)`);
    $setDuration(scaleEl, `${params.durationLeave}ms`);
    if (shadowEl) {
      $setDuration(shadowEl, `${params.durationLeave}ms`);
    }
    if (highlightEl) {
      $setDuration(highlightEl, `${params.durationLeave}ms`);
      $setTransform(highlightEl, `translate3d(0, 0, 0)`);
      highlightEl.style.opacity = 0;
    }
    $setDuration(rotateEl, `${params.durationLeave}ms`);
    $setTransform(rotateEl, `translate3d(0,0,0) rotateX(0deg) rotateY(0deg)`);

    setChildrenOffset({ duration: `${params.durationLeave}ms` });
    self.isActive = false;
    if (typeof params.onLeave === 'function') params.onLeave();
  };

  const onDocumentClick = (e) => {
    const clickTarget = e.target;
    if (!el.contains(clickTarget) && clickTarget !== el && self.isActive) {
      onPointerLeave();
    }
  };

  const initDOM = () => {
    if (typeof el === 'string') {
      el = $(document, el);
    }
    if (!el) return;

    // eslint-disable-next-line
    if (el.__mariko__) return;

    if (typeof eventsEl !== 'undefined') {
      if (typeof eventsEl === 'string') {
        eventsEl = $(document, eventsEl);
      }
    } else {
      eventsEl = el;
    }

    Object.assign(self, {
      el,
    });

    rotateEl = $(el, '.mariko-rotate');
    scaleEl = $(el, '.mariko-scale');
    innerEl = $(el, '.mariko-inner');

    // eslint-disable-next-line
    el.__mariko__ = self;
  };

  const init = () => {
    initDOM();
    if (!el || !eventsEl) return;
    if (params.shadow) {
      createShadow();
    }
    if (params.highlight) {
      createHighlight();
    }
    if (params.rotateTouch) {
      el.classList.add('mariko-rotate-touch');
    }
    if ($(el, '[data-mariko-opacity]')) {
      setChildrenOffset({ opacityOnly: true });
    }
    $on(document, 'click', onDocumentClick);
    $on(eventsEl, 'pointerdown', onPointerEnter);
    $on(eventsEl, 'pointerenter', onPointerEnter);
    $on(eventsEl, 'pointermove', onPointerMove);
    $on(eventsEl, 'pointerleave', onPointerLeave);
    $on(eventsEl, 'pointerup', onPointerLeave);
    $on(eventsEl, 'lostpointercapture', onPointerLeave);
  };

  const destroy = () => {
    self.destroyed = true;
    $off(document, 'click', onDocumentClick);
    $off(eventsEl, 'pointerdown', onPointerEnter);
    $off(eventsEl, 'pointerenter', onPointerEnter);
    $off(eventsEl, 'pointermove', onPointerMove);
    $off(eventsEl, 'pointerleave', onPointerLeave);
    $off(eventsEl, 'pointerup', onPointerLeave);
    $off(eventsEl, 'lostpointercapture', onPointerLeave);
    // eslint-disable-next-line
    delete el.__mariko__;
  };

  self.destroy = destroy;

  init();

  // eslint-disable-next-line
  return self;
}
export { Mariko };
export default Mariko;
