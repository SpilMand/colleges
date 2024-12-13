<template>
  <section class="s-filter">
    <a-breadcrumbs v-if="isMainFilter" :items="breadcrumbs" @action="breadcrumbsClick" />
    <div class="s-filter__title">
      <h3 :class="'title-' + titleSize">
        <span v-if="isMainFilter || isMap" class="s-filter__title-calc">
          <span v-if="typeMc && forPage === 'colleges'" class="s-filter__title-type capitalize"
            >{{ typeMc }}&nbsp;<br v-if="isMap"
          /></span>
          <span v-if="typeMc && forPage === 'professions'" class="s-filter__title-type">{{ typeMc }}&nbsp;</span>
          <span v-if="directionTitle" :class="{ capitalize: !typeMc }">{{ directionTitle }}</span>
          <span v-else-if="forPage === 'colleges'" :class="{ capitalize: !typeMc }">
            {{ pageTitle || 'Колледжи и техникумы' }}
          </span>
          <span v-else-if="forPage === 'professions'" :class="{ capitalize: !typeMc }">
            {{ pageTitle || 'Профессии колледжей' }}
          </span>
          <span v-else-if="forPage === 'specialties'" :class="{ capitalize: !typeMc }">
            {{ pageTitle || 'Специальности' }}
          </span>
          <span class="s-filter__title-city">&nbsp;{{ cityRp || 'России' }}</span>
          {{ formTitle }}
          {{ baseTitle }}
          {{ relevanceTitle }}
          {{ conditionsTitle }}
          <span v-if="isMap">на карте</span>
        </span>
        <span v-else v-html="title" />
      </h3>
      <a
        v-if="isMainFilter && forPage !== 'professions'"
        href="#form"
        class="s-filter__help scroll"
        test-id="link-s-filters-form"
      >
        <svg width="270" height="96" viewBox="0 0 270 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M145.608 22.4414L269.909 78.7L236.063 -311.935L0.48877 -274.092L34.3349 116.544L145.608 22.4414Z"
            fill="#D9CFFE"
          />
          <path
            d="M145.608 22.4414L269.909 78.7L236.063 -311.935L0.48877 -274.092L34.3349 116.544L145.608 22.4414Z"
            fill="#D9CFFE"
          />
        </svg>
        <p class="f-text-l f-font-700" v-html="'Поможем выбрать<br />правильный колледж'"></p>
      </a>
      <a
        v-if="isMainFilter && forPage === 'professions'"
        href="#form"
        class="s-filter__help scroll"
        test-id="link-s-filters-form-professions"
      >
        <svg width="270" height="96" viewBox="0 0 270 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M145.608 22.4414L269.909 78.7L236.063 -311.935L0.48877 -274.092L34.3349 116.544L145.608 22.4414Z"
            fill="#D9CFFE"
          />
          <path
            d="M145.608 22.4414L269.909 78.7L236.063 -311.935L0.48877 -274.092L34.3349 116.544L145.608 22.4414Z"
            fill="#D9CFFE"
          />
        </svg>
        <p
          class="f-text-l f-font-700"
          v-html="isMainFilter && forPage === 'professions' ? 'Поможем выбрать<br />правильную профессию' : ''"
        ></p>
      </a>
    </div>
    <a-button
      v-if="width < 768"
      class="s-filter__open-filters-btn"
      label="Фильтры"
      :img="arrowDown"
      color="violet-5"
      :needRot="true"
      test-id="btn-s-filters-dropdown"
      @click="openFilters = !openFilters"
    />
    <div v-if="openFilters || width > 768" class="s-filter__filters">
      <div class="s-filter__filters-main filters-grid" :style="gridStyle">
        <a-select
          name="city"
          param="cities"
          placeholder="Любой"
          :options="cities?.data"
          hint="Город"
          test-id="select-s-filters-cities"
          section-id="s-filters"
          @addFilter="addFilter"
          @filter="filterCities"
          @get-data="filterSeo"
        />
        <a-select
          v-if="forPage == 'colleges'"
          param="bases"
          placeholder="Любая"
          :options="eduBase"
          hint="База обучения"
          test-id="select-s-filters-bases"
          section-id="s-filters"
          @addFilter="addFilter"
          @get-data="filterSeo"
        />
        <a-select
          v-if="forPage == 'colleges'"
          param="types"
          placeholder="Любой"
          :options="typeOfCollege"
          hint="Вид колледжа"
          test-id="select-s-filters-types"
          section-id="s-filters"
          @addFilter="addFilter"
          @get-data="filterSeo"
        />
        <a-select
          v-if="forPage == 'colleges'"
          param="directions"
          placeholder="Любое"
          :options="directions?.data"
          hint="Направление"
          test-id="select-s-filters-directions"
          section-id="s-filters"
          @addFilter="addFilter"
          @filter="filterDirections"
          @get-data="filterSeo"
        />
        <a-select
          v-if="forPage == 'colleges'"
          param="conditions"
          placeholder="Любые"
          :options="conditions"
          hint="Условия"
          test-id="select-s-filters-conditions"
          section-id="s-filters"
          @addFilter="addFilter"
          @get-data="filterSeo"
        />
        <a-select
          v-if="forPage == 'colleges' || forPage == 'specialties'"
          param="forms"
          placeholder="Любая"
          :options="eduForm.data"
          hint="Форма обучения"
          test-id="select-s-filters-forms"
          section-id="s-filters"
          @addFilter="addFilter"
          @get-data="filterSeo"
        />
        <!-- фильтр выбор колледжа !-->
        <!-- <a-select
          v-if="forPage == 'profession'"
          placeholder="Любой"
          param="college"
          :options="colleges.data"
          hint="Колледж"
          @get-data="filterSeo"
          @addFilter="addFilter"
        /> -->
        <a-select
          v-if="forPage == 'professions'"
          param="relevance"
          placeholder="Любая"
          :options="profRelevance"
          hint="Актуальность!"
          test-id="select-s-filters-relevance"
          section-id="s-filters"
          @addFilter="addFilter"
          @get-data="filterSeo"
        />
        <!-- <a-select
          v-if="forPage == 'professions'"
          param="works"
          placeholder="Любая"
          :options="profWork"
          hint="сфера работы"
          @addFilter="addFilter"
          @get-data="filterSeo"
        /> -->
        <a-select
          v-if="forPage == 'professions'"
          param="bases"
          placeholder="Любая"
          :options="eduBase"
          hint="База обучения"
          test-id="select-s-filters-bases-professions"
          section-id="s-filters"
          @addFilter="addFilter"
          @get-data="filterSeo"
        />
        <div v-if="showSub" class="s-filter__filters-dormitory">
          <img src="/icons/dormitory.svg" alt="" />
          <label for="dormitory" class="f-text-s">Общежитие</label>
          <input
            id="dormitory"
            v-model="isDormitory"
            type="checkbox"
            test-id="input-s-filters-checkbox-dormitory"
            @click="filterByDormitory()"
          />
        </div>
        <div v-if="showSub || forPage == 'specialties' || forPage == 'professions'" class="s-filter__filters-cost gray">
          <span class="s-filter__filters-hint">Стоимость в год</span>
          <a-double-slider :min="0" :max="maxCost" section-id="s-filter" @setCost="setCost" />
        </div>
      </div>
      <div
        class="s-filter__filters-buttons"
        :class="{
          absolute:
            (!isMainFilter && forPage == 'profession' && width > 768) ||
            (forPage == 'specialties' && width > 1440) ||
            (forPage == 'professions' && width > 1440),
        }"
      >
        <a-button
          v-if="forPage == 'colleges'"
          class="s-filter__filters-buttons-sub"
          label="Доп. опции"
          :img="arrowDown"
          color="violet-5"
          size="extra-large"
          textSize="f-text-s"
          textWeight="700"
          :needRot="true"
          test-id="btn-s-filters-dropdown-colleges"
          @click="showSub = !showSub"
        />
        <a-button
          v-if="forPage == 'colleges'"
          class="s-filter__button-map"
          label="Смотреть на карте"
          :img="gpsIcon"
          color="outline"
          size="extra-large"
          textSize="f-text-s"
          textWeight="700"
          test-id="btn-s-filters-open-map"
          @click="emit('openMap')"
        />
        <a-button
          v-if="isFlag"
          label="Сбросить фильтр"
          color="violet-5"
          :disabled="Object.keys(filtersForSearch).length == 1 && filtersForSearch.college == ''"
          textSize="f-text-s"
          textWeight="700"
          size="extra-large"
          :style="forPage == 'specialties' ? 'margin-left: auto' : ''"
          test-id="btn-s-filters-clear"
          @click="deleteActiveFilter('all')"
        />
      </div>
      <a-button
        v-if="isMap"
        class="s-filter__button-apply"
        label="Применить"
        color="orange"
        textSize="f-text-s"
        textWeight="700"
        size="extra-large"
        test-id="btn-s-filters-apply"
        @click="emit('searchOnMap', filtersForSearch)"
      />
      {{ activeFilters }}
      <div v-if="Object.keys(activeFilters).length > 0" class="s-filter__active-filters">
        <div
          v-for="filter in Object.keys(activeFilters).length"
          :key="filter"
          @click="deleteActiveFilter(Object.keys(activeFilters)[filter - 1])"
        >
          <span>{{ Object.values(activeFilters)[filter - 1].attributes.name }}</span>
          <img src="/icons/close.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import getCities from '~/api/cities/getCities.js';
