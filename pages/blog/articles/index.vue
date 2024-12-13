<template>
  <div class="blog-articles container">
    <a-breadcrumbs :items="breadcrumbs" />
    <h2 class="title-h2">{{ pageTitle }}</h2>
    <nav class="blog-articles__nav f-text-m section-s">
      <ul>
        <NuxtLink to="/blog" class="blog-articles__nav-item" test-id="link-blog-page-blog"><li>Все</li></NuxtLink>
        <NuxtLink to="/blog/news" class="blog-articles__nav-item" test-id="link-blog-page-blog-news"
          ><li>Новости</li></NuxtLink
        >
        <NuxtLink to="/blog/articles" class="blog-articles__nav-item" test-id="link-blog-page-blog-articles"
          ><li>Статьи</li></NuxtLink
        >
      </ul>
      <a-search-blog
        v-if="false"
        placeholder="Найти в блоге"
        section-id="blog-page"
        textSize="m"
        :isSearch="true"
        @toggleSearch="toggleSearch"
      />
    </nav>
    <div class="blog-articles__tags f-text-xs violet-100">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="blog-articles__tags-tag"
        @click="setActive($event.target, tag)"
      >
        {{ tag.theme }}
      </div>
    </div>
    <div class="blog-articles__articles">
      <a-select-new
        hint="Сортировка"
        placeholder="Выберите вариант"
        section-id="blog-page-articles"
        :options="data"
        @select="sortArticles"
      />
    </div>
    <div class="blog-articles__articles">
      <template v-if="filterItems">
        <m-articles-card
          v-for="(article, index) in filterNewsBySearch()"
          :key="'search-' + index"
          :articles="article"
        />
      </template>
      <template v-else>
        <m-articles-card
          v-for="(article, index) in filterArticlesByTag()"
          :key="index"
          :articles="article"
          :info="tags"
        />
      </template>
    </div>
    <div class="f-btn-college section-m">
      <a-button
        label="Показать ещё"
        color="violet-5"
        test-id="btn-blog-page-articles-more"
        size="medium"
        textSize="f-text-s"
      />
    </div>
    <!-- <s-more-articles class="section-s" :articles="setsArticles" /> временно скрыт блок -->
    <s-form
      class="section-m"
      title="Всегда будь в курсе!"
      subtitle="Подпишись на рассылку, читай, где тебе удобно и как удобно!"
      type="mail"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br>
      условия <a href='/policy' target='_blank'
      class='s-form__politics' test-id='link-form-policy'>Политики   конфиденциальности сайта Колледжи.рф</a>"
      section-id="blog-page-articles"
    />
    <s-now-read-articles v-if="false" :articles="favoriteArcticles" />
    <s-quiz class="section-l" />
  </div>
</template>

<script setup>
import Jsona from 'jsona';
import getArticles from '~/api/articles/getArticles';
import getSetsArticles from '~/api/articles/getSetsArticles';
import getSearchArticles from '~/api/search/getSearchArticles';
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

const breadcrumbs = [{ label: 'Статьи и новости' }];
const articles = ref([]);
const favoriteArcticles = ref([]);
const setsArticles = ref([]);
const tags = ref([]);
const activeTag = ref(null);
const pageTitle = ref('Полезные статьи о среднем образовании, колледжах и профессиях');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

const filterItems = ref('');
const showDropdown = ref(false);
const items = ref([]);

const toggleSearch = () => {
  showDropdown.value = !showDropdown.value; // Переключаем видимость выпадающего меню
  if (!showDropdown.value) {
    filterItems.value = ''; // Очищаем текст поиска, если выпадающее меню скрыто
    items.value = []; // Очищаем найденные элементы
  }
};

const data = ref([
  { attributes: { value: 'asc', name: 'Сортировать по дате ↑' }, type: 'sort' },
  { attributes: { value: 'desc', name: 'Сортировать по дате ↓' }, type: 'sort' },
]);

// Метод для фильтрации статей по выбранному тегу
const filterArticlesByTag = () => {
  if (!activeTag.value) {
    return articles.value; // Если тег не выбран, возвращаем все новости
  }
  return articles.value.filter((article) => article.theme && article.theme.id === activeTag.value.id);
};

