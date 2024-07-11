<template>
  <div v-if="info.data" class="specialties-colleges">
    <s-filter :title="`Обучение специальности «<b>${info.data.attributes.name}</b>» в колледжах <b>России</b>:`" :isMainFilter="false" titleSize="h4" forPage="profession" :colleges="collegesForSelect" :countPC="4" :oksoId="info.data.id" @search="search" />
    <h5 class="specialties-colleges__title title-h5">Найдено {{ getTitle(colleges, 'колледж') }}:</h5>
    <!-- {{ colleges }} -->
    <div class="specialties-colleges__content section-m">
      <m-card v-for="(college, index) in colleges.data" :key="index" :options="college" :included="colleges.included" :alternative="1" :oksoData="info.data" />
      <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
    </div>
  </div>
</template>

<script setup>
import getColleges from '~/api/colleges/getColleges';
import { getTitle } from '~/composables/utils';

definePageMeta({
  layout: 'layout-profession',
});

const props = defineProps({
  info: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['forWhat', 'needBlocks']);

const router = useRoute();
const colleges = ref({});

const curPage = ref(0);
const countPage = ref();
const filters = ref({});

const search = async ({ city, college }) => {
  curPage.value = 0;
  filters.value = { city, college };
  updateCurPage(0);
};

const updateCurPage = async (num) => {
  curPage.value = num;
  colleges.value = await getColleges({
    'include': 'city,specialties,forms',
    'filter[oksoSpecialties]': router.params.id,
    'filter[city_id]': filters.value.city,
    'filter[id]': filters.value.college && filters.value.college != '' ? String(filters.value.college) : undefined,
  });
  countPage.value = colleges.value.meta.page.lastPage;
};

const collegesForSelect = ref({});

const collegesTitles = ref([]);
const headTitle = ref(`«Безопасность информационных технологий в правоохранительной сфере»`);

onMounted(() => {
  updateCurPage(0).then(async () => {
    collegesForSelect.value = await getColleges(
      {
        'page[size]': colleges.value.meta.page.total,
        'filter[oksoSpecialties]': router.params.id,
      },
      'select',
    );
  });
  for (let index = 0; index < colleges.value.length; index++) {
    collegesTitles.value.push({ label: colleges.value[index].title });
  }
  emit('forWhat', 'specialties', headTitle.value);
  emit('needBlocks', true, 'Популярные колледжи');
});
</script>

<style lang="scss">
.specialties-colleges {
  .s-filter {
    margin: var(--a-margin-x20) 0 var(--a-margin-x6);
  }
  &__title {
    margin-bottom: var(--a-margin-x6);
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);
    @media (min-width: 1200px) {
      gap: to-rem(20);
    }
  }
}
</style>
