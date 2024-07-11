<template>
  <div v-if="professions.data" class="professions">
    <h3 class="title-h3">Профессии колледжа</h3>
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
    <div v-if="specialtiesInfo.data" class="professions__cards">
      <m-college-professions-card
        v-for="(profession, index) in professions.data"
        :key="index"
        :info="profession"
        forWhat="college"
        :specInfo="specialtiesInfo"
      />
    </div>
    <a-pagination :curPage="curPage" :countPage="professions.meta.page.lastPage" @updateCurPage="updateCurPage" />
  </div>
</template>

<script setup>
import getProfessions from '~/api/professions/getProfessions';
import getSpecialties from '~/api/specialties/getSpecialties';
import getOksos from '~/api/okso/getOksos';

definePageMeta({
  layout: 'layout-college',
});

const props = defineProps({
  collegeId: { type: String, default: '' },
});

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

onMounted(async () => {
  emit('blocksNeed', true, true, true);
  emit('isQuestionSet', false);
  updateCurPage(0);
  specialties.value = await getOksos({
    'filter[college_id]': props.collegeId
  });
});

const specialties = ref({});
const actuality = ref([
  { attributes: { value: 'is_perspective', name: 'Перспективные' } },
  { attributes: { value: 'is_future', name: 'Профессии будущего' } },
  { attributes: { value: 'is_now', name: 'Востребованные' } },
  { attributes: { value: 'is_old', name: 'Уходящие' } },
]);
const filters = ref({
  actuality: {
    is_perspective: false,
    is_future: false,
    is_now: false,
    is_old: false
  }
});
const addFilter = (key, value) => {
  switch (key) {
    case 'spec':
      filters.value.oksoSpecialties = value.id;
      break;
    case 'act':
      for (let filter in filters.value.actuality) {
        filters.value.actuality[filter] = false;
      }
      filters.value.actuality[value.attributes.value] = true;
      break;
  }
  // filters.value.specialty = spec;
  // if (act) {
  //   filters.value[act] = true;
  // }
  updateCurPage(0);
};

const professions = ref({});
const specialtiesInfo = ref();

const curPage = ref(0);
const updateCurPage = async (num) => {
  curPage.value = num;
  professions.value = await getProfessions({
    'page[number]': curPage.value + 1,
    'page[size]': 9,
    'filter[college_id]': props.collegeId,
    'filter[oksoSpecialties]': filters.value.oksoSpecialties,
    'filter[is_perspective]': filters.value.actuality.is_perspective,
    'filter[is_future]': filters.value.actuality.is_future,
    'filter[is_now]': filters.value.actuality.is_now,
    'filter[is_old]': filters.value.actuality.is_old,
  });
  getSpecInfo();
};

const getSpecInfo = async () => {
  let arr = [];
  for (let prof of professions.value.data) {
    arr.push(prof.id);
  }
  specialtiesInfo.value = await getSpecialties({
    'filter[college_id]': props.collegeId,
    'filter[professions]': String(arr),
    'show[professionsIds]': true,
  })
}
</script>

<style>
@import './professions.scss';
</style>
