export default class Header {

    constructor(el) {
        this.el = el;
        this.header = document.querySelector(this.el);

        this.init();
    }

    init() {
        if (this.header) {
            const behaviour = this.header.dataset.behaviour;

            switch(behaviour) {
                case 'standard':
                    this.initStandardBehaviour();
                    break;
                case 'fixed':
                    // nothing to do, just css-fixed header
                    break;
                default:
                    this.initStandardBehaviour();
            }

            this.changeMenuBtnState();
        }
    }

    /*
    ** when scroll down we should hide 'header'
    */
    initStandardBehaviour() {
        let prev_scroll_position = 0;
        let last_known_scroll_position = 0;
        let ticking = false;

        function toggleHeader(last_scroll_pos, prev_scroll_pos) {
            if (!header.classList.contains('header--freezed')) {
                if (last_scroll_pos > prev_scroll_pos) {
                    // scrolled down
                    header.classList.add('header--collapsed');
                } else {
                    // scrolled up
                    header.classList.remove('header--collapsed');
                }
                prev_scroll_position = last_known_scroll_position;
            }
        }

        window.addEventListener('scroll', (ev) => {
            last_known_scroll_position = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    toggleHeader(last_known_scroll_position, prev_scroll_position);
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    /*
    ** change state for menu button
    */
    changeMenuBtnState() {
        const menuBtn = this.header.querySelector('.header__menu-button');

        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('header__menu-button_opened');
            })
        }
    }
}