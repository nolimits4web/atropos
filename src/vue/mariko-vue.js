import { ref, h, onMounted, onBeforeUnmount } from 'vue';
// eslint-disable-next-line
import MarikoCore from '../esm/mariko.esm.js';

const Mariko = {
  props: {
    component: { type: String, default: 'div' },
    innerClass: String,
    scaleClass: String,
    rotateClass: String,

    eventsEl: { type: [String, Object], default: undefined },
    activeOffset: { type: Boolean, default: undefined },
    shadowOffset: { type: Boolean, default: undefined },
    shadowScale: { type: Boolean, default: undefined },
    durationEnter: { type: Boolean, default: undefined },
    durationLeave: { type: Boolean, default: undefined },
    rotateLock: { type: Boolean, default: undefined },
    rotate: { type: Boolean, default: undefined },
    rotateTouch: { type: Boolean, default: undefined },
    rotateXMax: { type: Boolean, default: undefined },
    rotateYMax: { type: Boolean, default: undefined },
    rotateXInvert: { type: Boolean, default: undefined },
    rotateYInvert: { type: Boolean, default: undefined },
    shadow: { type: Boolean, default: true },
    highlight: { type: Boolean, default: true },
  },
  emits: ['enter', 'leave'],
  setup(props, ctx) {
    const elRef = ref(null);
    const marikoRef = ref(null);
    const { slots, emit } = ctx;

    const init = () => {
      marikoRef.value = MarikoCore({
        el: elRef.value,
        ...props,
        onEnter() {
          emit('enter');
        },
        onLeave() {
          emit('leave');
        },
      });
    };

    const destroy = () => {
      if (marikoRef.value) {
        marikoRef.value.destroy();
        marikoRef.value = null;
      }
    };

    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      destroy();
    });

    const cls = (...args) => {
      return args.filter((c) => !!c).join(' ');
    };

    return () =>
      h(
        props.component,
        {
          class: 'mariko',
          ref: elRef,
        },
        [
          h('span', { class: cls('mariko-scale', props.scaleClass) }, [
            h('span', { class: cls('mariko-rotate', props.rotateClass) }, [
              h('span', { class: cls('mariko-inner', props.innerClass) }, [
                slots.default && slots.default(),
                props.highlight && h('span', { class: 'mariko-highlight' }),
              ]),
              slots.rotate && slots.rotate(),
              props.shadow && h('span', { class: 'mariko-shadow' }),
            ]),
            slots.scale && slots.scale(),
          ]),
          slots.root && slots.root(),
        ],
      );
  },
};

export default Mariko;
export { Mariko };
