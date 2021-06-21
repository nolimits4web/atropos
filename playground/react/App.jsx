import React from 'react';
import Mariko from '../../build/react';

const App = () => {
  return (
    <div className="container">
      <Mariko className="mariko-banner" onEnter={() => console.log('enter')}>
        <img className="mariko-banner-spacer" src="./i/mariko-bg.svg" alt="" />
        <img data-mariko-offset="-4.5" src="./i/mariko-bg.svg" alt="" />
        <img data-mariko-offset="-2.5" src="./i/mariko-mountains.svg" alt="" />
        <img data-mariko-offset="0" src="./i/mariko-forest-back.svg" alt="" />
        <img data-mariko-offset="2" src="./i/mariko-forest-mid.svg" alt="" />
        <img data-mariko-offset="4" src="./i/mariko-forest-front.svg" alt="" />
        <img data-mariko-offset="4.5" src="./i/mariko-logo-en.svg" alt="" />
        <img data-mariko-offset="5" src="./i/mariko-logo-jp.svg" alt="" />
      </Mariko>
    </div>
  );
};

export default App;
