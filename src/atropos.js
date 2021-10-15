/* eslint-disable no-restricted-globals */
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

function Atropos(originalParams = {}) {
  let { el, eventsEl } = originalParams;

  const self = {
    __atropos__: true,
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
      stretchX: 0,
      stretchY: 0,
      shadow: true,
      highlight: true,
      onEnter: null,
      onLeave: null,
      onRotate: null,
      ...removeUndefinedProps(originalParams || {}),
    },
    destroyed: false,
    isActive: false,
  };

  const { params } = self;

  let rotateEl;
  let rotated;
  let scaleEl;
  let innerEl;

  let enterRotateX;
  let enterRotateY;

  let elBoundingClientRect;
  let eventsElBoundingClientRect;

  let rotateXLock = true;
  let rotateYLock = true;

  let shadowEl;
  let highlightEl;

  const createShadow = () => {
    let created;
    shadowEl = $(el, '.atropos-shadow');
    if (!shadowEl) {
      shadowEl = document.createElement('span');
      shadowEl.classList.add('atropos-shadow');
      created = true;
    }
    $setTransform(
      shadowEl,
      `translate3d(0,0,-${params.shadowOffset}px) scale(${params.shadowScale})`,
    );
    if (created) {
      rotateEl.appendChild(shadowEl);
    }
  };
  const createHighlight = () => {
    let created;
    highlightEl = $(el, '.atropos-highlight');
    if (!highlightEl) {
      highlightEl = document.createElement('span');
      highlightEl.classList.add('atropos-highlight');
      created = true;
    }

    $setTransform(highlightEl, `translate3d(0,0,0)`);
    if (created) {
      innerEl.appendChild(highlightEl);
    }
  };

  const setChildrenOffset = ({
    rotateXPercentage = 0,
    rotateYPercentage = 0,
    duration,
    opacityOnly,
  }) => {
    const getOpacity = (element) => {
      if (element.dataset.atroposOpacity && typeof element.dataset.atroposOpacity === 'string') {
        return element.dataset.atroposOpacity.split(';').map((v) => parseFloat(v));
      }
      return undefined;
    };
    $$(el, '[data-atropos-offset], [data-atropos-opacity]').forEach((childEl) => {
      $setDuration(childEl, duration);
      const elementOpacity = getOpacity(childEl);
      if (rotateXPercentage === 0 && rotateYPercentage === 0) {
        if (!opacityOnly) $setTransform(childEl, `translate3d(0, 0, 0)`);
        if (elementOpacity) $setOpacity(childEl, elementOpacity[0]);
      } else {
        const childElOffset = parseFloat(childEl.dataset.atroposOffset) / 100;
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
    el.classList.add('atropos-active');
    $setDuration(rotateEl, '0ms');
    rotated = false;
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

  const onTouchMove = (e) => {
    if (rotated && e.cancelable) {
      e.preventDefault();
    }
  };

  const onPointerMove = (e) => {
    if (!params.rotate || !self.isActive) return;
    if (e.pointerType !== 'mouse') {
      if (!params.rotateTouch) return;
      e.preventDefault();
    }
    const { clientX, clientY } = e;
    if (!elBoundingClientRect) {
      elBoundingClientRect = el.getBoundingClientRect();
    }
    if (el !== eventsEl && !eventsElBoundingClientRect) {
      eventsElBoundingClientRect = eventsEl.getBoundingClientRect();
    }
    let rotateX = 0;
    let rotateY = 0;
    const { top, left, width, height } = elBoundingClientRect;
    if (el === eventsEl) {
      const centerX = width / 2;
      const centerY = height / 2;

      const coordX = clientX - left;
      const coordY = clientY - top;

      rotateY = ((params.rotateYMax * (coordX - centerX)) / (width / 2)) * -1;
      rotateX = (params.rotateXMax * (coordY - centerY)) / (height / 2);
    } else {
      const {
        top: parentTop,
        left: parentLeft,
        width: parentWidth,
        height: parentHeight,
      } = eventsElBoundingClientRect;
      const offsetLeft = left - parentLeft;
      const offsetTop = top - parentTop;

      const centerX = width / 2 + offsetLeft;
      const centerY = height / 2 + offsetTop;

      const coordX = clientX - parentLeft;
      const coordY = clientY - parentTop;

      rotateY = ((params.rotateYMax * (coordX - centerX)) / (parentWidth - width / 2)) * -1;
      rotateX = (params.rotateXMax * (coordY - centerY)) / (parentHeight - height / 2);
    }

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

    if (typeof params.rotateTouch === 'string' && (rotateX !== 0 || rotateY !== 0)) {
      if (!rotated) {
        rotated = true;
        el.classList.add('atropos-rotate-touch');
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    }
    const rotateXPercentage = (rotateX / params.rotateXMax) * 100;
    const rotateYPercentage = (rotateY / params.rotateYMax) * 100;

    const stretchX =
      (el !== eventsEl ? (rotateYPercentage / 100) * params.stretchX : 0) *
      (params.rotateYInvert ? -1 : 1);
    const stretchY =
      (el !== eventsEl ? (rotateXPercentage / 100) * params.stretchY : 0) *
      (params.rotateXInvert ? -1 : 1);

    $setTransform(
      rotateEl,
      `translate3d(${stretchX}%, ${-stretchY}%, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    );

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

    if (typeof params.onRotate === 'function') params.onRotate(rotateX, rotateY);
  };

  const onPointerLeave = (e) => {
    elBoundingClientRect = undefined;
    if (!self.isActive) return;
    if (e && e.type === 'pointerup' && e.pointerType === 'mouse') return;
    if (e && e.type === 'pointerleave' && e.pointerType !== 'mouse') return;
    if (typeof params.rotateTouch === 'string' && rotated) {
      el.classList.remove('atropos-rotate-touch');
    }
    el.classList.remove('atropos-active');
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
    if (typeof params.onRotate === 'function') params.onRotate(0, 0);
    if (typeof params.onLeave === 'function') params.onLeave();
  };

  const onDocumentClick = (e) => {
    const clickTarget = e.target;
    if (!eventsEl.contains(clickTarget) && clickTarget !== eventsEl && self.isActive) {
      onPointerLeave();
    }
  };

  const initDOM = () => {
    if (typeof el === 'string') {
      el = $(document, el);
    }
    if (!el) return;

    // eslint-disable-next-line
    if (el.__atropos__) return;

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

    rotateEl = $(el, '.atropos-rotate');
    scaleEl = $(el, '.atropos-scale');
    innerEl = $(el, '.atropos-inner');

    // eslint-disable-next-line
    el.__atropos__ = self;
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
      if (typeof params.rotateTouch === 'string') {
        el.classList.add(`atropos-rotate-touch-${params.rotateTouch}`);
      } else {
        el.classList.add('atropos-rotate-touch');
      }
    }
    if ($(el, '[data-atropos-opacity]')) {
      setChildrenOffset({ opacityOnly: true });
    }
    $on(document, 'click', onDocumentClick);
    $on(eventsEl, 'pointerdown', onPointerEnter);
    $on(eventsEl, 'pointerenter', onPointerEnter);
    $on(eventsEl, 'pointermove', onPointerMove);
    $on(eventsEl, 'touchmove', onTouchMove);
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
    $off(eventsEl, 'touchmove', onTouchMove);
    $off(eventsEl, 'pointerleave', onPointerLeave);
    $off(eventsEl, 'pointerup', onPointerLeave);
    $off(eventsEl, 'lostpointercapture', onPointerLeave);
    // eslint-disable-next-line
    delete el.__atropos__;
  };

  self.destroy = destroy;

  init();

  // eslint-disable-next-line
  return self;
}
export { Atropos };
export default Atropos;
