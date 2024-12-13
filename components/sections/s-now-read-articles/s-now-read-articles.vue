<template>
  <section id="" class="s-now-read-articles section-m swiper-default">
    <h2 class="s-now-read-articles__title title-h2">{{ title }}</h2>
    <div class="s-now-read-articles__box">
      <swiper v-bind="swiperConfig" class="mySwiper">
        <swiper-slide v-for="(article, index) in articles" :key="index">
          <m-articles-card :info="article" :articles="article" />
        </swiper-slide>
      </swiper>
      <div class="s-now-read-articles-swiper-pagination s-swiper-pagination"></div>
      <div class="s-now-read-articles-swiper-navigation s-swiper-navigation">
        <div ref="sliderPrev" class="swiper-button-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M0.733087 11.7416L3.95809 14.9999C4.03556 15.078 4.12772 15.14 4.22927 15.1823C4.33082 15.2246 4.43974 15.2464 4.54975 15.2464C4.65976 15.2464 4.76868 15.2246 4.87023 15.1823C4.97178 15.14 5.06395 15.078 5.14142 14.9999C5.21953 14.9224 5.28152 14.8303 5.32383 14.7287C5.36614 14.6272 5.38792 14.5183 5.38792 14.4083C5.38792 14.2982 5.36614 14.1893 5.32383 14.0878C5.28152 13.9862 5.21953 13.8941 5.14142 13.8166L2.17475 10.8333H19.1664C19.3874 10.8333 19.5994 10.7455 19.7557 10.5892C19.912 10.4329 19.9998 10.2209 19.9998 9.99992C19.9998 9.7789 19.912 9.56694 19.7557 9.41066C19.5994 9.25438 19.3874 9.16658 19.1664 9.16658H2.12475L5.14142 6.14992C5.28916 5.99494 5.37158 5.78903 5.37158 5.57492C5.37158 5.3608 5.28916 5.1549 5.14142 4.99992C5.06395 4.92181 4.97178 4.85981 4.87023 4.81751C4.76868 4.7752 4.65976 4.75342 4.54975 4.75342C4.43974 4.75342 4.33082 4.7752 4.22927 4.81751C4.12772 4.85981 4.03556 4.92181 3.95809 4.99992L0.733087 8.20825C0.264918 8.677 0.00195313 9.31242 0.00195312 9.97492C0.00195312 10.6374 0.264918 11.2728 0.733087 11.7416Z"
              fill="#BFB3EE"
            />
          </svg>
        </div>
        <div ref="sliderNext" class="swiper-button-next">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path
              d="M19.2667 4.25831L16.0417 0.999978C15.9642 0.921871 15.872 0.859875 15.7705 0.817568C15.6689 0.775261 15.56 0.753479 15.45 0.753479C15.34 0.753479 15.2311 0.775261 15.1295 0.817568C15.028 0.859875 14.9358 0.921871 14.8583 0.999978C14.7031 1.15611 14.616 1.36732 14.616 1.58748C14.616 1.80763 14.7031 2.01884 14.8583 2.17498L17.825 5.16664H0.833333C0.61232 5.16664 0.400358 5.25444 0.244078 5.41072C0.0877974 5.567 0 5.77896 0 5.99998C0 6.22099 0.0877974 6.43295 0.244078 6.58923C0.400358 6.74551 0.61232 6.83331 0.833333 6.83331H17.875L14.8583 9.84165C14.7802 9.91911 14.7182 10.0113 14.6759 10.1128C14.6336 10.2144 14.6118 10.3233 14.6118 10.4333C14.6118 10.5433 14.6336 10.6522 14.6759 10.7538C14.7182 10.8553 14.7802 10.9475 14.8583 11.025C14.9358 11.1031 15.028 11.1651 15.1295 11.2074C15.2311 11.2497 15.34 11.2715 15.45 11.2715C15.56 11.2715 15.6689 11.2497 15.7705 11.2074C15.872 11.1651 15.9642 11.1031 16.0417 11.025L19.2667 7.79164C19.7348 7.32289 19.9978 6.68748 19.9978 6.02498C19.9978 5.36248 19.7348 4.72706 19.2667 4.25831Z"
              fill="#BFB3EE"
            />
          </svg>
        </div>
      </div>
      <div class="f-btn-college">
        <a-button
          label="Все статьи"
          color="violet-5"
          size="medium"
          textSize="f-text-s"
          test-id="link-s-now-read-articles-all"
          @click="navigateTo('/blog/news')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';

defineProps({
  articles: { type: Array, default: () => [] },
  title: { type: String, default: 'Сейчас читают' },
});

const sliderPrev = ref(null);
const sliderNext = ref(null);

const swiperConfig = reactive({
  slidesPerView: '1',
  spaceBetween: '16',
  grabCursor: true,
  navigation: {
    prevEl: sliderPrev,
    nextEl: sliderNext,
  },
  pagination: {
    el: '.s-now-read-articles-swiper-pagination',
    clickable: true,
  },
  modules: [Pagination, Navigation],
  breakpoints: {
    576: {
      slidesPerView: '1',
    },
    768: {
      slidesPerView: '3',
    },
    1280: {
      slidesPerView: '4',
    },
  },
});
</script>

<style lang="scss">
@import './s-now-read-articles.scss';
</style>
