<template>
  <div class="specialties-profession">
    <div class="specialties-profession__content section-s">
      <h4 class="title-h4">Найдено {{ getTitle(professions, 'профессия') }}</h4>
      <div class="specialties-profession__cards">
        <m-college-professions-card
          v-for="(profession, index) in professions.data"
          :key="index"
          :info="profession"
          forWhat="specialty"
        />
      </div>
      <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
    </div>
  </div>
</template>

<script setup>
import getProfessions from '~/api/professions/getProfessions';
import { getTitle } from '~/composables/utils';

definePageMeta({
  layout: 'layout-profession',
});

const props = defineProps({
  info: { type: Object, default: () => ({}) },
});

const curPage = ref(0);
const countPage = ref();
const updateCurPage = async (num) => {
  curPage.value = num;
  professions.value = await getProfessions({
    'page[number]': curPage.value + 1,
    'page[size]': 9,
    'filter[oksoSpecialties]': props.info.data.id,
  });
  countPage.value = professions.value.meta.page.lastPage;
};

const emit = defineEmits(['needBlocks']);

const professions = ref({});

onMounted(async () => {
  emit('needBlocks', false, 'Популярные профессии по другим специальностям:');
  setTimeout(() => {
    updateCurPage(0);
  });
});
</script>

<style lang="scss">
.specialties-profession {
  margin-top: var(--a-margin-x20);
  &__content {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);
    @media (min-width: 1200px) {
      gap: to-rem(20);
    }
  }
  &__cards {
    display: grid;
    grid-auto-rows: 1fr;
    gap: to-rem(20);
    @media (min-width: 980px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
