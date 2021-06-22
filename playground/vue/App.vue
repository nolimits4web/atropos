<template>
  <div class="container">
    <Mariko class="mariko-banner" @enter="onEnter">
      <img class="mariko-banner-spacer" src="./i/mariko-bg.svg" alt="" />
      <img data-mariko-offset="-4.5" src="./i/mariko-bg.svg" alt="" />
      <img data-mariko-offset="-2.5" src="./i/mariko-mountains.svg" alt="" />
      <img data-mariko-offset="0" src="./i/mariko-forest-back.svg" alt="" />
      <img data-mariko-offset="2" src="./i/mariko-forest-mid.svg" alt="" />
      <img data-mariko-offset="4" src="./i/mariko-forest-front.svg" alt="" />
      <img data-mariko-offset="4.5" src="./i/mariko-logo-en.svg" alt="" />
      <img data-mariko-offset="5" src="./i/mariko-logo-jp.svg" alt="" />
    </Mariko>
  </div>
</template>
<script>
import Mariko from '../../build/vue';

export default {
  components: {
    Mariko,
  },

  setup() {
    const onEnter = () => {
      console.log('Enter');
    };
    return {
      onEnter,
    };
  },
};
</script>
