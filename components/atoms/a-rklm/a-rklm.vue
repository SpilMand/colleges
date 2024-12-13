<template>
  <NuxtLink to="/" class="a-rklm">
    <img :src="info?.attributes?.url" alt="" />
  </NuxtLink>
</template>

<script setup>
defineProps({
  info: { type: Object, default: () => ({}) },
});
</script>

<style>
@import './a-rklm.scss';
</style>
