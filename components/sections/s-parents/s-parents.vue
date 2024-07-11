<template>
  <section class="s-parents section-l">
    <div class="s-parents__wrapper section-l">
      <div class="container">
        <NuxtLink v-if="width < 768" class="s-parents__banner" to="#form">
          <img src="/icons/banner.svg" alt="" />
        </NuxtLink>
        <a-breadcrumbs :items="breadcrumbs" />
        <div class="s-parents__title">
          <h1 class="title-h2">{{ title }}</h1>
          <NuxtLink v-if="width > 767" to="#form" class="">
            <img src="/icons/banner.svg" alt="" />
          </NuxtLink>
        </div>

        <div class="s-parents__desc desc-mid mbx10">
          Для родителя важно, чтобы его ребёнок получил хорошее образование и нашёл себя в этой жизни. Ведь учёба
          и образование необходимы практически на каждом этапе жизни человека. Сайт
          <nuxt-link to="/" class="f-font-700 f-link">Колледжи.рф</nuxt-link> собрал всю важную информацию по:
          колледжам, профессиям, специальностям по всем городам России.
        </div>

        <h3 class="mbx10 title-h3 f-font-700">На сайте представлены:</h3>

        <m-main-list :list="list" />
      </div>
    </div>
    <div class="container">
      <h3 class="mbx10 title-h3 f-font-700">Актуальная информация о колледжах</h3>

      <p class="f-text-xxxl mbx8">
        Мы ведём мониторинг информации о колледжах и ежедневно актуализируем её с Минобрнаука. Здесь вы найдёте
        всю интересующую вас информацию о колледжах:
      </p>

      <div class="s-parents__list">
        <m-parents-list v-for="(item, index) in info" :key="index" :info="item" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { useWindowSize } from '@vueuse/core';
import { getTitle } from '~/composables/utils';

const props = defineProps({
  apiDirections: {
    type: Object,
    default: () => ({}),
  },
  apiSpecialties: {
    type: Object,
    default: () => ({}),
  },
  apiColleges: {
    type: Object,
    default: () => ({}),
  },
  apiProfessions: {
    type: Object,
    default: () => ({}),
  },
});

const { width } = useWindowSize();
const title = ref('Родителям');
const breadcrumbs = [{ label: 'Страница второго порядка', link: '/parents' }];
const info = ref([
  {
    title: 'Аккредитации и лицензии',
    img: '/img/parents/icon/accreditation.svg',
  },
  {
    title: 'Формы обучения',
    img: '/img/parents/icon/training.svg',
  },
  {
    title: 'Отзывы о колледжах',
    img: '/img/parents/icon/reviews.svg',
  },

  {
    title: 'Бюджетные места',
    img: '/img/parents/icon/budget.svg',
  },
  {
    title: 'Специальности и профессии',
    img: '/img/parents/icon/specialties.svg',
  },
  {
    title: 'Фотографии колледжей',
    img: '/img/parents/icon/photos.svg',
  },
  {
    title: 'Проходные баллы',
    img: '/img/parents/icon/points.svg',
  },
  {
    title: 'Направления колледжей',
    img: '/img/parents/icon/directions.svg',
  },
  {
    title: 'Контакты и приёмная комиссия',
    img: '/img/parents/icon/contacts.svg',
  },

  {
    title: 'Стоимость и сроки обучения',
    img: '/img/parents/icon/price.svg',
  },
  {
    title: 'Условия обучения (общежития)',
    img: '/img/parents/icon/hostels.svg',
  },
]);
const list = ref({});
watchEffect(() => {
  list.value = [
    {
      icon: 'college',
      count: computed(() => getTitle(props.apiColleges, 'колледж')),
      link: '/colleges',
      name: 'college',
    },
    {
      icon: 'directions',
      count: computed(() => getTitle(props.apiDirections, 'направление')),
      link: '#directions',
      name: 'directions',
    },
    {
      icon: 'specialties',
      count: computed(() => getTitle(props.apiSpecialties, 'специальность')),
      link: '/specialties',
      name: 'specialties',
    },
    {
      icon: 'professions',
      count: computed(() => getTitle(props.apiProfessions, 'профессия')),
      link: '/professions',
      name: 'professions',
    },
  ];
});
</script>

<style lang="scss">
@import './s-parents.scss';
</style>
