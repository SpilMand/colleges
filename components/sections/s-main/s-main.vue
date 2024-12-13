<template>
  <section class="s-main">
    <div class="s-main__wrapper">
      <div class="container">
        <div class="s-main__box">
          <h1 class="s-main__title" :aria-lsabel="pageTitle">
            <img src="/img/main/title.svg" loading="lazy" :alt="pageTitle" />
            <span class="d-none">{{ pageTitle }}</span>
          </h1>
          <div class="s-main__subtitle subtitle f-font-700">{{ subtitle }}</div>
          <a-search v-if="false" section-id="s-main" size="big" :isSearch="!isSearch" />
          <m-main-list section-id="s-main" :list="list" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
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
    default: 'Колледжи',
  },
});
const isSearch = ref(false);
const subtitle = ref('Подбери профессиональное образование — быстро и легко');

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
@import './s-main.scss';
</style>
