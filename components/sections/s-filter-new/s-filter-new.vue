<template>
  <section class="s-filter">
    <a-breadcrumbs v-if="isMainFilter" :items="breadcrumbs" @action="setBreadcrumbs" />
    <div class="s-filter__title">
      <h3 :class="'title-' + titleSize">
        <span v-if="parsedTitle">{{ parsedTitle }} {{ isDormitory ? 'с общежитием' : '' }}</span>
        <span v-else v-html="title" />
      </h3>
      <a v-if="isMainFilter" href="#form" class="s-filter__help scroll">
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
          v-html="
            route.name === 'professions'
              ? 'Поможем выбрать<br />правильную профессию'
              : 'Поможем выбрать<br />правильный колледж'
          "
        />
      </a>
    </div>
    <a-button
      v-if="width < 768"
      class="s-filter__open-filters-btn"
      label="Фильтры"
      :img="arrowDown"
      color="violet-5"
      :needRot="true"
      @click="openFilters = !openFilters"
    />
    <div v-if="openFilters || width > 768 || showSub" class="s-filter__filters">
      <div class="s-filter__filters-main filters-grid" :style="`grid-template-columns: repeat(${gridStyle}, 1fr)`">
        <template v-for="(filter, id) in filters" :key="id">
          <a-select-new
            :options="filter.data"
            :placeholder="filter.placeholder"
            :hint="filter.hint"
            :selected="filter.chosen"
            :disabled="filter.disabled"
            :isCanInput="filter.readonly"
            @addFilter="addFilter"
            @select="select"
            @input-search="inputSearch"
          />
        </template>
        <div v-if="showSub" class="s-filter__filters-dormitory">
          <img src="/icons/dormitory.svg" alt="" />
          <label for="dormitory" class="f-text-s">Общежитие</label>
          <input id="dormitory" type="checkbox" :checked="isDormitory" @change="changeDormitory" />
        </div>
        <div
          v-if="showSub || route.name == 'specialties' || route.name == 'professions'"
          class="s-filter__filters-cost gray"
        >
          <span class="s-filter__filters-hint">Стоимость в год</span>
          <a-slider :min="0" :max="maxCost" :max-val="maxVal" @setCost="setCost" />
        </div>
      </div>
      <div
        class="s-filter__filters-buttons"
        :class="{
          absolute:
            (!isMainFilter && route.name === 'profession' && width > 768) ||
            (route.name === 'specialties' && width > 1440) ||
            (route.name === 'professions' && width > 1440),
        }"
      >
        <a-button
          v-if="route.name === 'colleges'"
          class="s-filter__filters-buttons-sub"
          label="Доп. опции"
          :img="arrowDown"
          color="violet-5"
          size="extra-large"
          textSize="f-text-s"
          textWeight="700"
          :needRot="true"
          @click="showSub = !showSub"
        />
        <a-button
          v-if="route.name === 'colleges'"
          class="s-filter__button-map"
          label="Смотреть на карте"
          :img="gpsIcon"
          color="outline"
          size="extra-large"
          textSize="f-text-s"
          textWeight="700"
          @click="emit('open-map')"
        />
        <a-button
          v-if="isFlag"
          label="Сбросить фильтр"
          color="violet-5"
          textSize="f-text-s"
          textWeight="700"
          size="extra-large"
          :style="route.name == 'specialties' ? 'margin-left: auto' : ''"
          @click="deleteFilter('all')"
        />
      </div>
      <div v-if="active && active.length > 0" class="s-filter__active-filters">
        <template v-for="(filter, id) in active" :key="id">
          <div v-if="filter.name">
            <span>{{ filter.name }}</span>
            <img src="/icons/close.svg" alt="" @click="deleteFilter(filter.type)" />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';

const emit = defineEmits(['search', 'search-on-map', 'open-map', 'delete-filter', 'input-search', 'change-dormitory']);

const props = defineProps({
  filters: {
    type: Array,
    default: () => {
      return [];
    },
  },
  activeFilters: {
    type: [Array, Object],
    default: () => {
      return [];
    },
  },
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
  countMobile: {
    type: Number,
    default: 1,
  },
  countTablet: {
    type: Number,
    default: 3,
  },
  countPC: {
    type: Number,
    default: 6,
  },
  title: {
    type: String,
    default: '',
  },
  parsedTitle: {
    type: String,
    default: '',
  },
  titleSize: {
    type: String,
    default: 'h3',
  },
  isMainFilter: {
    type: Boolean,
    default: true,
  },
  isMap: {
    type: Boolean,
    default: false,
  },
  isFlag: {
    type: Boolean,
    default: true,
  },
  startShowSub: {
    type: Boolean,
    default: false,
  },
  isDormitory: {
    type: Boolean,
  },
  isCanInput: {
    type: Boolean,
    default: true,
  },
  maxCost: {
    type: Number,
    default: 0,
  },
  maxVal: {
    type: Number,
    default: 0,
  },
});

const { width } = useWindowSize();
const route = useRoute();
const openFilters = ref(false);
const active = ref([]);

const gridStyle = ref(1);
const showSub = ref(props.startShowSub);

const getGrid = (windowWidth) => {
  switch (true) {
    case windowWidth < 768 && windowWidth < 1400:
      gridStyle.value = props.countMobile;
      break;
    case windowWidth >= 768 && windowWidth < 1400:
      gridStyle.value = props.countTablet;
      break;
    default:
      gridStyle.value = props.countPC;
  }
};

onMounted(() => {
  getGrid(width.value);
  getActiveFilters();
});

watch(width, (newVal) => {
  getGrid(newVal);
});

watch(props.activeFilters, (newVal) => {
  if (newVal) {
    getActiveFilters();
  }
});

const getActiveFilters = () => {
  active.value = [];

  Object.keys(props.activeFilters).forEach((key) => {
    if (props.activeFilters[key]?.attributes) {
      active.value.push({
        name: props.activeFilters[key].attributes.name,
        type: props.activeFilters[key].type,
      });
    }
  });
};

const setBreadcrumbs = (index) => {
  let arr = route.path.split('/');
  arr.shift();
  arr.length = index + 1;
  let url = '';
  arr.forEach((element) => {
    url += `/${element}`;
  });
  navigateTo(url);
};

const select = (value) => {
  addFilter(value);
};

const addFilter = (value) => {
  emit('search', value);
};

const changeDormitory = () => {
  emit('change-dormitory');
};

const setCost = (key, value) => {
  emit('search', value, key);
};

const deleteFilter = (key) => {
  emit('delete-filter', key);
};

const inputSearch = (value) => {
  emit('input-search', value);
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
@import './s-filter-new.scss';
</style>
