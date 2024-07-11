<template>
  <NuxtLayout name="empty">
    <div class="s-layout">
      <s-header class="s-header" :apiDirections="apiDirections" />
      <main class="s-сontent">
        <div v-if="error?.statusCode === 404">
          <s-errors-404 />
        </div>
      </main>
      <s-footer class="s-footer" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useCityIdStore } from '~/store/city';

const cityStore = useCityIdStore();

defineProps({
  error: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

// временное решение
const route = useRoute();
// const url = route.path.split('/');

console.log(route);

// временное решение
// if (props.error?.statusCode === 404 && url.find((item) => item === 'colleges')) {
//   clearError({ redirect: '/colleges' });
// }

onMounted(async () => {
  await cityStore.fetchData();
});

watch(
  () => cityStore.selectedOptionId,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      await cityStore.fetchData();
    }
  },
);

const apiDirections = computed(() => cityStore.apiDirections);
</script>
