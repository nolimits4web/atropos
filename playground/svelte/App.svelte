<div class="container">
  <Atropos class="atropos-banner" highlight={false} on:enter={() => console.log('enter')}>
    <img class="atropos-banner-spacer" src="./i/atropos-bg.svg" alt="" />
    <img data-atropos-offset="-4.5" src="./i/atropos-bg.svg" alt="" />
    <img data-atropos-offset="-2.5" src="./i/atropos-mountains.svg" alt="" />
    <img data-atropos-offset="0" src="./i/atropos-forest-back.svg" alt="" />
    <img data-atropos-offset="2" src="./i/atropos-forest-mid.svg" alt="" />
    <img data-atropos-offset="4" src="./i/atropos-forest-front.svg" alt="" />
    <img data-atropos-offset="5" src="./i/atropos-logo-en.svg" alt="" />
  </Atropos>
</div>

<script>
import Atropos from '../../build/svelte';
</script>
