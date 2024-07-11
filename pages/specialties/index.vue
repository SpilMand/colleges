<template>
  <div class="specialties">
    <div class="container">
      <s-filter
        id="start"
        title="Специальности колледжей России"
        :breadcrumbs="breadcrumbs"
        forPage="specialties"
        @search="search"
        @setBreadcrumbs="setBreadcrumbs"
        @filter-seo="filterSeo"
        @clear-seo="clearSeo"
      />
      <div class="specialties__content section-m">
        <div class="specialties__main">
          <h4 v-if="cards.meta" class="title-h4">Найдено {{ getTitle() }}</h4>
          <m-specialties-card
            v-for="(card, index) in cards.data"
            :key="index"
            :style="`order: ${index + 1}`"
            :options="card"
          />
          <s-quiz
            quizSubtitle="Ответь на 7 простых вопросов"
            quizText="и мы поможем выбрать лучший для тебя колледж"
            :isSub="true"
          />
          <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
        </div>
        <div class="specialties__right">
          <div class="specialties__right-inner">
            <a-button label="Помочь выбрать обучение" :img="helpIcon" :center="false" size="extra-large" />
            <a-rklm />
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
      условия <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
  </div>
</template>

<script setup>
import getSpecialties from '~/api/search/getSpecialties';
import getOksos from '~/api/okso/getOksos';
import { createWebHistory, createRouter } from 'vue-router';
import getCity from '~/api/cities/getCity';
import getForm from '~/api/forms/getForm';
import { object } from 'yup';

const breadcrumbs = computed(() => {
  let arr = [{ label: 'Специальности' }];
  for (let filter of activeBreadcrumbs.value) {
    arr.push(filter);
  }
  return arr;
})

const activeBreadcrumbs = ref([]);
const setBreadcrumbs = (value) => {
  activeBreadcrumbs.value = [];
  for (let item of Object.values(value)) {
    let label;
    switch (item.type) {
      case 'cities':
        label = `Специальности ${item.attributes.name_rp}`;
        break;
      case 'forms':
        label = `Специальности ${item.attributes.name}`;
        break;
    }
    activeBreadcrumbs.value.push({label: label});
  }
  // activeBreadcrumbs.value.push(value);
}

const cards = ref([]);

const curPage = ref(0);
const countPage = ref();

onMounted(async () => {
  updateCurPage(0);
});

const filters = ref({});

const search = async ({ city, form, min_cost, max_cost }) => {
  curPage.value = 0;
  filters.value = { city, form, min_cost, max_cost };
  updateCurPage(curPage.value);
};

const getTitle = () => {
  let count = cards.value.meta.total;
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

const updateCurPage = async (num) => {
  curPage.value = num;
  cards.value = await getSpecialties({
    'page[number]': curPage.value + 1,
    'page[size]': 15,
    'filter[has_colleges]': true,
    'filter[city_id]': filters.value.city,
    'filter[form]': filters.value.form,
    'filter[cost][min]': filters.value.min_cost,
    'filter[cost][max]': filters.value.max_cost,
  });
  countPage.value = cards.value.meta.last_page;
};

const popularSpecialties = await getOksos(
  {
    'page[size]': 5,
    'filter[hasColleges]': true,
  },
  'popular',
);

const adCard = ref({
  title: 'Дизайн (по отраслям) в колледже Синергия',
  subtitle: `Открой для себя лучшую специальность 2024 года!
  Стань крутым специалистом в сфере дизайна после прохождения обучения в колледже Синергия.`,
  isAd: true,
});

const filtersRoutes = ref({
  cities: '',
  directions: '',
});

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

const filterSeo = async (data) => {
  const routes = router.getRoutes();

  switch (true) {
    case data.type === 'cities':
      await getCity(data.id).then((response) => {
        filtersRoutes.value[data.type] = response.data.attributes.slug;
      });
      break;
    default:
      filtersRoutes.value[data.type] = data.attributes.slug;
  }

  Object.keys(filtersRoutes.value).forEach((key) => {
    const routerFind = routes.length ? routes.find((item) => item.name === key) : null;

    if (routerFind) {
      routerFind.path = filtersRoutes.value[key];
    } else {
      if (filtersRoutes.value[key]) {
        router.addRoute({ path: `/${filtersRoutes.value[key]}`, component: cards, name: key });
      }
    }
  });

  getUrl();
};

const clearSeo = (index) => {
  const routesArray = router.getRoutes();

  if (index === 'all') {
    routesArray.forEach((route) => {
      filtersRoutes.value[route.name] = '';
      router.removeRoute(route.name);
    });
  } else {
    filtersRoutes.value[index] = '';
    router.removeRoute(index);
  }

  getUrl();
};

const getUrl = async () => {
  const routesArray = router.getRoutes();
  let url = '';

  routesArray.forEach((route) => {
    url += `${route.path.replace('/', '')}/`;
  });

  router.replace(`/specialties/${url}`);
};

const helpIcon = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 10.424V9C21 6.61305 20.0517 4.32387 18.3639 2.63604C16.6761 0.948212 14.3869 0 12 0C9.613 0 7.32382 0.948212 5.63599 2.63604C3.94816 4.32387 2.99995 6.61305 2.99995 9V10.424C1.95111 10.8858 1.09275 11.694 0.568572 12.7131C0.0443932 13.7322 -0.113788 14.9004 0.120508 16.0222C0.354805 17.1441 0.967358 18.1513 1.85562 18.8755C2.74388 19.5996 3.85394 19.9966 4.99995 20C5.53038 20 6.03909 19.7893 6.41416 19.4142C6.78924 19.0391 6.99995 18.5304 6.99995 18V12C6.99995 11.4696 6.78924 10.9609 6.41416 10.5858C6.03909 10.2107 5.53038 10 4.99995 10V9C4.99995 7.14349 5.73745 5.36301 7.0502 4.05025C8.36296 2.7375 10.1434 2 12 2C13.8565 2 15.6369 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14349 19 9V10C18.4695 10 17.9608 10.2107 17.5857 10.5858C17.2107 10.9609 17 11.4696 17 12V18H14C13.7347 18 13.4804 18.1054 13.2928 18.2929C13.1053 18.4804 13 18.7348 13 19C13 19.2652 13.1053 19.5196 13.2928 19.7071C13.4804 19.8946 13.7347 20 14 20H19C20.146 19.9966 21.256 19.5996 22.1443 18.8755C23.0325 18.1513 23.6451 17.1441 23.8794 16.0222C24.1137 14.9004 23.9555 13.7322 23.4313 12.7131C22.9071 11.694 22.0488 10.8858 21 10.424ZM4.99995 18C4.2043 18 3.44124 17.6839 2.87863 17.1213C2.31602 16.5587 1.99995 15.7957 1.99995 15C1.99995 14.2044 2.31602 13.4413 2.87863 12.8787C3.44124 12.3161 4.2043 12 4.99995 12V18ZM19 18V12C19.7956 12 20.5587 12.3161 21.1213 12.8787C21.6839 13.4413 22 14.2044 22 15C22 15.7957 21.6839 16.5587 21.1213 17.1213C20.5587 17.6839 19.7956 18 19 18Z" fill="#4C3B8A"/>
</svg>`;
</script>

<style lang="scss" scoped>
@import './specialties.scss';
</style>
