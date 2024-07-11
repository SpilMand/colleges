<template>
  <section class="s-article-image">
    <img :src="image" :alt="subtitle" class="s-article-image__img" />
    <span class="s-article-image__subtitle f-text-m gray">{{ subtitle }}</span>
  </section>
</template>

<script setup>
defineProps({
  image: { type: String, default: '' },
  subtitle: { type: String, default: '' },
});
</script>

<style>
@import './s-article-image.scss';
</style>
