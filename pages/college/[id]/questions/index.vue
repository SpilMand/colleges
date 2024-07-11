<template>
  <div class="questions">
    <h3 class="title-h3">Вопросы о колледже</h3>
    <div class="questions__list">
      <m-question-card v-for="(question, index) in questions.data" :key="index" :info="question" :included="questions.included" />
      <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
    </div>
    <s-ask class="section-m" title="Задайте свой вопрос" :themes="themes" />
  </div>
</template>

<script setup>
import getQuestions from '~/api/colleges/getQuestions';

definePageMeta({
  layout: 'layout-college',
});

const props = defineProps({
  collegeId: { type: String, default: '' }
})

const curPage = ref(0);
const countPage = ref();
const updateCurPage = (num) => {
  curPage.value = num;
  countPage.value = questions.value.meta.page.lastPage;
};

const questions = ref({});

const themes = ref([
  { value: 'college', label: 'о колледже' },
  { value: 'education', label: 'обучение' },
  { value: 'professions', label: 'профессии' },
  { value: 'specialties', label: 'специальности' },
  { value: 'other', label: 'другое' },
]);

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

onMounted(async() => {
  questions.value = await getQuestions(props.collegeId, {
    'include': 'theme,user'
  });
  updateCurPage(0);
  emit('blocksNeed', true, false, false);
  emit('isQuestionSet', true);
});
</script>
<style>
@import './questions.scss';
</style>
