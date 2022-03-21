export default class Form {

    constructor(el) {
        this.el = el;
        this.form = document.querySelector(this.el);

        this.form.addEventListener('submit', (evt) => {
            this.send(evt);
        });
    }

    send(evt) {
        evt.preventDefault();
    }
}