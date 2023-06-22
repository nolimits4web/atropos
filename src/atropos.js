/* eslint-disable no-restricted-globals */
const $ = (el, sel) => el.querySelector(sel);
const $$ = (el, sel) => el.querySelectorAll(sel);

const removeUndefinedProps = (obj = {}) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') result[key] = obj[key];
  });
  return result;
};
export const defaults = {
  alwaysActive: false,
  activeOffset: 50,
  shadowOffset: 50,
  shadowScale: 1,
  duration: 300,
  rotate: true,
  rotateTouch: true,
  rotateXMax: 15,
  rotateYMax: 15,
  rotateXInvert: false,
  rotateYInvert: false,
  stretchX: 0,
  stretchY: 0,
  stretchZ: 0,
  commonOrigin: true,
  shadow: true,
  highlight: true,
};
function Atropos(originalParams = {}) {
  let { el, eventsEl } = originalParams;
  const { isComponent } = originalParams;
  let childrenRootEl;
  const self = {
    __atropos__: true,
    params: {
      ...defaults,
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
  let scaleEl;
  let innerEl;

  let elBoundingClientRect;
  let eventsElBoundingClientRect;

  let shadowEl;
  let highlightEl;

  let isScrolling;
  let clientXStart;
  let clientYStart;

  const queue = [];
  let queueFrameId;
  const purgeQueue = () => {
    queueFrameId = requestAnimationFrame(() => {
      queue.forEach((data) => {
        if (typeof data === 'function') {
          data();
        } else {
          const { element, prop, value } = data;
          element.style[prop] = value;
        }
      });
      queue.splice(0, queue.length);
      purgeQueue();
    });
  };
  purgeQueue();

  const $setDuration = (element, value) => {
    queue.push({ element, prop: 'transitionDuration', value });
  };
  const $setEasing = (element, value) => {
    queue.push({ element, prop: 'transitionTimingFunction', value });
  };
  const $setTransform = (element, value) => {
    queue.push({ element, prop: 'transform', value });
  };
  const $setOpacity = (element, value) => {
    queue.push({ element, prop: 'opacity', value });
  };
  const $setOrigin = (element, value) => {
    queue.push({ element, prop: 'transformOrigin', value });
  };
  const $on = (element, event, handler, props) => element.addEventListener(event, handler, props);
  const $off = (element, event, handler, props) =>
    element.removeEventListener(event, handler, props);

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
    easeOut,
  }) => {
    const getOpacity = (element) => {
      if (element.dataset.atroposOpacity && typeof element.dataset.atroposOpacity === 'string') {
        return element.dataset.atroposOpacity.split(';').map((v) => parseFloat(v));
      }
      return undefined;
    };

    $$(childrenRootEl, '[data-atropos-offset], [data-atropos-opacity]').forEach((childEl) => {
      $setDuration(childEl, duration);
      $setEasing(childEl, easeOut ? 'ease-out' : '');
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

  const setElements = (clientX, clientY) => {
    const isMultiple = el !== eventsEl;
    if (!elBoundingClientRect) {
      elBoundingClientRect = el.getBoundingClientRect();
    }
    if (isMultiple && !eventsElBoundingClientRect) {
      eventsElBoundingClientRect = eventsEl.getBoundingClientRect();
    }
    if (typeof clientX === 'undefined' && typeof clientY === 'undefined') {
      const rect = isMultiple ? eventsElBoundingClientRect : elBoundingClientRect;
      clientX = rect.left + rect.width / 2;
      clientY = rect.top + rect.height / 2;
    }

    let rotateX = 0;
    let rotateY = 0;
    const { top, left, width, height } = elBoundingClientRect;
    let transformOrigin;
    if (!isMultiple) {
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
      transformOrigin = `${clientX - left}px ${clientY - top}px`;
    }

    rotateX = Math.min(Math.max(-rotateX, -params.rotateXMax), params.rotateXMax);
    if (params.rotateXInvert) rotateX = -rotateX;
    rotateY = Math.min(Math.max(-rotateY, -params.rotateYMax), params.rotateYMax);
    if (params.rotateYInvert) rotateY = -rotateY;

    const rotateXPercentage = (rotateX / params.rotateXMax) * 100;
    const rotateYPercentage = (rotateY / params.rotateYMax) * 100;

    const stretchX =
      (isMultiple ? (rotateYPercentage / 100) * params.stretchX : 0) *
      (params.rotateYInvert ? -1 : 1);
    const stretchY =
      (isMultiple ? (rotateXPercentage / 100) * params.stretchY : 0) *
      (params.rotateXInvert ? -1 : 1);
    const stretchZ = isMultiple
      ? (Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) / 100) * params.stretchZ
      : 0;
    $setTransform(
      rotateEl,
      `translate3d(${stretchX}%, ${-stretchY}%, ${-stretchZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    );
    if (transformOrigin && params.commonOrigin) {
      $setOrigin(rotateEl, transformOrigin);
    }

    if (highlightEl) {
      $setDuration(highlightEl, `${params.duration}ms`);
      $setEasing(highlightEl, 'ease-out');
      $setTransform(
        highlightEl,
        `translate3d(${-rotateYPercentage * 0.25}%, ${rotateXPercentage * 0.25}%, 0)`,
      );
      $setOpacity(
        highlightEl,
        Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) / 100,
      );
    }

    setChildrenOffset({
      rotateXPercentage,
      rotateYPercentage,
      duration: `${params.duration}ms`,
      easeOut: true,
    });

    if (typeof params.onRotate === 'function') params.onRotate(rotateX, rotateY);
  };

  const activate = () => {
    queue.push(() => el.classList.add('atropos-active'));
    $setDuration(rotateEl, `${params.duration}ms`);
    $setEasing(rotateEl, 'ease-out');
    $setTransform(scaleEl, `translate3d(0,0, ${params.activeOffset}px)`);
    $setDuration(scaleEl, `${params.duration}ms`);
    $setEasing(scaleEl, 'ease-out');
    if (shadowEl) {
      $setDuration(shadowEl, `${params.duration}ms`);
      $setEasing(shadowEl, 'ease-out');
    }

    self.isActive = true;
  };

  const onPointerEnter = (e) => {
    isScrolling = undefined;
    if (e.type === 'pointerdown' && e.pointerType === 'mouse') return;
    if (e.type === 'pointerenter' && e.pointerType !== 'mouse') return;
    if (e.type === 'pointerdown') {
      e.preventDefault();
    }
    clientXStart = e.clientX;
    clientYStart = e.clientY;

    if (params.alwaysActive) {
      elBoundingClientRect = undefined;
      eventsElBoundingClientRect = undefined;
      return;
    }
    activate();
    if (typeof params.onEnter === 'function') params.onEnter();
  };

  const onTouchMove = (e) => {
    if (isScrolling === false && e.cancelable) {
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

    const diffX = clientX - clientXStart;
    const diffY = clientY - clientYStart;
    if (
      typeof params.rotateTouch === 'string' &&
      (diffX !== 0 || diffY !== 0) &&
      typeof isScrolling === 'undefined'
    ) {
      if (diffX * diffX + diffY * diffY >= 25) {
        const touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        isScrolling = params.rotateTouch === 'scroll-y' ? touchAngle > 45 : 90 - touchAngle > 45;
      }
      if (isScrolling === false) {
        el.classList.add('atropos-rotate-touch');
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    }
    if (e.pointerType !== 'mouse' && isScrolling) {
      return;
    }
    setElements(clientX, clientY);
  };

  const onPointerLeave = (e) => {
    elBoundingClientRect = undefined;
    eventsElBoundingClientRect = undefined;
    if (!self.isActive) return;
    if (e && e.type === 'pointerup' && e.pointerType === 'mouse') return;
    if (e && e.type === 'pointerleave' && e.pointerType !== 'mouse') return;
    if (typeof params.rotateTouch === 'string' && isScrolling) {
      el.classList.remove('atropos-rotate-touch');
    }

    if (params.alwaysActive) {
      setElements();
      if (typeof params.onRotate === 'function') params.onRotate(0, 0);
      if (typeof params.onLeave === 'function') params.onLeave();
      return;
    }

    queue.push(() => el.classList.remove('atropos-active'));
    $setDuration(scaleEl, `${params.duration}ms`);
    $setEasing(scaleEl, '');
    $setTransform(scaleEl, `translate3d(0,0, ${0}px)`);
    if (shadowEl) {
      $setDuration(shadowEl, `${params.duration}ms`);
      $setEasing(shadowEl, '');
    }
    if (highlightEl) {
      $setDuration(highlightEl, `${params.duration}ms`);
      $setEasing(highlightEl, '');
      $setTransform(highlightEl, `translate3d(0, 0, 0)`);
      $setOpacity(highlightEl, 0);
    }
    $setDuration(rotateEl, `${params.duration}ms`);
    $setEasing(rotateEl, '');
    $setTransform(rotateEl, `translate3d(0,0,0) rotateX(0deg) rotateY(0deg)`);

    setChildrenOffset({ duration: `${params.duration}ms` });

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
    childrenRootEl = isComponent ? el.parentNode.host : el;

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
    if ($(childrenRootEl, '[data-atropos-opacity]')) {
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

    if (params.alwaysActive) {
      activate();
      setElements();
    }
  };

  const destroy = () => {
    self.destroyed = true;
    cancelAnimationFrame(queueFrameId);
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
