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
    />
    <button type="submit" class="a-search__icon" @click="toggleSearch"></button>
    <div v-if="showDropdown && (articles.length || articlesTheme.length)" class="a-search__dropdown">
      <div class="a-search__dropdown-wrapper">
        <m-search-item v-if="articles.length" :title="'Статьи'" :items="articles" />
        <m-search-item v-if="articlesTheme.length" :title="'Темы статей'" :items="articlesTheme" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDebounce } from '@vueuse/core';
import getSearchArticles from '~/api/search/getSearchArticles';

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
});

const currentPage = window.location.pathname.includes('news') ? 'blog/news' : 'blog/articles';

const emit = defineEmits(['toggleSearch']);

const filterItems = ref('');
const debouncedFilterItems = useDebounce(filterItems, 300);
const showDropdown = ref(false);
const articles = ref([]);
const articlesTheme = ref([]);

watch(debouncedFilterItems, async (newVal) => {
  if (newVal.length >= 2) {
    try {
      const filters = {
        'filter[name]': newVal,
        'page[size]': 15,
      };

      // условие для выбора типа статьи в зависимости от страницы
      if (currentPage === 'blog/news') {
        filters['filter[article_type]'] = 'news';
      } else {
        filters['filter[article_type]'] = 'articles';
      }

      const apiItems = await getSearchArticles(filters);

      if (apiItems && apiItems.data) {
        const articleData = apiItems.data.filter((item) => item.type === 'articles');
        const articleThemeData = apiItems.data.filter((item) => item.type === 'articles_theme');

        articles.value = articleData.map((item) => ({
          id: item.id,
          link: item.attributes.slug,
          title: item.attributes.name,
          name: 'articles',
        }));

        articlesTheme.value = articleThemeData.map((item) => ({
          id: item.id,
          link: item.attributes.slug,
          title: item.attributes.name,
          name: 'articles_theme',
        }));
      } else {
        console.error('Данные не были получены');
      }
    } catch (error) {
      console.error('Произошла ошибка при загрузке данных:', error);
    }
  } else {
    articles.value = [];
    articlesTheme.value = [];
  }

  showDropdown.value = newVal.length >= 3;
});

const toggleSearch = () => {
  emit('toggleSearch');
  showDropdown.value = !showDropdown.value;
};

const classes = computed(() => ({ [`a-search-blog--${props.size}`]: true }));
</script>

<style lang="scss">
@import './a-search-blog.scss';
</style>
