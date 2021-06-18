/* eslint-disable */
import Mariko from '../../build/mariko.esm';
import '../../build/mariko.css';

Mariko({
  el: document.querySelectorAll('.mariko')[0],
});
Mariko({
  el: document.querySelectorAll('.mariko')[1],
});
Mariko({
  el: document.querySelectorAll('.mariko')[2],
});

document.querySelectorAll('li').forEach((el) => {
  Mariko({
    el,
    activeOffset: 100,
    maxRotateX: 20,
    maxRotateY: 20,
  });
});
