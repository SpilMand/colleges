<!-- eslint-disable max-len -->
<template>
  <div class="blog-news container">
    <a-breadcrumbs :items="breadcrumbs" />
    <h2 class="title-h2">{{ pageTitle }}</h2>
    <nav class="blog-news__nav f-text-m section-s">
      <ul>
        <NuxtLink to="/blog" class="blog-news__nav-item" test-id="link-blog-page-blog"><li>Все</li></NuxtLink>
        <NuxtLink to="/blog/news" class="blog-news__nav-item" test-id="link-blog-page-blog-news"
          ><li>Новости</li></NuxtLink
        >
        <NuxtLink to="/blog/articles" class="blog-news__nav-item" test-id="link-blog-page-articles"
          ><li>Статьи</li></NuxtLink
        >
      </ul>
      <div v-if="isSearch" class="a-search blog-news-a-search">
        <a-search-blog
          placeholder="Найти в блоге"
          section-id="blog-page"
          textSize="m"
          :isSearch="true"
          @toggleSearch="toggleSearch"
        />
      </div>
    </nav>
    <div class="blog-news__tags f-text-xs violet-100">
      <div v-for="(tag, index) in tags" :key="index" class="blog-news__tags-tag" @click="setActive($event.target, tag)">
        {{ tag.theme }}
      </div>
    </div>
    <div class="blog-news__articles">
      <a-select-new
        hint="Сортировка"
        placeholder="Выберите вариант"
        section-id="blog-news"
        :options="data"
        @select="sortNews"
      />
    </div>
    <div class="blog-news__articles">
      <template v-if="filterItems">
        <m-news-card v-for="(searchNews, index) in filterNewsBySearch()" :key="'search-' + index" :info="searchNews" />
      </template>
      <template v-else>
        <m-news-card v-for="(news1, index1) in filterNewsByTag()" :key="'tag-' + index1" :info="news1" />
      </template>
    </div>
    <div class="f-btn-college section-m">
      <a-button label="Показать ещё" color="violet-5" size="medium" test-id="blog-page-news-more" textSize="f-text-s" />
    </div>
    <s-form
      class="section-m"
      title="Всегда будь в курсе!"
      subtitle="Подпишись на рассылку, читай, где тебе удобно и как удобно!"
      type="mail"
      section-id="blog-page-news"
      :socialLinks="socialLinks"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br>
      условия <a href='/policy' target='_blank'
      class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
    <s-now-read-news v-if="false" :news="favoriteNews" />
    <s-quiz class="section-l" />
  </div>
</template>

<script setup>
import Jsona from 'jsona';
import getArticles from '~/api/articles/getArticleNews';
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

// import getSearchArticles from '~/api/search/getSearchArticles';

const pageTitle = ref('Новости об обучении в сфере среднего профессионального образования');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

const breadcrumbs = [{ label: 'Статьи и новости' }];
const news = ref([]);
const favoriteNews = ref([]);
const tags = ref([]);
const activeTag = ref(null);

const filterItems = ref('');
const showDropdown = ref(false);
const items = ref([]);

const toggleSearch = () => {
  showDropdown.value = !showDropdown.value; // видимость выпадающего меню
  if (!showDropdown.value) {
    filterItems.value = '';
    items.value = [];
  }
};

const data = ref([
  { attributes: { value: 'asc', name: 'Сортировать по дате ↑' }, type: 'sort' },
  { attributes: { value: 'desc', name: 'Сортировать по дате ↓' }, type: 'sort' },
]);

// Метод для фильтрации новостей по выбранному тегу
const filterNewsByTag = () => {
  if (!activeTag.value) {
    return news.value; // Тег не выбран, возвращаем все новости
  }
  return news.value.filter((article) => article.theme && article.theme.id === activeTag.value.id);
};

const filterNewsBySearch = () => {
  if (!filterItems.value) {
    return news.value; // Если ничего не введено, возвращаем все новости
  }

  return news.value.filter((article) => {
    const name = article?.attributes?.name || '';
    return name.toLowerCase().includes(filterItems.value.toLowerCase());
  });
};

//форматирование даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
}

const setActive = (element, tag) => {
  const previouslyActive = document.querySelector('.active');
  if (previouslyActive) {
    previouslyActive.classList.remove('active');
  }

  if (element.classList.contains('active')) {
    element.classList.remove('active');
    activeTag.value = null;
  } else {
    element.classList.add('active');
    activeTag.value = tag;
  }
};

const socialLinks = [
  { url: 'https://vk.com/kolledzhirf', icon: '/icons/vk.svg' },
  { url: 'https://t.me/kolledzhirf', icon: '/icons/telegram.svg' },
];

// Получаем новости и избранные
async function fetchAllData() {
  await fetchArticles();
  // await fetchFavoriteNews();
}

// Метод для получения новостей
const fetchArticles = async () => {
  try {
    const response = await getArticles({
      'filter[article_type]': 'news',
      'include': 'theme',
    });

    const dataFormatter = new Jsona();
    const newsData = dataFormatter.deserialize(response);
    news.value = newsData;

    newsData.forEach((article) => {
      if (article.theme && !tags.value.find((tag) => tag.id === article.theme.id)) {
        tags.value.push(article.theme);
      }

      if (article.created_at) {
        article.formattedDate = formatDate(article.created_at);
      }
    });
  } catch (error) {
    console.error('Ошибка при получении данных статей:', error);
  }
};

// Метод для получения избранных новостей
// const fetchFavoriteNews = async () => {
//   try {
//     const response = await getArticles({
//       'filter[is_reading_now]': true,
//       'filter[article_type]': 'articles',
//       'include': 'theme',
//     });

//     const dataFormatter = new Jsona();
//     const favoriteNewsData = dataFormatter.deserialize(response);
//     favoriteNews.value = favoriteNewsData.map((item) => {
//       if (item.created_at) {
//         item.formattedDate = formatDate(item.created_at);
//       }
//       return item;
//     });
//   } catch (error) {
//     console.error('Ошибка при получении избранных новостей:', error);
//   }
// };

// Метод для сортировки новостей
const sortNews = (item) => {
  const order = item.attributes.value; // получаем значение сортировки

  if (!news.value || news.value.length === 0) {
    return;
  }

  if (order === 'asc') {
    news.value.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  } else if (order === 'desc') {
    news.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  news.value = [...news.value];
};

onMounted(() => {
  fetchAllData();
});
</script>

<style lang="scss" scoped>
@import './blog-news.scss';
</style>
