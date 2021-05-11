const el = document.querySelector(".item");
const rotateEl = document.querySelector(".rotate-wrap");

const onTransitionEnd = (el, handler) => {
  const proxy = (...args) => {
    if (args[0].target !== el) return;
    handler(...args);
    el.removeEventListener("transitionend", proxy);
  };
  el.addEventListener("transitionend", proxy);
};

let enterTransitionStarted = true;
let enterTransitionEnded = false;

let startX;
let startY;
let diffX;
let diffY;

const onMouseEnter = (e) => {
  enterTransitionStarted = false;
  enterTransitionEnded = false;
  startX = e.pageX;
  startY = e.pageY;
  diffX = undefined;
  diffY = undefined;
  rotateEl.style.transition = "100ms";
  onTransitionEnd(rotateEl, () => {
    console.log("ended");
    enterTransitionEnded = true;
    rotateEl.style.transition = "";
  });
};

const onMouseMove = (e) => {
  if (enterTransitionStarted && !enterTransitionEnded) {
    console.log("return");
    return;
  }
  const { pageX, pageY } = e;
  if (typeof diffX === "undefined" && enterTransitionEnded) {
    diffX = pageX - startX;
    diffY = pageY - startY;
  }
  const { top, left, width, height } = el.getBoundingClientRect();
  const centerX = width / 2;
  const centerY = height / 2;

  const coordX = pageX - left - (diffX || 0);
  const coordY = pageY - top - (diffY || 0);

  const rY = 15;
  const rX = 15;
  let rotateY = ((rY * (coordX - centerX)) / (width / 2)) * -1;
  let rotateX = (rX * (coordY - centerY)) / (height / 2);

  rotateY = Math.max(Math.min(rotateY, rY), -rY);
  rotateX = Math.max(Math.min(rotateX, rX), -rX);
  rotateEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  if (!enterTransitionStarted) {
    enterTransitionStarted = true;
  }
};

const onMouseLeave = (e) => {
  rotateEl.style.transition = "600ms";
  rotateEl.style.transform = `rotateX(0deg) rotateY(0deg)`;
};

el.addEventListener("mouseenter", onMouseEnter);
el.addEventListener("mousemove", onMouseMove);
el.addEventListener("mouseleave", onMouseLeave);
