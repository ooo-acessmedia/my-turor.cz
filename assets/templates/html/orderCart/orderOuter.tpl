<div class="order-page">
    <form class="form-horizontal ms2_form" id="msOrder" method="post">

        <div class="order-page-title">Введите ваши данные:</div>
        <div class="order-page-form">
            <div class="order-page-block">
                <div class="form-group input-parent">
                    <label class="control-label"  for="receiver"><span class="required-star">*</span> Ввведите имя</label>
                    <div class="">
                        <input type="text" id="receiver" placeholder="Имя" name="receiver" value="[[+receiver]]" class="form-control [[+errors.receiver]]">
                    </div>
                </div>
                <div class="form-group input-parent">
                    <label class="control-label"  for="phone"><span class="required-star">*</span> Введите телефон</label>
                    <div class="">
                        <input type="text" id="phone" placeholder="Телефон" name="phone" value="[[+phone]]" class="form-control [[+errors.phone]]">
                    </div>
                </div>

                <div class="form-group input-parent">
                    <label class="control-label" for="email"><span class="required-star">*</span> Введите e-mail</label>
                    <div class="">
                        <input type="email" id="email" placeholder="e-mail" name="email" value="[[+email]]" class="form-control [[+errors.email]]">
                    </div>
                </div>

            </div>
            <div class="order-page-block">
                <div class="form-group input-parent">
                    <label class="control-label"  for="comment"><span class="required-star">*</span> Сообщение</label>
                    <div class="">
                        <textarea name="comment" id="comment" placeholder="Сообщение" class="form-control [[+errors.comment]]">[[+comment]]</textarea>
                    </div>
                    <button type="submit" name="ms2_action" value="order/submit" class="btn btn-default btn-primary ms2_link">Заказать</button>
                </div>
            </div>
        </div>

        <div class="order-page-payments-deliveries">
            [[+payments]]
            [[+deliveries]]
        </div>
    </form>
</div>