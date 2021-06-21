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
    maxRotateX: { type: Boolean, default: undefined },
    maxRotateY: { type: Boolean, default: undefined },
    invertRotateX: { type: Boolean, default: undefined },
    invertRotateY: { type: Boolean, default: undefined },
    shadow: { type: Boolean, default: undefined },
    highlight: { type: Boolean, default: undefined },
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
          class: 'marko',
          ref: elRef,
        },
        h('span', { class: cls('mariko-scale', props.scaleClass) }, [
          h('span', { class: cls('mariko-rotate', props.rotateClass) }, [
            h('span', { class: cls('mariko-inner', props.innerClass) }, [
              slots.default && slots.default(),
              props.highlight && h('span', { class: 'marko-highlight' }),
            ]),
            slots.rotate && slots.rotate(),
            props.shadow && h('span', { class: 'marko-shadow' }),
          ]),
          slots.scale && slots.scale(),
        ]),
      );
  },
};

export default Mariko;
export { Mariko };
