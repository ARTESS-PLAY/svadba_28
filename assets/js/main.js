const urlLink =
    'https://api.telegram.org/bot6681287357:AAG2v9iKhXAo6tW54B3rgHYNkI7tb8QoS-U/sendMessage?chat_id=-1002207403000&parse_mode=html&text=';

$(document).ready(function () {
    /**
     * Появление блоков
     */

    $(window).on('scroll', function () {
        const windowHeight = window.innerHeight;

        $('.main, section .container, footer .container').each(function () {
            if ($(this)[0].getBoundingClientRect().top < windowHeight - 100) {
                $(this).css('opacity', 1);
                $(this).css('transform', 'translateY(0)');
            }
        });

        $('.has_line').each(function () {
            if ($(this)[0].getBoundingClientRect().top < windowHeight - 100) {
                setTimeout(() => {
                    $(this).addClass('has_line--active');
                }, 500);
            }
        });
    });

    /**
     * Кнопочки-крутилочки
     */
    $('.form__btns .form__button').on('click', function (e) {
        e.preventDefault();
        $('.form__button--error').removeClass('form__button--error');

        if ($(this).hasClass('form__button--active')) return;

        $('.form__button--active').removeClass('form__button--active');
        $(this).addClass('form__button--active');
    });

    /**
     * Отправка в тг
     */
    $('#main_form').on('submit', function (e) {
        e.preventDefault();

        let valid = true;

        const name = $('#name').val();
        const surname = $('#surname').val();
        const alco = [];

        $('[name="alco"]:checked').each(function () {
            alco.push($(this).val());
        });

        const can = $('.form__button--active').text();
        if (!name) {
            $('#name').addClass('input--error');
            valid = false;
        }

        if (!surname) {
            $('#surname').addClass('input--error');
            valid = false;
        }

        if (can.length == 0) {
            $('.form__btns .form__button').addClass('form__button--error');
            valid = false;
        }

        if (!valid) return;

        $('.form__button--submit').addClass('form__button--active ');

        let str = `<b>Новый ответ на приглашение:</b>%0A<b>Имя:</b> ${name}%0A<b>Фамилия:</b> ${surname} %0A<b>${
            can == 'can' ? 'Смогу' : 'Не смогу'
        }</b>%0A<b>Алкоголь:</b>`;

        if (alco.length) {
            alco.map((val) => {
                str += `%0A -- ${val}`;
            });
        } else {
            str += ` Не указан`;
        }

        fetch(urlLink + str)
            .then((data) => {
                $('section.form').hide();
                $('section.tnx').fadeIn();
                $('#res_choise').text($('.form__btns .form__button--active').text());
            })
            .catch((e) => {
                $('section.form').hide();
                $('section.tnx').fadeIn();
                $('#res_choise').text('Произошла ошибка');
                console.log(e);
            });
    });

    /**
     * Показ чекбоксов
     */
    $('#open_checkbox').on('click', function (e) {
        e.preventDefault();

        $('#form__labels').hide();
        $('#form__checkboxes').css('display', 'flex');
    });

    /**
     * Скрытие чекбоксов
     */
    $('#close_checkboxes').on('click', function (e) {
        e.preventDefault();

        $('#form__labels').css('display', 'flex');
        $('#form__checkboxes').hide();
    });

    /**
     * Сброс ошибок инпутов
     */

    $('form input').on('change, keyup', function () {
        $(this).removeClass('input--error');
    });

    $('.main').css('opacity', 1);
    $('.main').css('transform', 'translateY(0)');
});
