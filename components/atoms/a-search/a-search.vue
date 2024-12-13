<template>
  <div class="a-search" :class="{ active: isSearch, ...classes }">
    <input
      v-if="isSearch"
      v-model="filterItems"
      class="a-search__input"
      :class="'f-text-' + textSize"
      name="search"
      type="text"
      :placeholder="placeholder"
      :test-id="`input-${sectionId}-search`"
    />
    <button
      type="submit"
      class="a-search__icon"
      :test-id="`btn-${sectionId}-search-submit`"
      @click="toggleSearch"
    ></button>
    <div
      v-if="
        showDropdown &&
        // eslint-disable-next-line max-len
        (items.colleges?.length || items.directions?.length || items.specialties?.length || items.professions?.length)
      "
      class="a-search__dropdown"
    >
      <div class="a-search__dropdown-wrapper">
        <m-search-item v-if="items.colleges?.length" :title="'Колледжи'" :items="items.colleges" />
        <m-search-item v-if="items.directions?.length" :title="'Направления'" :items="items.directions" />
        <m-search-item v-if="items.specialties?.length" :title="'Специальности'" :items="items.specialties" />
        <m-search-item v-if="items.professions?.length" :title="'Профессии'" :items="items.professions" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDebounce } from '@vueuse/core';
import getItems from '~/api/search/getItems';

const props = defineProps({
  isSearch: Boolean,
  placeholder: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    validator: (value) => ['big', 'small'].includes(value),
    default: 'small',
  },
  textSize: {
    type: String,
    default: 'xs',
  },
  sectionId: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['toggleSearch']);

const filterItems = ref('');
const debouncedFilterItems = useDebounce(filterItems, 300);
const showDropdown = ref(false);
const items = ref([]);

watch(debouncedFilterItems, async (newVal) => {
  if (newVal.length >= 2) {
    try {
      const apiItems = await getItems({ 'filter[name]': newVal, 'page[size]': 15 });
      if (apiItems && apiItems.data) {
        items.value = {
          colleges: apiItems.data.colleges?.items?.map((item) => ({
            id: item.id,
            link: item.link,
            title: item.name,
            name: 'colleges',
          })),
          directions: apiItems.data.directions?.items?.map((item) => ({
            id: item.id,
            link: item.link,
            title: item.name,
            name: 'directions',
          })),
          professions: apiItems.data.professions?.items?.map((item) => ({
            id: item.id,
            link: item.link,
            title: item.name,
            name: 'professions',
          })),
          specialties: apiItems.data.specialties?.items?.map((item) => ({
            id: item.id,
            link: item.link,
            title: item.name,
            name: 'specialties',
          })),
        };
      } else {
        console.error('Данные не были получены');
      }
    } catch (error) {
      console.error('Произошла ошибка при загрузке данных:', error);
    }
  } else {
    items.value = [];
  }
  showDropdown.value = newVal.length >= 3;
});

const toggleSearch = () => {
  emit('toggleSearch');
  showDropdown.value = !showDropdown.value;
};

const classes = computed(() => ({ [`a-search--${props.size}`]: true }));
</script>
<style lang="scss">
@import './a-search.scss';
</style>
