import Header from './components/header';
import Popup from './components/pop-up';
import Anchor from './components/anchor';
import { initOwlCarousel } from './components/owl';
import initLazyload from '../../../test-layout/src/js/components/lazyload';
import initSelect from './components/select';
import Form from './components/form';

document.addEventListener('DOMContentLoaded', () => {
    // init pop-ups
    document.querySelectorAll('[data-for="pop-up"]').forEach(button => {
        const popUp = new Popup(button.dataset.target);
    });

    // init header
    const header = new Header('#header');

    // init forms
    const form = new Form('#order__form');

    // init anchors
    const link = new Anchor('[data-type="anchor"]');

    // init carousel
    initOwlCarousel();

    // load images
    initLazyload();

    // init select
    initSelect();
});