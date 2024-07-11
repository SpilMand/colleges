<template>
  <NuxtLink
    :to="{ path: `/colleges/${directions.slug}`, params: { id: directions.id } }"
    class="m-directions-card"
    :style="{
      backgroundImage: `linear-gradient(180deg, rgba(76, 59, 138, 0.67) 46.32%, #282048 75.84%),
		 url('${directions.bg}')`,
    }"
  >
    <div class="m-directions-card__wrap">
      <h5 class="m-directions-card__title title-h5">{{ directions.title }}</h5>
      <div class="m-directions-card__subtitle f-text-s">{{ directions.subtitle }}</div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  directions: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
@import './m-directions-card.scss';
</style>
