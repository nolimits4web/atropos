import { ComponentOptionsMixin, DefineComponent } from 'vue';

declare const Atropos: DefineComponent<
  {
    component: {
      type: StringConstructor;
      default: string;
    };
    innerClass: { type: StringConstructor; default: undefined };
    scaleClass: { type: StringConstructor; default: undefined };
    rotateClass: { type: StringConstructor; default: undefined };

    eventsEl: { type: StringConstructor | HTMLElement; default: undefined };
    activeOffset: { type: NumberConstructor; default: undefined };
    shadowOffset: { type: NumberConstructor; default: undefined };
    shadowScale: { type: NumberConstructor; default: undefined };
    duration: { type: NumberConstructor; default: undefined };
    rotate: { type: BooleanConstructor; default: undefined };
    rotateTouch: { type: BooleanConstructor | StringConstructor; default: undefined };
    rotateXMax: { type: NumberConstructor; default: undefined };
    rotateYMax: { type: NumberConstructor; default: undefined };
    rotateXInvert: { type: BooleanConstructor; default: undefined };
    rotateYInvert: { type: BooleanConstructor; default: undefined };
    stretchX: { type: NumberConstructor; default: undefined };
    stretchY: { type: NumberConstructor; default: undefined };
    shadow: { type: BooleanConstructor; default: true };
    highlight: { type: BooleanConstructor; default: true };
  },
  () => JSX.Element,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {
    enter: () => void;
    leave: () => void;
    rotate: (x: number, y: number) => void;
  }
>;

export { Atropos };
export default Atropos;
