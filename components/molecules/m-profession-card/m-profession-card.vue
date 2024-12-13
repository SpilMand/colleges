<template>
  <div class="m-profession-card cards-stretched">
    <div class="m-profession-card__title">
      <NuxtLink :to="`/profession/${professions.id}`">
        <h4 class="title-h4">
          {{ professions?.attributes?.name }}
        </h4>
      </NuxtLink>
      <div v-if="statuses.length" class="status-row">
        <span
          v-for="(status, index) in statuses"
          :key="index"
          class="f-text-xxs f-font-700 violet-100 m-profession-card__status"
        >
          {{ status }}
        </span>
      </div>
    </div>
    <div class="m-profession-card__box">
      <div class="m-profession-card__item">
        <span class="f-text-s gray">Стоимость за год</span>
        <div class="f-text-xxl f-font-700">от {{ professions?.attributes?.calc_data?.min_cost }} ₽</div>
      </div>
      <div class="m-profession-card__item">
        <span class="f-text-s gray">Срок обучения</span>
        <div class="f-text-xxl f-font-700">{{ durationText }}</div>
      </div>
      <div class="m-profession-card__item">
        <span class="f-text-s gray">Бюджетные места</span>
        <div v-if="professions?.attributes?.calc_data?.budget_places" class="f-text-xxl f-font-700 green">Есть</div>
        <div v-else class="f-text-xxl f-font-700 red">Нет</div>
      </div>
      <div class="m-profession-card__wrap">
        <NuxtLink :to="`/profession/${professions.id}/specialties`">
          <a-button
            class="w-100"
            :label="
              professions?.attributes?.calc_data?.count_colleges +
              ' ' +
              declineWord(professions?.attributes?.calc_data?.count_colleges, 'колледж')
            "
            color="white"
            textSize="f-text-m"
            :img="arrow"
            :center="false"
          />
        </NuxtLink>
        <NuxtLink :to="`/profession/${professions.id}/specialties`">
          <a-button
            class="w-100"
            :label="
              professions?.attributes?.calc_data?.count_specialties +
              ' ' +
              declineWord(professions?.attributes?.calc_data?.count_specialties, 'специальность')
            "
            color="white"
            textSize="f-text-m"
            :img="arrow"
            :center="false"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { declineWord } from '~/composables/utils';

const props = defineProps({
  professions: {
    type: Object,
    default: () => ({}),
  },
});

const statuses = computed(() => {
  const availableStatuses = [];
  const attributes = props.professions?.attributes;

  if (!attributes) return availableStatuses;

  if (attributes.is_perspective) availableStatuses.push('Перспективная');
  if (attributes.is_favorite) availableStatuses.push('Актуально сейчас');
  if (attributes.is_old) availableStatuses.push('Устаревающая');
  if (attributes.is_future) availableStatuses.push('Профессия будущего');

  return availableStatuses;
});

const durationText = ref(null);

onMounted(() => {
  const calculatedText = calculateDurationText(props.professions?.attributes?.calc_data?.min_duration);
  durationText.value = calculatedText.value;
});

const arrow = `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 6.00056C13.9951 5.47445 13.7832 4.97146 13.41 4.60056L9.12 0.300559C8.93264 0.114308 8.67919 0.00976563 8.415 0.00976562C8.15082 0.00976563 7.89736 0.114308 7.71 0.300559C7.61627 0.393522 7.54188 0.504123 7.49111 0.625982C7.44034 0.747841 7.4142 0.878547 7.4142 1.01056C7.4142 1.14257 7.44034 1.27328 7.49111 1.39513C7.54188 1.51699 7.61627 1.6276 7.71 1.72056L11 5.00056H1C0.734784 5.00056 0.48043 5.10592 0.292893 5.29345C0.105357 5.48099 0 5.73534 0 6.00056C0 6.26577 0.105357 6.52013 0.292893 6.70766C0.48043 6.8952 0.734784 7.00056 1 7.00056H11L7.71 10.2906C7.5217 10.4775 7.41538 10.7317 7.41444 10.997C7.41351 11.2624 7.51802 11.5173 7.705 11.7056C7.89198 11.8939 8.1461 12.0002 8.41147 12.0011C8.67683 12.0021 8.9317 11.8975 9.12 11.7106L13.41 7.41056C13.7856 7.03721 13.9978 6.53014 14 6.00056Z" fill="#FD8B21"/>
  </svg>`;
</script>

<style lang="scss">
@import './m-profession-card.scss';
</style>
