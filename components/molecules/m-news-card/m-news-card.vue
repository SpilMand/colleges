<template>
  <NuxtLink to="/blog/news/_id" class="m-news-card">
    <div class="m-news-card__inner">
      <div class="m-news-card__tags">
        <div v-for="(tag, index) in info.tags" :key="index" class="m-news-card__tags-tag f-text-xxs">
          {{ tag }}
        </div>
      </div>
      <p class="f-text-xxl f-font-700" v-html="info.title" />
    </div>
    <span class="m-news-card__date f-text-xxs gray">{{ info.date }}</span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  info: { type: Object, default: () => ({}) },
});
</script>

<style>
@import './m-news-card.scss';
</style>
