<template>
  <section class="s-article-head">
    <div class="container">
      <div class="s-article-head__inner">
        <div class="s-article-head__tags f-text-xxs">
          <div class="s-article-head__tag">Статья</div>
          <div class="s-article-head__tag">Колледжи</div>
        </div>
        <h3 class="s-article-head__title title-h3">
          {{ info.data?.attributes.name }}
        </h3>
        <div class="s-article-head__date f-text-xxs violet-80">Опубликовано {{ createdAt }}</div>
        <!-- <img class="s-article-head__img" src="/img/decor-logo.svg" alt=""> -->
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
</script>

<style>
@import './s-article-head.scss';
</style>
