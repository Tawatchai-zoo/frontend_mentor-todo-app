import desktopDark from 'url:../images/bg-desktop-dark.jpg';
import desktopLight from 'url:../images/bg-desktop-light.jpg';
import mobileDark from 'url:../images/bg-mobile-dark.jpg';
import mobileLight from 'url:../images/bg-mobile-light.jpg';

import iconCheck from 'url:../images/icon-check.svg';
import iconCross from 'url:../images/icon-cross.svg';

class View {
    constructor() {
        this.generateMarkupFnBar();
    }

    _itemContainer = document.querySelector('.item-container');
    _container = document.querySelector('.container');
    _formInput = document.querySelector('.form-input');
    _output = document.querySelector('.output');
    // _countItem = document.querySelector('.count-item');
    // _btnSort = document.querySelectorAll('.btn--sort');
    // _btnSortContainer = document.querySelector('.btn--sort-container');
    // _btnClearCompleted = document.querySelector('.btn--clear');
    _btnToggle = document.querySelector('.toggle');
    _btnToggleImg = document.querySelectorAll('.toggle img');
    _bgImg = {
        desktop: {
            dark: desktopDark,
            light: desktopLight,
        },
        mobile: {
            dark: mobileDark,
            light: mobileLight,
        },
    };
    _fnItem = document.querySelector('.fn-item');

    curActive() {
        const curView = document.querySelector('.active');
        return curView.dataset.sort;
    }

    generateMarkup(data) {
        if (!data) return;

        const markup = `
            <li class="item" draggable="true" data-id="${data.id}">
                <input id="${data.id}" class="input-checkbox" type="checkbox" 
                ${data.completed ? 'checked' : ''}>
                <div class="checkbox-wraper">
                    <span class="check"><img src="${iconCheck}" alt=""></span>
                    <span class="checkbox--fill-layer"></span>
                </div>
                <label for="${data.id}">${data.listName}</label>
                <img class="btn--cross" src="${iconCross}" alt="">
            </li>
        `;
        this._itemContainer.insertAdjacentHTML('afterbegin', markup);
    }

    generateMarkupFnBar() {
        const markup = `
            <div class="btn--sort-container">
                <div class="btn--sort active" data-sort="all">All</div>
                <div class="btn--sort" data-sort="active">Active</div>
                <div class="btn--sort btn--show-completed" data-sort="completed">Completed</div>
            </div>
        `;
        const markupContainer = `
            <div class="fn-item">
                <div class="count-item"></div>
                ${screen.width > 800 ? markup : ''}
                <div class="btn--clear">Clear Completed</div>
            </div>
        `;
        this._itemContainer.insertAdjacentHTML('afterend', markupContainer);

        if (screen.width > 800) return;

        this._output.insertAdjacentHTML('afterend', markup);
    }

    addHandlerToggleTheme() {
        this._btnSortContainer = document.querySelector('.btn--sort-container');

        this._btnToggle.addEventListener('click', e => {
            this._btnToggleImg.forEach(el => el.classList.toggle('hidden'));
            this._formInput.classList.toggle('white');
            this._output.classList.toggle('white');
            if (screen.width <= 800)
                this._btnSortContainer.classList.toggle('white');

            const viewPortMode = screen.width > 1000 ? 'desktop' : 'mobile';
            const [color, bgColor] = this._output.classList.contains('white')
                ? ['light', 'hsl(236, 33%, 92%)']
                : ['dark', 'hsl(235, 21%, 11%)'];
            document.body.style.backgroundImage = `url(${this._bgImg[viewPortMode][color]})`;
            document.body.style.backgroundColor = bgColor;
        });
    }

    addHandlerAddTodo(handler) {
        this._formInput.addEventListener('submit', function (e) {
            e.preventDefault();
            const inputEl = document.querySelector('.input-item');
            const inputValue = inputEl.value.trim();
            if (!inputValue) return;
            inputEl.value = '';
            handler(inputValue);
        });
    }

    addHandlerAddRemoveCompleted(handler) {
        this._container.addEventListener('click', e => {
            const checkbox = e.target.closest('.input-checkbox');
            if (!checkbox) return;
            const id = checkbox.parentElement.dataset.id;

            handler(+id, checkbox.checked);
        });
    }

    addHandlerSort(handler) {
        this._btnSort = document.querySelectorAll('.btn--sort');
        this._btnSort.forEach(el => {
            el.addEventListener('click', e => {
                this._btnSort.forEach(el2 => el2.classList.remove('active'));
                el.classList.add('active');

                const purpose = el.dataset.sort;
                handler(purpose);
            });
        });
    }

    addHandlerClearCompleted(handler) {
        this._btnClearCompleted = document.querySelector('.btn--clear');
        this._btnClearCompleted.addEventListener('click', e => {
            handler();
        });
    }

    addHandlerBtnCrossDel(handler) {
        this._itemContainer.addEventListener('click', e => {
            const btnCross = e.target.closest('.btn--cross');
            if (!btnCross) return;
            const id = btnCross.parentElement.dataset.id;
            handler(id);
        });
    }

    addHandlerDragSortTodo(handler) {
        new Sortable(this._itemContainer, {
            animation: 350,
            onEnd: function (evt) {
                handler(evt.oldIndex, evt.newIndex);
            },
        });
    }

    clear() {
        this._itemContainer.innerHTML = '';
    }

    updateCount(count) {
        this._countItem = document.querySelector('.count-item');

        let label = '';
        if (+count > 0) label = `${count}  item${+count > 1 ? 's' : ''} left`;
        this._countItem.textContent = label;
    }
}

export default new View();
