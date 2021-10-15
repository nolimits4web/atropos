<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  // eslint-disable-next-line
  import AtroposCore from '../esm/atropos.esm.js';
  let className = '';
  export { className as class };
  export let scaleClass = '';
  export let rotateClass = '';
  export let innerClass = '';

  export let eventsEl = undefined;
  export let alwaysActive = undefined;
  export let activeOffset = undefined;
  export let shadowOffset = undefined;
  export let shadowScale = undefined;
  export let duration = undefined;
  export let rotate = undefined;
  export let rotateTouch = undefined;
  export let rotateXMax = undefined;
  export let rotateYMax = undefined;
  export let rotateXInvert = undefined;
  export let rotateYInvert = undefined;
  export let stretchX = undefined;
  export let stretchY = undefined;
  export let stretchZ = undefined;
  export let commonOrigin = true;
  export let shadow = true;
  export let highlight = true;

  const emit = createEventDispatcher();

  let elRef = null;
  let atroposRef = null;

  const cls = (...args) => {
    return args.filter((c) => !!c).join(' ');
  };

  const init = () => {
    atroposRef = AtroposCore({
      el: elRef,
      eventsEl,
      alwaysActive,
      activeOffset,
      shadowOffset,
      shadowScale,
      duration,
      rotate,
      rotateTouch,
      rotateXMax,
      rotateYMax,
      rotateXInvert,
      rotateYInvert,
      stretchX,
      stretchY,
      stretchZ,
      commonOrigin,
      onEnter() {
        emit('enter');
      },
      onLeave() {
        emit('leave');
      },
      onRotate(...args) {
        emit('rotate', args);
      },
    });
  };

  const destroy = () => {
    if (atroposRef) {
      atroposRef.destroy();
      atroposRef = null;
    }
  };

  onMount(() => {
    init();
  });
  onDestroy(() => {
    destroy();
  });
</script>

<div class={cls('atropos', className)} {...$$restProps} bind:this={elRef}>
  <span class={cls('atropos-scale', scaleClass)}>
    <span class={cls('atropos-rotate', rotateClass)}>
      <span class={cls('atropos-inner', innerClass)}>
        <slot />
        {#if highlight || typeof highlight === 'undefined'}
          <span class="atropos-highlight" />
        {/if}
      </span>
      <slot name="rotate" />
      {#if shadow || typeof shadow === 'undefined'}
        <span class="atropos-shadow" />
      {/if}
    </span>
    <slot name="scale" />
  </span>
  <slot name="root" />
</div>
