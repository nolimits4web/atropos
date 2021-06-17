import { getDocument } from "../node_modules/ssr-window/ssr-window.esm.js";

const makeCard = (params = {}) => {
  const document = getDocument();
  const {
    activeOffset = 50,
    shadowOffset = 50,
    enterDuration = 300,
    leaveDuration = 600,
    lockRotate = true,
    maxRotateX = 15,
    maxRotateY = 15,
    invertRotateX = false,
    invertRotateY = false,
    shadow = true,
    highlight = true,
  } = params;

  let { el, eventsEl } = params;

  if (typeof el === "string") {
    el = document.querySelector(el);
  }
  if (!el) return;

  if (typeof eventsEl !== "undefined") {
    if (typeof eventsEl === "string") {
      eventsEl = document.querySelector(eventsEl);
    }
  } else {
    eventsEl = el;
  }

  const self = {
    el,
    params,
    destroyed: false,
    isActive: false,
  };
  const rotateEl = el.querySelector(".mariko-rotate");
  const scaleEl = el.querySelector(".mariko-scale");
  const innerEl = el.querySelector(".mariko-inner");

  let enterRotateX;
  let enterRotateY;

  let rotateXLock = true;
  let rotateYLock = true;

  let shadowEl;
  let highlightEl;
  const createShadow = () => {
    shadowEl = rotateEl.querySelector(".mariko-shadow");
    if (shadowEl) return;
    shadowEl = document.createElement("span");
    shadowEl.classList.add("mariko-shadow");
    shadowEl.style.transform = `translate3d(0,0,-${shadowOffset}px)`;
    rotateEl.appendChild(shadowEl);
  };
  const createHighlight = () => {
    highlightEl = innerEl.querySelector(".mariko-highlight");
    if (highlightEl) return;
    highlightEl = document.createElement("span");
    highlightEl.classList.add("mariko-highlight");
    highlightEl.style.transform = `translate3d(0,0,0)`;
    innerEl.appendChild(highlightEl);
  };

  if (shadow) {
    createShadow();
  }
  if (highlight) {
    createHighlight();
  }

  const onMouseEnter = (e) => {
    el.classList.add("mariko-state-active");
    rotateEl.style.transitionDuration = "0ms";
    enterRotateX = undefined;
    enterRotateY = undefined;
    rotateXLock = true;
    rotateYLock = true;
    scaleEl.style.transform = `translate3d(0,0, ${activeOffset}px)`;
    scaleEl.style.transitionDuration = `${enterDuration}ms`;
    if (shadowEl) {
      shadowEl.style.transitionDuration = `${enterDuration}ms`;
    }
    self.isActive = true;
  };

  const onMouseMove = (e) => {
    const { pageX, pageY } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const coordX = pageX - left;
    const coordY = pageY - top;

    let rotateY = ((maxRotateY * (coordX - centerX)) / (width / 2)) * -1;
    let rotateX = (maxRotateX * (coordY - centerY)) / (height / 2);
    if (lockRotate) {
      if (typeof enterRotateY === "undefined") {
        enterRotateY = rotateY;
        rotateYLock = true;
      }
      if (typeof enterRotateX === "undefined") {
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

    rotateX = Math.min(Math.max(-rotateX, -maxRotateX), maxRotateX);
    if (invertRotateX) rotateX = -rotateX;
    rotateY = Math.min(Math.max(-rotateY, -maxRotateY), maxRotateY);
    if (invertRotateY) rotateY = -rotateY;
    rotateEl.style.transform = `translate3d(0,0,0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const rotateXPercentage = (rotateX / maxRotateX) * 100;
    const rotateYPercentage = (rotateY / maxRotateY) * 100;

    if (highlightEl) {
      highlightEl.style.transitionDuration = "0ms";
      highlightEl.style.transform = `translate3d(${
        -rotateYPercentage * 0.25
      }%, ${rotateXPercentage * 0.25}%, 0)`;
      highlightEl.style.opacity =
        Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) /
        100;
    }

    el.querySelectorAll("[data-mariko-offset]").forEach((childEl) => {
      const childElOffset = parseFloat(childEl.dataset.marikoOffset) / 100;
      if (Number.isNaN(childElOffset)) return;
      childEl.style.transitionDuration = "0ms";
      childEl.style.transform = `translate3d(${
        -rotateYPercentage * -childElOffset
      }%, ${rotateXPercentage * -childElOffset}%, 0)`;
    });
  };

  const onMouseLeave = (e) => {
    el.classList.remove("mariko-state-active");
    scaleEl.style.transform = `translate3d(0,0, ${0}px)`;
    scaleEl.style.transitionDuration = `${leaveDuration}ms`;
    if (shadowEl) {
      shadowEl.style.transitionDuration = `${leaveDuration}ms`;
    }
    if (highlightEl) {
      highlightEl.style.transitionDuration = `${leaveDuration}ms`;
      highlightEl.style.transform = `translate3d(0, 0, 0)`;
      highlightEl.style.opacity = 0;
    }
    rotateEl.style.transitionDuration = `${leaveDuration}ms`;
    rotateEl.style.transform = `translate3d(0,0,0) rotateX(0deg) rotateY(0deg)`;
    el.querySelectorAll("[data-mariko-offset]").forEach((childEl) => {
      childEl.style.transform = `translate3d(0,0,0)`;
      childEl.style.transitionDuration = `${leaveDuration}ms`;
    });
    self.isActive = false;
  };

  const destroy = () => {
    self.destroyed = true;
    eventsEl.removeEventListener("mouseenter", onMouseEnter);
    eventsEl.removeEventListener("mousemove", onMouseMove);
    eventsEl.removeEventListener("mouseleave", onMouseLeave);
  };

  self.destroy = destroy;

  eventsEl.addEventListener("mouseenter", onMouseEnter);
  eventsEl.addEventListener("mousemove", onMouseMove);
  eventsEl.addEventListener("mouseleave", onMouseLeave);

  return self;
};
makeCard({
  el: document.querySelectorAll(".mariko")[0],
});
makeCard({
  el: document.querySelectorAll(".mariko")[1],
});
makeCard({
  el: document.querySelectorAll(".mariko")[2],
});

document.querySelectorAll("li").forEach((el) => {
  makeCard({
    el,
    activeOffset: 100,
    maxRotateX: 20,
    maxRotateY: 20,
  });
});
