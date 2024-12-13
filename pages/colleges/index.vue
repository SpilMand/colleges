<template>
  <div class="container">
    <s-filter-new
      :filters="filtersArray"
      :breadcrumbs="breadcrumbs"
      :parsed-title="parsedTitle"
      :active-filters="filters"
      :is-dormitory="filters['domitory']"
      :maxVal="filters['max_cost']"
      :maxCost="maxCostFilter"
      :is-can-input="readonly"
      title="Колледжи и техникумы"
      @search="search"
      @open-map="toggleMap"
      @delete-filter="deleteFilter"
      @input-search="inputSearch"
      @changeDormitory="changeDormitory"
    />
  </div>
  <m-popup class="map-popup" :visible="isOpen" type="map" @close="toggleMap">
    <s-filter-new
      titleSize="h4"
      forPage="colleges"
      title="Колледжи и техникумы"
      :filters="filtersArray"
      :breadcrumbs="breadcrumbs"
      :parsed-title="parsedTitle"
      :active-filters="filters"
      :is-dormitory="filters['domitory']"
      :maxCost="maxCostFilter"
      :maxVal="filters['max_cost']"
      :is-can-input="readonly"
      :isMainFilter="false"
      :isMap="true"
      :countTablet="1"
      :countPC="1"
      :countMobile="1"
      :start-show-sub="true"
      @search="search"
      @open-map="toggleMap"
      @delete-filter="deleteFilter"
      @input-search="inputSearch"
      @changeDormitory="changeDormitory"
    />

    <m-map :markers="colleges" />
  </m-popup>
  <s-colleges-list id="start" :colleges="colleges" :curPage="curPage" />
  <a-pagination class="section-m" :countPage="countPage" :curPage="curPage" @updateCurPage="getCollegesList" />
  <s-about class="section-m" :onlyText="true" />
  <div class="container">
    <s-form
      id="form"
      class="about__form section-l"
      subtitle="Оставь заявку, наши менеджеры свяжутся с тобой,
        и помогут в поиске правильного учебного заведения!"
      title="Нужна помощь в выборе колледжа?"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br>
      условия <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
  </div>
</template>

<script setup>
import getColleges from '~/api/colleges/getColleges';
import getCities from '~/api/cities/getCities';
import getForms from '~/api/forms/getForms';
import getDirections from '~/api/directions/getDirections';

const colleges = ref([]);
const curPage = ref(0);
const countPage = ref();

const isOpen = ref(false);

const maxCostFilter = ref(0);

const cities = ref(
  await getCities({
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
    'sort': 'sort_millionaire',
  }),
);

const forms = await getForms();
const directions = await getDirections();

const route = useRoute();
const router = useRouter();

const types = [
  {
    attributes: { value: true, name: 'Государственный', slug: 'gosudarstvennie' },
    type: 'types',
  },
  {
    attributes: { value: false, name: 'Негосударственный', slug: 'negosudarstvennie' },
    type: 'types',
  },
];

const conditions = [
  { attributes: { value: true, name: 'Бюджет', slug: 'budget' }, type: 'conditions' },
  {
    attributes: { value: undefined, name: 'Платно', slug: 'platno' },
    type: 'conditions',
  },
];

const bases = [
  { attributes: { value: '9', name: 'После 9 класса', slug: '9_class' }, type: 'bases' },
  {
    attributes: { value: '11', name: 'После 11 класса', slug: '11_class' },
    type: 'bases',
  },
];

const filtersArray = ref([
  {
    name: 'city',
    placeholder: 'Любой',
    hint: 'Город',
    data: cities.value.data,
    chosen: '',
    readonly: false,
  },
  {
    placeholder: 'Любая',
    hint: 'База обучения',
    data: bases,
    chosen: '',
  },
  {
    placeholder: 'Любой',
    hint: 'Вид колледжа',
    data: types,
    chosen: '',
    disabled: false,
  },
  {
    placeholder: 'Любое',
    hint: 'Направление',
    data: directions.data,
    chosen: '',
    disabled: false,
  },
  {
    placeholder: 'Любые',
    hint: 'Условия',
    data: conditions,
    chosen: '',
    disabled: false,
  },
  {
    placeholder: 'Любая',
    hint: 'Форма обучения',
    data: forms.data,
    chosen: '',
    disabled: false,
  },
]);

