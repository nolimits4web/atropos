const makeCard = (el) => {
  const rotateEl = el.querySelector(".rotate-wrap");

  const onTransitionEnd = (el, handler) => {
    const proxy = (e) => {
      if (e.target !== el) return;
      handler();
      el.removeEventListener("transitionend", proxy);
    };
    el.addEventListener("transitionend", proxy);
  };

  let startX;
  let startY;

  let enterRotateX;
  let enterRotateY;

  let rotateXLock = true;
  let rotateYLock = true;

  const onMouseEnter = (e) => {
    rotateEl.style.transition = "0ms";
    startX = e.pageX;
    startY = e.pageY;
    enterRotateX = undefined;
    enterRotateY = undefined;
    rotateXLock = true;
    rotateYLock = true;
  };

  const onMouseMove = (e) => {
    const { pageX, pageY } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const coordX = pageX - left;
    const coordY = pageY - top;

    const rY = 15;
    const rX = 15;
    let rotateY = ((rY * (coordX - centerX)) / (width / 2)) * -1;
    let rotateX = (rX * (coordY - centerY)) / (height / 2);
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
    rotateX = -rotateX;
    rotateY = -rotateY;

    rotateEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    rotateEl.querySelector("img").style.transform = `translateX(${
      -rotateY / 2
    }px) translateY(${rotateX / 2}px) translateZ(0px)`;
    rotateEl.querySelector("span").style.transform = `translateX(${
      rotateY / 1.5
    }px) translateY(${-rotateX / 1.5}px) translateZ(0px)`;
  };

  const onMouseLeave = (e) => {
    rotateEl.style.transition = "600ms";
    rotateEl.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  el.addEventListener("mouseenter", onMouseEnter);
  el.addEventListener("mousemove", onMouseMove);
  el.addEventListener("mouseleave", onMouseLeave);
};
makeCard(document.querySelectorAll(".item")[0]);
makeCard(document.querySelectorAll(".item")[1]);
makeCard(document.querySelectorAll(".item")[2]);
