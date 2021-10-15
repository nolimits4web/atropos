import React from 'react';
import Atropos from '../../build/react';

const App = () => {
  return (
    <div className={`atropos-multiple`}>
      {Array.from({ length: 9 }).map((_, index) => {
        const row = Math.floor(index / 3);
        const col = index - row * 3;
        return (
          <Atropos
            // eslint-disable-next-line
            key={index}
            eventsEl=".atropos-multiple"
            rotateTouch="scroll-y"
            rotateXMax={10}
            rotateYMax={10}
            shadowOffset={100}
            rotateXInvert={true}
            rotateYInvert={true}
            stretchX={20}
            stretchY={30}
            duration={400}
            data-index={index}
          >
            <div
              data-atropos-offset="8"
              className="atropos-multiple-bg"
              style={{ backgroundPosition: `${-col * 105}% ${-row * 105}%` }}
            />
          </Atropos>
        );
      })}
    </div>
  );
};

export default App;
