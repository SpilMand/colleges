<template>
  <div v-if="options.attributes" class="m-card cards-stretched">
    <div class="m-card__content" :class="{ alternative: alternative == 1 }">
      <div class="m-card__logo" :class="{ 'no-logo': !logo }">
        <img v-if="logo" :src="logo" alt="" />
        <img v-else src="/img/colleges/logo.svg" alt="" />
      </div>
      <div class="m-card__info-main">
        <div class="m-card__tags f-text-xs">
          <div v-if="alternative == 0" class="m-card__tags-tag city">
            {{ options.attributes.calc_data.city }}
          </div>
          <div v-if="alternative == 0" class="m-card__tags-tag type">
            <span v-if="options.attributes.is_state">Государственный</span>
            <span v-else>Негосударственный</span>
          </div>
          <div v-if="alternative == 1" class="m-card__tags-tag date f-text-xxs gray">
            {{ oksoData.attributes.code_okso }}
          </div>
          <div v-if="options.attributes.accreditation_number" class="m-card__tags-tag green">Аккредитован</div>
          <div v-else class="m-card__tags-tag red">Не аккредитован</div>
          <div
            v-if="options.attributes.is_hostel && !isAd && !isFlag && alternative == 0"
            class="m-card__tags-tag dormitory"
          >
            <img src="/icons/dormitory.svg" /><span>Общежитие</span>
          </div>
          <span v-if="isAd" class="m-card__ad">Реклама</span>
        </div>
        <!-- <h5 v-if="alternative === 0 || isAd" class="title-h5" :class="{ alternative: alternative === 2 }">
          {{ options.attributes.name || '' }}
        </h5> -->
        <h5 class="title-h5" :class="{ alternative: alternative == 2 }">
          <NuxtLink :to="{ path: `/college/${options.id}`, params: { id: options.id } }">{{
            options.attributes.name || ''
          }}</NuxtLink>
        </h5>
        <p v-if="isAd" class="m-card__text">
          Один из лучших колледжей Москвы! Более 30 специальностей, 60 профессий, 8 направлений! Новые корпуса и
          аудитории
        </p>
        <p v-if="alternative == 1" class="f-text-s">
          {{ oksoData.attributes.qualification }}
        </p>
      </div>
      <div class="m-card__actions" :class="{ alternative: alternative == 2 }">
        <div v-if="!isAd" class="m-card__info-sub f-text-xs">
          <div v-if="alternative == 1" class="m-card__block">
            <span class="m-card__block-hint gray">город</span>
            <span :class="alternative == 0 ? 'f-text-l' : 'f-text-xs'" class="f-font-700">{{
              city.attributes?.name || ''
            }}</span>
          </div>
          <div v-if="alternative == 0" class="m-card__block">
            <span class="m-card__block-hint gray">специальностей</span>
            <span class="f-text-l f-font-700">{{ options.attributes.calc_data?.count_specialties || '' }}</span>
          </div>
          <div class="m-card__block">
            <span class="m-card__block-hint gray">профессий</span>
            <span :class="alternative == 0 ? 'f-text-l' : 'f-text-xs'" class="f-font-700">
              {{ options.attributes.calc_data?.count_professions || '' }}
            </span>
          </div>
          <div class="m-card__block">
            <span class="m-card__block-hint gray">ср. балл аттестат</span>
            <span
              v-if="monitorData[3] && monitorData[3].attributes.value != 0"
              :class="alternative == 0 ? 'f-text-l' : 'f-text-xs'"
              class="f-font-700"
              >{{ monitorData[3].attributes.value }}</span
            >
            <span v-else class="f-font-700" :class="alternative == 0 ? 'f-text-l' : 'f-text-xs'">−</span>
          </div>
          <div class="m-card__block">
            <span class="m-card__block-hint gray">бюджетных мест</span>
            <span v-if="alternative == 0" class="f-text-l f-font-700">
              {{ options.attributes.calc_data?.budget_places || 'нет' }}
            </span>
            <span v-else class="f-text-xs f-font-700">
              {{ specialtyData.attributes.budget_places || 'нет' }}
            </span>
          </div>
          <div v-if="alternative == 1 && specialtyData.attributes" class="m-card__block">
            <span class="m-card__block-hint gray f-text-xs">база обучения</span>
            <span class="f-font-700">после {{ specialtyData.attributes.base }} класса</span>
          </div>
          <div v-if="alternative == 1" class="m-card__block">
            <span class="m-card__block-hint gray">форма обучения</span>
            <span class="f-font-700">{{ getIncludeData(options, included, 'forms')[0].attributes.name }}</span>
          </div>
          <div v-if="alternative == 1" class="m-card__block">
            <span class="m-card__block-hint gray">срок обучения</span>
            <span class="f-font-700"
              >{{ Math.floor(specialtyData.attributes.duration / 12) }} г.
              {{ specialtyData.attributes.duration % 12 }} мес.</span
            >
          </div>
          <div class="m-card__block">
            <span class="m-card__block-hint gray">стоимость/год</span>
            <span v-if="alternative == 0" :class="alternative === 0 ? '' : ''" class="f-text-l f-font-700"
              >от {{ options.attributes.calc_data.min_cost / 1000 }} т.р.</span
            >
            <span v-else class="f-text-xs f-font-700">{{ specialtyData.attributes.cost / 1000 }} т.р.</span>
          </div>
        </div>
        <NuxtLink
          v-if="!isAd && alternative == 0 && !isFlag"
          :to="{ path: `/college/${options.id}`, params: { id: options.id } }"
        >
          <a-button label="Подробнее" color="outline" />
        </NuxtLink>
        <NuxtLink v-if="isAd" class="m-card__adBtn">
          <a-button label="Хочу поступить" color="orange" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getIncludeData } from '~/composables/getIncludeData';

const props = defineProps({
  options: { type: Object, default: () => ({}) },
  included: { type: Object, default: () => ({}) },
  alternative: { type: Number, default: 0 },
  isAd: { type: Boolean, default: false },
  isFlag: { type: Boolean, default: false },
  oksoData: { type: Object, default: () => ({}) },
});

const city = computed(() => {
  let value;
  if (getIncludeData(props.options, props.included, 'city')) {
    value = getIncludeData(props.options, props.included, 'city');
  }
  return value;
});

const budgetPlaces = ref(0);

const specialtyData = computed(() => {
  let data;
  let arr = getIncludeData(props.options, props.included, 'specialties');
  for (let specialty of arr) {
    if (specialty.attributes.okso_specialty_id == props.oksoData.id) {
      data = specialty;
      // console.log(specialty);
      // budgetPlaces.value += specialty.attributes.budget_places;
    }
  }
  return data;
});

const monitorData = computed(() => {
  return getIncludeData(props.options, props.included, 'monitorings');
});

const logo = computed(() => {
  // let arr = getIncludeData(props.options, props.included, 'galleries');
  // return arr.pop().attributes.url;
  return props.options.attributes.calc_data.logo_url;
});
</script>

<style>
@import './m-card.scss';
</style>
