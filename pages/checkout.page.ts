export const checkout = {
    completeTitle: 'Checkout: Complete!',
    completeHeaderText: 'Thank you for your order!',
    completeText: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    paymentInfo: 'SauceCard #31337',
    shipping: 'Free Pony Express Delivery!',

    locator: {
        title: '[data-test="title"]',
        completeLogo: '[data-test="pony-express"]',
        firstName: '[data-test="firstName"]',
        lastName: '[data-test="lastName"]',
        postalCode: '[data-test="postalCode"]',
        continueBtn: '[data-test="continue"]',
        finishBtn: '[data-test="finish"]',
        backToProductsBtn: '[data-test="back-to-products"]',
        completeHeader: '[data-test="complete-header"]',
        completeText: '[data-test="complete-text"]',

        //Checkout overview
        quantityLbl: '[data-test="cart-quantity-label"]',
        cartDescLbl: '[data-test="cart-desc-label"]',
        cartList: '[data-test="cart-list"] div',
        cartItemQty: '[data-test="item-quantity"]',
        paymentInfoLbl: '[data-test="payment-info-label"]',
        paymentInfoValue: '[data-test="payment-info-value"]',
        shippingInfoLbl: '[data-test="shipping-info-label"]',
        shippingInfoValue: '[data-test="shipping-info-value"]',
        priceTotalLbl: '[data-test="total-info-label"]',
        subtotalLbl: '[data-test="subtotal-label"]',
        taxLbl: '[data-test="tax-label"]',
        totalLbl: '[data-test="total-label"]',
    } as const,
};