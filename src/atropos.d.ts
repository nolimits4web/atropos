interface CSSSelector extends String {}

export interface AtroposOptions {
  el?: HTMLElement | CSSSelector;
  eventsEl?: HTMLElement | CSSSelector;
  activeOffset?: number;
  shadowOffset?: number;
  shadowScale?: number;
  durationEnter?: number;
  durationLeave?: number;
  rotateLock?: boolean;
  rotate?: boolean;
  rotateTouch?: boolean | 'scroll-x' | 'scroll-y';
  rotateXMax?: number;
  rotateYMax?: number;
  rotateXInvert?: boolean;
  rotateYInvert?: boolean;
  stretchX?: number;
  stretchY?: number;
  shadow?: boolean;
  highlight?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onRotate?: (x: number, y: number) => void;
}

export interface AtroposInstance {
  el: HTMLElement;
  isActive: boolean;
  destroyed: boolean;
  params: AtroposOptions;
  destroy: () => void;
}

declare const Atropos: (options: AtroposOptions) => AtroposInstance;

export default Atropos;
export { Atropos };