import getDirections from '~/api/directions/getDirections.js';
import getForms from '~/api/forms/getForms.js';
import scrollToSection from '~/composables/scrollToSection';
import { useWindowSize } from '@vueuse/core';
import { useCityIdStore } from '~/store/city';

const { width } = useWindowSize();
const cityStore = useCityIdStore();
const route = useRoute();
// const emit = defineEmits(['updateCurCost']);
onMounted(() => {
  scrollToSection();
  filterCities();
  if (route.name === 'colleges') {
    filterDirections();
  }
  if (width.value < 768) {
    gridStyle.value = `grid-template-columns: repeat(${props.countMobile}, 1fr)`;
  } else if (width.value < 1440) {
    gridStyle.value = `grid-template-columns: repeat(${props.countTablet}, 1fr)`;
  } else {
    gridStyle.value = `grid-template-columns: repeat(${props.countPC}, 1fr)`;
  }
});

watch(width, () => {
  if (width.value < 768) {
    gridStyle.value = `grid-template-columns: repeat(${props.countMobile}, 1fr)`;
  } else if (width.value < 1440) {
    gridStyle.value = `grid-template-columns: repeat(${props.countTablet}, 1fr)`;
  } else {
    gridStyle.value = `grid-template-columns: repeat(${props.countPC}, 1fr)`;
  }
});

