<template>
  <section class="s-article-head">
    <div class="container">
      <div class="s-article-head__inner">
        <div class="s-article-head__tags f-text-xxs">
          <div class="s-article-head__tag">Статья</div>
          <div class="s-article-head__tag">Колледжи</div>
        </div>
        <h3 class="s-article-head__title title-h3">
          Запуск инновационного курса обучения: студенты готовятся к будущему
        </h3>
        <div class="s-article-head__date f-text-xxs violet-80">Опубликовано {{ date }}</div>
        <!-- <img class="s-article-head__img" src="/img/decor-logo.svg" alt=""> -->
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  date: { type: String, default: '9 февраля 2024' },
});
</script>

<style>
@import './s-article-head.scss';
</style>
