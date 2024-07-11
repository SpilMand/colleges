<template>
  <div class="m-info-card">
    <picture>
      <source media="(min-width: 1200px)" :srcset="cards.bgDesc" />
      <source media="(min-width: 768px)" :srcset="cards.bgTab" />
      <img class="m-info-card__img" :src="cards.bgMob" :alt="cards.title" />
    </picture>
    <div class="m-info-card__title text-about f-font-700">{{ cards.title }}</div>
  </div>
</template>

<script setup>
defineProps({
  cards: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
@import './m-info-card.scss';
</style>
