export default class Form {

    constructor(el) {
        this.el = el;
        this.form = document.querySelector(this.el);

        this.form.addEventListener('submit', (evt) => {
            this.send(evt);
        });

        this.setInputListeners();
        this.setRange();
    }

    setInputListeners() {
        const textInputs = this.form.querySelectorAll('.order__input');
        const fileInput = this.form.querySelector('.order__file label');

        textInputs.forEach((input) => {
            const label = input.parentElement.querySelector('label');

            input.addEventListener('focus', () => {
                label.classList.add('hidden');
            });

            input.addEventListener('blur', () => {
                if(input.value.length < 1) {
                    label.classList.remove('hidden');
                }
            });

            input.addEventListener('keyup', () => {
                input.classList.remove('invalid');
            });
        });

        // remove red border when click on button
        fileInput.addEventListener('click', () => {
            fileInput.classList.remove('invalid');
        });
    }

    setRange() {
        const range = this.form.querySelector('.order__input-range');
        const valueField = this.form.querySelector('#range__value');
        valueField.innerText = range.value + '%';

        range.addEventListener('input', () => {
            valueField.innerText = range.value + '%';
        });
    }

    send(evt) {
        evt.preventDefault();

        let data = {};

        function showWrongField(input) {
            input.classList.add('invalid');
        }
        function resetWrongField(input) {
            input.classList.remove('invalid');
        }

        const type = this.form.querySelector('option[selected]');
        const typeCustom = this.form.querySelector('.order__select-title');
        const email = this.form.querySelector('input[name="email"]');
        const emailValue = email.value;
        const name = this.form.querySelector('input[name="name"]');
        const nameValue = name.value;
        const range = this.form.querySelector('input[name="range"]');
        const rangeValue = range.value + '%';
        const file = this.form.querySelector('input[name="file"]');
        const fileBtn = this.form.querySelector('.order__file label');
        const fileValue = file.files[0];

        function checkSelect() {
            if (type) {
                resetWrongField(typeCustom);
                return true;
            }
            showWrongField(typeCustom);
            return false;
        }
        function checkName() {
            if (nameValue.length > 0) return true;
            showWrongField(name);
            return false;
        }
        function checkEmail() {
            const validString = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const isValid = new RegExp(validString);
            
            if (isValid.test(emailValue)) return true;
            showWrongField(email);
            return false;
        }
        function checkFile() {
            if (fileValue) {
                resetWrongField(fileBtn);
                return true;
            }
            showWrongField(fileBtn);
            return false;
        }

        if (checkSelect() && checkEmail() && checkName() && checkFile()) {
            data.type = type.value;
            data.name = nameValue;
            data.email = emailValue;
            data.range = rangeValue;
            data.file = fileValue;

            console.log('data is: ', data);
        }
    }
}