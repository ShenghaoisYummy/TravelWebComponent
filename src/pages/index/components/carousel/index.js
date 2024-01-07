import './carousel.css';
import './btn.css';

import Slider from './module'

const slider = new Slider(document.querySelector('.carousel'));

const leftbtnEl = document.getElementById('left_btn');
const rightbtnEl = document.getElementById('right_btn');
const bannerEl = document.querySelector('.carousel');

leftbtnEl.addEventListener('click', () => {

    slider.prev();

}, false);

rightbtnEl.addEventListener('click', () => {

    slider.next();

}, false);

bannerEl.addEventListener('mouseleave', () =>{

    slider.autoplay();
},false)

bannerEl.addEventListener('mouseenter', () =>{

    slider.pause();
}, false)
