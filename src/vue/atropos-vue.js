import { ref, h, onMounted, onBeforeUnmount } from 'vue';
// eslint-disable-next-line
import AtroposCore from '../esm/atropos.esm.js';

const Atropos = {
  props: {
    component: { type: String, default: 'div' },
    innerClass: String,
    scaleClass: String,
    rotateClass: String,

    eventsEl: { type: [String, Object], default: undefined },
    activeOffset: { type: Number, default: undefined },
    shadowOffset: { type: Number, default: undefined },
    shadowScale: { type: Number, default: undefined },
    durationEnter: { type: Number, default: undefined },
    durationLeave: { type: Number, default: undefined },
    rotateLock: { type: Boolean, default: undefined },
    rotate: { type: Boolean, default: undefined },
    rotateTouch: { type: Boolean, default: undefined },
    rotateXMax: { type: Number, default: undefined },
    rotateYMax: { type: Number, default: undefined },
    rotateXInvert: { type: Boolean, default: undefined },
    rotateYInvert: { type: Boolean, default: undefined },
    stretchX: { type: Number, default: undefined },
    stretchY: { type: Number, default: undefined },
    shadow: { type: Boolean, default: true },
    highlight: { type: Boolean, default: true },
  },
  emits: ['enter', 'leave', 'rotate'],
  setup(props, ctx) {
    const elRef = ref(null);
    const atroposRef = ref(null);
    const { slots, emit } = ctx;

    const init = () => {
      atroposRef.value = AtroposCore({
        el: elRef.value,
        ...props,
        onEnter() {
          emit('enter');
        },
        onLeave() {
          emit('leave');
        },
        onRotate(...args) {
          emit('rotate', ...args);
        },
      });
    };

    const destroy = () => {
      if (atroposRef.value) {
        atroposRef.value.destroy();
        atroposRef.value = null;
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
          class: 'atropos',
          ref: elRef,
        },
        [
          h('span', { class: cls('atropos-scale', props.scaleClass) }, [
            h('span', { class: cls('atropos-rotate', props.rotateClass) }, [
              h('span', { class: cls('atropos-inner', props.innerClass) }, [
                slots.default && slots.default(),
                props.highlight && h('span', { class: 'atropos-highlight' }),
              ]),
              slots.rotate && slots.rotate(),
              props.shadow && h('span', { class: 'atropos-shadow' }),
            ]),
            slots.scale && slots.scale(),
          ]),
          slots.root && slots.root(),
        ],
      );
  },
};

export default Atropos;
export { Atropos };
