import { getDocument } from 'ssr-window/ssr-window.esm.js';

const $ = (el, sel) => el.querySelector(sel);
const $$ = (el, sel) => el.querySelectorAll(sel);
const $setDuration = (el, duration) => {
  el.style.transitionDuration = duration;
};
const $setTransform = (el, transform) => {
  el.style.transform = transform;
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
      maxRotateX: 15,
      maxRotateY: 15,
      invertRotateX: false,
      invertRotateY: false,
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

  // eslint-disable-next-line
  el.__mariko__ = self;

  const rotateEl = $(el, '.mariko-rotate');
  const scaleEl = $(el, '.mariko-scale');
  const innerEl = $(el, '.mariko-inner');

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
    $setDuration(scaleEl, `${params.durationEnter}ms`);
    if (shadowEl) {
      $setDuration(shadowEl, `${params.durationEnter}ms`);
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
    const { pageX, pageY } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const coordX = pageX - left;
    const coordY = pageY - top;

    let rotateY = ((params.maxRotateY * (coordX - centerX)) / (width / 2)) * -1;
    let rotateX = (params.maxRotateX * (coordY - centerY)) / (height / 2);
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

    rotateX = Math.min(Math.max(-rotateX, -params.maxRotateX), params.maxRotateX);
    if (params.invertRotateX) rotateX = -rotateX;
    rotateY = Math.min(Math.max(-rotateY, -params.maxRotateY), params.maxRotateY);
    if (params.invertRotateY) rotateY = -rotateY;
    $setTransform(rotateEl, `translate3d(0,0,0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    const rotateXPercentage = (rotateX / params.maxRotateX) * 100;
    const rotateYPercentage = (rotateY / params.maxRotateY) * 100;

    if (highlightEl) {
      $setDuration(highlightEl, '0ms');
      $setTransform(
        highlightEl,
        `translate3d(${-rotateYPercentage * 0.25}%, ${rotateXPercentage * 0.25}%, 0)`,
      );
      highlightEl.style.opacity =
        Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) / 100;
    }

    $$(el, '[data-mariko-offset]').forEach((childEl) => {
      const childElOffset = parseFloat(childEl.dataset.marikoOffset) / 100;
      if (Number.isNaN(childElOffset)) return;
      $setDuration(childEl, '0ms');
      $setTransform(
        childEl,
        `translate3d(${-rotateYPercentage * -childElOffset}%, ${
          rotateXPercentage * -childElOffset
        }%, 0)`,
      );
    });
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
    $$(el, '[data-mariko-offset]').forEach((childEl) => {
      $setTransform(childEl, `translate3d(0,0,0)`);
      $setDuration(childEl, `${params.durationLeave}ms`);
    });
    self.isActive = false;
    if (typeof params.onLeave === 'function') params.onLeave();
  };

  const onDocumentClick = (e) => {
    const clickTarget = e.target;
    if (!el.contains(clickTarget) && clickTarget !== el && self.isActive) {
      onPointerLeave();
    }
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

  const init = () => {
    if (params.shadow) {
      createShadow();
    }
    if (params.highlight) {
      createHighlight();
    }
    if (params.rotateTouch) {
      el.classList.add('mariko-rotate-touch');
    }
    $on(document, 'click', onDocumentClick);
    $on(eventsEl, 'pointerdown', onPointerEnter);
    $on(eventsEl, 'pointerenter', onPointerEnter);
    $on(eventsEl, 'pointermove', onPointerMove);
    $on(eventsEl, 'pointerleave', onPointerLeave);
    $on(eventsEl, 'pointerup', onPointerLeave);
    $on(eventsEl, 'lostpointercapture', onPointerLeave);
  };

  self.destroy = destroy;

  init();

  // eslint-disable-next-line
  return self;
}
export { Mariko };
export default Mariko;
