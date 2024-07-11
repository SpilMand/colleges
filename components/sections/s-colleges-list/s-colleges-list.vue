<template>
  <section v-if="colleges.data" class="s-colleges-list">
    <div class="container">
      <h4 v-if="colleges.meta?.page.total > 0" class="title-h4">Найдено {{ getTitle(colleges, 'колледж') }}</h4>
      <h4 v-else class="title-h4">Рекомендуемые колледжи:</h4>
      <div class="s-colleges-list__cards">
        <m-card v-for="(college, index) in colleges.data" :key="index" :style="`order: ${index}`" :options="college" :included="colleges.included" />
        <m-card :options="adCards.data" :included="adCards.included" :isAd="true" style="order: 3" />
        <s-quiz />
      </div>
    </div>
  </section>
</template>

<script setup>
import { getTitle } from '~/composables/utils';
import getCollege from '~/api/colleges/getCollege';

defineProps({
  colleges: { type: Object, default: () => ({}) },
  // cities: { type: Array, default: () => [] },
});

const adCards = ref({});

onMounted(async () => {
  adCards.value = await getCollege(3658, {
    include: 'city,monitorings,galleries',
  });
});
</script>

<style scoped>
@import './s-colleges-list.scss';
.section-l {
  padding: 0;
}
</style>
