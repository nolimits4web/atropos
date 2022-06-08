"use strict";
(self["webpackChunkdemo"] = self["webpackChunkdemo"] || []).push([["main"],{

/***/ 4:
/*!*****************************************************!*\
  !*** ./playground/angular/src/app/app.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _src_angular_src_lib_atropos_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/angular/src/lib/atropos.component */ 5211);


class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 9, vars: 1, consts: [["className", "container"], ["className", "atropos-banner", 3, "highlight", "onEnter"], ["className", "atropos-banner-spacer", "src", "atropos-bg.svg", "alt", ""], ["data-atropos-offset", "-4.5", "src", "atropos-bg.svg", "alt", ""], ["data-atropos-offset", "-2.5", "src", "atropos-mountains.svg", "alt", ""], ["data-atropos-offset", "0", "src", "atropos-forest-back.svg", "alt", ""], ["data-atropos-offset", "2", "src", "atropos-forest-mid.svg", "alt", ""], ["data-atropos-offset", "4", "src", "atropos-forest-front.svg", "alt", ""], ["data-atropos-offset", "5", "src", "atropos-logo-en.svg", "alt", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "atropos", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("onEnter", function AppComponent_Template_atropos_onEnter_1_listener($event) { return $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("highlight", false);
    } }, directives: [_src_angular_src_lib_atropos_component__WEBPACK_IMPORTED_MODULE_0__.AtroposComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 3648:
/*!**************************************************!*\
  !*** ./playground/angular/src/app/app.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 4);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ 2650);
/* harmony import */ var src_angular_src_public_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/angular/src/public-api */ 1461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);






class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [], imports: [[
            src_angular_src_public_api__WEBPACK_IMPORTED_MODULE_1__.AtroposModule,
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule.withServerTransition({ appId: 'serverApp' }),
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__.BrowserAnimationsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent], imports: [src_angular_src_public_api__WEBPACK_IMPORTED_MODULE_1__.AtroposModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__.BrowserAnimationsModule] }); })();


/***/ }),

/***/ 9260:
/*!************************************************************!*\
  !*** ./playground/angular/src/environments/environment.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 7863:
/*!****************************************!*\
  !*** ./playground/angular/src/main.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 3648);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 9260);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
document.addEventListener('DOMContentLoaded', () => {
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser()
        .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
        .catch((err) => console.error(err));
});


/***/ }),

/***/ 5211:
/*!**************************************************!*\
  !*** ./src/angular/src/lib/atropos.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtroposComponent": () => (/* binding */ AtroposComponent)
/* harmony export */ });
/* harmony import */ var atropos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! atropos */ 9238);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 8267);



function AtroposComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "span", 3);
} }
function AtroposComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "span", 4);
} }
const _c0 = ["*"];
class AtroposComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.class = '';
        this.scaleClassName = '';
        this.rotateClassName = '';
        this.innerClassName = '';
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.initAtropos();
    }
    initAtropos() {
        this.ref = (0,atropos__WEBPACK_IMPORTED_MODULE_0__["default"])({ el: this.elementRef.nativeElement });
    }
}
AtroposComponent.ɵfac = function AtroposComponent_Factory(t) { return new (t || AtroposComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef)); };
AtroposComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AtroposComponent, selectors: [["atropos"]], inputs: { shadow: "shadow", highlight: "highlight", class: "class", scaleClassName: "scaleClassName", rotateClassName: "rotateClassName", innerClassName: "innerClassName" }, ngContentSelectors: _c0, decls: 7, vars: 6, consts: [[3, "ngClass"], ["class", "atropos-highlight", 4, "ngIf"], ["class", "atropos-shadow", 4, "ngIf"], [1, "atropos-highlight"], [1, "atropos-shadow"]], template: function AtroposComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, AtroposComponent_span_5_Template, 1, 0, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, AtroposComponent_span_6_Template, 1, 0, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", "atropos " + ctx.class);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", "atropos-scale " + ctx.scaleClassName);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", "atropos-rotate " + ctx.rotateClassName);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", "atropos-inner " + ctx.innerClassName);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.highlight);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.shadow);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], encapsulation: 2 });


/***/ }),

/***/ 6838:
/*!***********************************************!*\
  !*** ./src/angular/src/lib/atropos.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtroposModule": () => (/* binding */ AtroposModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _atropos_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atropos.component */ 5211);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);



class AtroposModule {
}
AtroposModule.ɵfac = function AtroposModule_Factory(t) { return new (t || AtroposModule)(); };
AtroposModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AtroposModule });
AtroposModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AtroposModule, { declarations: [_atropos_component__WEBPACK_IMPORTED_MODULE_0__.AtroposComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule], exports: [_atropos_component__WEBPACK_IMPORTED_MODULE_0__.AtroposComponent] }); })();


/***/ }),

