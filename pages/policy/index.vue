<template>
  <s-policy :pageTitle="pageTitle" />
</template>
<script setup>
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

const pageTitle = ref('Политика конфиденциальности');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});
</script>
