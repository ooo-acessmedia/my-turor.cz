<div class="form-popup-wrap">

    <div class="form-fade"></div>

    <div class="form-popup">
        [[!AjaxForm?
        &snippet=`FormIt`
        &form=`form-popup.tpl`
        &hooks=`spam,email`
        &emailSubject=`Письмо с сайта - [[++site_name]]`
        &emailTo=`[[++emailsender]]`
        &validate=`form-name:required,form-email:required`
        &validationErrorMessage=`Пожалуйста, заполните поля корректно`
        &emailTpl=`form-email.tpl`
        &successMessage=`
        <div>Спасибо за вашу заявку! <br> Наши менеджеры свяжутся c Вами в ближайшее время.</div>
        `
        &frontend_js=`/assets/templates/js/ajaxform.js`
        &frontend_css=``
        ]]

        <div class="form-popup-close">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="-49 141 20 20" style="enable-background:new -49 141 20 20;" xml:space="preserve">
                   <polygon class="st0"
                            points="-30.2,141 -39,149.8 -47.8,141 -49,142.3 -40.3,151 -49,159.7 -47.8,161 -39,152.2 -30.2,161 -29,159.8 -37.8,151 -29,142.2 "/>
               </svg>
        </div>
    </div>
</div>