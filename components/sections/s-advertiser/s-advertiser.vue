<template>
  <div id="s-advertiser" class="s-advertiser section-l">
    <div class="container">
      <h1 class="title-h2 s-advertiser__title">{{ pageTitle }}</h1>
      <div class="s-advertiser__wrapper">
        <div class="s-advertiser__head">
          <div class="s-advertiser__logo">
            <img src="/img/advertiser/logo.png" :alt="title" />
          </div>
          <h3 class="title-h3">{{ title }}</h3>
        </div>
        <div class="s-advertiser__box">
          <div class="s-advertiser__item">
            <div class="s-advertiser__item-title f-text-xxxl f-font-700 mbx4">Данные организации</div>
            <ul class="s-advertiser__list s-advertiser__list-doc">
              <li class="f-text-m gray">
                Наименование
                <span class="black">МТИ (Московский Технологические Институт)</span>
              </li>
              <li class="f-text-m gray">ИНН <span class="black"> 1234567891</span></li>
              <li class="f-text-m gray">ERID <span class="black"> 111111111</span></li>
              <li class="f-text-m gray">Город <span class="black"> Москва</span></li>
            </ul>
          </div>
          <div class="s-advertiser__item">
            <div class="s-advertiser__item-title f-text-xxxl f-font-700 mbx4">Контакты</div>
            <ul class="s-advertiser__list">
              <li class="f-text-m">
                <img src="/icons/location.svg" alt="" />
                125190, г. Москва, Ленинградский проспект, дом 80, к.5 Станция метро «Сокол», выход в центре зала на ул.
                Балтийская, далее пешком по направлению в сторону МКАД до дома №80, к.5
              </li>
              <li class="f-text-m"><img src="/icons/phone.svg" alt="" />+7 (495) 545-42-04 Доб.: 123</li>
              <li class="f-text-m"><img src="/icons/mail.svg" alt="" />info@mti.ru</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const title = ref('Московский Технологический Институт (МТИ)');

defineProps({
  pageTitle: {
    type: String,
    default: 'Информация о рекламодателе',
  },
});
</script>
<style>
@import './s-advertiser.scss';
</style>
