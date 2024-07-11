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
          :to="data.name + '/' + item.id"
          class="m-about-card__item f-text-m violet-100 f-link"
        >
          {{ item?.name.includes('профессия ') ? item?.name.split('профессия ')[1] : item?.name }}
        </nuxt-link>
      </div>
    </div>
    <nuxt-link
      v-if="!data.class"
      :to="data.link + (selectedCityOptionSlug ? '/' + selectedCityOptionSlug : '')"
      class="m-about-card__button"
      :class="data.class"
    >
      <a-button class="f-text-m w-100" label="Смотреть все" color="outline" size="extra-large" />
    </nuxt-link>
    <a v-else href="#directions" class="m-about-card__button" :class="data.class">
      <a-button class="f-text-m w-100" label="Смотреть все" color="outline" size="extra-large" />
    </a>
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
onMounted(() => {
  scrollToSection();
});
</script>

<style lang="scss">
@import './m-about-card.scss';
</style>