const filterNewsBySearch = () => {
  if (!filterItems.value) {
    return news.value; // Если ничего не введено, возвращаем все новости
  }

  return news.value.filter((article) => {
    const name = article?.attributes?.name || ''; // Безопасно получаем имя
    return name.toLowerCase().includes(filterItems.value.toLowerCase()); // Игнорируем регистр при сравнении
  });
};

const fetchSearchArticles = async (searchTerm) => {
  try {
    // Запрос к API с фильтром по наименованию
    const response = await getSearchArticles({
      'filter[name]': searchTerm,
      'page[size]': 15, // Запрашиваем, например, ограниченное количество записей
    });

    const dataFormatter = new Jsona();
    const searchResults = dataFormatter.deserialize(response);

    // Обновляем состояние с найденными элементами
    items.value = searchResults.map((article) => {
      if (article.created_at) {
        article.formattedDate = formatDate(article.created_at);
      }
      return article; // Возвращаем объект с отформатированной датой
    });
  } catch (error) {
    console.error('Ошибка при получении данных по поиску:', error);
  }
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
    activeTag.value = null; // Убираем активный тег, если кликнули на активный
  } else {
    element.classList.add('active');
    activeTag.value = tag; // Устанавливаем новый активный тег
  }
};

//получение подборки статей

async function fetchArticles() {
  try {
    // Запрос для получения обычных статей
    const articlesResponse = await getArticles(
      {
        'filter[article_type]': 'articles',
        'include': 'media,theme',
      },
      'articles',
    );

    // Запрос для получения статей, которые читаются сейчас
    // const readingNowResponse = await getArticles(
    //   {
    //     'filter[article_type]': 'articles',
    //     'filter[is_reading_now]': true,
    //     'include': 'theme,author,media',
    //   },
    //   'articles',
    // );

    const dataFormatter = new Jsona();

    // Обработка обычных статей
    const articlesData = dataFormatter.deserialize(articlesResponse);
    articles.value = articlesData;

    // Обработка статей, которые читаются сейчас
    // const readingNowArticlesData = dataFormatter.deserialize(readingNowResponse);
    // favoriteArcticles.value = readingNowArticlesData;

    // Обработка данных: форматирование дат и тегов
    articles.value.forEach((article) => {
      if (article.theme && !tags.value.find((tag) => tag.id === article.theme.id)) {
        tags.value.push(article.theme);
      }

      if (article.created_at) {
        article.formattedDate = formatDate(article.created_at);
      }
    });

    // readingNowArticles.value = readingNowArticlesData.map((article) => {
    //   if (article.created_at) {
    //     article.formattedDate = formatDate(article.created_at);
    //   }
    //   return article;
    // });
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

async function fetchSetsArticles() {
  try {
    let articlesResponse = await getSetsArticles(
      {
        'filter[name]': '',
        'include': 'media,articles',
      },
      'articles',
    );

    const dataFormatter = new Jsona();
    let articlesData = dataFormatter.deserialize(articlesResponse);

    // Форматирование даты
    articlesData.forEach((item) => {
      if (item.created_at) {
        item.formattedDate = formatDate(item.created_at);
      }
    });

    // Назначение данных
    setsArticles.value = articlesData;
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
  }
}

// Метод для сортировки статей
const sortArticles = (item) => {
  const order = item.attributes.value; // получаем значение сортировки

  if (!articles.value || articles.value.length === 0) {
    return; // Выход, если статей нет
  }

  if (order === 'asc') {
    articles.value.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  } else if (order === 'desc') {
    articles.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  articles.value = [...articles.value]; // Обновляем массив для Vue
};

watch(filterItems, async (newVal) => {
  showDropdown.value = newVal.length >= 3; // Показываем выпадающее меню при вводе 3 и более символов
  if (newVal.length >= 2) {
    await fetchSearchArticles(newVal); // Получаем данные поиска
  } else {
    items.value = []; // Очищаем результаты поиска, если меньше 2 символов
  }
});

onMounted(() => {
  fetchArticles();
  fetchSetsArticles();
});
</script>

<style lang="scss" scoped>
@import './blog-articles.scss';
</style>
