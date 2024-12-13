<template>
  <div class="container">
    <a-breadcrumbs :items="breadcrumbs" />
  </div>
  <s-advertiser />
</template>

<script setup>
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

const breadcrumbs = [{ label: 'Информация о рекламодателе', link: '/advertiser' }];
const pageTitle = ref('Информация о рекламодателе');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});
</script>
