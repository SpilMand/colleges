<template>
  <div class="profession-colleges">
    <s-filter :isFlag="false" :title="filterTitle" :isMainFilter="false" titleSize="h4" :countPC="3" @search="search" />
    <s-feedback :collegeHelp="true" />
    <h5 v-if="specialties.meta" class="profession-colleges__title title-h5">Найдено {{ getTitle() }}</h5>
    <div class="profession-colleges__content section-m">
      <m-specialties-card v-for="(card, index) in specialties.data" :key="index" :options="card" />
      <a-pagination :curPage="curPage" :countPage="countPage" @updateCurPage="updateCurPage" />
    </div>
    <s-quiz
      quizSubtitle="Ответь на 7 простых вопросов"
      quizText="и мы поможем выбрать лучший для тебя колледж"
      class="section-m"
    />
  </div>
</template>
<script setup>
import getSpecialties from '~/api/search/getSpecialties';
import { useCityIdStore } from '~/store/city';
// import { getTitle } from "~/composables/utils";

definePageMeta({
  layout: 'layout-profession',
});

const props = defineProps({
  info: { type: Object, default: () => ({}) },
});

const cityStore = useCityIdStore();
const selectedCityOptionValueRp = computed(() => cityStore.$state.selectedOptionValueRp);

const emit = defineEmits(['forWhat', 'needBlocks']);

const filterTitle = computed(() => {
  const professionName = props.info?.data?.attributes?.name.split('профессия ')[1];
  return `<b>Обучение</b> профессии «<b>${professionName}</b>» в
    колледжах <b>${selectedCityOptionValueRp.value ? selectedCityOptionValueRp.value : 'России'}</b>`;
});

const curPage = ref(0);
const countPage = ref();
const specialties = ref({});
const headTitle = ref(`«Менеджер по информационной безопасности» в Москве`);

onMounted(async () => {
  cityStore.$state.selectedOptionValueRp = '';
  cityStore.$state.selectedOptionValue = '';
  updateCurPage(0);
  emit('forWhat', 'profession', headTitle.value);
  emit('needBlocks', false, 'Похожие профессии');
});

const filters = ref({});

const search = async ({ city, form }) => {
  curPage.value = 0;
  filters.value = { city, form };
  updateCurPage(curPage.value);
};

const getTitle = () => {
  let count = specialties.value.meta.total;
  let title;
  if (count % 10 == 1) {
    title = `${count} специальность`;
  } else if (count % 10 <= 4) {
    title = `${count} специальности`;
  } else {
    title = `${count} специальностей`;
  }
  return title;
};

const updateCurPage = async (num) => {
  curPage.value = num;
  specialties.value = await getSpecialties({
    'page[number]': curPage.value + 1,
    'page[size]': 15,
    'filter[has_colleges]': true,
    'filter[city_id]': filters.value.city,
    'filter[form]': filters.value.form,
  });
  countPage.value = specialties.value?.meta?.last_page;
};
</script>
<style lang="scss">
.profession-colleges {
  .s-feedback {
    margin-top: var(--a-margin-x4);

    @media (min-width: 1550px) {
      display: none;
    }
  }

  &__title {
    margin: var(--a-margin-x6) 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);

    @media (min-width: 1200px) {
      gap: to-rem(20);
    }
  }

  .m-card__info-sub {
    width: 100%;
  }

  .m-card__info-main {
    flex-direction: column-reverse;
  }
}
</style>
