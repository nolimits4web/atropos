interface CSSSelector extends String {}

export interface MarikoOptions {
  el?: HTMLElement | CSSSelector;
  eventsEl?: HTMLElement | CSSSelector;
  activeOffset?: number;
  shadowOffset?: number;
  shadowScale?: number;
  durationEnter?: number;
  durationLeave?: number;
  rotateLock?: boolean;
  rotate?: boolean;
  rotateTouch?: boolean;
  rotateXMax?: number;
  rotateYMax?: number;
  rotateXInvert?: boolean;
  rotateYInvert?: boolean;
  shadow?: boolean;
  highlight?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onRotate?: (x: number, y: number) => void;
}

export interface MarikoInstance {
  el: HTMLElement;
  isActive: boolean;
  destroyed: boolean;
  params: MarikoOptions;
  destroy: () => void;
}

declare const Mariko: (options: MarikoOptions) => MarikoInstance;

export default Mariko;
export { Mariko };
