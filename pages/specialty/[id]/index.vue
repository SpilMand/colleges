<template>
  <div v-if="info.data" class="specialties-colleges">
    <s-filter-new
      :filters="filtersArray"
      :title="`Обучение специальности «<b>${info.data.attributes.name}</b>» в колледжах <b>России</b>:`"
      :isMainFilter="false"
      titleSize="h4"
      :countPC="3"
      :active-filters="filters"
      :oksoId="info.data.id"
      @search="search"
      @input-search="inputSearch"
      @delete-filter="deleteFilter"
    />
    <h5 class="specialties-colleges__title title-h5">Найдено {{ getTitle(colleges, 'колледж') }}:</h5>
    <div class="specialties-colleges__content section-m">
      <m-card
        v-for="(college, index) in colleges.data"
        :key="index"
        :options="college"
        :included="colleges.included"
        :alternative="1"
        :oksoData="info.data"
      />
      <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
    </div>
  </div>
</template>

<script setup>
import getColleges from '~/api/colleges/getColleges';
import getCities from '~/api/cities/getCities';
import useCanonicalHead from '~/composables/useCanonicalHead';
import { getTitle } from '~/composables/utils';

useCanonicalHead();

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
const options = ref({});

const cities = ref(
  await getCities({
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
    'sort': 'sort_millionaire',
  }),
);

const filters = ref({
  cities: null,
});

const filtersArray = ref([
  {
    name: 'city',
    placeholder: 'Любой',
    hint: 'Город',
    data: cities.value.data,
    chosen: '',
    readonly: false,
  },
]);

const search = (item) => {
  curPage.value = 0;

  filters.value.cities = item;
  filtersArray.value[0].chosen = item.attributes.name;

  updateCurPage(curPage.value);
};

const updateCurPage = async (num) => {
  curPage.value = num;

  options.value = Object.entries({
    'page[number]': curPage.value + 1,
    'page[size]': 11,
    'include': 'city,specialties,forms',
    'filter[oksoSpecialties]': router.params.id,
    'filter[city_id]': filters.value.cities ? filters.value.cities.id : null,
    'filter[id]': filters.value.college || undefined,
  })
    .filter(([_, v]) => v != null && v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  colleges.value = await getColleges(options.value);

  countPage.value = colleges.value.meta.page.lastPage;
};

const deleteFilter = (type) => {
  if (type === 'all') {
    deleteAllFilters();
  } else {
    filters.value[type] = {};
    clearChosen(type);
  }
};

const deleteAllFilters = () => {
  Object.keys(filters.value).forEach((key) => {
    if (key !== 'title' && typeof filters.value[key] !== 'boolean' && typeof filters.value[key] !== 'number') {
      filters.value[key] = {};
    }

    if (typeof filters.value[key] === 'boolean') {
      filters.value[key] = false;
    }

    if (typeof filters.value[key] === 'number') {
      filters.value[key] = 0;
    }
  });

  clearChosen('all');
};

const clearChosen = (type) => {
  if (type === 'all') {
    filtersArray.value.forEach((filter) => {
      filter.chosen = '';
    });
  } else {
    let chosenArray = filtersArray.value.find((filter) => filter.data[0].type === type);
    chosenArray.chosen = '';
  }

  updateCurPage(0);
};

const inputSearch = async (name) => {
  cities.value = await getCities({
    'filter[name]': name,
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
  });

  filtersArray.value['cities'].data = cities.value.data;
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

watch(
  () => props.info,
  (val) => {
    const pageTitle = ref(`Специальность «${val.data.attributes.name}»`);

    useHead({
      title: `${pageTitle.value} | Колледжи.рф`,
      // eslint-disable-next-line max-len
      description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
    });
  },
);
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

  .s-filter__filters-buttons {
    display: none;
  }
}
</style>
