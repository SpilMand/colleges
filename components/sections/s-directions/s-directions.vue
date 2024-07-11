<template>
  <section id="directions" class="s-directions section-l swiper-default">
    <div class="container">
      <h2 class="s-directions__title title-h2">{{ title }}</h2>
      <div class="s-directions__box">
        <swiper v-bind="swiperConfig" class="mySwiper">
          <swiper-slide v-for="(direction, index) in allDirections" :key="index">
            <m-directions-card :directions="direction" />
          </swiper-slide>
          <swiper-slide v-if="showCard && allDirections.length >= 7" @click="showAllDirections">
            <div class="s-directions__card">
              <div class="s-directions__card-title f-text-m violet-100">Все направления</div>
              <div class="s-directions__card-text f-text-s gray">{{ apiDirections.meta?.page?.total }} направлений</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { declineWord } from '~/composables/utils';
const props = defineProps({
  apiDirections: {
    type: Object,
    default: () => ({}),
  },
});

const swiperConfig = reactive({
  slidesPerView: '1',
  spaceBetween: '16',
  grabCursor: true,
  breakpoints: {
    576: {
      slidesPerView: '99999',
      spaceBetween: '0',
    },
  },
});

const allDirections = ref([]);
const showCard = ref(true);

const showAllDirections = () => {
  showCard.value = false;
  allDirections.value = props.apiDirections.data.map(({ attributes }) => ({
    title: attributes.name,
    subtitle: attributes.calc_data.count_colleges + ' ' + declineWord(attributes.calc_data.count_colleges, 'колледж'),
    bg: attributes.calc_data.image,
    slug: attributes.slug,
  }));
};

watchEffect(() => {
  if (props.apiDirections && props.apiDirections.data) {
    allDirections.value = props.apiDirections.data.slice(0, 7).map(({ attributes }) => ({
      title: attributes.name,
      subtitle: attributes.calc_data.count_colleges + ' ' + declineWord(attributes.calc_data.count_colleges, 'колледж'),
      bg: attributes.calc_data.image,
      slug: attributes.slug,
    }));
  }
  showCard.value = true;
});

const title = ref('Направления колледжей');
</script>

<style lang="scss">
@import './s-directions.scss';
</style>