const props = defineProps({
  title: { type: String, default: '' },
  pageTitle: { type: String, default: '' },
  breadcrumbs: { type: Array, default: () => [] },
  forPage: { type: String, default: '' },
  isMainFilter: { type: Boolean, default: true },
  isMap: { type: Boolean, default: false },
  titleSize: { type: String, default: 'h3' },
  colleges: { type: Array, default: () => [] },
  countMobile: { type: Number, default: 1 },
  countTablet: { type: Number, default: 3 },
  countPC: { type: Number, default: 6 },
  startShowSub: { type: Boolean, default: false },
  isFlag: { type: Boolean, default: true },
  oksoId: { type: String, default: '' },
});

const gridStyle = ref();

const emit = defineEmits([
  'search',
  'openMap',
  'update:modelValue',
  'searchOnMap',
  'filter-seo',
  'clear-seo',
  'setBreadcrumbs',
  'speciality',
]);

const breadcrumbsClick = (index) => {
  const length = Object.keys(activeFilters.value).length;
  for (let i = 0; i < length; i++) {
    if (i >= index) {
      deleteActiveFilter(Object.keys(activeFilters.value)[index]);
    }
  }
  emit('setBreadcrumbs', activeFilters.value);
};

const openFilters = ref(false);

const showSub = ref(props.startShowSub);
const isDormitory = ref(false);
const cities = ref();
const directions = ref();
const typeOfCollege = ref([
  {
    attributes: { value: true, name: 'Государственный', slug: 'gosudarstvennie' },
    type: 'types',
  },
  {
    attributes: { value: false, name: 'Негосударственный', slug: 'negosudarstvennie' },
    type: 'types',
  },
]);
const conditions = ref([
  { attributes: { value: true, name: 'Бюджет', slug: 'budget' }, type: 'conditions' },
  {
    attributes: { value: undefined, name: 'Платно', slug: 'platno' },
    type: 'conditions',
  },
]);

