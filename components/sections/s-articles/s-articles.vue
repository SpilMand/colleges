<template>
  <div class="s-articles section-m">
    <div class="container">
      <h2 class="s-articles__title title-h2">{{ title }}</h2>
      <div class="s-articles__box">
        <m-articles-card v-for="(article, index) in articles" :key="index" :articles="article" :isMainPage="true" />
      </div>
      <div class="f-btn-college">
        <NuxtLink to="/blog">
          <a-button label="Все статьи" color="violet-5" size="medium" textSize="f-text-s" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Jsona from 'jsona';
import getArticles from '~/api/articles/getArticles';
const articles = ref({});
async function fetchData() {
  articles.value = await getArticles(
    {
      'filter[article_type]': 'articles',
      'include': 'galleries',
      'filter[is_favorite]': true,
    },
    'articles',
  );
  const dataFormatter = new Jsona();
  articles.value = dataFormatter.deserialize(articles.value);
  console.log(articles.value);
}

onMounted(fetchData);

const title = ref('Полезные статьи');
</script>

<style lang="scss">
@import './s-articles.scss';
</style>
