<template>
  <NuxtLink
    :to="{ path: `/colleges/${options.slug}`, params: { id: options.id } }"
    class="m-directions-card"
    :style="{
      backgroundImage: `linear-gradient(180deg, rgba(76, 59, 138, 0.67) 46.32%, #282048 75.84%),
		 url('${bg[0].attributes.url}')`,
    }"
  >
    <div class="m-directions-card__wrap">
      <h5 class="m-directions-card__title title-h5">{{ options.title }}</h5>
      <div class="m-directions-card__subtitle f-text-s">{{ options.subtitle }}</div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  bg: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
@import './m-directions-card.scss';
</style>