const eduForm = await getForms();

// const profWork = ref([{ attributes: { value: '9', name: 'Дизайн' } }, { attributes: { value: '10', name: 'ИТ' } }]);

const profRelevance = ref([
  { attributes: { value: true, id: 'is_future', name: 'Профессия будущего' } },
  { attributes: { value: true, id: 'is_perspective', name: 'Перспективная' } },
  { attributes: { value: true, id: 'is_favorite', name: 'Актуально сейчас' } },
  { attributes: { value: true, id: 'is_old', name: 'Устаревающая' } },
]);

const eduBase = ref([
  { attributes: { value: '9', name: 'После 9 класса', slug: '9_class' }, type: 'bases' },
  {
    attributes: { value: '11', name: 'После 11 класса', slug: '11_class' },
    type: 'bases',
  },
]);

const filterCities = async (value) => {
  cities.value = await getCities({
    'filter[name]': value,
    'filter[has_colleges]': true,
    'filter[has_specialties]': true,
    'page[size]': 2000,
    'sort': '-total_colleges',
  });
};

const filterDirections = async (value) => {
  directions.value = await getDirections(
    {
      'filter[name]': value ? value : '',
      'page[size]': 50,
      'filter[has_сolleges]': true,
      'filter[city_id]': filtersForSearch.value.city,
    },
    'colleges',
  );
};

const activeFilters = ref({
  // city: null,
  // type: null,
  // direction: null,
  // conditions: null,
  // form: null,
  // base: null,
});

const cityRp = ref('');
const typeMc = ref('');
const directionTitle = ref('');
const conditionsTitle = ref('');
const formTitle = ref('');
const baseTitle = ref('');
const relevanceTitle = ref('');

const filterByDormitory = () => {
  isDormitory.value = !isDormitory.value;
  if (isDormitory.value === true) {
    filtersForSearch.value.is_hostel = true;
  } else {
    delete filtersForSearch.value.is_hostel;
  }
  if (!props.isMap) {
    emit('search', filtersForSearch.value);
  }
};

const filtersForSearch = ref({
  college: [],
});

