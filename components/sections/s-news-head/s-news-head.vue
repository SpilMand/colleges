<template>
  <section class="s-news-head">
    <div class="container">
      <div class="s-news-head__inner">
        <div class="s-news-head__tags f-text-xxs">
          <div class="s-news-head__tag f-text-xxs">
            <div v-for="(theme, index) in themes" :key="index" class="s-news-head__tag f-text-xxs">
              {{ theme.attributes?.theme }}
            </div>
          </div>
        </div>
        <h3 class="s-news-head__title title-h3">
          {{ info.data?.attributes.name }}
        </h3>
        <div class="s-news-head__date f-text-xxs violet-80">Опубликовано {{ createdAt }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  info: { type: Object, default: () => ({}) },
});

const createdAt = computed(() => {
  let date = new Date(props.info.data?.attributes.created_at);
  return date.toLocaleDateString('ru');
});

const themes = computed(() => {
  return props.info.included?.filter((item) => item.type === 'themes') || [];
});
</script>

<style lang="scss" scoped>
@import './s-news-head.scss';
</style>
