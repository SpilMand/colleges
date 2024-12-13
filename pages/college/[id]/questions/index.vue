<template>
  <div class="questions">
    <h3 class="title-h3">{{ pageTitle }}</h3>
    <div class="questions__list">
      <m-question-card
        v-for="question in questions"
        :key="question.id"
        :question="question"
        :answers="getIncludeData(question, included, 'children')"
      />
      <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
    </div>
    <s-ask class="section-m" title="Задайте свой вопрос" :themes="themes" />
  </div>
</template>
<script setup>
import getQuestions from '~/api/colleges/getQuestions';
import getTheme from '~/api/questions/getTheme';
import getQuestionThemes from '~/api/questionThemes/getQuestionThemes';
import { getIncludeData } from '~/composables/getIncludeData';
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

definePageMeta({
  layout: 'layout-college',
});

const curPage = ref(0);
const displayCount = ref(10);
const countPage = ref();
const route = useRoute();
const pageTitle = ref('Вопросы о колледже');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

const updateCurPage = (num) => {
  curPage.value = num;

  renderQuestions();
};

const themes = ref([]);
const questions = ref([]);

const included = ref();

async function renderQuestions() {
  questions.value = [];

  const questionsRes = await getQuestions(route.params.id, {
    'filter[colleges]': route.params.id,
    'page[number]': curPage.value + 1,
    'page[size]': displayCount.value,
    'filter[is_parent]': true,
    'include': 'children',
  });

  included.value = questionsRes.included;

  const { total } = questionsRes.meta.page;

  countPage.value = Math.ceil(total / displayCount.value);

  questionsRes.data.forEach(async (q) => {
    try {
      const { id: questionId } = q;
      const theme = await getTheme(questionId);

      questions.value.push({
        ...q,
        theme: theme.data.attributes.name,
      });
    } catch (error) {
      throw error;
    }
  });
}

async function renderThemes() {
  const res = await getQuestionThemes();
  themes.value = res.data;
}

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

onMounted(() => {
  renderQuestions();
  renderThemes();
  emit('blocksNeed', true, false, false);
  emit('isQuestionSet', true);
});
</script>
<style>
@import './questions.scss';
</style>
