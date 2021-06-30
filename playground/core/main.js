/* eslint-disable */
import Mariko from '../../build/esm/mariko.esm';
import '../../build/mariko.css';

window.mariko = new Mariko({
  el: document.querySelectorAll('.mariko')[0],
  shadowScale: 1.05,
});
