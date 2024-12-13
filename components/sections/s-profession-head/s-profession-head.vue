<template>
  <div class="container">
    <a-breadcrumbs :items="breadcrumbs" />
  </div>
  <section v-if="info.data" class="s-profession-head">
    <div class="container">
      <div class="s-profession-head__content">
        <div class="s-profession-head__main">
          <span v-if="page == 'profession'" class="f-text-xs violet-80">Обучение профессии </span>
          <span v-else class="f-text-xs violet-80">Специальность {{ info?.data?.attributes?.code_okso }}</span>
          <h3 v-if="page === 'profession'" class="title-h3">
            «{{
              info?.data?.attributes?.name.includes('профессия ')
                ? info?.data?.attributes?.name.split('профессия ')[1]
                : info?.data?.attributes?.name
            }}» <b v-if="selectedCityOptionValue">в городе</b>
            {{ selectedCityOptionValue }}
          </h3>
          <h3 v-else class="title-h3">
            «{{
              info?.data?.attributes?.name.includes('профессия ')
                ? info?.data?.attributes?.name.split('профессия ')[1]
                : info?.data?.attributes?.name
            }}»
          </h3>
          <p class="f-text-xl">
            {{ info?.data?.attributes?.qualification }}
          </p>
        </div>
        <ul class="s-profession-head__sub">
          <li class="s-profession-head__sub-item">
            <span class="f-text-xs">Бюджетных мест</span>
            <span class="f-text-s f-font-700">{{
              info?.data?.attributes?.calc_data?.budget_places > 0
                ? info?.data?.attributes?.calc_data?.budget_places
                : 'нет'
            }}</span>
          </li>
          <li class="s-profession-head__sub-item">
            <span class="f-text-xs">Стоимость/год</span>
            <span v-if="info?.data?.attributes?.calc_data?.min_cost > 0" class="f-text-s f-font-700"
              >от
              {{ Number(info?.data?.attributes?.calc_data?.min_cost).toLocaleString() }}
              руб.</span
            >
            <span v-else>−</span>
          </li>
          <li class="s-profession-head__sub-item">
            <span class="f-text-xs">Срок обучения</span>
            <span v-if="info?.data?.attributes?.calc_data?.min_duration" class="f-text-s f-font-700"
              >от {{ duration }}</span
            >
            <span v-else>−</span>
          </li>
        </ul>
      </div>
    </div>
    <nav class="s-profession-head__nav">
      <div class="container">
        <ul v-if="page == 'profession'" class="f-text-m">
          <NuxtLink :to="`/profession/${professionId}`" :test-id="`link-s-profession-head-${professionId}`">
            <li>Колледжи</li>
          </NuxtLink>
          <NuxtLink
            :to="`/profession/${professionId}/specialties`"
            :test-id="`link-s-profession-head-${professionId}-specialties`"
          >
            <li>Специальности</li>
          </NuxtLink>
        </ul>
        <ul v-else class="f-text-m">
          <NuxtLink :to="`/specialty/${professionId}`" :test-id="`link-s-profession-head-${professionId}-colleges`"
            ><li>Колледжи</li></NuxtLink
          >
          <NuxtLink
            :to="`/specialty/${professionId}/professions`"
            :test-id="`link-s-profession-head-${professionId}-professions`"
            ><li>Профессии</li></NuxtLink
          >
        </ul>
      </div>
    </nav>
  </section>
</template>

<script setup>
import { useCityIdStore } from '~/store/city';
const props = defineProps({
  professionId: { type: String, default: null },
  info: { type: Object, default: () => ({}) },
  page: { type: String, default: '' },
});
const cityStore = useCityIdStore();
const selectedCityOptionValue = computed(() => cityStore.$state.selectedOptionValue);
const breadcrumbs = computed(() => {
  let value;
  if (props.page == 'specialties') {
    value = [{ label: 'Специальности', link: '/specialties' }, { label: props.info?.data?.attributes?.name }];
  } else {
    value = [
      { label: 'Профессии', link: '/professions' },
      { label: props.info?.data?.attributes?.name },
      // { label: props.info?.data?.attributes?.name.split('профессия ')[1] },
    ];
  }
  return value;
});

const duration = computed(() => {
  let min_duration = props.info?.data?.attributes?.calc_data?.min_duration;
  let years = Math.floor(min_duration / 12);
  let months = min_duration % 12;
  let yearsText;
  switch (years) {
    case 0:
      yearsText = '';
      break;
    case 1:
      yearsText = `${years} года`;
      break;
    default:
      yearsText = `${years} лет`;
      break;
  }
  return `${yearsText} ${months} мес.`;
});

onMounted(async () => {
  // setTimeout(() => {
  //   updateCurPage(0);
  // });
});
</script>

<style>
@import './s-profession-head.scss';
</style>