const addFilter = (key, value) => {
  activeFilters.value[key] = value;
  switch (key) {
    case 'cities':
      cityRp.value = value.attributes.name_rp;
      filtersForSearch.value.city = activeFilters.value.cities.id;
      break;
    case 'types':
      typeMc.value = value.attributes.name.slice(0, value.attributes.name.length - 1) + 'е';
      filtersForSearch.value.type = activeFilters.value.types.attributes.value;
      break;
    case 'directions':
      directionTitle.value = value.attributes.name;
      filtersForSearch.value.direction = activeFilters.value.directions.id;
      break;
    case 'conditions':
      conditionsTitle.value = value.attributes.name;
      filtersForSearch.value.has_free = activeFilters.value.conditions.attributes.value;
      break;
    case 'forms':
      formTitle.value = value.attributes.name;
      filtersForSearch.value.form = activeFilters.value.forms.id;
      //форма
      break;
    case 'bases':
      baseTitle.value = value.attributes.name;
      filtersForSearch.value.base = activeFilters.value.bases.attributes.value;
      break;
    case 'college':
      if (filtersForSearch.value.college.includes(activeFilters.value.college.id)) {
        let index = filtersForSearch.value.college.indexOf(activeFilters.value.college.id);
        filtersForSearch.value.college.splice(index, 1);
      } else {
        filtersForSearch.value.college.push(activeFilters.value.college.id);
      }
      delete activeFilters.value.college;
      break;
    case 'relevance':
      relevanceTitle.value = value.attributes.name;
      filtersForSearch.value.relevance = activeFilters.value.relevance.attributes;
      break;
  }
  if (!props.isMap) {
    emit('search', filtersForSearch.value);
  }
  emit('setBreadcrumbs', activeFilters.value);
};
const maxCost = ref(729000);
const setCost = (key, value) => {
  filtersForSearch.value[key] = value;
  emit('search', filtersForSearch.value);
};
const deleteActiveFilter = (index) => {
  let inputs = document.querySelectorAll('.a-select__label');
  if (index !== 'all') {
    for (let inp of inputs) {
      if (activeFilters.value[index].attributes.name == inp.value) {
        inp.value = '';
        break;
      }
    }
    if (index == 'cities') {
      delete filtersForSearch.value.city;
    } else if (index == 'relevance') {
      delete filtersForSearch.value.relevance;
    } else if (index == 'conditions') {
      delete filtersForSearch.value.has_free;
    } else {
      delete filtersForSearch.value[index.slice(0, index.length - 1)];
    }

    delete activeFilters.value[index];

    emit('search', filtersForSearch.value);
  } else {
    activeFilters.value = {};
    isDormitory.value = false;
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    filtersForSearch.value = { college: [] };
    cityRp.value = '';
    typeMc.value = '';
    directionTitle.value = '';
    conditionsTitle.value = '';
    formTitle.value = '';
    baseTitle.value = '';
    relevanceTitle.value = '';
    maxCost.value = 0;
    filterCities().then(() => {
      filterDirections().then(() => {
        for (let inp of inputs) {
          inp.value = '';
        }
      });
    });
    setTimeout(() => {
      maxCost.value = 729000;
    });
    if (!props.isMap) {
      emit('search', {});
    } else {
      emit('searchOnMap', {});
    }
  }
  cityStore.$state.selectedOptionValueRp = '';
  cityStore.$state.selectedOptionValue = '';
  emit('setBreadcrumbs', activeFilters.value);
  emit('clear-seo', index);
};

watch(activeFilters.value, () => {
  if (!activeFilters.value.cities) {
    cityRp.value = '';
  }
  if (!activeFilters.value.types) {
    typeMc.value = '';
  }
  if (!activeFilters.value.directions) {
    directionTitle.value = '';
  }
  if (!activeFilters.value.conditions) {
    conditionsTitle.value = '';
  }
  if (!activeFilters.value.forms) {
    formTitle.value = '';
  }
  if (!activeFilters.value.bases) {
    baseTitle.value = '';
  }
  if (!activeFilters.value.relevance) {
    relevanceTitle.value = '';
  }
});

const filterSeo = (item) => {
  emit('filter-seo', item);
};

