<template>
  <section id="quiz" class="s-quiz" :class="{ sub: isSub }">
    <div class="s-quiz__wrapper">
      <m-quiz-start
        v-if="currentComponent === 'm-quiz-start'"
        :quizTitle="quizTitle"
        :quizSubtitle="quizSubtitle"
        :quizText="quizText"
        section-id="s-quiz"
        @startQuiz="startQuiz"
      />
      <m-quiz-step
        v-if="currentComponent === 'm-quiz-step'"
        :question="questions[step].question"
        :answers="questions[step].answers"
        :backText="backText"
        section-id="s-quiz"
        @change-step="handleStepChange"
        @back="back"
      />
      <s-form
        v-if="currentComponent === 'm-quiz-form'"
        type="quiz"
        title="Мы подобрали для тебя колледж и обучение. Заполни форму, чтобы узнать больше"
        :answers="answers"
        section-id="s-quiz"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  isSub: { type: Boolean, default: false },
  quizTitle: { type: String, default: 'Куда поступить?' },
  quizSubtitle: { type: String, default: 'Будь уверен в своём выборе!' },
  quizText: { type: String, default: 'Ты пройдёшь квиз, а мы поможем найти лучший для тебя колледж.' },
});
const step = ref(0);
const backText = ref('Вернуться');
const currentComponent = ref('m-quiz-start');
const answers = ref([]);
const questions = [
  {
    question: 'К кaким профессиям вы более склонны?',
    answers: [
      { id: 1, text: 'Техническим' },
      { id: 2, text: 'Гуманитарным' },
      { id: 3, text: 'Творческим' },
      { id: 4, text: 'Медицинским' },
    ],
  },
  {
    question: 'Какой у вас уровень образования?',
    answers: [
      { id: 5, text: '9 классов' },
      { id: 6, text: '11 классов' },
      { id: 7, text: 'Другое' },
    ],
  },
  {
    question: 'Какой формат обучения вам подходит?',
    answers: [
      { id: 8, text: 'Очно' },
      { id: 9, text: 'Заочно' },
      { id: 10, text: 'По выходным' },
    ],
  },
  {
    question: 'Вас интересуют бюджетные места?',
    answers: [
      { id: 11, text: 'Да' },
      { id: 12, text: 'Нет' },
    ],
  },
  {
    question: 'И последний вопрос. Вы из Москвы?',
    answers: [
      { id: 13, text: 'Да' },
      { id: 14, text: 'Нет' },
    ],
  },
];

const startQuiz = () => {
  currentComponent.value = 'm-quiz-step';
};

const handleStepChange = (selectedAnswer) => {
  answers.value.push(`${questions[step.value].question} (${selectedAnswer})`); //
  step.value++;
  if (step.value >= questions.length) {
    currentComponent.value = 'm-quiz-form';
  }
};

const back = () => {
  if (step.value > 0) {
    step.value--;
    answers.value.pop();
  } else {
    answers.value = [];
    currentComponent.value = 'm-quiz-start';
  }
};

watchEffect(() => {
  backText.value = step.value === 0 ? 'Вернуться' : 'К предыдущему вопросу';
});
</script>

<style lang="scss">
@import './s-quiz.scss';
</style>
