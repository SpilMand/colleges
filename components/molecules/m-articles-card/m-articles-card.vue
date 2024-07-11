<template>
  <nuxt-link to="/blog/articles/_id" class="m-articles-card" :class="{ main: isMainPage, comp: isComp }">
    <div v-if="!isComp" class="m-articles-card__tags">
      <div v-for="(tag, index) in info.tags" :key="index" class="m-articles-card__tags-tag f-text-xxs">
        {{ tag }}
      </div>
    </div>
    <div class="m-articles-card__img">
      <img
        :src="articles?.galleries?.length > 0 ? articles.galleries[0]?.url : '/img/articles/articles-1.png'"
        :alt="articles?.name"
        loading="lazy"
      />
    </div>

    <div class="m-articles-card__info">
      <h5 class="m-articles-card__title title-h5 violet-100">
        {{ articles?.name }}
      </h5>
      <span v-if="!isMainPage && !isComp" class="m-articles-card__date gray f-text-xxs">{{ info.date }}</span>
      <a-button
        v-if="isComp"
        label="11 статей"
        :img="arrow"
        :center="false"
        color="white"
        class="m-articles-card__button"
      />
    </div>
  </nuxt-link>
</template>

<script setup>
defineProps({
  info: { type: Object, default: () => ({}) },
  articles: { type: Object, default: () => ({}) },
  isMainPage: { type: Boolean, default: false },
  isComp: { type: Boolean, default: false },
});

const arrow = `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 6.00001C13.9951 5.4739 13.7832 4.97091 13.41 4.60001L9.12 0.300009C8.93264 0.113758 8.67919 0.00921631 8.415 0.00921631C8.15082 0.00921631 7.89736 0.113758 7.71 0.300009C7.61627 0.392972 7.54188 0.503573 7.49111 0.625432C7.44034 0.747292 7.4142 0.877997 7.4142 1.01001C7.4142 1.14202 7.44034 1.27273 7.49111 1.39459C7.54188 1.51644 7.61627 1.62705 7.71 1.72001L11 5.00001H1C0.734784 5.00001 0.48043 5.10537 0.292893 5.2929C0.105357 5.48044 0 5.73479 0 6.00001C0 6.26523 0.105357 6.51958 0.292893 6.70712C0.48043 6.89465 0.734784 7.00001 1 7.00001H11L7.71 10.29C7.5217 10.477 7.41538 10.7311 7.41444 10.9965C7.41351 11.2618 7.51802 11.5167 7.705 11.705C7.89198 11.8933 8.1461 11.9996 8.41147 12.0006C8.67683 12.0015 8.9317 11.897 9.12 11.71L13.41 7.41001C13.7856 7.03666 13.9978 6.52959 14 6.00001Z" fill="#FD8B21"/>
</svg>`;
</script>

<style lang="scss">
@import './m-articles-card.scss';
</style>
