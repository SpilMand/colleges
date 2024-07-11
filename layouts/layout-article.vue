<template>
  <s-header />
  <main class="layout-article">
    <div class="container">
      <a-breadcrumbs :items="breadcrumbs" />
    </div>
    <s-article-head />
    <div class="container">
      <div class="layout-article__grid section-m">
        <div class="layout-article__content">
          <NuxtPage @setType="setType" />
        </div>
        <div class="layout-article__right">
          <a-rklm />
        </div>
      </div>
      <s-quiz class="section-m" />
      <s-now-read-news v-if="isNews" :news="news" />
      <s-now-read-articles v-else title="Похожие статьи" :articles="articles" />
      <s-form
        class="section-l"
        title="Всегда будь в курсе!"
        subtitle="Подпишись на рассылку, читай, где тебе удобно и как удобно!"
        checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br> 
        условия <a href='/' target='_blank' class='s-form__politics'>Политики конфиденциальности сайта Колледжи.рф</a>"
        type="mail"
      />
    </div>
  </main>
  <s-footer />
</template>

<script setup>
const breadcrumbs = [{ label: 'Статьи и новости', link: '/blog' }, { label: 'Статья_id' }];

const isNews = ref(false);

const setType = (value) => {
  isNews.value = value;
};

const articles = [
  {
    title: 'Выбор колледжа: как определить, что лучше всего подходит именно вам',
    img: '/img/articles/articles-4.png',
    tags: ['Реклама'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-5.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
  {
    title: 'Выбор колледжа: как определить, что лучше всего подходит именно вам',
    img: '/img/articles/articles-6.jpg',
    tags: ['Статья', 'Поступление', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Изучаем требования к поступлению: как не упустить важные детали',
    img: '/img/articles/articles-7.jpg',
    tags: ['Статья', 'Поступление'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-5.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
];
const news = [
  {
    title: 'Изменения в процедуре поступления в колледжи в 2024 году: что нового?',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Цифровизация поступления: как колледжи используют ИИ для отбора кандидатов',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Глобальные инициативы для упрощения поступления иностранных студентов',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Станьте частью будущего с нашим вебинаром по успешному поступлению',
    tags: ['Реклама'],
    date: '09.02.24',
  },
  {
    title: 'Подготовка к поступлению: летние курсы и специализированные программы для абитуриентов',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Подготовка к поступлению: летние курсы и специализированные программы для абитуриентов',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
];
</script>

<style lang="scss">
.layout-article {
  &__grid {
    margin-top: var(--a-margin-x15);
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 1280px) {
      grid-template-columns: 4fr 1fr;
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
