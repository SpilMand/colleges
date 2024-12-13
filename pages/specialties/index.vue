<template>
  <div class="specialties">
    <div class="container">
      <s-filter-new
        id="start"
        :title="pageTitle"
        :filters="filtersArray"
        :breadcrumbs="breadcrumbs"
        :active-filters="filters"
        :maxVal="filters['max_cost']"
        :maxCost="maxCostFilter"
        @search="search"
        @delete-filter="deleteFilter"
        @input-search="inputSearch"
      />
      <div class="specialties__content section-m">
        <div class="specialties__main" test-id="list-specialties">
          <h4 v-if="(specialties.data || []).length && specialties.meta" class="title-h4">
            Найдено <span test-id="counter-specialties">{{ getTitle() }}</span>
          </h4>
          <h4 v-else class="title-h4">
            К сожалению, по вашему запросу специальностей не нашлось, но мы подобрали для вас другие специальности
            вашего города
          </h4>
          <m-specialties-card
            v-for="(card, index) in getActiveSpecialties"
            :key="index"
            :style="`order: ${index + 1}`"
            :options="card"
          />
          <!-- <s-specialities-banner
          type="tablet"
          title="Дизайн (по отраслям) в колледже Синергия"
          text="Открой для себя лучшую специальность 2024 года! Стань крутым специалистом
          в сфере дизайна после прохождения обучения в колледже Синергия."
          /> -->
          <s-quiz
            quizSubtitle="Ответь на 7 простых вопросов"
            quizText="и мы поможем выбрать лучший для тебя колледж"
            :isSub="true"
          />
          <a-pagination
            :curPage="curPage"
            :countPage="specialties.meta?.last_page"
            @updateCurPage="getSpecialtiesList"
          />
        </div>
        <div class="specialties__right">
          <div class="specialties__right-inner">
            <a-button
              label="Помочь выбрать обучение"
              :img="helpIcon"
              :center="false"
              size="extra-large"
              @click="navigateTo('#quiz')"
            />
            <!-- <NuxtLink :to="commercialUrl" class="a-rklm">
              <img class="a-rklm__image" :src="imageUrl" alt="" />
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <s-professions
    title="Популярные специальности"
    type="specialty"
    :apiProfessions="popularSpecialties"
    :needBtn="false"
  />
  <div class="container">
    <s-form
      id="form"
      class="about__form section-l"
      subtitle="Оставь заявку, наши менеджеры свяжутся с тобой,
        и помогут в поиске правильного учебного заведения!"
      title="Нужна помощь в выборе колледжа?"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br>
      условия <a href='/policy' target='_blank'
       class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
  </div>
</template>

<script setup>
import getSpecialties from '~/api/search/getSpecialties';
import getOksos from '~/api/okso/getOksos';
import getCities from '~/api/cities/getCities';
import getForms from '~/api/forms/getForms';
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

const specialties = ref([]);
const recommendedSpecialties = ref([]);

const route = useRoute();
const router = useRouter();

const options = ref([]);

const maxCostFilter = ref(600000);

const cities = ref(
  await getCities({
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
    'sort': 'sort_millionaire',
  }),
);

const getActiveSpecialties = computed(() => {
  return (specialties.value.data || []).length ? specialties.value.data : recommendedSpecialties.value.data;
});

const forms = await getForms();

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
    hint: 'Форма обучения',
    data: forms.data,
    chosen: '',
    disabled: false,
  },
]);

const filters = ref({
  cities: {},
  form: {},
  max_cost: +route.query['max_cost'],
});

const inputSearch = async (name) => {
  cities.value = await getCities({
    'filter[name]': name,
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 9999,
  });

  filtersArray.value[0].data = cities.value.data;
};

const pageTitle = computed(() => {
  let title = '';

  if (filters.value.forms?.attributes) {
    title = filters.value.forms.attributes.name.slice(0, filters.value.forms.attributes.name.length - 1) + 'ые ';
  }
  if (filters.value.cities?.attributes) {
    title += `специальности колледжей ${filters.value.cities.attributes.name_rp}`;
  } else {
    title += 'специальности колледжей России';
  }
  return title.charAt(0).toUpperCase() + title.slice(1);
});

const breadcrumbs = computed(() => {
  let arr = [{ label: 'Специальности' }];
  for (let item of Object.entries(filters.value)) {
    if (item[0] !== 'max_cost') {
      let label;
      switch (item[1].type) {
        case 'cities':
          label = `Специальности ${item[1].attributes.name_rp}`;
          break;
        case 'forms':
          label = `${item[1].attributes.name.slice(0, item[1].attributes.name.length - 1)}ые специальности`;
          break;
      }
      if (label) {
        arr.push({ label: label });
      }
    }
  }

  return arr;
});

const activeBreadcrumbs = ref([]);

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

const setBreadcrumbs = (value) => {
  activeBreadcrumbs.value = [];
  for (let item of Object.values(value)) {
    let label;
    switch (item.type) {
      case 'cities':
        label = `Специальности ${item.attributes.name_rp}`;
        break;
      case 'form':
        label = `Специальности ${item.attributes.name}`;
        break;
    }
    activeBreadcrumbs.value.push({ label: label });
  }
  // activeBreadcrumbs.value.push(value);
};

const curPage = ref(0);

