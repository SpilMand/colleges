<template>
  <div class="specialties professions">
    <div class="container">
      <s-filter-new
        :filters="filtersArray"
        :breadcrumbs="breadcrumbs"
        :parsed-title="parsedTitle"
        :active-filters="filters"
        :maxVal="filters['max_cost']"
        :maxCost="maxCostFilter"
        :is-can-input="readonly"
        title="Колледжи и техникумы"
        @search="search"
        @delete-filter="deleteFilter"
        @input-search="inputSearch"
      />
      <div class="specialties__content section-m">
        <div class="specialties__main">
          <div class="specialties__block">
            <h4 class="title-h4">Найдено {{ getTitle(professions, 'профессия') }}</h4>
            <div class="specialties__select">
              <!-- <a-select
                v-model="selectedValue"
                class="specialties__select-item"
                placeholder="Сортировка"
                :options="profSort"
                hint="Выберите вариант"
                section-id="professions"
                @selectedItemId="handleSelectedItemId"
              /> -->
            </div>
          </div>
          <div class="specialties__list">
            <m-profession-card
              v-for="(profession, index) in professions?.data"
              :key="index"
              :professions="profession"
              :style="`order: ${index}`"
            />
            <s-quiz id="quiz" :style="`order: 6`" />
          </div>
          <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="getProfessionList" />
        </div>
        <div class="specialties__right">
          <div class="specialties__right-inner">
            <!-- <nuxt-link to="/">
              <a-button
                label="Профориентация онлайн"
                :img="profOnline"
                :center="false"
                test-id="btn-professions-profOnline"
                size="extra-large"
              />
            </nuxt-link> -->
            <a-button
              class="scroll"
              label="Помочь выбрать обучение"
              :img="helpIcon"
              :center="false"
              test-id="btn-professions-helpIcon"
              size="extra-large"
              @click="navigateTo('#form')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <s-form
      id="form"
      class="section-l"
      subtitle="Оставь заявку, наши менеджеры свяжутся с тобой, и помогут в поиске правильного учебного заведения!"
      title="Нужна помощь в выборе колледжа?"
      section-id="professions-page"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br>
      условия <a href='/policy' target='_blank'
      class='s-form__politics' test-id='link-form-policy'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
  </div>
  <s-professions :apiProfessions="professionsFuture" title="Профессии будущего" @navigateTo="handleNavigateTo" />
</template>
<script setup>
import getProfessions from '~/api/professions/getProfessions';
import getCities from '~/api/cities/getCities';

const professions = ref({});

const curPage = ref(0);
const countPage = ref();

const maxCostFilter = ref(0);

const professionsFuture = ref({});

const cities = ref(
  await getCities({
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
    'sort': 'sort_millionaire',
  }),
);

const route = useRoute();
const router = useRouter();

const handleNavigateTo = (url) => {
  router.push(url); // Или window.location.href = url
};

const bases = [
  { attributes: { value: '9', name: 'После 9 класса', slug: '9_class' }, type: 'bases' },
  {
    attributes: { value: '11', name: 'После 11 класса', slug: '11_class' },
    type: 'bases',
  },
];

const relevanceOptions = [
  { attributes: { value: 'is_favorite', name: 'Актуально сейчас', slug: 'is_favorite' }, type: 'relevance' },
  { attributes: { value: 'is_future', name: 'Актуально в будущем', slug: 'is_future' }, type: 'relevance' },
  { attributes: { value: 'is_old', name: 'Устарело', slug: 'is_old' }, type: 'relevance' },
  { attributes: { value: 'is_perspective', name: 'Перспективая', slug: 'is_perspective' }, type: 'relevance' },
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
    name: 'relevance',
    placeholder: 'Выбор актуальности',
    type: 'relevance',
    hint: 'Актуальность',
    data: relevanceOptions,
    chosen: '',
  },
]);

const filters = ref({
  title: 'Професии',
  cities: {},
  bases: {},
  relevanceOptions: {},
  max_cost: +route.query['max_cost'],
});

