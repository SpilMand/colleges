<template>
  <div class="m-quiz-start">
    <div class="m-quiz-start__img">
      <img loading="lazy" :src="quizImgSrc" :alt="quizImgAlt" />
    </div>

    <div class="m-quiz-start__box">
      <h2 class="m-quiz-start__title violet-100 title-h2">{{ quizTitle }}</h2>
      <div>
        <div class="m-quiz-start__subtitle subtitle f-font-700">{{ quizSubtitle }}</div>
        <p class="m-quiz-start__text">{{ quizText }}</p>
      </div>

      <a-button
        :label="quizButtonLabel"
        color="orange"
        size="large"
        textSize="f-text-m"
        class="m-quiz-start__button"
        @click="startQuiz"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  quizTitle: { type: String, default: '' },
  quizSubtitle: { type: String, default: '' },
  quizText: { type: String, default: '' },
});

import { defineEmits } from 'vue';

const emit = defineEmits(['startQuiz']);
const startQuiz = () => {
  emit('startQuiz');
};

const quizImgSrc = '/img/quiz/quiz.png';
const quizImgAlt = '';
const quizButtonLabel = 'Пройти квиз';
</script>

<style lang="scss">
@import './m-quiz-start.scss';
</style>
