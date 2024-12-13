<template>
  <nuxt-link
    :test-id="`link-m-college-profesions-card-${info.id}`"
    class="m-college-professions-card-link"
    :to="`/profession/${info.id}/specialties`"
  >
    <p v-if="forWhat == 'specialty'"></p>
    <div v-if="info.attributes" class="m-college-professions-card">
      <div class="m-college-professions-card__recomendation">
        <span v-for="(recommendation, index) in getRecommendations" :key="index">{{ recommendation }}</span>
      </div>

      <h4 class="m-college-professions-card__title">{{ info.attributes.name }}</h4>
      <ul v-if="forWhat == 'college'" class="m-college-professions-card__info f-text-xs f-font-700">
        <li>
          <span>Стоимость (₽/год)</span>
          <span class="f-text-s">от {{ info.attributes.calc_data.min_cost }} тыс. </span>
        </li>
        <li>
          <span>Срок обучения</span>
          <span class="f-text-s">{{ info.time }}</span>
        </li>
        <li>
          <span>Бюджетных мест</span>
          <span class="f-text-s">{{ info.budget }}</span>
        </li>
      </ul>
      <ul v-else-if="forWhat == 'specialty'" class="m-college-professions-card__info f-text-xs f-font-700">
        <li>
          <span>Колледжей</span>
          <span class="f-text-s">{{ info.attributes.calc_data.count_colleges }}</span>
        </li>
      </ul>
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  info: { type: Object, default: () => ({}) },
  forWhat: { type: String, default: '' },
  professions: { type: Object, default: () => ({}) },
});

const recommendations = ref({
  is_perspective: 'Перспективная',
  is_future: 'Профессия будущего',
  is_old: 'Уходящая',
});

const getRecommendations = computed(() => {
  return Object.keys(recommendations.value)
    .filter((recomendation) => props.info.attributes[recomendation])
    .map((recomendation) => recommendations.value[recomendation]);
});
</script>

<style>
@import './m-college-professions-card.scss';
</style>
