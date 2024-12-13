<template>
  <NuxtLink :to="last ? '/colleges' : `/college/${options.id}`" class="m-colleges-card" :class="{ last: last }">
    <div v-if="!last" class="m-colleges-card__img">
      <img :src="logo" loading="lazy" alt="" class="" />
    </div>
    <div class="m-colleges-card__text">
      <p class="f-text-s f-font-700">{{ options.attributes?.name }}</p>
      <p v-if="last" class="f-text-m">Посмотреть все колледжи</p>
    </div>
  </NuxtLink>
</template>

<script setup>
import { getIncludeData } from '~/composables/getIncludeData';
import { getLogo } from '~/composables/getLogo';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  included: {
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

const logo = computed(() => {
  return getLogo(getIncludeData(props.options, props.included, 'media'));
});
</script>

<style lang="scss">
@import './m-colleges-card.scss';
</style>
