<form action="" method="post" class="">

    <div class="control-group">
        <label class="control-label" for="form-name"></label>
        <div class="controls">
            <input type="text" id="form-name" name="form-name" value="" placeholder="Введите имя" />
            <span class="error_name">[[+fi.error.name]]</span>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="form-email"></label>
        <div class="controls">
            <input type="text" id="form-email" name="form-email" value="" placeholder="Введите e-mail" />
            <span class="error_email">[[+fi.error.email]]</span>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="form-message"></label>
        <div class="controls">
            <textarea id="form-message" name="form-message" class="" rows="5" placeholder="Введите сообщение"></textarea>
            <span class="error_message">[[+fi.error.message]]</span>
        </div>
    </div>

    <div class="control-group">
        <div class="controls">
            <button type="submit" class="">Отправить</button>
        </div>
    </div>

    [[+fi.success:is=`1`:then=`
    <div class="alert alert-success">[[+fi.successMessage]]</div>
    `]]
    [[+fi.validation_error:is=`1`:then=`
    <div class="alert alert-danger">[[+fi.validation_error_message]]</div>
    `]]
</form>