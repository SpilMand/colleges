<template>
  <section class="s-info section-l">
    <div class="container">
      <div class="title-about">Ваш компас в мире колледжей</div>
      <div class="s-info__box">
        <m-info-card v-for="(card, index) in cards" :key="index" :cards="card" />
      </div>
    </div>
  </section>
</template>
<script setup>
const cards = [
  {
    title: 'Основную информацию о колледже: контакты, адрес, проходные баллы, формы обучения, условия и др.',
    bgMob: '/img/info/bg-mob-1.svg',
    bgTab: '/img/info/bg-tab-1.svg',
    bgDesc: '/img/info/bg-desc-1.svg',
  },
  {
    title: 'Специальности и профессии, которые можно получить в колледже',
    bgMob: '/img/info/bg-mob-2.svg',
    bgTab: '/img/info/bg-tab-2.svg',
    bgDesc: '/img/info/bg-desc-2.svg',
  },
  {
    title: 'Отзывы и вопросы о колледже',
    bgMob: '/img/info/bg-mob-3.svg',
    bgTab: '/img/info/bg-tab-3.svg',
    bgDesc: '/img/info/bg-desc-3.svg',
  },
  {
    title: 'Галерею с фотографиями колледжа',
    bgMob: '/img/info/bg-mob-4.svg',
    bgTab: '/img/info/bg-tab-4.svg',
    bgDesc: '/img/info/bg-desc-4.svg',
  },
];
</script>

<style lang="scss">
@import './s-info.scss';
</style>
