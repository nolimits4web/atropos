import React, { useState } from 'react';
import Mariko from '../../build/react';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <p
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 1000 }}
        onClick={() => setCount(count + 1)}
      >
        {count}
      </p>
      <Mariko className="mariko-banner" onEnter={() => console.log('enter', count)}>
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
