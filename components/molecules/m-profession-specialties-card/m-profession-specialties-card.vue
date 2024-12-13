<!-- eslint-disable max-len -->
<template>
  <div class="m-profession-specialties-card cards-stretched">
    <div class="m-profession-specialties-card__inner">
      <NuxtLink :to="{ path: `/specialty/${options.index}`, params: { id: options.index } }" class="title-h4"
        >{{ options.arr[0]?.attributes.name }}
      </NuxtLink>
      <div class="m-profession-specialties-card__wrap">
        <span class="m-profession-specialties-card__info f-text-xxs gray">{{ options.code_okso }}</span>
      </div>
      <ul class="m-profession-specialties-card__list">
        <li v-if="width >= 768" class="m-profession-specialties-card__list-item head f-text-xs gray">
          <span class="m-profession-specialties-card__list-param">название колледжа</span>
          <span class="m-profession-specialties-card__list-param">срок обучения</span>
          <span class="m-profession-specialties-card__list-param">бюджетных мест</span>
          <span class="m-profession-specialties-card__list-param">общежитие</span>
          <span class="m-profession-specialties-card__list-param">стоимость за год (₽)</span>
        </li>
        <li v-for="(college, index) in currentCollege" :key="index" class="f-text-xs">
          <NuxtLink
            :to="{
              path: `/college/${college.id}/specialties`,
              params: { id: college.id },
            }"
            class="m-profession-specialties-card__list-item"
          >
            <div class="m-profession-specialties-card__list-param college-title">
              <img :src="college.attributes?.calc_data?.logo_url" />
              {{ college.attributes?.name }}
            </div>

            <div class="m-profession-specialties-card__list-param">
              <span v-if="width < 768" class="m-profession-specialties-card__list-param-label gray">срок обучения</span>
              <span v-if="Math.floor(college.attributes?.calc_data?.min_duration / 12) != 0">
                {{ Math.floor(college.attributes?.calc_data?.min_duration / 12) }} года&nbsp; </span
              >{{ college.attributes?.calc_data?.min_duration % 12 }} мес.
            </div>

            <div class="m-profession-specialties-card__list-param">
              <span v-if="width < 768" class="m-profession-specialties-card__list-param-label gray"
                >бюджетных мест</span
              >
              {{
                college.attributes?.calc_data?.budget_places != 0 ? college.attributes?.calc_data?.budget_places : 'нет'
              }}
            </div>

            <div class="m-profession-specialties-card__list-param">
              <span v-if="width < 768" class="m-profession-specialties-card__list-param-label gray">общежитие</span>
              {{ college.attributes?.is_hostel ? 'есть' : 'нет' }}
            </div>

            <div class="m-profession-specialties-card__list-param">
              <span v-if="width < 768" class="m-profession-specialties-card__list-param-label gray"
                >стоимость за год (₽)
              </span>
              {{
                college.attributes?.calc_data?.min_cost > 0
                  ? Number(college.attributes?.calc_data?.min_cost).toLocaleString()
                  : 'бесплатно'
              }}
            </div>
          </NuxtLink>
        </li>
      </ul>
      <a
        :href="`/specialty/${options.index}`"
        class="m-profession-specialties-card__more violet-100 f-font-700 f-text-s"
      >
        Все колледжи
      </a>
    </div>
  </div>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();

const props = defineProps({
  options: { type: Object, default: () => ({}) },
  professionAll: { type: Object, default: () => ({}) },
});

const currentCollege = ref({});

const setCollege = () => {
  const currItem = props.options.arr;
  const allCollegeProps = props.professionAll;
  const optionalArr = [];
  currItem.forEach((element) => {
    const currentCol = allCollegeProps.find((item) => item.id === element.relationships?.college?.data?.id);
    if (!optionalArr.some((obj) => obj.id === currentCol.id)) {
      optionalArr.push(currentCol);
    }
  });
  currentCollege.value = optionalArr;
};

onMounted(() => {
  setCollege();
});

watch(
  () => props.professionAll,
  () => setCollege(),
);
</script>

<style>
@import './m-profession-specialties-card.scss';
</style>
