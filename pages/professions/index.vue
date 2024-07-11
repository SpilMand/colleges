<template>
  <a-loading v-if="isLoading" :progress="progress" />
  <div class="specialties professions">
    <div class="container">
      <s-filter :breadcrumbs="breadcrumbs" forPage="professions" @search="search" />
      <div class="specialties__content section-m">
        <div class="specialties__main">
          <div class="specialties__block">
            <h4 class="title-h4">Найдено {{ getTitle(professions, 'профессия') }}</h4>
            <div class="specialties__select">
              <a-select
                v-model="selectedValue"
                placeholder="Сортировка"
                :options="profSort"
                hint="Выберите вариант"
                @selectedItemId="handleSelectedItemId"
              />
            </div>
          </div>
          <div class="specialties__list">
            <m-profession-card
              v-for="(profession, index) in professions.data"
              :key="index"
              :professions="profession"
              :style="`order: ${index}`"
            />
            <!-- <m-specialties-card :style="`order: 6`" :options="adCard" /> -->
            <s-quiz id="quiz" :style="`order: 6`" />
          </div>
          <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
        </div>
        <div class="specialties__right">
          <div class="specialties__right-inner">
            <nuxt-link to="/">
              <a-button label="Профориентация онлайн" :img="profOnline" :center="false" size="extra-large" />
            </nuxt-link>
            <a class="scroll" href="#form">
              <a-button label="Помочь выбрать обучение" :img="helpIcon" :center="false" size="extra-large" />
            </a>
            <!-- <a-ad /> -->
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
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br>
      условия <a href='/' target='_blank' cdivs='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
  </div>
  <s-professions :apiProfessions="professionsFuture" title="Профессии будущего" />
</template>
<script setup>
import getProfessions from '~/api/professions/getProfessions';
import { getTitle } from '~/composables/utils';
import scrollToSection from '~/composables/scrollToSection';
import useLoadingIndicator from '~/composables/useLoadingIndicator';
const route = useRoute();
const breadcrumbs = [{ label: 'Профессии' }];
const selectedValue = ref(null);
const curPage = ref(0);
const countPage = ref();
const externalId = ref('id');
const professions = ref({});
const professionsFuture = ref({});
const filters = ref({});
const { progress, isLoading, start, finish } = useLoadingIndicator({
  duration: 2000,
});
onMounted(async () => {
  start();
  updateCurPage(0).then(() => {
    countPage.value = professions.value.meta.page.lastPage;
  });

  professionsFuture.value = await getProfessions(
    {
      'filter[is_future]': true,
    },
    'is_future',
  );
  scrollToSection();
  finish();
});

const search = async ({ city, base, relevance, min_cost, max_cost }) => {
  start();
  curPage.value = 0;
  filters.value = { city, base, relevance, min_cost, max_cost };
  const professionOptions = {
    'page[size]': 15,
    'page[number]': 1,
    'filter[city_id]': filters.value.city,
    'filter[specialty_base]': base,
    'filter[professions]': route.params.id,
    'filter[cost][min]': filters.value.min_cost,
    'filter[cost][max]': filters.value.max_cost,
  };

  if (relevance) {
    professionOptions[`filter[${relevance.id}]`] = relevance.value;
  }

  professions.value = await getProfessions(professionOptions, 'default');

  countPage.value = professions.value.meta.page.lastPage;
  finish();
};

const updateCurPage = async (num) => {
  start();
  curPage.value = num;
  const professionOptions = {
    'page[size]': 15,
    'page[number]': curPage.value + 1,
    'filter[city_id]': filters.value.city,
    'filter[specialty_base]': filters.value.base,
    'filter[cost][min]': filters.value.min_cost,
    'filter[cost][max]': filters.value.max_cost,
    'sort': externalId.value,
  };

  if (filters.value.relevance) {
    professionOptions[`filter[${filters.value.relevance.id}]`] = filters.value.relevance.value;
  }

  professions.value = await getProfessions(professionOptions, 'default');
  finish();
};

const profSort = ref([
  {
    id: 'name',
    attributes: { name: 'по алфавиту (от А до Я)' },
  },
  {
    id: '-name',
    attributes: { name: 'по алфавиту (от Я до А)' },
  },
]);

const handleSelectedItemId = async (id) => {
  start();
  externalId.value = id;
  const professionOptions = {
    'page[size]': 15,
    'filter[city_id]': filters.value.city,
    'filter[specialty_base]': filters.value.base,
    'filter[cost][min]': filters.value.min_cost,
    'filter[cost][max]': filters.value.max_cost,
    'sort': externalId.value,
  };

  if (filters.value.relevance) {
    professionOptions[`filter[${filters.value.relevance.id}]`] = filters.value.relevance.value;
  }

  if (curPage.value === 0) {
    professionOptions['page[number]'] = 1;
  } else {
    professionOptions['page[number]'] = curPage.value + 1;
  }

  professions.value = await getProfessions(professionOptions, 'default');
  finish();
};

