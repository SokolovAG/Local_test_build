"use strict";

(function() {
    const onFormItemClick = (evt) => { // Обработчик нажатия на инпут
        const { currentTarget, target } = evt;
        /*currentTarget - объект, на котором висит обработчик
        target - объект на который пришелся клик */
        if (target.classList.contains('js-input-change')) {
            const input = currentTarget.querySelector('.js-input'); // ищем инпут внутри формы, не по всему document
            input.classList.toggle('js-input--edit'); // добавляем модификатор, включающий стили активного инпута
            target.innerText = target.innerText === 'сохранить' ? "изменить" : 'сохранить'; // замена текста кнопки при клике
            if (input.hasAttribute('disabled')) { //смена атрибута у инпута для возможности редактирования и сохранения значения
                input.removeAttribute('disabled');
            } else {
                input.setAttribute('disabled', true);
            }
        }
    };

    const addFormListeners = () => { // добавление обработчика события клика
        const formItems = document.querySelectorAll('.setting-form__list-item'); // получаем список Node с классом .setting-form__list-item
        const changeAddress = document.querySelector('.js-change-address'); // кнопка, открывающая редактирование адресов
        const deleteAddressBtns = document.querySelectorAll('.js-delete-address'); // список Node c классом .js-delete-address

        Array.from(formItems).forEach((item) => { //преобразуем список NodeList в массив, чтобы получить все методы массива, которых в NodeList нет по дефолту
            item.addEventListener('click', onFormItemClick)
        }); // для навешивания обработчика события клика на каждый из них

        changeAddress.addEventListener('click', (evt) => {
            const addressInner = evt.currentTarget.parentElement.parentElement; // для кнопки через родительский компонент ищем address-inner
            evt.preventDefault();
            if (addressInner.classList.contains('address__inner')) {
                addressInner.classList.toggle('address__inner--edit');
                changeAddress.innerText = changeAddress.innerText === 'сохранить' ? "изменить" : 'сохранить';
            }
        });

        Array.from(deleteAddressBtns).forEach((item) => { // создание массива кнопок удаления для перебора
            item.addEventListener('click', (evt) => {
                const addressItem = evt.currentTarget.parentElement; // получаем элемент, где лежит наша кнопка
                evt.preventDefault();
                console.log(evt.currentTarget);
                addressItem.classList.add('address__list-item--remove'); // скрываем эелемент
            })
        }); // для навешивания обработчиков нажатия на кнопки удаления

    };

    const onContentLoaded = () => { // фнукции обработки события загрузки контента, во избежание ошибок при навешивании обработчиков на элементы, если еще те на загрузились
        addFormListeners();
    };

    document.addEventListener(`DOMContentLoaded`, onContentLoaded);
})();