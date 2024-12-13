<!-- eslint-disable max-len -->
<template>
  <div class="profession-colleges">
    <s-filter-new
      :filters="filtersArray"
      :title="filterTitle"
      :isMainFilter="false"
      titleSize="h4"
      :countPC="3"
      :active-filters="filters"
      @search="search"
      @input-search="inputSearch"
      @delete-filter="deleteFilter"
    />
    <s-feedback :collegeHelp="true" />
    <h5 v-if="specialtiesProfession.meta" class="profession-colleges__title title-h5">{{ getTitle() }}</h5>
    <div class="profession-colleges__content section-m">
      <ClientOnly>
        <div v-for="(card, index) in filteredArray" :key="index">
          <m-profession-specialties-card :options="card" :professionAll="professionAll" />
        </div>
      </ClientOnly>
      <a-pagination
        :curPage="curPage"
        :countPage="specialtiesProfession.meta?.page?.lastPage"
        @updateCurPage="updateCurPage"
      />
    </div>
    <s-quiz
      quizSubtitle="Ответь на 7 простых вопросов"
      quizText="и мы поможем выбрать лучший для тебя колледж"
      class="section-m"
    />
  </div>
</template>
<script setup>
import getProfessionSpecialty from '~/api/professions/getProfessionSpecialty';
import getCities from '~/api/cities/getCities';
import useCanonicalHead from '~/composables/useCanonicalHead';
import { useCityIdStore } from '~/store/city';

definePageMeta({
  layout: 'layout-profession',
});

useCanonicalHead();

const props = defineProps({
  info: { type: Object, default: () => ({}) },
});

const cityStore = useCityIdStore();
const selectedCityOptionValueRp = computed(() => cityStore.$state.selectedOptionValueRp);

const emit = defineEmits(['forWhat', 'needBlocks']);

const filterTitle = computed(() => {
  // const professionName = props.info?.data?.attributes?.name.split('профессия ')[1];
  const professionName = props.info?.data?.attributes?.name;
  return `<b>Обучение</b> профессии «<b>${professionName}</b>» в
    колледжах <b>${selectedCityOptionValueRp.value ? selectedCityOptionValueRp.value : 'России'}</b>`;
});
const route = useRoute();
const curPage = ref(0);
// const countPage = ref();
// const specialties = ref({});
const headTitle = ref(`«Менеджер по информационной безопасности» в Москве`);
const specialtiesProfession = ref({});
const professionAll = ref({});
const filteredArray = ref({});
const mappingArray = ref({});
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

const search = async (item) => {
  curPage.value = 0;

  filters.value.cities = item;
  filtersArray.value[0].chosen = item.attributes.name;

  updateCurPage(curPage.value);
};

const getTitle = () => {
  let title;
  let count = specialtiesProfession.value.meta.page.total;
  // const allData = specialties.value.data;
  // let count = 0;
  // for (const item of allData) {
  //   count += item.colleges_count;
  // }
  if (count % 10 == 1) {
    title = `Найдена ${count} специальность`;
  } else if (count % 10 <= 4) {
    title = `Найдены ${count} специальности`;
  } else {
    title = `Найдено ${count} специальностей`;
  }
  return title;
};

const updateCurPage = async (num) => {
  curPage.value = num;

  options.value = Object.entries({
    'page[number]': curPage.value + 1,
    'page[size]': 15,
    'filter[city_id]': filters.value.cities ? filters.value.cities.id : null,
    'include': 'college',
  })
    .filter(([, v]) => v != null && v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  const { data, included } = await getProfessionSpecialty(route.params.id, options.value);

  mappingArray.value = data;
  professionAll.value = included;

  filterArray();
};

const filterArray = () => {
  let arrTemporary = [];

  // создаю массив объектов. объект вида {index: okso_specialty_id, arr: [{},{}]}
  const newA = mappingArray.value.map((element) => {
    if (!arrTemporary.some((obj) => obj.index === element.attributes.okso_specialty_id)) {
      const obj = { index: element.attributes.okso_specialty_id, arr: [] };
      arrTemporary.push(obj);
    }
    return element;
  });

  newA.map((element) => {
    const currentObj = arrTemporary.find((item) => item.index === element.attributes.okso_specialty_id);
    currentObj.arr.push(element);
  });

  filteredArray.value = arrTemporary;
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

const inputSearch = async (name) => {
  cities.value = await getCities({
    'filter[name]': name,
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
  });

  filtersArray.value['cities'].data = cities.value.data;
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

onMounted(async () => {
  updateCurPage(0);

  cityStore.$state.selectedOptionValueRp = '';
  cityStore.$state.selectedOptionValue = '';

  emit('forWhat', 'profession', headTitle.value);
  emit('needBlocks', false, 'Похожие профессии');
});

watch(
  () => props.info,
  (val) => {
    const pageTitle = ref(`Специальности профессии «${val.data.attributes.name}»`);

    useHead({
      title: `${pageTitle.value} | Колледжи.рф`,
      // eslint-disable-next-line max-len
      description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
    });
  },
);
</script>

<style lang="scss">
.profession-colleges {
  .s-feedback {
    margin-top: var(--a-margin-x4);

    @media (min-width: 1550px) {
      display: none;
    }
  }

  &__title {
    margin: var(--a-margin-x6) 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);

    @media (min-width: 1200px) {
      gap: to-rem(20);
    }
  }

  .m-card__info-sub {
    width: 100%;
  }

  .m-card__info-main {
    flex-direction: column-reverse;
  }
}
</style>
