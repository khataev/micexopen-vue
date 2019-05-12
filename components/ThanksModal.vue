<template>
  <b-modal
    id="thanksModal"
    size="lg"
    title="Место отправки благодарностей"
    ok-title="Закрыть"
    ok-only
  >
    <div class="yandex-payment">
      <iframe
        frameborder="0"
        allowtransparency="true"
        scrolling="no"
        src="https://money.yandex.ru/quickpay/shop-widget?account=4100186996407&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=buyer&targets-hint=%D0%91%D1%83%D0%B4%D1%83+%D1%80%D0%B0%D0%B4+%D1%82%D0%B5%D0%BF%D0%BB%D1%8B%D0%BC+%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D0%BC+%3A)&default-sum=500&button-text=03&successURL=http%3A%2F%2Fmicexopen.khataev.com%2F"
        width="450"
        height="210"
      ></iframe>
    </div>
  </b-modal>
</template>
