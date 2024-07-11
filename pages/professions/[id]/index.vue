<template>
  <div class="profession-colleges">
    <s-filter
      :title="filterTitle"
      :isMainFilter="false"
      titleSize="h4"
      forPage="profession"
      :countPC="3"
      :colleges="collegesForSelect"
      @search="search"
    />
    <s-feedback :collegeHelp="true" />
    <h5 class="profession-colleges__title title-h5">Найдено {{ getTitle(colleges, 'колледж') }}</h5>
    <div class="profession-colleges__content section-m">
      <m-card
        v-for="(college, index) in colleges.data"
        :key="index"
        :options="college"
        :isFlag="isFlag"
        :included="colleges.included"
      />
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
import getColleges from '~/api/colleges/getColleges';
import { getTitle } from '~/composables/utils';
import { useCityIdStore } from '~/store/city';

definePageMeta({
  layout: 'layout-profession',
});

const props = defineProps({
  info: { type: Object, default: () => ({}) },
});
const cityStore = useCityIdStore();
const selectedCityOptionValueRp = computed(() => cityStore.$state.selectedOptionValueRp);

const emit = defineEmits(['forWhat', 'needBlocks']);

const isFlag = ref(true);
const curPage = ref(0);
const countPage = ref();
const route = useRoute();
const colleges = ref({});
const collegesForSelect = ref({});
const headTitle = ref(`«Менеджер по информационной безопасности» в Москве`);

const filterTitle = computed(() => {
  const professionName = props.info?.data?.attributes?.name.split('профессия ')[1];
  return `<b>Обучение</b> профессии «<b>${professionName}</b>» в
    колледжах <b>${selectedCityOptionValueRp.value ? selectedCityOptionValueRp.value : 'России'}</b>`;
});

const filters = ref({});

const fetchData = async (pageNumber) => {
  return getColleges({
    'page[size]': 15,
    'page[number]': pageNumber,
    'include': 'city,monitorings,galleries',
    'filter[hasSpecialties]': true,
    'filter[city_id]': filters.value.city,
    'filter[professions]': route.params.id,
    'filter[id]': filters.value.college && filters.value.college != '' ? String(filters.value.college) : undefined,
  });
};

const search = async ({ city, college }) => {
  curPage.value = 0;
  filters.value = { city, college };
  colleges.value = await fetchData(1);
  countPage.value = colleges.value?.meta?.page?.lastPage;
};

const updateCurPage = async (num) => {
  curPage.value = num;
  colleges.value = await fetchData(num + 1);
};

onMounted(async () => {
  cityStore.$state.selectedOptionValueRp = '';
  cityStore.$state.selectedOptionValue = '';
  updateCurPage(0).then(async () => {
    collegesForSelect.value = await getColleges(
      {
        'page[size]': colleges.value.meta.page.total,
        'filter[professions]': route.params.id,
      },
      'select',
    );
    countPage.value = colleges.value?.meta?.page?.lastPage;
  });

  emit('forWhat', 'profession', headTitle.value);
  emit('needBlocks', false, 'Похожие профессии');
});
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
