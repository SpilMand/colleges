<template>
  <!-- <NuxtLink to="/" class="s-specialities-banner">
    <span class="gray">Реклама</span>
    </NuxtLink> -->
  <div class="s-specialities-banner">
    <div v-if="type === 'mobile'" class="s-specialities-banner__item">
      <span>Реклама</span>
      <h3 class="s-specialities-banner__title f-h3">{{ title }}</h3>
      <div class="s-specialities-banner__text">{{ text }}</div>
    </div>
    <div v-if="type === 'tablet'" class="s-specialities-banner__item">
      <div class="s-specialities-banner__top">
        <h3 class="s-specialities-banner__title f-h3">{{ title }}</h3>
        <span>Реклама</span>
      </div>
      <div class="s-specialities-banner__text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'mobile',
    validator(value) {
      return ['mobile', 'tablet'].indexOf(value) !== -1;
    },
  },
});
</script>

<style lang="scss" scoped>
@import './s-specialities-banner.scss';
</style>
