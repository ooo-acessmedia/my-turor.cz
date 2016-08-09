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
        $('.clockpicker').clockpicker({
            autoclose: true
        });
        $('.ajax-image-uploader').each(function (i, elem) {
            $(elem).find('.ajax-image-file').on('change', function () {
                $(elem).find('.ajax-image-name').val($(this).val().split("/").pop().split("\\").pop());
                var files = this.files;
                var data = new FormData();
                data.append('action', 'upload/photo');
                $.each(files, function(key, value){
                    data.append(key, value);
                });
             
                // Отправляем запрос
             
                $.ajax({
                    url: '/ajax',
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: false, // Не обрабатываем файлы (Don't process the files)
                    contentType: false, // Так jQuery скажет серверу что это строковой запрос
                    success: function( respond, textStatus, jqXHR ){
                        if( typeof respond.error === 'undefined' ){
                            if(respond instanceof Array || respond.length == 1) {
                                $(elem).find('.ajax-image-value').val(respond[0]);
                                console.log($(elem).attr('id'));
                                console.log($(elem).find('img[data-uploader="#' + $(elem).attr('id') + '"]'));
                                $('img[data-uploader="#' + $(elem).attr('id') + '"]').attr('src', respond[0]);
                            }
                        }
                        else{
                            console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
                        }
                    },
                    error: function( jqXHR, textStatus, errorThrown ){
                        console.log('ОШИБКИ AJAX запроса: ' + textStatus );
                    }
                });
            });
        });
    });

})(jQuery, window, window.myTutor);

