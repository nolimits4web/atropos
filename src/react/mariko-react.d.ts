import * as React from 'react';

import { MarikoOptions } from '../';

interface Mariko extends MarikoOptions {
  component?: string;
  rootChildren?: React.ReactNode;
  scaleChildren?: React.ReactNode;
  rotateChildren?: React.ReactNode;
  scaleClassName?: string;
  rotateClassName?: string;
  innerClassName?: string;
}

interface Mariko extends React.HTMLAttributes<HTMLElement> {}

declare const Mariko: React.FunctionComponent<Mariko>;

export { Mariko };
export default Mariko;
