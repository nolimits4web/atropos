import React from 'react';
import Atropos from '../../build/atropos-react.mjs';

const App = () => {
  return (
    <div className="container">
      <Atropos className="atropos-banner" highlight={false} onEnter={() => console.log('enter')}>
        <img className="atropos-banner-spacer" src="./i/atropos-bg.svg" alt="" />
        <img data-atropos-offset="-4.5" src="./i/atropos-bg.svg" alt="" />
        <img data-atropos-offset="-2.5" src="./i/atropos-mountains.svg" alt="" />
        <img data-atropos-offset="0" src="./i/atropos-forest-back.svg" alt="" />
        <img data-atropos-offset="2" src="./i/atropos-forest-mid.svg" alt="" />
        <img data-atropos-offset="4" src="./i/atropos-forest-front.svg" alt="" />
        <img data-atropos-offset="5" src="./i/atropos-logo-en.svg" alt="" />
      </Atropos>
    </div>
  );
};

export default App;
