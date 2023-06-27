import * as React from 'react';

// prettier-ignore
import type { AtroposOptions } from './atropos.d.ts';

interface Atropos extends AtroposOptions {
  component?: string;
  rootChildren?: React.ReactNode;
  scaleChildren?: React.ReactNode;
  rotateChildren?: React.ReactNode;
  scaleClassName?: string;
  rotateClassName?: string;
  innerClassName?: string;
}

interface Atropos extends React.HTMLAttributes<HTMLElement> {}

declare const Atropos: React.FunctionComponent<Atropos>;

export { Atropos };
export default Atropos;
