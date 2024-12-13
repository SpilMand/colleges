<template>
  <div class="m-specialties-card cards-stretched" :class="{ alternative: alternative }">
    <div class="m-specialties-card__inner">
      <NuxtLink
        :to="{ path: `/specialty/${options.id}`, params: { id: options.id } }"
        class="title-h4"
        :test-id="`link-m-specialties-card-${options.id}`"
        >{{ options.name }}</NuxtLink
      >
      <div class="m-specialties-card__wrap">
        <p class="m-specialties-card__subtitle f-text-m">{{ options.qualification }}</p>
        <span v-if="options.isAd" class="m-specialties-card__info f-text-xxs gray">Реклама</span>
        <span v-else class="m-specialties-card__info f-text-xxs gray">{{ options.code_okso }}</span>
        <a-button
          v-if="options.learnMore"
          class="w-100"
          :label="'Узнать больше'"
          color="orange"
          textSize="f-text-m"
          :test-id="`btn-m-specialties-card-${options.id}-more`"
          :img="arrow"
          :center="false"
        />
      </div>
      <ul v-if="!options.isAd" class="m-specialties-card__list">
        <li v-if="width >= 768" class="m-specialties-card__list-item head f-text-xs gray">
          <span class="m-specialties-card__list-param">название колледжа</span>
          <span class="m-specialties-card__list-param">форма обучения</span>
          <span class="m-specialties-card__list-param">срок обучения</span>
          <span class="m-specialties-card__list-param">бюджетных мест</span>
          <span class="m-specialties-card__list-param">ср. балл аттестат</span>
          <span class="m-specialties-card__list-param">стоимость за год (₽)</span>
          <span v-if="alternative" class="m-specialties-card__list-param">аккредитация специальности</span>
        </li>
        <li v-for="(college, index) in options.data" :key="index" class="f-text-xs">
          <NuxtLink
            :to="{
              path: `/college/${college.college_id}/specialties`,
              params: { id: college.college_id },
            }"
            class="m-specialties-card__list-item"
            :test-id="`link-m-specialties-card-${options.id}-option`"
          >
            <div class="m-specialties-card__list-param college-title">
              <img :src="college.url" />
              {{ college.college_name }}
            </div>
            <div class="m-specialties-card__list-param">
              <span v-if="width < 768" class="m-specialties-card__list-param-label gray">форма обучения</span>
              {{ college.form }}
            </div>
            <div class="m-specialties-card__list-param">
              <span v-if="width < 768" class="m-specialties-card__list-param-label gray">срок обучения</span>
              <span v-if="Math.floor(college.duration / 12) != 0">
                {{ Math.floor(college.duration / 12) }} года&nbsp; </span
              >{{ college.duration % 12 }} мес.
            </div>
            <div class="m-specialties-card__list-param">
              <span v-if="width < 768" class="m-specialties-card__list-param-label gray">бюджетных мест</span>
              {{ college.budget_places != 0 ? college.budget_places : 'нет' }}
            </div>
            <div class="m-specialties-card__list-param">
              <span v-if="width < 768" class="m-specialties-card__list-param-label gray">ср. балл аттестат</span>
              {{ college.att > 0 ? college.att : '−' }}
            </div>
            <div class="m-specialties-card__list-param">
              <span v-if="width < 768" class="m-specialties-card__list-param-label gray"> стоимость за год (₽) </span>
              {{ college.cost > 0 ? Number(college.cost).toLocaleString() : 'бесплатно' }}
            </div>
            <div v-if="alternative" class="m-specialties-card__list-param">
              <span v-if="windowWidth < 768" class="m-specialties-card__list-param-label gray">
                аккредитация специальности
              </span>
              <!-- <span v-if="options.isAccredited" class="green">аккредитована</span>
              <span v-else class="red">не аккредитована</span> -->
            </div>
          </NuxtLink>
        </li>
      </ul>
      <a
        :href="`/specialty/${options.id}`"
        class="m-specialties-card__more violet-100 f-font-700 f-text-s"
        :test-id="`link-m-specialties-card-${options.id}-all`"
      >
        Все колледжи
      </a>
    </div>
  </div>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

// import getSpecialties from '~/api/specialties/getSpecialties';

defineProps({
  options: { type: Object, default: () => ({}) },
  isAd: { type: Boolean, default: false },
  alternative: { type: Boolean, default: false },
  learnMore: { type: Boolean, default: false },
});

// const collegesCount = computed(() => {
//   let count;
//   if (props.options.calc_data.count_colleges > 3) {
//     count = 3;
//   } else {
//     count = props.options.calc_data.count_colleges;
//   }
//   return count;
// })

// const countColleges = ref();

// const colleges = computed(() => {
//   let arr = [];
//   countColleges.value = 0;
//   for (let college of props.options.data) {
//     if (college.row_num == 1) {
//       countColleges.value++;
//       if (arr.length < 3) {
//         arr.push(college);
//       }
//     }
//   }
//   return arr;
// });

const windowWidth = ref();

const arrow = `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 6.00056C13.9951 5.47445 13.7832 4.97146 13.41 4.60056L9.12 0.300559C8.93264 0.114308 8.67919 0.00976563 8.415 0.00976562C8.15082 0.00976563 7.89736 0.114308 7.71 0.300559C7.61627 0.393522 7.54188 0.504123 7.49111 0.625982C7.44034 0.747841 7.4142 0.878547 7.4142 1.01056C7.4142 1.14257 7.44034 1.27328 7.49111 1.39513C7.54188 1.51699 7.61627 1.6276 7.71 1.72056L11 5.00056H1C0.734784 5.00056 0.48043 5.10592 0.292893 5.29345C0.105357 5.48099 0 5.73534 0 6.00056C0 6.26577 0.105357 6.52013 0.292893 6.70766C0.48043 6.8952 0.734784 7.00056 1 7.00056H11L7.71 10.2906C7.5217 10.4775 7.41538 10.7317 7.41444 10.997C7.41351 11.2624 7.51802 11.5173 7.705 11.7056C7.89198 11.8939 8.1461 12.0002 8.41147 12.0011C8.67683 12.0021 8.9317 11.8975 9.12 11.7106L13.41 7.41056C13.7856 7.03721 13.9978 6.53014 14 6.00056Z" fill="#FFFFFF"/>
  </svg>`;
</script>

<style>
@import './m-specialties-card.scss';
</style>
