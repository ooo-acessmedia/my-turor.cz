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
        autoplay: true,
        loop: true,
        rewindNav: true
    });

    // Делаем не кликабельными 2 пункта верхнего меню

    var $topMenu = $('.top-menu-list');

    var linkList = $topMenu.find('> li').eq(1).find('> a').add($topMenu.find('> li').eq(2).find('> a'));

    linkList.each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
        });
    });

    /* Разворачивающейся меню третьего левела */
    $(document).on('click', '.top-menu-list .level-02.root > a', function (e) {
        $(this).next().slideToggle(300);
        e.preventDefault();
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
        /* ajax загрузка изображений */
        $('.ajax-image-uploader').each(function (i, elem) {
            $(elem).find('.ajax-image-file').on('change', function () {
                $(elem).find('.ajax-image-name').val($(this).val().split("/").pop().split("\\").pop());
                var files = this.files;
                var data = new FormData();
                data.append('action', 'upload/photo');
                $.each(files, function (key, value) {
                    data.append(key, value);
                });

                // Отправляем запрос

                $.ajax({
                    url: '/ajax',
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    async: false,
                    processData: false, // Не обрабатываем файлы (Don't process the files)
                    contentType: false, // Так jQuery скажет серверу что это строковой запрос
                    success: function (respond, textStatus, jqXHR) {
                        if (typeof respond.error === 'undefined') {
                            if (respond instanceof Array || respond.length == 1) {
                                $(elem).find('.ajax-image-value').val(respond[0]);
                                $('img[data-uploader="#' + $(elem).attr('id') + '"]').attr('src', respond[0]);
                            }
                        }
                        else {
                            console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('ОШИБКИ AJAX запроса: ' + textStatus);
                    }
                });
            });
        });
        /* ajax формы фильтрации */
        $(document).on('submit', '.ajaxFilter', function () {
            var url = $(this).attr('action');
            var filterContain = $(this).attr('data-filter-contain');
            var resultContain = $(this).attr('data-result-contain');
            var gets = {};
            var newUrl = location.href.split('?');
            if (newUrl.length > 1) {
                newUrl = newUrl[0];
                newUrl[1].split('&').forEach(function (g) {
                    if (g) {
                        g = g.split('=');
                        gets[g[0]] = g.length > 1 ? g[1] : "";
                    }
                });
            }
            $(this).find('select,teaxtarea,input,checkbox,radiobox').each(function (i, inp) {
                var val = $(inp).val();
                var name = $(inp).attr('name');
                delete gets[name];
                if (val) {
                    gets[name] = val;
                }
            });
            var getstr = "";
            for (var k in gets) {
                getstr += "&" + k + "=" + gets[k];
            }
            if (getstr !== "") {
                newUrl += "?" + getstr.substr(1);
            }
            $.ajax({
                url: url,
                data: gets,
                method: 'GET',
                success: function (html) {
                    $(filterContain).html($(html).find(filterContain).html());
                    $(resultContain).html($(html).find(resultContain).html());
                    history.pushState(null, document.title, newUrl)
                }
            });
            return false;
        });

        $("[data-toggle='tooltip']").tooltip();

        $(document).on('click', '.action-remove', function () {
            var removeItem = $(this).attr('data-remove');
            $(removeItem).remove();
            return false;
        });

        $(document).on('click', '.action-remove-all', function () {
            var removeItem = $(this).attr('data-remove');
            var conditionItem = $(this).attr('data-condition');
            $(removeItem).each(function (i, elem) {
                if ($(elem).find(conditionItem).length) {
                    $(elem).remove();
                }
            });
        });

        $(document).on('click', '.action-select-all', function () {
            var selectItems = $(this).attr('data-select-all');
            if ($(this).is(':checked')) {
                $(selectItems).attr('checked', true);
            } else {
                $(selectItems).removeAttr('checked');
            }
        });

        $(document).on('click', '.action-add', function () {
            var id = 0;
            $('.service-item').each(function (i, elem) {
                var _id = $(elem).attr('id').split('-').pop();
                if ($.isNumeric(_id) && _id > id) id = _id;
            });
            id++;
            var $row = $(myTutor.chunks.teacherUserPanel.service)
                .attr('id', 'service-' + id)
                .appendTo($('#service-list'));
            $row.find('input[name="services_id[]"]').attr('name', 'services_id[new_' + id + ']').val('new_' + id);
            $row.find('input[name="services_name[]"]').attr('name', 'services_name[new_' + id + ']').val('Новая услуга');
            $row.find('input[name="services_price[]"]').attr('name', 'services_price[new_' + id + ']').val('0');
            $row.find('input[name="services_active[]"]').attr('name', 'services_active[new_' + id + ']').val('1');
            $row.find('.action-remove').attr('data-remove', '#service-' + id);
            return false;
        });

        $(document).on('click', '.action-add-education', function () {
            var id = 0;
            $('.teacher-education-item').each(function (i, elem) {
                var _id = $(elem).attr('id').split('-').pop();
                if ($.isNumeric(_id) && _id > id) id = _id;
            });
            id++;
            var $row = $(myTutor.chunks.teacherUserPanel.education)
                .attr('id', 'teacher-education-' + id)
                .appendTo($('#education-list'));
            $row.find('input[name="education[][institution]"]').attr('name', 'education[' + id + '][institution]').val('');
            $row.find('input[name="education[][chair]"]').attr('name', 'education[' + id + '][chair]').val('');
            $row.find('input[name="education[][direction]"]').attr('name', 'education[' + id + '][direction]').val('');
            $row.find('.action-remove').attr('data-remove', '#teacher-education-' + id);
            return false;
        });

        if (location.hash) {
            $('a[href="' + location.hash + '"]').tab('show');
            if (location.hash == '#learner-active' || location.hash == '#learner-wait') {
                $('a[href="#my-learner"]').tab('show');
            }
        }

        $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function () {
            history.pushState(null, "", (location.href.split('#'))[0] + $(this).attr('href'));
        });

        $(document).on('submit', '.ajaxFormNonResponce', function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize(),
                dataType: 'json',
                success: function (ids) {
                    ids.forEach(function (id, i) {
                        var $item = $('.service-item').eq(i);
                        $item.attr('id', 'service-' + id);
                        $item.find('td').eq(1).html(id);
                        $item.find('input[name^="services_id"]').attr('name', 'services_id[' + id + ']').val(id);
                        $item.find('input[name^="services_name"]').attr('name', 'services_name[' + id + ']');
                        $item.find('input[name^="services_price"]').attr('name', 'services_price[' + id + ']');
                        $item.find('input[name^="services_active"]').attr('name', 'services_active[' + id + ']');
                    });
                }
            });
            return false;
        });

        $(document).on('click', '.toggler', function (e) {
            var selector = $(this).attr('data-toggle');
            $(selector).toggle();

        });

        $(document).on('submit', '#learner form', function () {
            if(!window.__register_conpidition_accepted__) {
                $('#learner-condition').modal('show');
                return false;
            }
        });

        $(document).on('submit', '#teacher form', function () {
            if(!window.__register_conpidition_accepted__) {
                $('#teacher-condition').modal('show');
                return false;
            }
        });

        $(document).on('click', '#learner-condition .btn-primary', function () {
            window.__register_conpidition_accepted__ = true;
            $('#learner-condition').modal('hide');
            $('#learner form input[type="submit"]').trigger('click');
        });

        $(document).on('click', '#teacher-condition .btn-primary', function () {
            window.__register_conpidition_accepted__ = true;
            $('#teacher-condition').modal('hide');
            $('#teacher form input[type="submit"]').trigger('click');
        });

        var inputMoveCursorToEnd = function (input) {
            input.focus();
            input.selectionStart = input.value.length;
        }

        $(document).on('click', 'input[name="phone"]', function () {
            inputMoveCursorToEnd($(this)[0]);
        });
        $(document).on('keypress', 'input[name="phone"]', function () {
            inputMoveCursorToEnd($(this)[0]);
        });
        $(document).on('keyup', 'input[name="phone"]', function () {
            inputMoveCursorToEnd($(this)[0]);
        });
        $(document).on('change', 'input[name="phone"]', function () {
            inputMoveCursorToEnd($(this)[0]);
        });
        $(document).on('keydown', 'input[name="phone"]', function (e) {
            inputMoveCursorToEnd($(this)[0]);
            if(e.keyCode == 8 && $(this).val().length <= 4) {
                return false;
            }
        });
    });

})(jQuery, window, window.myTutor);

