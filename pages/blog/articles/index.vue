<template>
  <div class="blog-articles container">
    <a-breadcrumbs :items="breadcrumbs" />
    <h2 class="title-h2">Полезные статьи о среднем образовании, колледжах и профессиях</h2>
    <nav class="blog-articles__nav f-text-m section-m">
      <ul>
        <NuxtLink to="/blog" class="blog-articles__nav-item"><li>Все</li></NuxtLink>
        <NuxtLink to="/blog/news" class="blog-articles__nav-item"><li>Новости</li></NuxtLink>
        <NuxtLink to="/blog/articles" class="blog-articles__nav-item"><li>Статьи</li></NuxtLink>
      </ul>
      <a-search placeholder="Найти в блоге" textSize="m" :isSearch="true" />
    </nav>
    <div class="blog-articles__tags f-text-xs violet-100">
      <div v-for="(tag, index) in tags" :key="index" class="blog-articles__tags-tag" @click="setActive($event.target)">
        {{ tag }}
      </div>
    </div>
    <div class="blog-articles__articles">
      <a-select placeholder="Выберите вариант" :options="speciality" hint="Сортировка" />
    </div>
    <div class="blog-articles__articles">
      <m-articles-card v-for="(article, index) in articles" :key="index" :info="article" />
    </div>
    <div class="f-btn-college section-m">
      <a-button label="Показать ещё" color="violet-5" size="medium" textSize="f-text-s" />
    </div>
    <s-more-articles :articles="articles" />
    <s-form
      title="Всегда будь в курсе!"
      subtitle="Подпишись на рассылку, читай, где тебе удобно и как удобно!"
      type="mail"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br> 
      условия <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
    <s-now-read-articles :articles="articles" />
    <s-quiz class="section-l" />
  </div>
</template>

<script setup>
const breadcrumbs = [{ label: 'Статьи и новости' }];
const tags = [
  'Колледжи',
  'Самое интересное',
  'Образование',
  'Поступление',
  'Стоимость',
  'Приёмная комиссия',
  'Можно учиться и работать?',
  'Как поступить?',
  'Как выбрать колледж?',
  'Можно учиться и работать?',
  'Колледжи',
  'Самое интересное',
  'Образование',
  'Поступление',
  'Стоимость',
  'Приёмная комиссия',
  'Можно учиться и работать?',
  'Как поступить?',
  'Как выбрать колледж?',
  'Можно учиться и работать?',
];

const setActive = (element) => {
  if (element.classList.contains('active')) {
    element.classList.remove('active');
  } else {
    element.classList.add('active');
  }
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
  {
    title: 'Выбор колледжа: как определить, что лучше всего подходит именно вам',
    img: '/img/articles/articles-4.png',
    tags: ['Реклама'],
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
    img: '/img/articles/articles-6.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-5.jpg',
    tags: ['Статья', 'Стоимость'],
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
  {
    title: 'Изучаем требования к поступлению: как не упустить важные детали',
    img: '/img/articles/articles-7.jpg',
    tags: ['Статья', 'Поступление'],
    date: '09.02.24',
  },
];
</script>

<style lang="scss" scoped>
@import './blog-articles.scss';
</style>