const filters = ref({
  types: {},
  directions: {},
  title: 'колледжи и техникумы',
  cities: {},
  forms: {},
  bases: {},
  conditions: {},
  domitory: route.query['domitory'] === 'true' ?? false,
  max_cost: +route.query['max_cost'],
});

const breadcrumbs = computed(() => {
  let arr = [{ label: 'Колледжи' }];
  for (let item of Object.entries(filters.value)) {
    if (item[0] !== 'title' && item[0] !== 'max_cost') {
      let label;
      switch (item[1].type) {
        case 'types':
          label = `${item[1].attributes.name.slice(0, item[1].attributes.name.length - 1)}е колледжи`;
          break;
        case 'directions':
          label = `${item[1].attributes.name} колледжи`;
          break;
        case 'cities':
          label = `Колледжи ${item[1].attributes.name_rp}`;
          break;
        case 'forms':
          label = `${item[1].attributes.name.slice(0, item[1].attributes.name.length - 1)}ые колледжи`;
          break;
        default:
          label = item[1].attributes?.name;
          break;
      }
      if (item[0] === 'domitory') {
        if (item[1]) {
          label = 'Колледжи с общежитием';
        }
      }
      if (label) {
        arr.push({ label: label });
      }
    }
  }
  return arr;
});

const getTitles = (item) => {
  filters.value[item.type] = item;

  switch (true) {
    case item.type === 'cities':
      filters.value.cities.attributes.text =
        item.attributes.name_rp.charAt(0).toUpperCase() + item.attributes.name_rp.slice(1);
      break;
    case item.type === 'types':
      filters.value.types.attributes.text = item.attributes.name.slice(0, item.attributes.name.length - 1) + 'е';
      break;
    case !item?.type:
      return false;
    default:
      filters.value[item.type].attributes.text = item.attributes.name.toLowerCase();
  }
};

const options = ref([]);

