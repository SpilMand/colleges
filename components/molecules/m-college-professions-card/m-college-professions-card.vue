<template>
  <div v-if="info.attributes" class="m-college-professions-card">
    <div class="m-college-professions-card__recomendation">
      <span v-if="info.attributes.is_perspective">Перспективная</span>
      <span v-else-if="info.attributes.is_now">Востребованная</span>
      <span v-else-if="info.attributes.is_future">Профессия будущего</span>
      <span v-else-if="info.attributes.is_old">Устаревающая</span>
    </div>
    <h4 class="m-college-professions-card__title">{{ info.attributes.name.split('профессия ')[1] }}</h4>
    <ul v-if="forWhat == 'college'" class="m-college-professions-card__info f-text-xs f-font-700">
      <li>
        <span>Стоимость (₽/год)</span>
        <span v-if="selectedSpecInfo.cost > 0" class="f-text-s">
          от {{ Number(selectedSpecInfo.cost).toLocaleString() }} тыс. 
        </span>
        <span v-else class="f-text-s">бесплатно</span>
      </li>
      <li>
        <span>Срок обучения</span>
        <span class="f-text-s">{{ duration }}</span>
      </li>
      <!-- <li>
        <span>Бюджетных мест</span>
        <span class="f-text-s">{{ selectedSpecInfo.places || 'нет' }}</span>
      </li> -->
    </ul>
    <ul v-else-if="forWhat == 'specialty'" class="m-college-professions-card__info f-text-xs f-font-700">
      <li>
        <span>Колледжей</span>
        <span class="f-text-s">{{ info.attributes.calc_data.count_colleges }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  info: { type: Object, default: () => ({}) },
  forWhat: { type: String, default: '' },
  specInfo: { type: Object, default: () => ({}) }
});

const specArray = ref([]);
// const selectedDuration = ref();
// const selectedCost = ref();
// const selectedPlaces = ref();

onMounted(() => {
  // selectSpecInfo();
})

const selectedSpecInfo =  computed(() => {
  let selectedDuration;
  let selectedCost;
  let selectedPlaces;
  if (props.specInfo.data) {
    for (let item of props.specInfo.data) {
      for (let att of item.attributes.professions_ids) {
        if (att == props.info.id) {
          specArray.value.push(item);
        }
      }
    }
  }
  for (let item of specArray.value) {
    if (!selectedDuration || selectedDuration > item.attributes.duration) {
      selectedDuration = item.attributes.duration;
    }
    if (!selectedCost || selectedCost > item.attributes.cost && item.attributes.cost != 0) {
      selectedCost = item.attributes.cost;
    }
    if (!selectedPlaces || selectedPlaces < item.attributes.budget_places) {
      selectedPlaces = item.attributes.budget_places;
    }
  }
  let obj = {
    duration: selectedDuration,
    cost: selectedCost,
    places: selectedPlaces
  };
  return obj;
})

const duration = computed(() => {
  let years = selectedSpecInfo.value.duration / 12;
  years = Math.floor(years);
  let months = selectedSpecInfo.value.duration % 12;
  let durationText;
  if (years == 1) {
    durationText = `от ${years} года ${months} мес.`;
  } else if (years > 1) {
    durationText = `от ${years} лет ${months} мес.`;
  } else {
    durationText = `от ${months} мес.`;
  }
  return durationText;
});
</script>

<style>
@import './m-college-professions-card.scss';
</style>
