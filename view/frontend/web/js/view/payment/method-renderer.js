define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'accountpayment',
                component: 'Fevertree_Accountpayment/js/view/payment/method-renderer/accountpayment'
            }
        );
        return Component.extend({});
    }
);