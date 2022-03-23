export default class Popup {

    constructor(el) {
        this.el = el;
        this.popUp = document.getElementById(this.el);
        this.closeBtn = this.popUp.querySelector('.pop-up__close');
        this.links = this.popUp.querySelectorAll('a[data-type="anchor"]');

        document.querySelectorAll('[data-for="pop-up"]').forEach(button => {
            if (button.dataset.target == this.el) {
                this.openBtn = button;
            }
        });
        if (!this.openBtn) {
            console.error(this.popUp, 'has no open button');
        } else {
            if (!this.closeBtn) {
                // same button
                this.closeBtn = this.openBtn;
                this.closeBtn.setAttribute('data-state', 'closed');
                this.openBtn.addEventListener('click', () => {
                    this.toggle(this.popUp);
                });
            } else {
                this.openBtn.addEventListener('click', () => {
                    this.show(this.popUp);
                });
                this.closeBtn.addEventListener('click', () => {
                    this.hide(this.popUp);
                });
            }
        }

        this.links.forEach((link) => {
            link.addEventListener('click', () => {
                const menuBtn = document.querySelector('.header__menu-button');
                if (menuBtn) {
                    menuBtn.classList.toggle('header__menu-button_opened');
                }
                this.toggle(this.popUp);
            });
        });
    }

    toggle(popUp) {
        if (this.closeBtn.dataset.state == 'closed') {
            popUp.classList.add('visible');
            document.body.classList.add('fixed');
            this.closeBtn.setAttribute('data-state', 'opened');
        } else {
            popUp.classList.remove('visible');
            document.body.classList.remove('fixed');
            this.closeBtn.setAttribute('data-state', 'closed');
        }
    }

    show(popUp) {
        popUp.classList.add('visible');
        document.body.classList.add('fixed');
    }

    hide(popUp) {
        popUp.classList.remove('visible');
        document.body.classList.remove('fixed');
    }
}