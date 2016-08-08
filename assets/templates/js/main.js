;
(function ($, window, myTutor) {

    'use strict';

    var cl = function (msg) {
        console.log(msg);
    };

    var $mainSlider = $('.main-slider');

    $mainSlider.owlCarousel({
        items: 1,
        mouseDrag: false,
        nav: true,
        navText: ['', ''],
        autoplay: true
    });

    // Адативная всплывающая форма

    var $activateButton = $('.contacts-callout'),
        $formPopup = $('.form-popup'),
        $formFade = $('.form-fade'),
        $formClose = $('.form-popup-close'),
        $formWrap = $('.form-popup-wrap'),
        thisPlaceholder,
        fadeTimeout = 300;

    var activatePopupForm = function (activateButton, formPopup, formFade, formWrap) {
        activateButton.on('click', function () {
            formPopup.add(formFade).addClass('is-visible form-fade-in');
            formWrap.addClass('is-flex');
            setTimeout(function () {
                formPopup.add(formFade).removeClass('form-fade-in');
            }, fadeTimeout);
        });

        formFade.add($formClose).on('click', function () {
            formPopup.add(formFade).addClass('form-fade-out');

            setTimeout(function () {
                formPopup.add(formFade).removeClass('is-visible form-fade-out');
                formWrap.removeClass('is-flex');
            }, fadeTimeout);
        });
    };

    activatePopupForm($activateButton, $formPopup, $formFade, $formWrap);

    // Сменяющиеся плейсхолдеры для формы

    $formPopup.find('input').add($formPopup.add('textarea'))
        .focus(function () {
            thisPlaceholder = $(this).attr('placeholder');
            $(this).data('placeholder', thisPlaceholder);
            $(this).attr('placeholder', '');
        })
        .blur(function () {
            thisPlaceholder = $(this).data('placeholder');
            $(this).attr('placeholder', thisPlaceholder);
        });

    // Значения даты для формы

    var currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 1);

    var currentDay = currentDate.getDate();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    $('#day').val(currentDay);
    $('#year').val(currentYear);
    $('#month').find('option').eq(currentMonth).attr('selected', 'selected');

    // date and datetime pickers
    $(document).ready(function () {
        $('.date').datepicker({
            format: "yyyy-mm-dd",
            language: myTutor.language.cultureKey,
            pickerPosition: "bottom-left",
            autoclose: true
        });
        $('.datetime').datetimepicker({
            format: "yyyy-mm-dd hh:ii:ss",
            language: myTutor.language.cultureKey,
            pickerPosition: "bottom-left",
            autoclose: true
        });
    });

})(jQuery, window, window.myTutor);