const breadcrumbs = computed(() => {
  let arr = [{ label: 'Профессии' }];
  for (let item of Object.entries(filters.value)) {
    if (item[0] !== 'title' && item[0] !== 'max_cost' && item[0] !== 'relevanceOptions') {
      let label;
      switch (item[1].type) {
        case 'cities':
          label = `Профессии ${item[1].attributes.name_rp}`;
          break;
        default:
          label = item[1].attributes?.name;
          break;
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

const search = async (item, key) => {
  curPage.value = 0;

  if (typeof item === 'object') {
    filters.value[item.type] = item;

    // Если город не миллионник, сбрасываем все фильтры
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
  let parsed = '';

  Object.keys(filters.value).forEach((key) => {
    if (key === 'title' && !filters.value.attributes) {
      parsed += `Профессии колледжей `;
    } else {
      if (key !== 'relevance') {
        parsed += filters.value[key]?.attributes?.text ? `${filters.value[key].attributes.text} ` : '';
      }
    }
  });

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
  let url = '/professions';
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

  getProfessionList(0);
};

const getFilters = () => {
  const urlArray = route.path.split('/').filter((el) => el.trim() !== '' && el !== 'professions');

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

  getProfessionList(0);
};

const getProfessionList = async (num, pageSize) => {
  const maxCost =
    typeof filters.value.max_cost === 'number' && !isNaN(filters.value.max_cost) ? filters.value.max_cost : null;

  const currentCity = filters.value.cities.id
    ? filtersArray.value[0].data.find((city) => city.id === filters.value.cities.id)
    : null;

  options.value = Object.entries({
    'page[size]': pageSize ?? 15,
    'page[number]': num + 1,
    'filter[city_id]': filters.value.cities?.id,
    'filter[form]': filters.value.forms?.id,
    'filter[cost][max]': maxCost !== null ? JSON.stringify(maxCost) : null,
  })
    .filter(([, v]) => v != null && v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  curPage.value = num;

  if (filters.value.relevance && filters.value.relevance.attributes) {
    const relevanceSlug = filters.value.relevance.attributes.slug;
    options.value[`filter[${relevanceSlug}]`] = true;
  }

  filtersArray.value.forEach((filter) => {
    if (filter.data[0].type !== 'cities' && filter.data[0].type !== 'bases') {
      filter.disabled = !(currentCity && currentCity.attributes.ratio_population === 'Города-миллионеры');
    }
  });

  professions.value = await getProfessions(options.value);

  maxCostFilter.value = professions.value.meta.max_cost;
  countPage.value = professions.value.meta.page.lastPage;
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

onMounted(async () => {
  getFilters();

  professionsFuture.value = await getProfessions(
    {
      'filter[is_future]': true,
    },
    'is_future',
  );
});

// const profSort = ref([
//   {
//     id: 'name',
//     attributes: { name: 'по алфавиту (от А до Я)' },
//   },
//   {
//     id: '-name',
//     attributes: { name: 'по алфавиту (от Я до А)' },
//   },
// ]);

// const handleSelectedItemId = async (id) => {
//   externalId.value = id;

//   // Получаем выбранное значение
//   const selectedOption = profSort.value.find((option) => option.id === id);
//   selectedValue.value = selectedOption ? selectedOption.id : null;

//   // Подготовка объекта параметров для запроса
//   const professionOptions = {
//     'page[size]': 15,
//     'filter[city_id]': filters.value.cities.id,
//     'filter[specialty_base]': filters.value.bases.attributes?.value,
//     'filter[cost][min]': filters.value.min_cost,
//     'filter[cost][max]': filters.value.max_cost,
//     'sort': externalId.value, // Используем выбранное значение для сортировки
//   };

//   // Добавление фильтра по актуальности, если он выбран
//   if (filters.value.relevance) {
//     professionOptions[`filter[${filters.value.relevance.id}]`] = filters.value.relevance.value;
//   }

//   // Установка номера страницы
//   professionOptions['page[number]'] = curPage.value === 0 ? 1 : curPage.value + 1;

//   // Получение профессий с использованием параметров
//   try {
//     const response = await getProfessions(professionOptions, 'default');
//     professions.value = response; // Обновляем локальное состояние профессий
//   } catch (error) {
//     console.error('Ошибка при получении профессий:', error);
//     professions.value = []; // Очищаем профессии в случае ошибки
//   }
// };

const helpIcon = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 10.424V9C21 6.61305 20.0517 4.32387 18.3639 2.63604C16.6761 0.948212 14.3869 0 12 0C9.613 0 7.32382 0.948212 5.63599 2.63604C3.94816 4.32387 2.99995 6.61305 2.99995 9V10.424C1.95111 10.8858 1.09275 11.694 0.568572 12.7131C0.0443932 13.7322 -0.113788 14.9004 0.120508 16.0222C0.354805 17.1441 0.967358 18.1513 1.85562 18.8755C2.74388 19.5996 3.85394 19.9966 4.99995 20C5.53038 20 6.03909 19.7893 6.41416 19.4142C6.78924 19.0391 6.99995 18.5304 6.99995 18V12C6.99995 11.4696 6.78924 10.9609 6.41416 10.5858C6.03909 10.2107 5.53038 10 4.99995 10V9C4.99995 7.14349 5.73745 5.36301 7.0502 4.05025C8.36296 2.7375 10.1434 2 12 2C13.8565 2 15.6369 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14349 19 9V10C18.4695 10 17.9608 10.2107 17.5857 10.5858C17.2107 10.9609 17 11.4696 17 12V18H14C13.7347 18 13.4804 18.1054 13.2928 18.2929C13.1053 18.4804 13 18.7348 13 19C13 19.2652 13.1053 19.5196 13.2928 19.7071C13.4804 19.8946 13.7347 20 14 20H19C20.146 19.9966 21.256 19.5996 22.1443 18.8755C23.0325 18.1513 23.6451 17.1441 23.8794 16.0222C24.1137 14.9004 23.9555 13.7322 23.4313 12.7131C22.9071 11.694 22.0488 10.8858 21 10.424ZM4.99995 18C4.2043 18 3.44124 17.6839 2.87863 17.1213C2.31602 16.5587 1.99995 15.7957 1.99995 15C1.99995 14.2044 2.31602 13.4413 2.87863 12.8787C3.44124 12.3161 4.2043 12 4.99995 12V18ZM19 18V12C19.7956 12 20.5587 12.3161 21.1213 12.8787C21.6839 13.4413 22 14.2044 22 15C22 15.7957 21.6839 16.5587 21.1213 17.1213C20.5587 17.6839 19.7956 18 19 18Z" fill="#4C3B8A"/>
</svg>`;
</script>
<style lang="scss">
@import '../specialties/specialties.scss';
</style>
