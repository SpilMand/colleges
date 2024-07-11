<template>
  <div v-if="specialties && info.attributes" class="specialties">
    <h3 id="start" class="title-h3">Специальности колледжа {{ info.attributes.short_name }}</h3>
    <div class="specialties__filter">
      <a-select placeholder="Любая" :options="eduForm.data" hint="Форма обучения" param="form" @addFilter="addFilter" />
      <a-select placeholder="Любая" :options="eduBase" hint="База обучения" param="base" @addFilter="addFilter" />
      <s-feedback />
    </div>
    <div v-if="specialties" class="specialties__cards">
      <m-specialization-card
        v-for="(specialty, index) in specialties.data"
        :key="index"
        :info="specialty"
        :included="specialties.included"
      />
    </div>
    <a-pagination :curPage="curPage" :countPage="specialties.meta.page.lastPage" @updateCurPage="updateCurPage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import getSpecialties from '~/api/colleges/getSpecialties';
import getForms from '~/api/forms/getForms';

definePageMeta({
  layout: 'layout-college',
});

const props = defineProps({
  collegeId: { type: String, default: '' },
  info: { type: Object, default: () => ({}) },
});

const eduForm = await getForms();
const eduBase = ref([
  { attributes: { value: '9', name: 'После 9 класса' } },
  { attributes: { value: '11', name: 'После 11 класса' } },
]);

const specialties = ref();
const filters = ref([]);

const addFilter = (key, value) => {
  filters.value[key] = value;
  curPage.value = 0;
  updateCurPage(curPage.value);
};

const curPage = ref(0);
const updateCurPage = async (num) => {
  curPage.value = num;
  specialties.value = await getSpecialties(props.collegeId, {
    'page[number]': curPage.value + 1,
    'page[size]': 15,
    'include': 'oksoSpecialty,form',
    'filter[form]': filters.value.form ? filters.value.form.id : undefined,
    'filter[base]': filters.value.base ? filters.value.base.attributes.value : undefined,
  });
};

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

onMounted(async () => {
  setTimeout(() => {
    updateCurPage(0);
  });
  emit('blocksNeed', true, false, false);
  emit('isQuestionSet', false);
});
</script>

<style>
@import './specialties.scss';
</style>