const arrowDown = `<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.773247 0H8.22658C8.35843 0.000552821 8.48715 0.0401894 8.59647 0.113898C8.7058 0.187607 8.79081 0.292077 8.84076 0.414099C8.89071 0.53612 8.90336 0.670213 8.8771 0.799422C8.85084 0.928631 8.78686 1.04715 8.69325 1.14L4.97325 4.86C4.91127 4.92249 4.83754 4.97208 4.7563 5.00593C4.67506 5.03977 4.58792 5.0572 4.49991 5.0572C4.41191 5.0572 4.32477 5.03977 4.24353 5.00593C4.16229 4.97208 4.08856 4.92249 4.02658 4.86L0.30658 1.14C0.212966 1.04715 0.148985 0.928631 0.122728 0.799422C0.0964714 0.670213 0.109118 0.53612 0.159068 0.414099C0.209018 0.292077 0.29403 0.187607 0.403352 0.113898C0.512674 0.0401894 0.641398 0.000552821 0.773247 0Z" fill="#977AD6"/>
</svg>`;
const gpsIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99935 5C9.34008 5 8.69561 5.1955 8.14745 5.56177C7.59929 5.92804 7.17204 6.44863 6.91975 7.05772C6.66746 7.66681 6.60145 8.33703 6.73007 8.98363C6.85868 9.63024 7.17615 10.2242 7.64233 10.6904C8.1085 11.1565 8.70245 11.474 9.34905 11.6026C9.99565 11.7312 10.6659 11.6652 11.275 11.4129C11.884 11.1606 12.4046 10.7334 12.7709 10.1852C13.1372 9.63707 13.3327 8.9926 13.3327 8.33333C13.3327 7.44928 12.9815 6.60143 12.3564 5.97631C11.7313 5.35119 10.8834 5 9.99935 5ZM9.99935 10C9.66972 10 9.34748 9.90225 9.0734 9.71912C8.79932 9.53598 8.5857 9.27568 8.45955 8.97114C8.33341 8.6666 8.3004 8.33148 8.36471 8.00818C8.42902 7.68488 8.58775 7.38791 8.82084 7.15482C9.05393 6.92173 9.3509 6.763 9.6742 6.69869C9.9975 6.63438 10.3326 6.66739 10.6372 6.79353C10.9417 6.91968 11.202 7.1333 11.3851 7.40738C11.5683 7.68146 11.666 8.0037 11.666 8.33333C11.666 8.77536 11.4904 9.19928 11.1779 9.51184C10.8653 9.8244 10.4414 10 9.99935 10Z" fill="#4C3B8A"/>
<path d="M10.0003 19.9997C9.29855 20.0033 8.60619 19.8387 7.98115 19.5198C7.35611 19.2008 6.81659 18.7367 6.40776 18.1664C3.23193 13.7855 1.62109 10.4922 1.62109 8.37721C1.62109 6.15492 2.5039 4.02365 4.07529 2.45225C5.64669 0.88085 7.77797 -0.00195312 10.0003 -0.00195312C12.2226 -0.00195312 14.3538 0.88085 15.9252 2.45225C17.4966 4.02365 18.3794 6.15492 18.3794 8.37721C18.3794 10.4922 16.7686 13.7855 13.5928 18.1664C13.1839 18.7367 12.6444 19.2008 12.0194 19.5198C11.3943 19.8387 10.702 20.0033 10.0003 19.9997ZM10.0003 1.81721C8.26061 1.8192 6.59277 2.51115 5.36265 3.74127C4.13253 4.97139 3.44058 6.63923 3.43859 8.37888C3.43859 10.0539 5.01609 13.1514 7.87943 17.1005C8.12251 17.4354 8.4414 17.7079 8.81002 17.8958C9.17864 18.0837 9.58651 18.1816 10.0003 18.1816C10.414 18.1816 10.8219 18.0837 11.1905 17.8958C11.5591 17.7079 11.878 17.4354 12.1211 17.1005C14.9844 13.1514 16.5619 10.0539 16.5619 8.37888C16.5599 6.63923 15.868 4.97139 14.6379 3.74127C13.4077 2.51115 11.7399 1.8192 10.0003 1.81721Z" fill="#4C3B8A"/>
</svg>`;
</script>
<style lang="scss">
@import './s-filter.scss';

// .filters-grid {
//   grid-template-columns: repeat(v-bind(countMobile), 1fr);
//   @media (min-width: 768px) {
//     grid-template-columns: repeat(v-bind(countTablet), 1fr);
//   }
//   @media (min-width: 1440px) {
//     grid-template-columns: repeat(v-bind(countPC), 1fr);
//   }
// }
</style>
