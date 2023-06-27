import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line
import AtroposCore from './atropos.mjs';

const paramsKeys = [
  'eventsEl',
  'alwaysActive',
  'activeOffset',
  'shadowOffset',
  'shadowScale',
  'duration',
  'rotate',
  'rotateTouch',
  'rotateXMax',
  'rotateYMax',
  'rotateXInvert',
  'rotateYInvert',
  'stretchX',
  'stretchY',
  'stretchZ',
  'commonOrigin',
  'shadow',
  'highlight',
  'onEnter',
  'onLeave',
  'onRotate',
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

function Atropos(props) {
  const {
    component = 'div',
    children,
    rootChildren,
    scaleChildren,
    rotateChildren,
    className = '',
    scaleClassName = '',
    rotateClassName = '',
    innerClassName = '',

    ...rest
  } = props;

  const elRef = useRef(null);
  const atroposRef = useRef(null);

  const Component = component;

  const cls = (...args) => {
    return args.filter((c) => !!c).join(' ');
  };

  const init = () => {
    atroposRef.current = AtroposCore({
      el: elRef.current,
      ...extractParamsKeys(props),
    });
  };

  const destroy = () => {
    if (atroposRef.current) {
      atroposRef.current.destroy();
      atroposRef.current = null;
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
    if (atroposRef.current) {
      atroposRef.current.params.onEnter = props.onEnter;
      atroposRef.current.params.onLeave = props.onLeave;
      atroposRef.current.params.onRotate = props.onRotate;
    }
    return () => {
      if (atroposRef.current) {
        atroposRef.current.params.onEnter = null;
        atroposRef.current.params.onLeave = null;
        atroposRef.current.params.onRotate = null;
      }
    };
  });

  return (
    <Component className={cls('atropos', className)} {...removeParamsKeys(rest)} ref={elRef}>
      <span className={cls('atropos-scale', scaleClassName)}>
        <span className={cls('atropos-rotate', rotateClassName)}>
          <span className={cls('atropos-inner', innerClassName)}>
            {children}
            {(props.highlight || typeof props.highlight === 'undefined') && (
              <span className="atropos-highlight" />
            )}
          </span>
          {rotateChildren}
          {(props.shadow || typeof props.shadow === 'undefined') && (
            <span className="atropos-shadow" />
          )}
        </span>
        {scaleChildren}
      </span>
      {rootChildren}
    </Component>
  );
}

export default Atropos;
export { Atropos };
