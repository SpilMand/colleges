<template>
  <div class="m-about-card">
    <div class="m-about-card__head">
      <h5 class="m-about-card__title title-h5 violet-100">{{ data.title }}</h5>
      <div class="m-about-card__icon">
        <img :src="data.iconSrc" :alt="data.title" loading="lazy" />
      </div>
    </div>
    <div class="m-about-card__wrapper">
      <div class="m-about-card__content">
        <nuxt-link
          v-for="(item, index) in data.items"
          :key="index"
          :to="getLink(data.name, item)"
          class="m-about-card__item f-text-m violet-100 f-link"
          :test-id="`link-m-about-card-${data.id}`"
        >
          {{ item?.name.includes('профессия ') ? item?.name.split('профессия ')[1] : item?.name }}
        </nuxt-link>
      </div>
    </div>
    <a-button
      v-if="!data.class"
      class="m-about-card__button f-text-m w-100"
      label="Смотреть все"
      color="outline"
      size="extra-large"
      :class="data.class"
      test-id="btn-m-about-card-all"
      @click="navigateTo(data.link + (selectedCityOptionSlug ? '/' + selectedCityOptionSlug : ''))"
    />
    <a-button
      v-else
      class="m-about-card__button f-text-m w-100"
      label="Смотреть все"
      color="outline"
      size="extra-large"
      :class="data.class"
      test-id="btn-m-about-card-all"
      @click="navigateTo('#directions')"
    />
  </div>
</template>

<script setup>
import scrollToSection from '~/composables/scrollToSection';
import { useCityIdStore } from '~/store/city';
defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
const cityStore = useCityIdStore();
const selectedCityOptionSlug = computed(() => cityStore.$state.selectedOptionSlug);

const getLink = (name, { id, slug }) => {
  if (name === 'directions' && slug !== undefined) {
    return 'colleges' + '/' + slug;
  }

  switch (name) {
    case 'specialties':
      return 'specialty' + '/' + id;
    case 'professions':
      return 'profession' + '/' + id + '/specialties';
    default:
      return name + '/' + id;
  }
};

onMounted(() => {
  scrollToSection();
});
</script>

<style lang="scss">
@import './m-about-card.scss';
</style>
