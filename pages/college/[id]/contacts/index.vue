<template>
  <div class="contacts">
    <s-contacts :info="info" :city="city" class="section-l" :pageTitle="pageTitle" />
    <s-other-branches v-if="faculties.length > 0" :faculties="faculties" />
    <!-- <s-contacts :info="info" :city="city" :isAdmission="true" class="section-m" /> -->
  </div>
</template>

<script setup>
import { getIncludeData } from '~/composables/getIncludeData';
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

const props = defineProps({
  info: { type: Object, default: () => ({}) },
  included: { type: Object, default: () => ({}) },
});

definePageMeta({
  layout: 'layout-college',
});

const faculties = computed(() => getIncludeData(props.info, props.included, 'childColleges'));

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

const pageTitle = ref('Контакты колледжа');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

onMounted(() => {
  emit('blocksNeed', true, false, false);
  emit('isQuestionSet', false);
});

const contacts = computed(() => {
  return getIncludeData(props.info, props.included, 'admissionOffices');
});
const city = computed(() => {
  return getIncludeData(props.info, props.included, 'city');
});
</script>
