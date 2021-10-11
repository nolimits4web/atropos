import { SvelteComponentTyped } from 'svelte';

import { AtroposOptions } from '../';

interface AtroposProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {}
interface AtroposProps extends AtroposOptions {}

declare class Atropos extends SvelteComponentTyped<
  AtroposProps,
  {
    enter: CustomEvent<void>;
    leave: CustomEvent<void>;
    rotate: CustomEvent<[x: number, y: number]>;
  },
  { default: {}; rotate: {}; scale: {}; root: {} }
> {}

export default Atropos;
