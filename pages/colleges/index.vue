<template>
  <div class="container">
    <s-filter
      :breadcrumbs="breadcrumbs"
      forPage="colleges"
      @openMap="openMap"
      @search="search"
      @setBreadcrumbs="setBreadcrumbs"
      @filter-seo="filterSeo"
      @clear-seo="clearSeo"
    />
  </div>
  <m-popup class="map-popup" :visible="isOpen" type="map" @close="openMap()">
    <s-filter
      titleSize="h4"
      forPage="colleges"
      :isMainFilter="false"
      :isMap="true"
      :startShowSub="true"
      :countTablet="1"
      :countPC="1"
      @searchOnMap="searchOnMap"
    />
    <m-map :markers="collegesOnMap" />
  </m-popup>
  <s-colleges-list id="start" :colleges="colleges" />
  <a-pagination class="section-m" :countPage="countPage" :curPage="curPage" @updateCurPage="updateCurPage" />
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
import { createWebHistory, createRouter } from 'vue-router';
import getColleges from '~/api/colleges/getColleges';
import getCity from '~/api/cities/getCity';

const breadcrumbs = computed(() => {
  let arr = [{ label: 'Все колледжи' }];
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
        label = `Колледжи ${item.attributes.name_rp}`;
        break;
      case 'types':
        label = `${item.attributes.name.slice(0, item.attributes.name.length - 1) + 'е'} колледжи`;
        break;
      default:
        label = item.attributes.name;
    }
    activeBreadcrumbs.value.push({label: label});
  }
  // activeBreadcrumbs.value.push(value);
}

const curPage = ref(0);
const countPage = ref();

const colleges = ref({});
const collegesOnMap = ref({});
// const cities = ref([]);

const filtersRoutes = ref({
  cities: '',
  bases: '',
  types: '',
  directions: '',
  conditions: '',
  forms: '',
});

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

onMounted(async () => {
  searchOnMap({});
  updateCurPage(0);
});

const filters = ref({});

const search = async ({ city, type, direction, has_free, form, base, is_hostel, min_cost, max_cost }) => {
  curPage.value = 0;
  filters.value = { city, type, direction, has_free, form, base, is_hostel, min_cost, max_cost };
  updateCurPage(0);

  // for (let index = 0; index < colleges.value.data.length; index++) {
  //   cities.value[index] = colleges.value.included.find((value) => {
  //     return value.id == colleges.value.data[index].relationships.city.data.id;
  //   });
  // }
};

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
        router.addRoute({ path: `/${filtersRoutes.value[key]}`, component: colleges, name: key });
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

  router.replace(`/colleges/${url}`);
};

const filtersOnMap = ref();
const searchOnMap = async ({ city, type, direction, has_free, form, base, is_hostel }) => {
  filtersOnMap.value = { city, type, direction, has_free, form, base, is_hostel };
  // collegesOnMap.value = await getColleges({
  //   'include': 'city,galleries,faculties',
  //   'filter[hasSpecialties]': true,
  //   'filter[city_id]': 8,
  // }, 'map');
  collegesOnMap.value = {};
  collegesOnMap.value = await getColleges(
    {
      'page[size]': 150,
      // 'include': 'city,galleries,faculties',
      'filter[hasSpecialties]': true,
      'filter[has_coordinates]': true,
      'filter[city_id]': filtersOnMap.value.city,
      'filter[is_state]': filtersOnMap.value.type,
      'filter[directions]': filtersOnMap.value.direction,
      'filter[forms]': filtersOnMap.value.form,
      'filter[specialties_base]': filtersOnMap.value.base,
      'filter[is_hostel]': filtersOnMap.value.is_hostel,
      'filter[has_free]': filtersOnMap.value.has_free,
      'sort': 'sort',
    },
    'map',
  );
  // console.log(collegesOnMap.value);
};

const updateCurPage = async (num) => {
  curPage.value = num;
  colleges.value = await getColleges({
    'page[size]': 15,
    'page[number]': curPage.value + 1,
    // 'include': 'city,monitorings,galleries,faculties',
    'filter[hasSpecialties]': true,
    'filter[city_id]': filters.value.city,
    'filter[is_state]': filters.value.type,
    'filter[directions]': filters.value.direction,
    'filter[forms]': filters.value.form,
    'filter[specialties_base]': filters.value.base,
    'filter[is_hostel]': filters.value.is_hostel,
    'filter[has_free]': filters.value.has_free,
    'filter[min_cost]': filters.value.min_cost,
    'filter[max_cost]': filters.value.max_cost,
    'sort': 'sort',
  });
  countPage.value = colleges.value.meta.page.lastPage;
  // for (let index = 0; index < colleges.value.data.length; index++) {
  //   cities.value[index] = colleges.value.included.find((value) => {
  //     return value.id == colleges.value.data[index].relationships.city.data.id;
  //   });
  // }
};

const isOpen = ref(false);
const openMap = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss">
@import './colleges.scss';
</style>
