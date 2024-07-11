<template>
  <section class="s-about section-l">
    <div class="container">
      <!-- <div v-html="settings.data[0].attributes.data.content"></div> -->
      <div v-if="showDescText" class="s-about__desc">
        <p class="desc">
          <strong class="violet-100 f-font-700">Колледжи.рф</strong>
          — это сайт, где собраны<br />
          все колледжи России и информация<br />
          об обучении в них. Здесь ты сможешь выбрать:
          <nuxt-link class="s-about__desc-link" to="/colleges">колледж,</nuxt-link>
          &nbsp;<nuxt-link class="s-about__desc-link" to="/specialties">специальность,</nuxt-link>
          которой хочешь учиться и свою будущую профессию
        </p>
      </div>
      <div v-if="!onlyText" class="s-about__box">
        <m-about-card v-for="(card, index) in cards" :key="index" :data="card" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { getTitle } from '~/composables/utils';
// import getSettings from "~/api/settings/getSettings";
// const settings = await getSettings();

const props = defineProps({
  onlyText: { type: Boolean, default: false },
  showDescText: { type: Boolean, default: true },
  showDirectionsCard: { type: Boolean, default: true },
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

const cards = ref([]);

// function getIncludedItems(apiData) {
//   if (apiData && apiData.included) {
//     return apiData.included.map((item) => ({
//       name: item.attributes.name,
//       id: item.id,
//     }));
//   }
//   return [];
// }

function getDataItems(apiData) {
  if (apiData && apiData.data) {
    return apiData.data.map((item) => ({
      name: item?.attributes?.name,
      id: item.id,
    }));
  }
  return [];
}

watchEffect(() => {
  const newCards = [
    {
      title: computed(() => getTitle(props.apiColleges, 'колледж')),
      items: computed(() => getDataItems(props.apiColleges)),
      iconSrc: '/img/about/icon-1.svg',
      link: '/colleges',
      name: `college`,
    },
    props.showDirectionsCard
      ? {
          title: computed(() => getTitle(props.apiDirections, 'направление')),
          items: computed(() => getDataItems(props.apiDirections)),
          iconSrc: '/img/about/icon-2.svg',
          class: 'scroll',
          name: 'directions',
        }
      : null,
    {
      title: computed(() => getTitle(props.apiSpecialties, 'специальность')),
      items: computed(() => getDataItems(props.apiSpecialties)),
      iconSrc: '/img/about/icon-3.svg',
      link: '/specialties',
      name: 'specialties',
    },
    {
      title: computed(() => getTitle(props.apiProfessions, 'профессия')),
      items: computed(() => getDataItems(props.apiProfessions)),
      iconSrc: '/img/about/icon-3.svg',
      link: '/professions',
      name: 'professions',
    },
  ];

  cards.value = newCards.filter((card) => card !== null);
});
</script>

<style lang="scss">
@import './s-about.scss';
</style>
