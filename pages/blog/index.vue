<template>
  <div class="blog container">
    <a-breadcrumbs :items="breadcrumbs" />
    <h2 class="title-h2" v-html="pageTitle"></h2>
    <nav class="blog__nav f-text-m section-s">
      <ul>
        <NuxtLink to="/blog" class="blog-articles__nav-item" test-id="link-blog-page-blog"><li>Все</li></NuxtLink>
        <NuxtLink to="/blog/news" class="blog-articles__nav-item" test-id="link-blog-page-blog-news"
          ><li>Новости</li></NuxtLink
        >
        <NuxtLink to="/blog/articles" class="blog-articles__nav-item" test-id="link-blog-page-articles"
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
    <!-- <div class="blog__tags f-text-xs violet-100">
      <div v-for="(tag, index) in tags" :key="index" class="blog__tags-tag" :test-id="`tag-blog-page-${index + 1}`" @click="setActive($event.target, tag)">
        {{ tag?.theme }}
      </div>
    </div> -->
    <div class="blog__articles section-m">
      <div v-for="index of linesCount" :key="index" class="blog__articles-line">
        <div v-for="i of inLineBlocks" :key="i" class="blog__articles-line-items">
          <m-news-card
            v-if="news[i - 1 + inLineBlocks * (index - 1)]"
            :info="news[i - 1 + inLineBlocks * (index - 1)]"
          />
        </div>

        <div v-for="i of inLineBlocks" :key="i" class="blog__articles-line-items">
          <m-articles-card
            v-if="articles[i - 1 + inLineBlocks * (index - 1)]"
            :articles="articles[i - 1 + inLineBlocks * (index - 1)]"
          />
        </div>
      </div>
    </div>
    <!-- <s-form-mail
      title="Всегда будь в курсе!"
      subtitle="Подпишись на рассылку, читай, где тебе удобно и как удобно!"
      section-id="blog-page"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br>
      условия <a href='/policy' target='_blank'
      class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    /> -->
    <!-- <s-more-articles class="section-s" :articles="setsArticles" /> временно скрыт блок -->
    <s-now-read-news v-if="false" :news="favoriteArcticles" />
    <s-quiz class="section-l" />
  </div>
</template>

<script setup>
import Jsona from 'jsona';
import getArticles from '~/api/articles/getArticles';
import getThemes from '~/api/themes/getThemes';
import getSetsArticles from '~/api/articles/getSetsArticles';
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

const breadcrumbs = [{ label: 'Статьи и новости' }];
const pageTitle = ref('Полезные статьи и новости<br />о колледжах, профессиях и обучении');
const fullPageTitle = computed(() => pageTitle.value.replace(/<br\s?\/>/, ' '));

useHead({
  title: `${fullPageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

const articles = ref({});
const news = ref([]);
const tags = ref([]);
const favoriteArcticles = ref([]);
const setsArticles = ref([]);

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

const windowWidth = ref();
const inLineBlocks = ref(1);
const linesCount = ref(4);

//форматирование даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
}

async function fetchNews() {
  try {
    //получение всех новостей
    let newsResponse = await getArticles(
      {
        'filter[article_type]': 'news',
        'include': 'theme',
      },
      'news',
    );

    const dataFormatter = new Jsona();
    let newsData = dataFormatter.deserialize(newsResponse);

    // Форматирование даты
    newsData.forEach((item) => {
      if (item.created_at) {
        item.formattedDate = formatDate(item.created_at);
      }
    });

    // Назначение данных
    news.value = newsData;
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
  }
}

async function fetchArticlesAndfavoriteArcticles() {
  try {
    // Получение всех статей
    let articlesResponse = await getArticles(
      {
        'filter[article_type]': 'articles',
        'include': 'media,theme',
      },
      'articles',
    );

    const dataFormatter = new Jsona();
    let articlesData = dataFormatter.deserialize(articlesResponse);

    // Форматирование дат для статей
    articlesData.forEach((item) => {
      if (item.created_at) {
        item.formattedDate = formatDate(item.created_at);
      }
    });

    articles.value = articlesData;
  } catch (error) {
    console.error('Ошибка при получении данных статей и избранных новостей:', error);
  }
}

//получение подборки статей
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

// Вызов функций для получения данных
async function loadAllData() {
  await Promise.all([fetchNews(), fetchArticlesAndfavoriteArcticles(), fetchSetsArticles()]);
}

// Вызов для загрузки всех данных
loadAllData();

const loadTags = async () => {
  try {
    const response = await getThemes();
    if (response && response.data) {
      tags.value = response.data.map((item) => item.attributes);
    }
  } catch (error) {
    console.error('Ошибка', error);
  }
};

onMounted(() => {
  loadTags();
  windowWidth.value = window.innerWidth;
  if (windowWidth.value >= 768) {
    inLineBlocks.value = 3;
    linesCount.value = 3;
  }
  if (windowWidth.value >= 1280) {
    inLineBlocks.value = 4;
  }
  addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    switch (inLineBlocks.value) {
      case 1:
        if (windowWidth.value >= 768) {
          inLineBlocks.value = 3;
          linesCount.value = 3;
        }
        break;
      case 3:
        if (windowWidth.value >= 1280) {
          inLineBlocks.value = 4;
        } else if (windowWidth.value < 768) {
          inLineBlocks.value = 1;
          linesCount.value = 4;
        }
        break;
      case 4:
        if (windowWidth.value < 1280) {
          inLineBlocks.value = 3;
        }
        break;
    }
  });
});
</script>

<style lang="scss" scoped>
@import './blog.scss';
.blog__articles-line {
  grid-template-columns: repeat(v-bind('inLineBlocks'), minmax(0, 1fr));
}

.s-quiz {
  margin-top: 30px;
}
</style>
