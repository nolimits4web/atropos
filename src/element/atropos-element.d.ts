// prettier-ignore
import type { AtroposInstance } from './atropos.d.ts';

// prettier-ignore
interface AtroposEventMap extends Omit<HTMLElementEventMap, 'enter' | 'leave' | 'rotate'> {
  enter: CustomEvent;
  leave: CustomEvent;
  rotate: CustomEvent;
}
interface AtroposComponent extends HTMLElement {
  atroposRef?: AtroposInstance;
  eventsEl?: HTMLElement | CSSSelector;
  alwaysActive?: boolean;
  activeOffset?: number;
  shadowOffset?: number;
  shadowScale?: number;
  duration?: number;
  rotate?: boolean;
  rotateTouch?: boolean | 'scroll-x' | 'scroll-y';
  rotateXMax?: number;
  rotateYMax?: number;
  rotateXInvert?: boolean;
  rotateYInvert?: boolean;
  stretchX?: number;
  stretchY?: number;
  stretchZ?: number;
  commonOrigin?: boolean;
  shadow?: boolean;
  highlight?: boolean;
  addEventListener<K extends keyof AtroposEventMap>(
    type: K,
    listener: (this: AtroposComponent, ev: AtroposEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof AtroposEventMap>(
    type: K,
    listener: (this: AtroposComponent, ev: AtroposEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

export default AtroposComponent;
