<template>
  <div class="a-answer">
    <div class="a-answer__info">
      <div class="a-answer__name f-text-s f-font-700">{{ name }}</div>
      <div class="a-answer__date f-text-xxs gray">{{ date }}</div>
    </div>
    <p class="a-answer__text f-text-s">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, default: 'Имя Фамилия' },
  date: { type: String, default: '1 января 1970' },
  text: { type: String, default: 'Ответ' },
});
</script>

<style>
@import './a-answer.scss';
</style>