const getUrl = () => {
  let url = '/specialties';
  let urlQuery = {};

  Object.keys(filters.value).forEach((key) => {
    if (typeof filters.value[key] !== 'boolean' && typeof filters.value[key] !== 'number') {
      if (filters.value[key] && filters.value[key].attributes && filters.value[key].attributes.slug) {
        url += `/${filters.value[key].attributes.slug}`;
      }
    }

    if (typeof filters.value[key] === 'boolean' || typeof filters.value[key] === 'number') {
      urlQuery[key] = filters.value[key].toString();
    }
  });

  router.push({ path: url, query: urlQuery });

  getSpecialtiesList(0);
};

const search = async (item, key) => {
  curPage.value = 0;

  if (typeof item === 'object') {
    filters.value[item.type] = item;
  } else {
    if (typeof item !== 'boolean' && typeof item !== 'number') {
      filters.value[key].value = item;
    } else {
      filters.value[key] = item;
    }
  }

  getUrl();
};

const getTitles = (item) => {
  filters.value[item.type] = item;

  switch (true) {
    case item.type === 'cities':
      filters.value.cities.attributes.text =
        item.attributes.name_rp.charAt(0).toUpperCase() + item.attributes.name_rp.slice(1);
      break;
    case !item?.type:
      return false;
    default:
      filters.value[item.type].attributes.text = item.attributes.name.toLowerCase();
  }
};

const getFilters = () => {
  const urlArray = route.path.split('/').filter((el) => el.trim() !== '' && el !== 'specilties');

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

  getSpecialtiesList(0);
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
      filters.value[key] = null;
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

const getTitle = () => {
  let count = specialties.value.meta.total;
  let title;
  if (count % 10 == 1) {
    title = `${count} специальность`;
  } else if (count % 10 <= 4) {
    title = `${count} специальности`;
  } else {
    title = `${count} специальностей`;
  }
  return title;
};

const getRecommendedSpecialties = async () => {
  recommendedSpecialties.value = await getSpecialties(
    {
      'page[size]': 3,
      'page[number]': 1,
      'filter[has_colleges]': true,
      'filter[city_id]': filters.value.cities?.id,
    },
    'recommended-specialties',
  );
};

const getSpecialtiesList = async (num, pageSize) => {
  const maxCost =
    typeof filters.value.max_cost === 'number' && !isNaN(filters.value.max_cost) ? filters.value.max_cost : null;

  options.value = Object.entries({
    'page[size]': pageSize ?? 15,
    'page[number]': num + 1,
    'filter[city_id]': filters.value.cities?.id,
    'filter[form]': filters.value.forms?.id,
    'filter[cost][max]': maxCost !== null ? JSON.stringify(maxCost) : null,
  })
    .filter(([_, v]) => v != null && v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

  curPage.value = num;

  specialties.value = await getSpecialties(options.value);

  // maxCostFilter.value = specialties.value.meta.max_cost;
};

const popularSpecialties = await getOksos(
  {
    'page[size]': 5,
    'filter[hasColleges]': true,
  },
  'popular',
);

onMounted(() => {
  getFilters();
  getRecommendedSpecialties();
});

const helpIcon = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 10.424V9C21 6.61305 20.0517 4.32387 18.3639 2.63604C16.6761 0.948212 14.3869 0 12 0C9.613 0 7.32382 0.948212 5.63599 2.63604C3.94816 4.32387 2.99995 6.61305 2.99995 9V10.424C1.95111 10.8858 1.09275 11.694 0.568572 12.7131C0.0443932 13.7322 -0.113788 14.9004 0.120508 16.0222C0.354805 17.1441 0.967358 18.1513 1.85562 18.8755C2.74388 19.5996 3.85394 19.9966 4.99995 20C5.53038 20 6.03909 19.7893 6.41416 19.4142C6.78924 19.0391 6.99995 18.5304 6.99995 18V12C6.99995 11.4696 6.78924 10.9609 6.41416 10.5858C6.03909 10.2107 5.53038 10 4.99995 10V9C4.99995 7.14349 5.73745 5.36301 7.0502 4.05025C8.36296 2.7375 10.1434 2 12 2C13.8565 2 15.6369 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14349 19 9V10C18.4695 10 17.9608 10.2107 17.5857 10.5858C17.2107 10.9609 17 11.4696 17 12V18H14C13.7347 18 13.4804 18.1054 13.2928 18.2929C13.1053 18.4804 13 18.7348 13 19C13 19.2652 13.1053 19.5196 13.2928 19.7071C13.4804 19.8946 13.7347 20 14 20H19C20.146 19.9966 21.256 19.5996 22.1443 18.8755C23.0325 18.1513 23.6451 17.1441 23.8794 16.0222C24.1137 14.9004 23.9555 13.7322 23.4313 12.7131C22.9071 11.694 22.0488 10.8858 21 10.424ZM4.99995 18C4.2043 18 3.44124 17.6839 2.87863 17.1213C2.31602 16.5587 1.99995 15.7957 1.99995 15C1.99995 14.2044 2.31602 13.4413 2.87863 12.8787C3.44124 12.3161 4.2043 12 4.99995 12V18ZM19 18V12C19.7956 12 20.5587 12.3161 21.1213 12.8787C21.6839 13.4413 22 14.2044 22 15C22 15.7957 21.6839 16.5587 21.1213 17.1213C20.5587 17.6839 19.7956 18 19 18Z" fill="#4C3B8A"/>
</svg>`;
</script>

<style lang="scss" scoped>
@import './specialties.scss';
</style>
