import './style.css';
import Lenis from '@studio-freight/lenis';

const slides = document.querySelectorAll('.slide');
const slideMasks = document.querySelectorAll('.slideMask');
const slideWrapper = document.querySelector('.slides-wrapper');

const slide1 = slides[0];
const slide2 = slides[1];
const slide3 = slides[2];
const slide4 = slides[3];
const slideMask1 = slideMasks[0];
const slideMask2 = slideMasks[1];
const slideMask3 = slideMasks[2];
const slideMask4 = slideMasks[3];

const num = 3;

const doSomething = (progress) => {
  slides.forEach((slide, i) => {
    slides[i].style.transform = `translate(0,-${
      progress * slideWrapper.offsetHeight * num
    }px)`;

    slideMasks[i].style.transform = `translate(0, calc(-${
      slideWrapper.offsetHeight * i
    }px + ${progress * slideWrapper.offsetHeight * num}px))`;
  });
};

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

//get scroll value
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  doSomething(progress);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
