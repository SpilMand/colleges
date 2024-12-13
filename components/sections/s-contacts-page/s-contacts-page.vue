<template>
  <div id="s-contacts-page" class="s-contacts-page section-l">
    <div class="container">
      <h1 class="title-h2 s-contacts-page__title">{{ pageTitle }}</h1>
      <div class="s-contacts-page__wrapper">
        <div class="s-contacts-page__box">
          <div class="s-contacts-page__item">
            <div class="s-contacts-page__item-title f-text-xxxl f-font-700 mbx4">Техническая поддержка</div>
            <ul class="s-contacts-page__list mbx8">
              <li class="f-text-xl">Неисправности в работе проекта</li>
            </ul>
            <a
              class="s-contacts-page__link f-text-xxxl f-link mt-auto"
              test-id="link-s-contacts-page-support-1"
              href="mailto:support@college.рф"
              >support@college.рф <span v-html="link"></span
            ></a>
          </div>
          <div class="s-contacts-page__item">
            <div class="s-contacts-page__item-title f-text-xxxl f-font-700 mbx4">Реклама и сотрудничество</div>
            <ul class="s-contacts-page__list mbx8">
              <li class="f-text-xl">Вопросы размещения рекламы</li>
              <li class="f-text-xl">Предложения о сотрудничестве</li>
            </ul>
            <a
              class="s-contacts-page__link f-text-xxxl f-link mt-auto"
              test-id="link-s-contacts-page-support-2"
              href="mailto:support@college.рф"
              >support@college.рф <span v-html="link"></span
            ></a>
          </div>
        </div>
        <div class="s-contacts-page__item">
          <div class="s-contacts-page__item-title f-text-xxxl f-font-700 mbx4">Актуализация информации</div>
          <ul class="s-contacts-page__list mbx8">
            <li class="f-text-xl">
              Для актуализации информации о колледжах отправьте на указанный адрес электронной почты письмо-запрос с
              подробным описанием изменений, которые необходимо внести
            </li>
            <li class="f-text-xl">Письмо должно быть отправлено с корпоративной почты</li>
            <li class="f-text-xl">Письма рассматриваются в течение 1-2 дней</li>
          </ul>
          <a
            class="s-contacts-page__link f-text-xxxl f-link mt-auto"
            test-id="link-s-contacts-page-support-3"
            href="mailto:support@college.рф"
            >support@college.рф <span v-html="link"></span
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pageTitle: { type: String, default: 'Контакты' },
});
const link = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.84184 13.0527C2.31867 13.5759 1.47045 13.5759 0.947281 13.0527C0.424112 12.5296 0.424113 11.6813 0.947283 11.1582L9.41532 2.69014H2.50366C1.7608 2.69014 1.15859 2.08793 1.15859 1.34507C1.15859 0.602209 1.7608 0 2.50366 0H14V11.4964C14 12.2392 13.3978 12.8414 12.6549 12.8414C11.9121 12.8414 11.3099 12.2392 11.3099 11.4964V4.5847L2.84184 13.0527Z" fill="#4C3B8A"/>
</svg>
`;
</script>
<style>
@import './s-contacts-page.scss';
</style>