const getCollegesList = async (num, pageSize) => {
  const currentCity = filters.value.cities.id
    ? filtersArray.value[0].data.find((city) => city.id === filters.value.cities.id)
    : null;

  // eslint-disable-next-line max-len
  const is_state =
    filters.value.types.attributes && filters.value.types.attributes.slug === 'gosudarstvennie' ? true : false;
  // eslint-disable-next-line max-len
  const has_free =
    filters.value.conditions.attributes && filters.value.conditions.attributes.slug === 'platno' ? true : false;
  // eslint-disable-next-line max-len
  const base =
    // eslint-disable-next-line max-len
    filters.value.bases.attributes && filters.value.bases.attributes?.value
      ? filters.value.bases.attributes.value
      : null;

  options.value = Object.entries({
    'page[size]': pageSize ?? 15,
    'page[number]': num ?? num + 1,
    'filter[hasSpecialties]': true,
    'filter[city_id]': filters.value.cities.id,
    'filter[is_state]': is_state,
    'filter[directions]': filters.value.directions.id,
    'filter[forms]': filters.value.forms.id,
    'filter[specialties_base]': base,
    'filter[is_hostel]': typeof filters.value.domitory === 'boolean' ? filters.value.domitory : null,
    'filter[has_free]': has_free,
    'filter[cost][max]': filters.value.max_cost ?? colleges.value.meta.max_cost,
    'filter[has_coordinates]': isOpen.value,
    'sort': 'sort',
    'include': ['monitorings,media'],
  })
    .filter(([, v]) => v != null && v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  curPage.value = num;

  filtersArray.value.forEach((filter) => {
    if (filter.data[0].type !== 'cities' && filter.data[0].type !== 'bases') {
      filter.disabled = !(currentCity && currentCity.attributes.ratio_population === 'Города-миллионеры');
    }
  });

  colleges.value = await getColleges(options.value);

  maxCostFilter.value = colleges.value.meta.max_cost;
  countPage.value = colleges.value.meta.page.lastPage;
};

const search = async (item, key) => {
  curPage.value = 0;

  if (typeof item === 'object') {
    filters.value[item.type] = item;

    // если город не миллионник сбрасываем все фильтры кроме города и базы обучения
    if (item.type === 'cities' && item.attributes.ratio_population !== 'Города-миллионеры') {
      Object.keys(filters.value).forEach((filterKey) => {
        if (filterKey !== 'cities' && filterKey !== 'bases') {
          filters.value[filterKey] = {};
        }
      });
    }
  } else {
    if (typeof item !== 'boolean' && typeof item !== 'number') {
      filters.value[key].value = item;
    } else {
      filters.value[key] = item;
    }
  }

  getUrl();
};

const parsedTitle = computed(() => {
  let arr = [];
  Object.entries(filters.value).forEach((element) => {
    if ((Object.values(element[1]).length > 0 && element[0] !== 'title') || element[0] === 'directions') {
      switch (element[0]) {
        case 'forms':
          //eslint-disable-next-line
          arr.splice(
            0,
            0,
            filters.value.forms.attributes.name.slice(0, filters.value.forms.attributes.name.length - 1) + 'ые',
          );
          break;
        case 'types':
          //eslint-disable-next-line
          arr.splice(
            1,
            0,
            filters.value.types.attributes.name.slice(0, filters.value.types.attributes.name.length - 1).toLowerCase() +
              'е',
          );
          break;
        case 'directions':
          //eslint-disable-next-line
          arr.splice(
            2,
            0,
            filters.value.directions.attributes
              ? `${filters.value.directions.attributes.name.toLowerCase()} колледжи`
              : 'колледжи и техникумы',
          );
          break;
        case 'cities':
          arr.splice(3, 0, filters.value.cities.attributes.name_rp);
          break;
        case 'bases':
          arr.splice(4, 0, filters.value.bases.attributes.name.toLowerCase());
          break;
        case 'conditions':
          if (filters.value.conditions.attributes?.name === 'Бюджет') {
            arr.splice(5, 0, 'на бюджет');
          } else if (filters.value.conditions.attributes?.name === 'Платно') {
            arr.splice(5, 0, 'на платной основе');
          }
          break;
      }
    }
  });

  const parsed = arr.join(' ');

  return parsed.charAt(0).toUpperCase() + parsed.slice(1);
});

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

const getChosen = (item) => {
  let chosenArray = filtersArray.value.find((filter) => filter.data[0].type === item.type);
  const chosen = chosenArray.data.find((filter) => filter.attributes.name === item.attributes.name);
  chosenArray.chosen = chosen.attributes.name;
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

  getUrl();
};

const getUrl = () => {
  let url = '/colleges';
  let urlQuery = {};

  Object.keys(filters.value).forEach((key) => {
    if (typeof filters.value[key] !== 'boolean' && typeof filters.value[key] !== 'number') {
      if (filters.value[key] && filters.value[key].attributes && filters.value[key].attributes.slug) {
        url += `/${filters.value[key].attributes.slug}`;
      }
    }

    if (typeof filters.value[key] === 'boolean' || typeof filters.value[key] === 'number') {
      if (filters.value[key]) {
        urlQuery[key] = filters.value[key].toString();
      }
    }
  });

  router.push({ path: url, query: urlQuery });
};

const getFilters = () => {
  const urlArray = route.path.split('/').filter((el) => el.trim() !== '' && el !== 'colleges');

  if (urlArray.length > 0) {
    urlArray.forEach((el) => {
      filtersArray.value.forEach((filter) => {
        const find = filter.data.find((filterEl) => filterEl.attributes.slug === el);

        if (find) {
          filters.value[find.type] = find;

          if (typeof filters.value[find.type] === 'object') {
            getChosen(filters.value[find.type]);
            getTitles(filters.value[find.type]);
          }
        }
      });
    });
  }

  getCollegesList(0);
};

const inputSearch = async (name) => {
  cities.value = await getCities({
    'filter[name]': name,
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
  });

  filtersArray.value[0].data = cities.value.data;
};

const changeDormitory = () => {
  filters.value['domitory'] = !filters.value['domitory'];

  getUrl();
};

const toggleMap = async () => {
  isOpen.value = !isOpen.value;
  localStorage.setItem('isMapOpen', isOpen.value);

  getCollegesList(1, 100);
};

getFilters();

onMounted(() => {
  isOpen.value = JSON.parse(localStorage.getItem('isMapOpen'));
});
</script>

<style lang="scss">
@import './colleges.scss';
</style>
