<template>
  <div class="container">
    <a-breadcrumbs :items="breadcrumbs" />
    <s-foru :pageTitle="pageTitle" />
  </div>
  <s-form
    title="Свяжитесь с нами: мы здесь, чтобы помочь"
    subtitle="Если у Вас остались вопросы по работе сайта,
      пишите нам на электронную почту <a class='f-link-white'
      href='mailto:1234@ruscollege.ru'>1234@ruscollege.ru</a> или
      оставьте свои контактные данные и мы свяжемся с Вами."
    checkboxLabel="Я согласен на обработку своих персональных данных и получение информационных рассылок,
        а также принимаю условия
        <a href='/policy' target='_blank'
        class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    type="stretch"
    section-id="foru-page"
  />
</template>

<script setup>
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

const breadcrumbs = [{ label: 'Колледжи России', link: '/forcolleges' }];

const pageTitle = ref('Для колледжей');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});
</script>
