<template>
  <a-loading v-if="isLoading" :progress="progress" />
  <div class="s-layout">
    <s-header class="s-header" :apiDirections="apiDirections" />
    <main class="s-сontent">
      <NuxtPage
        :apiDirections="apiDirections"
        :apiColleges="apiColleges"
        :apiSpecialties="apiSpecialties"
        :apiProfessions="apiProfessions"
      />
    </main>
    <s-footer class="s-footer" />
  </div>
</template>
<script setup>
import { useCityIdStore } from '~/store/city';
import getColleges from '~/api/colleges/getColleges';
import getDirections from '~/api/directions/getDirections';
import getOksos from '~/api/okso/getOksos';
import getProfessions from '~/api/professions/getProfessions';
import useLoadingIndicator from '~/composables/useLoadingIndicator';

const cityIdStore = useCityIdStore();
const apiColleges = ref([]);
const apiDirections = ref([]);
const apiSpecialties = ref([]);
const apiProfessions = ref([]);

const { progress, isLoading, start, finish } = useLoadingIndicator({
  duration: 2000,
});

async function fetchData() {
  start();
  const cityIdFilter = cityIdStore.selectedOptionId ? { 'filter[city_id]': cityIdStore.selectedOptionId } : {};
  try {
    apiColleges.value = await getColleges(
      {
        'filter[hasSpecialties]': true,
        ...cityIdFilter,
      },
      'main',
    );
    apiDirections.value = await getDirections(cityIdFilter, 'main');
    apiSpecialties.value = await getOksos(
      {
        'filter[hasSpecialties]': true,
        ...cityIdFilter,
      },
      'main',
    );
    apiProfessions.value = await getProfessions(
      {
        'filter[specialties]': true,
        ...cityIdFilter,
      },
      'main',
    );
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  } finally {
    finish();
  }
}

onMounted(fetchData);

watch(
  () => cityIdStore.selectedOptionId,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      fetchData();
    }
  },
);
</script>
