interface CSSSelector extends String {}

export interface AtroposOptions {
  el?: HTMLElement | CSSSelector;
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
