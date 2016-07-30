<div class="page-cart" id="msCart">
    <div class="page-cart-block">
        <div class="page-cart-block-title">Ваш заказ</div>
        <div class="page-cart-product">[[+goods]]</div>
        <div class="page-cart-footer">
            <div class="total">[[%ms2_cart_total]]:</div>
            <div class="total_count"><span class="ms2_total_count">[[+total_count]]</span> [[%ms2_frontend_count_unit]]</div>
            <div class="total_cost"><span class="ms2_total_cost">[[+total_cost]]</span><span> [[%ms2_frontend_currency]]</span></div>
        </div>
    </div>
    <div class="page-cart-buttons">
        <form method="post">
            <button class="btn btn-default" type="submit" name="ms2_action" value="cart/clean" title="[[%ms2_cart_clean]]">[[%ms2_cart_clean]]</button>
        </form>
    </div>
</div>