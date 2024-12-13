<template>
  <div v-if="professions.data" class="professions">
    <h3 class="title-h3">{{ pageTitle }}</h3>
    <div class="professions__filter">
      <a-select
        placeholder="Любая"
        :options="specialties.data"
        hint="Специальность"
        param="spec"
        @addFilter="addFilter"
      />
      <a-select placeholder="Любая" :options="actuality" hint="Актуальность" param="act" @addFilter="addFilter" />
      <s-feedback />
    </div>
    <div class="professions__cards">
      <m-college-professions-card
        v-for="(profession, index) in professions.data"
        :key="index"
        :info="profession"
        forWhat="college"
      />
    </div>
    <a-pagination :curPage="curPage" :countPage="professions.meta.page.lastPage" @updateCurPage="updateCurPage" />
  </div>
</template>

<script setup>
import getProfessions from '~/api/professions/getProfessions';
// import getSpecialties from '~/api/colleges/getSpecialties';
import getOksos from '~/api/okso/getOksos';
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

definePageMeta({
  layout: 'layout-college',
});

const props = defineProps({
  collegeId: { type: Number, default: 0 },
});

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

const pageTitle = ref('Профессии колледжа');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

onMounted(async () => {
  emit('blocksNeed', true, true, true);
  emit('isQuestionSet', false);
  updateCurPage(0);
  specialties.value = await getOksos({ 'filter[college_id]': props.collegeId }, props.collegeId);
});

const professions = ref({});
const specialties = ref({});
const relevanceStatuses = ref(['is_perspective', 'is_old', 'is_future']);
const actuality = ref([
  { attributes: { value: 'is_perspective', name: 'Перспективная' } },
  { attributes: { value: 'is_future', name: 'Профессии будущего' } },
  { attributes: { value: 'is_old', name: 'Уходящие' } },
]);
const filter = ref({});
const addFilter = (data) => {
  const {
    type,
    id,
    attributes: { value },
  } = data;

  if (type === 'okso-specialties') {
    filter.value.oksoSpecialties = id.toString();
  } else if (type === undefined) {
    relevanceStatuses.value.forEach((status) => (filter.value[status] = false));

    filter.value[value] = true;
  }

  updateCurPage(0);
};

// const specialtiesInfo = ref();

const curPage = ref(0);
const updateCurPage = async (num) => {
  const additionallyFilter = Object.keys(filter.value)
    .filter((k) => relevanceStatuses.value.includes(k) && filter.value[k])
    .reduce((f, filterKey) => {
      f[`filter[${filterKey}]`] = true;

      return f;
    }, {});

  curPage.value = num;
  professions.value = await getProfessions({
    'page[number]': curPage.value + 1,
    'page[size]': 9,
    'filter[college_id]': props.collegeId,
    'filter[oksoSpecialties]': filter.value.oksoSpecialties ? filter.value.oksoSpecialties : undefined,
    ...additionallyFilter,
  });
  // specialtiesInfo.value = await getSpecialties({

  // })
};
</script>

<style>
@import './professions.scss';
</style>
