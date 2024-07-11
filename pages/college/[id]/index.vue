<template>
  <s-advantages :info="info" />
  <s-feedback />
  <s-popular-professions :collegeId="collegeId" :professions="professions.data" />
  <s-students-count :monitorings="monitorings" />
  <s-average-score :monitorings="monitorings" />
  <s-license :info="info" />
  <s-photo :photos="photos" />
  <s-questions :questions="questions" />
</template>

<script setup>
import getProfessions from '~/api/professions/getProfessions';
import { getIncludeData } from '~/composables/getIncludeData';

const props = defineProps({
  collegeId: { type: Number, default: 0 },
  info: { type: Object, default: () => ({}) },
  included: { type: Object, default: () => ({}) },
});

const route = useRoute();
const { id } = route.params;

definePageMeta({
  layout: 'layout-college',
});

const professions = ref({});
watch(props, async () => {
  setProfessions();
})

const monitorings = computed(() => {
  return getIncludeData(props.info, props.included, 'monitorings');
});

const photos = computed(() => {
  let arr = getIncludeData(props.info, props.included, 'galleries');
  arr.pop();
  return arr;
});

const questions = ref([
  'Как поступить?',
  'Есть ли бюджет?',
  'Можно ли учиться удаленно?',
  'Есть ли бесплатное обучение?',
  'Есть ли вуз при колледже?',
  'Можно учиться и работать?',
  'Можно перевестись из другого колледжа?',
]);

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

// временное решение
onBeforeMount(async () => {
  if (!/^(\-|\+)?([0-9]+|Infinity)$/.test(id)) {
    navigateTo('/colleges');
  }
});

onMounted(() => {
  setProfessions();
  emit('blocksNeed', true, true, false);
  emit('isQuestionSet', false);
});

const setProfessions = async () => {
  professions.value = await getProfessions({
    'page[size]': 10,
    'filter[college_id]': props.collegeId,
  });  
}
</script>

<style scoped lang="scss">
.s-feedback {
  margin-top: 0;
  margin-bottom: var(--a-margin-x4);
  @media (min-width: 980px) {
    display: none;
  }
}
</style>