// const adCard = ref({
//   title: 'Дизайн (по отраслям) в колледже Синергия',
//   subtitle: `Открой для себя лучшую специальность 2024 года!
//   Стань крутым специалистом в сфере дизайна после прохождения обучения в колледже Синергия.`,
//   isAd: true,
//   learnMore: true,
// });

const helpIcon = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 10.424V9C21 6.61305 20.0517 4.32387 18.3639 2.63604C16.6761 0.948212 14.3869 0 12 0C9.613 0 7.32382 0.948212 5.63599 2.63604C3.94816 4.32387 2.99995 6.61305 2.99995 9V10.424C1.95111 10.8858 1.09275 11.694 0.568572 12.7131C0.0443932 13.7322 -0.113788 14.9004 0.120508 16.0222C0.354805 17.1441 0.967358 18.1513 1.85562 18.8755C2.74388 19.5996 3.85394 19.9966 4.99995 20C5.53038 20 6.03909 19.7893 6.41416 19.4142C6.78924 19.0391 6.99995 18.5304 6.99995 18V12C6.99995 11.4696 6.78924 10.9609 6.41416 10.5858C6.03909 10.2107 5.53038 10 4.99995 10V9C4.99995 7.14349 5.73745 5.36301 7.0502 4.05025C8.36296 2.7375 10.1434 2 12 2C13.8565 2 15.6369 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14349 19 9V10C18.4695 10 17.9608 10.2107 17.5857 10.5858C17.2107 10.9609 17 11.4696 17 12V18H14C13.7347 18 13.4804 18.1054 13.2928 18.2929C13.1053 18.4804 13 18.7348 13 19C13 19.2652 13.1053 19.5196 13.2928 19.7071C13.4804 19.8946 13.7347 20 14 20H19C20.146 19.9966 21.256 19.5996 22.1443 18.8755C23.0325 18.1513 23.6451 17.1441 23.8794 16.0222C24.1137 14.9004 23.9555 13.7322 23.4313 12.7131C22.9071 11.694 22.0488 10.8858 21 10.424ZM4.99995 18C4.2043 18 3.44124 17.6839 2.87863 17.1213C2.31602 16.5587 1.99995 15.7957 1.99995 15C1.99995 14.2044 2.31602 13.4413 2.87863 12.8787C3.44124 12.3161 4.2043 12 4.99995 12V18ZM19 18V12C19.7956 12 20.5587 12.3161 21.1213 12.8787C21.6839 13.4413 22 14.2044 22 15C22 15.7957 21.6839 16.5587 21.1213 17.1213C20.5587 17.6839 19.7956 18 19 18Z" fill="#4C3B8A"/>
</svg>`;
const profOnline = `<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.0575 5.22998L14.6835 1.71698C13.0603 0.747414 11.04 0.730211 9.40052 1.67198L1.94355 5.22998C1.91557 5.24399 1.88655 5.25899 1.85955 5.27498C0.0899255 6.28682 -0.524418 8.54165 0.487425 10.3113C0.83041 10.9112 1.33493 11.4027 1.94355 11.73L4.00057 12.71V17.61C4.00178 19.8011 5.42749 21.7368 7.51957 22.388C8.97546 22.8092 10.4851 23.0154 12.0006 23C13.5159 23.017 15.0255 22.8125 16.4816 22.393C18.5737 21.7419 19.9994 19.8061 20.0006 17.615V12.708L22.0006 11.752V20C22.0006 20.5522 22.4483 20.9999 23.0006 20.9999C23.5529 20.9999 24.0006 20.5522 24.0006 20V7.99996C24.0072 6.8257 23.0801 5.74091 22.0575 5.22998ZM18.0005 17.615C18.0011 18.9256 17.1507 20.0849 15.9005 20.478C14.6328 20.8402 13.319 21.0161 12.0005 21C10.6821 21.0161 9.36832 20.8402 8.10054 20.478C6.85033 20.0848 6.00002 18.9256 6.00054 17.615V13.663L9.31755 15.243C10.136 15.729 11.0707 15.9844 12.0226 15.982C12.9286 15.9884 13.8193 15.7486 14.5996 15.288L18.0005 13.663V17.615ZM21.2006 9.92498L13.6586 13.525C12.607 14.1373 11.3035 14.12 10.2686 13.48L2.88953 9.96998C2.06702 9.52645 1.7598 8.50012 2.20333 7.67765C2.35333 7.39949 2.57824 7.16891 2.85255 7.01198L10.3475 3.43199C11.3995 2.82102 12.7022 2.83832 13.7375 3.47699L21.1115 6.98999C21.6538 7.29112 21.9931 7.85976 22.0005 8.48001C22.0015 9.06754 21.699 9.61391 21.2006 9.92498Z" fill="#4C3B8A"/>
</svg>
`;
</script>
<style lang="scss">
@import '../specialties/specialties.scss';
</style>