/***/ 1461:
/*!***************************************!*\
  !*** ./src/angular/src/public-api.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtroposComponent": () => (/* reexport safe */ _lib_atropos_component__WEBPACK_IMPORTED_MODULE_0__.AtroposComponent),
/* harmony export */   "AtroposModule": () => (/* reexport safe */ _lib_atropos_module__WEBPACK_IMPORTED_MODULE_1__.AtroposModule)
/* harmony export */ });
/* harmony import */ var _lib_atropos_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/atropos.component */ 5211);
/* harmony import */ var _lib_atropos_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/atropos.module */ 6838);
/*
 * Public API Surface of atropos
 */




/***/ }),

/***/ 9238:
/*!************************************!*\
  !*** ./package/esm/atropos.esm.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Atropos": () => (/* binding */ Atropos),
/* harmony export */   "default": () => (/* binding */ Atropos)
/* harmony export */ });
/**
 * Atropos 1.0.1
 * Touch-friendly 3D parallax hover effects
 * https://atroposjs.com
 *
 * Copyright 2021-2021 
 *
 * Released under the MIT License
 *
 * Released on: November 25, 2021
 */

/* eslint-disable no-restricted-globals */
const $ = (el, sel) => el.querySelector(sel);

const $$ = (el, sel) => el.querySelectorAll(sel);

const removeUndefinedProps = function (obj) {
  if (obj === void 0) {
    obj = {};
  }

  const result = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'undefined') result[key] = obj[key];
  });
  return result;
};

