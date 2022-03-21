export default class Anchor {

    constructor(el) {
        this.link = document.querySelector(el);

        // standard or advanced
        this.headerBehaviour = 'advanced';
        this.animationDuration = 600;

        this.init();
    }

    init() {
        if (this.link) {
            this.link.addEventListener('click', (ev) => {
                ev.preventDefault();

                const target = document.querySelector(this.link.getAttribute('href'));

                if (target) {
                    header.classList.add('header--freezed');

                    const headerHeight = document.querySelector('header').getBoundingClientRect().height;
                    const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: offset,
                        behaviour: 'smooth'
                    });
                    setTimeout(() => {
                        header.classList.remove('header--freezed');
                    }, this.animationDuration);
                } else {
                    console.error('Anchor\'s target not found!');
                }
            });
        }
    }
}