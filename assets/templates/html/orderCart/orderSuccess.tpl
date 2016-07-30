[[!msGetOrder?id=`[[+id]]` &tplRow=`get-order-row.tpl`]]

<div class="page-cart page-success" id="msCart">
    <div class="page-cart-block">
        <div class="page-cart-block-title">Ваш заказ</div>
        <div class="page-cart-product">[[+goods]]</div>
        <div class="page-cart-footer">
            <div class="total">[[%ms2_cart_total]]:</div>
            <div class="total_count"><span class="ms2_total_count">[[+cart_count]]</span> [[%ms2_frontend_count_unit]]</div>
            <div class="total_cost"><span class="ms2_total_cost">[[+cart_cost]]</span><span> [[%ms2_frontend_currency]]</span></div>
        </div>
    </div>
</div>

<div class="order-page-success-title">[[%ms2_frontend_order_success]]</div>
