<template>
  <section class="s-applicants s-parents section-l">
    <div class="s-applicants__wrapper section-l">
      <div class="container">
        <NuxtLink
          v-if="width < 768"
          class="s-applicants__banner s-parents__banner"
          to="#form"
          test-id="link-s-applicants-banner-mobile"
        >
          <img src="/icons/banner.svg" alt="" />
        </NuxtLink>
        <a-breadcrumbs :items="breadcrumbs" />
        <div class="s-applicants__title s-parents__title">
          <h1 class="title-h2">{{ pageTitle }}</h1>
          <NuxtLink v-if="width >= 768" to="#form" class="" test-id="link-s-applicants-banner">
            <img src="/icons/banner.svg" alt="" />
          </NuxtLink>
        </div>
        <div class="section-l">
          <div class="s-applicants__desc desc-mid mbx10">
            Учёба и образование необходимы практически на каждом этапе жизни человека. Так, после окончания 9 класса,
            у многих учеников возникает вопрос «Что делать дальше?». Ответы на все эти вопросы вы найдёте на нашем сайте
            <nuxt-link to="/" class="f-font-700 f-link" test-id="link-s-applicants-main">Колледжи.рф.</nuxt-link>
          </div>
          <div class="s-applicants__faq">
            <a-button
              v-for="question of faqQuestions"
              :key="question"
              :label="question"
              :img="arrow"
              :center="false"
              color="outline"
              class="s-applicants__button"
              test-id="link-s-applicants-faq-colleges"
            />
          </div>
        </div>
        <h3 class="mbx10 title-h3 f-font-700">
          Вся полезная информация о колледжах обновляется каждый день. На сайте представлены:
        </h3>
        <m-main-list class="s-applicants-main__list" section-id="s-applicants" :list="list" />
      </div>
    </div>
    <div class="container">
      <h3 class="mbx10 title-h3 f-font-700">Настройте свой идеальный поиск</h3>
      <p class="f-text-xxxl mbx8">
        С помощью умных фильтров вы сможете настроить поиск: колледжей, профессий и специальностей под интересующие
        вас параметры.<br />
        Также вы можете искать колледжи по всей России или под определенный город на карте.
      </p>
      <div class="s-applicants__list s-parents__list">
        <m-parents-list v-for="(item, index) in info" :key="index" :info="item" />
      </div>
      <m-search-colleges />
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
  pageTitle: {
    type: String,
    default: 'Абитуриентам',
  },
});

const { width } = useWindowSize();
const list = ref({});
const breadcrumbs = [{ label: 'Абитуриентам', link: '/parents' }];

const info = ref([
  {
    title: 'Проходные баллы',
    img: '/img/parents/icon/points.svg',
  },
  {
    title: 'Срок обучения',
    img: '/img/parents/icon/deadline.svg',
  },
  {
    title: 'База обучения',
    img: '/img/parents/icon/base.svg',
  },
  {
    title: 'Направления колледжей',
    img: '/img/parents/icon/directions.svg',
  },
  {
    title: 'Формы обучения',
    img: '/img/parents/icon/training.svg',
  },
  {
    title: 'Общежитие',
    img: '/img/parents/icon/block.svg',
  },
  {
    title: 'Бюджетные места',
    img: '/img/parents/icon/budget.svg',
  },
  {
    title: 'Город',
    img: '/img/parents/icon/hostels.svg',
  },
  {
    title: 'Стоимость обучения',
    img: '/img/parents/icon/price.svg',
  },
]);

const faqQuestions = ref([
  'Какие есть колледжи?',
  'Какие есть профессии?',
  'Какую специальность лучше выбрать?',
  'Какие есть специальности?',
  'Где лучше учиться и куда поступить?',
  'Кем лучше стать? Какую профессию выбрать?',
]);

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

const arrow = `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 6.00001C13.9951 5.4739 13.7832 4.97091 13.41 4.60001L9.12 0.300009C8.93264 0.113758 8.67919 0.00921631 8.415 0.00921631C8.15082 0.00921631 7.89736 0.113758 7.71 0.300009C7.61627 0.392972 7.54188 0.503573 7.49111 0.625432C7.44034 0.747292 7.4142 0.877997 7.4142 1.01001C7.4142 1.14202 7.44034 1.27273 7.49111 1.39459C7.54188 1.51644 7.61627 1.62705 7.71 1.72001L11 5.00001H1C0.734784 5.00001 0.48043 5.10537 0.292893 5.2929C0.105357 5.48044 0 5.73479 0 6.00001C0 6.26523 0.105357 6.51958 0.292893 6.70712C0.48043 6.89465 0.734784 7.00001 1 7.00001H11L7.71 10.29C7.5217 10.477 7.41538 10.7311 7.41444 10.9965C7.41351 11.2618 7.51802 11.5167 7.705 11.705C7.89198 11.8933 8.1461 11.9996 8.41147 12.0006C8.67683 12.0015 8.9317 11.897 9.12 11.71L13.41 7.41001C13.7856 7.03666 13.9978 6.52959 14 6.00001Z" fill="#FD8B21"/>
</svg>`;
</script>
<style lang="scss">
@import './s-applicants.scss';
</style>
