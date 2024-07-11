<template>
  <div class="m-specialization-card">
    <div class="m-specialization-card__inner">
      <div class="m-specialization-card__head">
        <div class="m-specialization-card__accr-info f-text-xs">
          <span class="gray"> {{ oksoInfo.attributes.code_okso }} </span>
          <span v-if="info.attributes.is_accreditation" class="green">Аккредитована</span>
          <span v-else class="red">Не аккредитована</span>
        </div>
        <h4 class="title-h4">{{ oksoInfo.attributes.name }}</h4>
        <p class="f-text-s">{{ oksoInfo.attributes.qualification }}</p>
      </div>
      <div class="m-specialization-card__content f-text-s">
        <div class="m-specialization-card__column">
          <div class="m-specialization-card__item">
            <span>Вступительные испытания</span>
            <span class="m-specialization-card__points"></span>
            <span class="f-font-700">Конкурс аттестатов</span>
          </div>
          <div class="m-specialization-card__item">
            <span>Бюджетные места</span>
            <span class="m-specialization-card__points"></span>
            <span v-if="info.attributes.budget_places > 0" class="f-font-700">{{ info.attributes.budget_places }}</span>
            <span v-else class="f-font-700">Нет</span>
          </div>
          <div class="m-specialization-card__item">
            <span>База обучения</span>
            <span class="m-specialization-card__points"></span>
            <span class="f-font-700">{{ info.attributes.base }} классов</span>
          </div>
        </div>
        <div class="m-specialization-card__column">
          <div class="m-specialization-card__item">
            <span>Срок обучения</span>
            <span class="m-specialization-card__points"></span>
            <span class="f-font-700">
              <span v-if="years"> {{ years }} <span v-if="years > 1">года</span><span v-else>год</span> </span>
              <span v-if="months">&nbsp;{{ months }} месяцев</span>
            </span>
          </div>
          <div class="m-specialization-card__item">
            <span>Стоимость обучения (₽/год)</span>
            <span class="m-specialization-card__points"></span>
            <span v-if="info.attributes.cost > 0" class="f-font-700">{{
              Number(info.attributes.cost).toLocaleString()
            }}</span>
            <span v-else class="f-font-700">Бесплатно</span>
          </div>
          <div class="m-specialization-card__item">
            <span>Форма обучения</span>
            <span class="m-specialization-card__points"></span>
            <span class="f-font-700">
              <span v-for="(form, index) in forms" :key="index">{{ form.name }}</span>
            </span>
          </div>
        </div>
      </div>
      <a-button
        :label="`${info.attributes.calc_data.count_professions} профессий`"
        color="white"
        textSize="f-text-m"
        textWeight="700"
        :img="arrow"
        :center="false"
      />
    </div>
  </div>
</template>

<script setup>
import { getIncludeData } from '~/composables/getIncludeData';

const props = defineProps({
  info: { type: Object, default: () => ({}) },
  included: { type: Object, default: () => ({}) },
});

const oksoInfo = computed(() => {
  return getIncludeData(props.info, props.included, 'oksoSpecialty');
});

const years = computed(() => {
  let y = props.info.attributes.duration / 12;
  y = Math.floor(y);
  return y;
});

const months = computed(() => {
  return props.info.attributes.duration % 12;
});

const forms = computed(() => {
  return getIncludeData(props.info, props.included, 'form');
});

const arrow = `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 6.00056C13.9951 5.47445 13.7832 4.97146 13.41 4.60056L9.12 0.300559C8.93264 0.114308 8.67919 0.00976563 8.415 0.00976562C8.15082 0.00976563 7.89736 0.114308 7.71 0.300559C7.61627 0.393522 7.54188 0.504123 7.49111 0.625982C7.44034 0.747841 7.4142 0.878547 7.4142 1.01056C7.4142 1.14257 7.44034 1.27328 7.49111 1.39513C7.54188 1.51699 7.61627 1.6276 7.71 1.72056L11 5.00056H1C0.734784 5.00056 0.48043 5.10592 0.292893 5.29345C0.105357 5.48099 0 5.73534 0 6.00056C0 6.26577 0.105357 6.52013 0.292893 6.70766C0.48043 6.8952 0.734784 7.00056 1 7.00056H11L7.71 10.2906C7.5217 10.4775 7.41538 10.7317 7.41444 10.997C7.41351 11.2624 7.51802 11.5173 7.705 11.7056C7.89198 11.8939 8.1461 12.0002 8.41147 12.0011C8.67683 12.0021 8.9317 11.8975 9.12 11.7106L13.41 7.41056C13.7856 7.03721 13.9978 6.53014 14 6.00056Z" fill="#FD8B21"/>
</svg>`;
</script>

<style>
@import './m-specialization-card.scss';
</style>
