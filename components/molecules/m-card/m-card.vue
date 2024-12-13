<template>
  <div class="m-card cards-stretched">
    <div class="m-card__content" :class="{ alternative: alternative == 1 }">
      <div class="m-card__logo" :class="{ 'no-logo': !logo }">
        <img v-if="logo" :src="logo" alt="" />
        <img v-else src="/img/colleges/logo.svg" alt="" />
      </div>
      <div class="m-card__info-main">
        <div class="m-card__tags f-text-xs">
          <div v-if="alternative == 0" class="m-card__tags-tag city" test-id="tag-m-card-city">
            {{ options.attributes.calc_data.city }}
          </div>
          <div v-if="alternative == 0" class="m-card__tags-tag type" test-id="tag-m-card-type">
            <span v-if="options.attributes.is_state">Государственный</span>
            <span v-else>Негосударственный</span>
          </div>
          <!-- <div v-if="alternative == 1" class="m-card__tags-tag date f-text-xxs gray" test-id="tag-m-card-date">
            {{ oksoData.attributes.code_okso }}
          </div> -->
          <!-- <div
            v-if="options.attributes.accreditation_number"
            class="m-card__tags-tag green"
            test-id="tag-m-card-accreditation"
          >
            Аккредитован
          </div>
          <div v-else class="m-card__tags-tag red">Не аккредитован</div> -->
          <div
            v-if="options.attributes.is_hostel && !isAd && !isFlag && alternative == 0"
            class="m-card__tags-tag dormitory"
            test-id="tag-m-card-dormitory"
          >
            <img src="/icons/dormitory.svg" /><span>Общежитие</span>
          </div>
          <span v-if="isAd" class="m-card__ad">Реклама</span>
        </div>
        <!-- <h5 v-if="alternative === 0 || isAd" class="title-h5" :class="{ alternative: alternative === 2 }">
          {{ options.attributes.name || '' }}
        </h5> -->
        <h5 class="title-h5" :class="{ alternative: alternative == 2 }">
          <NuxtLink
            :to="{ path: `/college/${options.id}`, params: { id: options.id } }"
            :test-id="`link-m-card-${options.id}`"
            >{{ options.attributes.name || '' }}</NuxtLink
          >
        </h5>
        <p v-if="isAd" class="m-card__text">
          Один из лучших колледжей Москвы! Более 30 специальностей, 60 профессий, 8 направлений! Новые корпуса и
          аудитории
        </p>
        <!-- <p v-if="alternative == 1" class="f-text-s">
          {{ oksoData.attributes.qualification }}
        </p> -->
      </div>
      <div class="m-card__actions" :class="{ alternative: alternative == 2 }">
        <div v-if="!isAd" class="m-card__info-sub f-text-xs">
          <div v-if="alternative == 1" class="m-card__block" test-id="block-m-card-city">
            <span class="m-card__block-hint gray">город</span>
            <span :class="alternative == 0 ? 'f-text-xs' : 'f-text-xs'" class="f-font-700">{{
              options.attributes.calc_data.city || ''
            }}</span>
          </div>
          <div class="m-card__block" test-id="block-m-card-specialties">
            <span class="m-card__block-hint gray">специальностей</span>
            <span class="f-text-xs f-font-700">{{ options.attributes.calc_data?.count_specialties || '' }}</span>
          </div>
          <div class="m-card__block" test-id="block-m-card-professions">
            <span class="m-card__block-hint gray">профессий</span>
            <span :class="alternative == 0 ? 'f-text-xs' : 'f-text-xs'" class="f-font-700">
              {{ options.attributes.calc_data?.count_professions || '' }}
            </span>
          </div>
          <div class="m-card__block" test-id="block-m-card-scores">
            <span class="m-card__block-hint gray">ср. балл аттестат</span>
            <span
              v-if="parseInt(monitorings.att) !== 0 && !isNaN(parseInt(monitorings.att))"
              :class="alternative == 0 ? 'f-text-xs' : 'f-text-xs'"
              class="f-font-700"
              >{{ monitorings.att }}</span
            >
            <span v-else class="f-font-700" :class="alternative == 0 ? 'f-text-xs' : 'f-text-xs'">−</span>
          </div>
          <div class="m-card__block" test-id="block-m-card-places">
            <span class="m-card__block-hint gray">бюджетных мест</span>
            <span v-if="alternative == 0" class="f-text-xs f-font-700">
              {{ options.attributes.calc_data?.budget_places || 'нет' }}
            </span>
            <span v-else class="f-text-xs f-font-700">
              {{ options.attributes.calc_data.budget_places || 'нет' }}
            </span>
          </div>
          <!-- <div v-if="alternative == 1 && specialtyData.attributes" class="m-card__block" test-id="block-m-card-base">
            <span class="m-card__block-hint gray f-text-xs">база обучения</span>
            <span class="f-font-700">после {{ specialtyData.attributes.base }} класса</span>
          </div> -->
          <div v-if="alternative == 1" class="m-card__block" test-id="block-m-card-form">
            <span class="m-card__block-hint gray">форма обучения</span>
            <span class="f-font-700">{{ getIncludeData(options, included, 'forms')[0]?.attributes.name }}</span>
          </div>
          <div v-if="alternative == 1" class="m-card__block" test-id="block-m-card-years">
            <span class="m-card__block-hint gray">срок обучения</span>
            <span class="f-font-700"
              >{{ Math.floor(options.attributes.calc_data.min_duration / 12) }} г.
              {{ options.attributes.calc_data.min_duration % 12 }} мес.</span
            >
          </div>
          <div class="m-card__block" test-id="block-m-card-cost">
            <span class="m-card__block-hint gray">стоимость/год</span>
            <span :class="alternative === 0 ? '' : ''" class="f-text-xs f-font-700"
              >от {{ options.attributes.calc_data.min_cost / 1000 }} т.р.</span
            >
          </div>
        </div>
        <NuxtLink
          v-if="!isAd && alternative == 0 && !isFlag"
          :to="{ path: `/college/${options.id}`, params: { id: options.id } }"
          :test-id="`btn-m-card-${options.id}`"
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
import { getLogo } from '~/composables/getLogo';

const props = defineProps({
  options: { type: Object, default: () => ({}) },
  included: { type: Object, default: () => ({}) },
  alternative: { type: Number, default: 0 },
  isAd: { type: Boolean, default: false },
  isFlag: { type: Boolean, default: false },
  oksoData: { type: Object, default: () => ({}) },
});

const monitorings = ref({});

watch(
  () => props.included,
  (included) => {
    if (!Array.isArray(included)) {
      console.warn('included is not an array:', included);
      return;
    }

    monitorings.value = included
      .filter(
        ({ type, id }) =>
          type === 'monitorings' && props.options.relationships.monitorings.data.some(({ id: monId }) => monId === id),
      )
      .reduce((acc, { attributes: { label, value } }) => {
        acc[label] = value;
        return acc;
      }, {});
  },
  { deep: true, immediate: true },
);

const logo = computed(() => {
  return getLogo(getIncludeData(props.options, props.included, 'media'));
});
</script>

<style>
@import './m-card.scss';
</style>