function Atropos(originalParams) {
  if (originalParams === void 0) {
    originalParams = {};
  }

  let {
    el,
    eventsEl
  } = originalParams;
  const self = {
    __atropos__: true,
    params: {
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
      onEnter: null,
      onLeave: null,
      onRotate: null,
      ...removeUndefinedProps(originalParams || {})
    },
    destroyed: false,
    isActive: false
  };
  const {
    params
  } = self;
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
      queue.forEach(data => {
        if (typeof data === 'function') {
          data();
        } else {
          const {
            element,
            prop,
            value
          } = data;
          element.style[prop] = value;
        }
      });
      queue.splice(0, queue.length);
      purgeQueue();
    });
  };

  purgeQueue();

  const $setDuration = (element, value) => {
    queue.push({
      element,
      prop: 'transitionDuration',
      value
    });
  };

  const $setEasing = (element, value) => {
    queue.push({
      element,
      prop: 'transitionTimingFunction',
      value
    });
  };

  const $setTransform = (element, value) => {
    queue.push({
      element,
      prop: 'transform',
      value
    });
  };

  const $setOpacity = (element, value) => {
    queue.push({
      element,
      prop: 'opacity',
      value
    });
  };

  const $setOrigin = (element, value) => {
    queue.push({
      element,
      prop: 'transformOrigin',
      value
    });
  };

  const $on = (element, event, handler, props) => element.addEventListener(event, handler, props);

  const $off = (element, event, handler, props) => element.removeEventListener(event, handler, props);

  const createShadow = () => {
    let created;
    shadowEl = $(el, '.atropos-shadow');

    if (!shadowEl) {
      shadowEl = document.createElement('span');
      shadowEl.classList.add('atropos-shadow');
      created = true;
    }

    $setTransform(shadowEl, `translate3d(0,0,-${params.shadowOffset}px) scale(${params.shadowScale})`);

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

  const setChildrenOffset = _ref => {
    let {
      rotateXPercentage = 0,
      rotateYPercentage = 0,
      duration,
      opacityOnly,
      easeOut
    } = _ref;

    const getOpacity = element => {
      if (element.dataset.atroposOpacity && typeof element.dataset.atroposOpacity === 'string') {
        return element.dataset.atroposOpacity.split(';').map(v => parseFloat(v));
      }

      return undefined;
    };

    $$(el, '[data-atropos-offset], [data-atropos-opacity]').forEach(childEl => {
      $setDuration(childEl, duration);
      $setEasing(childEl, easeOut ? 'ease-out' : '');
      const elementOpacity = getOpacity(childEl);

      if (rotateXPercentage === 0 && rotateYPercentage === 0) {
        if (!opacityOnly) $setTransform(childEl, `translate3d(0, 0, 0)`);
        if (elementOpacity) $setOpacity(childEl, elementOpacity[0]);
      } else {
        const childElOffset = parseFloat(childEl.dataset.atroposOffset) / 100;

        if (!Number.isNaN(childElOffset) && !opacityOnly) {
          $setTransform(childEl, `translate3d(${-rotateYPercentage * -childElOffset}%, ${rotateXPercentage * -childElOffset}%, 0)`);
        }

        if (elementOpacity) {
          const [min, max] = elementOpacity;
          const rotatePercentage = Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage));
          $setOpacity(childEl, min + (max - min) * rotatePercentage / 100);
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
    const {
      top,
      left,
      width,
      height
    } = elBoundingClientRect;
    let transformOrigin;

    if (!isMultiple) {
      const centerX = width / 2;
      const centerY = height / 2;
      const coordX = clientX - left;
      const coordY = clientY - top;
      rotateY = params.rotateYMax * (coordX - centerX) / (width / 2) * -1;
      rotateX = params.rotateXMax * (coordY - centerY) / (height / 2);
    } else {
      const {
        top: parentTop,
        left: parentLeft,
        width: parentWidth,
        height: parentHeight
      } = eventsElBoundingClientRect;
      const offsetLeft = left - parentLeft;
      const offsetTop = top - parentTop;
      const centerX = width / 2 + offsetLeft;
      const centerY = height / 2 + offsetTop;
      const coordX = clientX - parentLeft;
      const coordY = clientY - parentTop;
      rotateY = params.rotateYMax * (coordX - centerX) / (parentWidth - width / 2) * -1;
      rotateX = params.rotateXMax * (coordY - centerY) / (parentHeight - height / 2);
      transformOrigin = `${clientX - left}px ${clientY - top}px`;
    }

    rotateX = Math.min(Math.max(-rotateX, -params.rotateXMax), params.rotateXMax);
    if (params.rotateXInvert) rotateX = -rotateX;
    rotateY = Math.min(Math.max(-rotateY, -params.rotateYMax), params.rotateYMax);
    if (params.rotateYInvert) rotateY = -rotateY;
    const rotateXPercentage = rotateX / params.rotateXMax * 100;
    const rotateYPercentage = rotateY / params.rotateYMax * 100;
    const stretchX = (isMultiple ? rotateYPercentage / 100 * params.stretchX : 0) * (params.rotateYInvert ? -1 : 1);
    const stretchY = (isMultiple ? rotateXPercentage / 100 * params.stretchY : 0) * (params.rotateXInvert ? -1 : 1);
    const stretchZ = isMultiple ? Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) / 100 * params.stretchZ : 0;
    $setTransform(rotateEl, `translate3d(${stretchX}%, ${-stretchY}%, ${-stretchZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    if (transformOrigin && params.commonOrigin) {
      $setOrigin(rotateEl, transformOrigin);
    }

    if (highlightEl) {
      $setDuration(highlightEl, `${params.duration}ms`);
      $setEasing(highlightEl, 'ease-out');
      $setTransform(highlightEl, `translate3d(${-rotateYPercentage * 0.25}%, ${rotateXPercentage * 0.25}%, 0)`);
      $setOpacity(highlightEl, Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) / 100);
    }

    setChildrenOffset({
      rotateXPercentage,
      rotateYPercentage,
      duration: `${params.duration}ms`,
      easeOut: true
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

  const onPointerEnter = e => {
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

  const onTouchMove = e => {
    if (isScrolling === false && e.cancelable) {
      e.preventDefault();
    }
  };

  const onPointerMove = e => {
    if (!params.rotate || !self.isActive) return;

    if (e.pointerType !== 'mouse') {
      if (!params.rotateTouch) return;
      e.preventDefault();
    }

    const {
      clientX,
      clientY
    } = e;
    const diffX = clientX - clientXStart;
    const diffY = clientY - clientYStart;

    if (typeof params.rotateTouch === 'string' && (diffX !== 0 || diffY !== 0) && typeof isScrolling === 'undefined') {
      if (diffX * diffX + diffY * diffY >= 25) {
        const touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
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

  const onPointerLeave = e => {
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
    setChildrenOffset({
      duration: `${params.duration}ms`
    });
    self.isActive = false;
    if (typeof params.onRotate === 'function') params.onRotate(0, 0);
    if (typeof params.onLeave === 'function') params.onLeave();
  };

  const onDocumentClick = e => {
    const clickTarget = e.target;

    if (!eventsEl.contains(clickTarget) && clickTarget !== eventsEl && self.isActive) {
      onPointerLeave();
    }
  };

  const initDOM = () => {
    if (typeof el === 'string') {
      el = $(document, el);
    }

    if (!el) return; // eslint-disable-next-line

    if (el.__atropos__) return;

    if (typeof eventsEl !== 'undefined') {
      if (typeof eventsEl === 'string') {
        eventsEl = $(document, eventsEl);
      }
    } else {
      eventsEl = el;
    }

    Object.assign(self, {
      el
    });
    rotateEl = $(el, '.atropos-rotate');
    scaleEl = $(el, '.atropos-scale');
    innerEl = $(el, '.atropos-inner'); // eslint-disable-next-line

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
      setChildrenOffset({
        opacityOnly: true
      });
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
    $off(eventsEl, 'lostpointercapture', onPointerLeave); // eslint-disable-next-line

    delete el.__atropos__;
  };

  self.destroy = destroy;
  init(); // eslint-disable-next-line

  return self;
}




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(7863)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map