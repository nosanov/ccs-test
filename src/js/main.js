import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Header from './components/header';
import Popup from './components/pop-up';
import Anchor from './components/anchor';
import { initOwlCarousel } from './components/owl';
import initLazyload from '../../../test-layout/src/js/components/lazyload';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // console.warn('loaded');
});

document.addEventListener('DOMContentLoaded', () => {
    // console.warn('DOMContentLoaded');

    // init pop-ups
    document.querySelectorAll('[data-for="pop-up"]').forEach(button => {
        const popUp = new Popup(button.dataset.target);
    });

    // init header
    const header = new Header('#header');

    // init forms
    // const form = new Form('#form-0');

    // init anchors
    const link = new Anchor('[data-type="anchor"]');

    // init carousel
    // initOwlCarousel();

    // load images
    initLazyload();
});