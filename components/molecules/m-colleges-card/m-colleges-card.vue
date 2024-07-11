<template>
  <NuxtLink :to="last ? '/colleges' : `/college/${colleges.id}`" class="m-colleges-card" :class="{ last: last }">
    <div v-if="!last" class="m-colleges-card__img">
      <img :src="colleges.logo" loading="lazy" alt="" class="" />
    </div>
    <div class="m-colleges-card__text">
      <p class="f-text-s f-font-700">{{ colleges.name }}</p>
      <p v-if="last" class="f-text-m">Посмотреть все колледжи</p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  colleges: {
    type: Object,
    default: () => ({}),
  },
  last: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: '/',
  },
});
</script>

<style lang="scss">
@import './m-colleges-card.scss';
</style>
