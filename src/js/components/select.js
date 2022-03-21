export default function initSelect() {
    const select = document.querySelector('#system-type');

    if (select) {
        const parent = select.parentElement;

        // container for title
        const selectTitle = document.createElement('div');
        selectTitle.classList.add('order__select-title', 'order__input');

        // container for other options
        const selectOptions = document.createElement('div');
        selectOptions.classList.add('order__select-options');

        const options = select.querySelectorAll('option');

        // first option for title
        selectTitle.innerText = options[0].text;

        // set up events for title
        selectTitle.addEventListener('click', () => {
            selectTitle.classList.toggle('opened');
            selectOptions.classList.toggle('opened');
        });

        // from 2nd option for other elements
        for (let i = 1; i < options.length; i++) {
            const selectOption = document.createElement('div');
            selectOption.innerText = options[i].text;
            selectOptions.appendChild(selectOption);

            // set up events for options
            selectOption.addEventListener('click', () => {
                if (parent.querySelector('.order__select-options .selected') && parent.querySelector('option.selected')) {
                    parent.querySelector('option.selected').removeAttribute('selected');
                    parent.querySelector('option.selected').classList.remove('selected');
                    parent.querySelector('.order__select-options .selected').classList.remove('selected');
                }
                options[i].classList.add('selected');
                options[i].setAttribute('selected', '');
                selectOption.classList.add('selected');
                selectTitle.innerText = selectOption.textContent;

                selectTitle.classList.toggle('opened');
                selectOptions.classList.toggle('opened');
            });
        }

        console.log(options);

        parent.appendChild(selectTitle);
        parent.appendChild(selectOptions);
    }
}