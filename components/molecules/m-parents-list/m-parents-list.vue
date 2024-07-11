<template>
  <div class="m-parents-list">
    <div class="m-parents-list__img">
      <img :src="info.img" :alt="info.title" />
    </div>
    <span class="subtitle">{{ info.title }}</span>
  </div>
</template>

<script setup>
defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
@import './m-parents-list.scss';
</style>
