<template>
  <s-header />
  <main class="layout-news">
    <div class="container">
      <a-breadcrumbs :items="breadcrumbs" />
    </div>
    <s-news-head :info="info" />
    <div class="container">
      <div class="layout-news__grid section-m">
        <div class="layout-news__content">
          <NuxtPage :info="info" :author="author" @setType="setType" />
        </div>
        <div v-if="false" class="layout-news__right">
          <a-rklm />
        </div>
      </div>
      <s-quiz class="section-m" />
      <!-- <s-form
        class="section-l"
        title="Всегда будь в курсе!"
        subtitle="Подпишись на рассылку, читай, где тебе удобно и как удобно!"
        checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br> 
        условия <a href='/policy' target='_blank' 
        class='s-form__politics'>Политики конфиденциальности сайта Колледжи.рф</a>"
        type="mail"
      /> -->
    </div>
  </main>
  <s-footer />
</template>

<script setup>
import getArticle from '~/api/articles/getArticle';
import getAuthor from '~/api/authors/getAuthor';

const route = useRoute();
const info = ref('');
const author = ref();

const breadcrumbs = computed(() => {
  return [{ label: 'Статьи и новости', link: '/blog' }, { label: `${info.value.data?.attributes.name}` }];
});

const isNews = ref(false);

const setType = (value) => {
  isNews.value = value;
};

onMounted(() => {
  setTimeout(async () => {
    try {
      info.value = await getArticle(route.query.id, { include: 'author,media,theme' });
      const authorId = info.value.data.relationships?.author?.data?.id;
      author.value = authorId ? await getAuthor(authorId, { include: 'media' }) : null;
    } catch (error) {
      console.error('Error fetching article or author data:', error);
    }
  });
});
</script>

<style lang="scss">
.layout-news {
  &__grid {
    margin-top: var(--a-margin-x15);
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 1280px) {
      gap: to-rem(50);
    }
  }
  &__right {
    display: none;
    @media (min-width: 1280px) {
      display: block;
    }

    .a-rklm {
      position: sticky;
      top: to-rem(80);
    }
  }
}
</style>
