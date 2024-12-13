<template>
  <NuxtLink :to="{ path: `/blog/news/${info.slug}`, query: { id: info.id } }" class="m-news-card">
    <div class="m-news-card__inner">
      <div class="m-news-card__tags">
        <div class="m-news-card__tags-tag f-text-xxs">
          {{ info?.theme?.theme }}
        </div>
      </div>
      <p class="f-text-xxl f-font-700" v-html="info.name" />
    </div>
    <span class="m-news-card__date f-text-xxs gray">{{ info.formattedDate }}</span>
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
