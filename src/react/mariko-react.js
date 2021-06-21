import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line
import MarikoCore from '../esm/mariko.esm.js';

const paramsKeys = [
  'activeOffset',
  'shadowOffset',
  'shadowScale',
  'durationEnter',
  'durationLeave',
  'rotateLock',
  'rotate',
  'rotateTouch',
  'maxRotateX',
  'maxRotateY',
  'invertRotateX',
  'invertRotateY',
  'shadow',
  'highlight',
  'onEnter',
  'onLeave',
];

const removeParamsKeys = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (!paramsKeys.includes(key)) result[key] = obj[key];
  });
  return result;
};

const extractParamsKeys = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (paramsKeys.includes(key)) result[key] = obj[key];
  });
  return result;
};

function Mariko(props) {
  const {
    component = 'div',
    children,
    scaleChildren,
    rotateChildren,
    className = '',
    scaleClassName = '',
    rotateClassName = '',
    innerClassName = '',

    ...rest
  } = props;

  const elRef = useRef(null);
  const marikoRef = useRef(null);

  const Component = component;

  const cls = (...args) => {
    return args.filter((c) => !!c).join(' ');
  };

  const init = () => {
    marikoRef.current = MarikoCore({
      el: elRef.current,
      ...extractParamsKeys(props),
    });
  };

  const destroy = () => {
    if (marikoRef.current) {
      marikoRef.current.destroy();
      marikoRef.current = null;
    }
  };

  useEffect(() => {
    if (elRef.current) {
      init();
    }

    return () => {
      destroy();
    };
  }, []);

  useEffect(() => {
    if (marikoRef.current) {
      marikoRef.current.params.onEnter = props.onEnter;
      marikoRef.current.params.onLeave = props.onLeave;
    }
    return () => {
      if (marikoRef.current) {
        marikoRef.current.params.onEnter = null;
        marikoRef.current.params.onLeave = null;
      }
    };
  });

  return (
    <Component className={cls('mariko', className)} {...removeParamsKeys(rest)} ref={elRef}>
      <span className={cls('mariko-scale', scaleClassName)}>
        <span className={cls('mariko-rotate', rotateClassName)}>
          <span className={cls('mariko-inner', innerClassName)}>
            {children}
            {(props.highlight || typeof props.highlight === 'undefined') && (
              <span className="mariko-highlight" />
            )}
          </span>
          {rotateChildren}
          {(props.shadow || typeof props.shadow === 'undefined') && (
            <span className="mariko-shadow" />
          )}
        </span>
        {scaleChildren}
      </span>
    </Component>
  );
}

export default Mariko;
export { Mariko };
