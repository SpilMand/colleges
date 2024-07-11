<template>
  <div class="blog container">
    <a-breadcrumbs :items="breadcrumbs" />
    <h2 class="title-h2">
      Полезные статьи и новости<br />
      о колледжах, профессиях и обучении
    </h2>
    <nav class="blog__nav f-text-m section-m">
      <ul>
        <NuxtLink to="/blog" class="blog__nav-item"><li>Все</li></NuxtLink>
        <NuxtLink to="/blog/news" class="blog__nav-item"><li>Новости</li></NuxtLink>
        <NuxtLink to="/blog/articles" class="blog__nav-item"><li>Статьи</li></NuxtLink>
      </ul>
      <a-search placeholder="Найти в блоге" textSize="m" :isSearch="true" />
    </nav>
    <div class="blog__tags f-text-xs violet-100">
      <div v-for="(tag, index) in tags" :key="index" class="blog__tags-tag" @click="setActive($event.target)">
        {{ tag }}
      </div>
    </div>
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
            :info="articles[i - 1 + inLineBlocks * (index - 1)]"
          />
        </div>
      </div>
    </div>
    <s-form
      title="Всегда будь в курсе!"
      subtitle="Подпишись на рассылку, читай, где тебе удобно и как удобно!"
      checkboxLabel="Я согласен на получение информационных рассылок, а также принимаю <br> 
      условия <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
      type="mail"
    />
    <s-more-articles :articles="articles" />
    <s-now-read-news :news="news" />
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
  'Можно учиться и работать?',
  'Как поступить?',
  'Как выбрать колледж?',
  'Можно учиться и работать?',
  'Колледжи',
  'Самое интересное',
  'Образование',
  'Поступление',
  'Стоимость',
  'Приёмная комиссия',
  'Можно учиться и работать?',
  'Как поступить?',
  'Как выбрать колледж?',
  'Можно учиться и работать?',
];

const setActive = (element) => {
  if (element.classList.contains('active')) {
    element.classList.remove('active');
  } else {
    element.classList.add('active');
  }
};

const windowWidth = ref();
const inLineBlocks = ref(1);
const linesCount = ref(4);

onMounted(() => {
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
  {
    title: 'Влияние COVID–19 на поступление в колледжи: адаптация процессов ',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Колледжи вводят виртуальные дни открытых дверей: новая эра поступления',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Рост стипендий для малообеспеченных студентов: новые программы поддержки',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
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
    title: 'Станьте частью будущего с нашим вебинаром по успешному поступлению',
    tags: ['Новость', 'Колледжи'],
    date: '09.02.24',
  },
];

const articles = [
  {
    title: 'Выбор колледжа: как определить, что лучше всего подходит именно вам',
    img: '/img/articles/articles-4.png',
    tags: ['Реклама'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-5.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
  {
    title: 'Выбор колледжа: как определить, что лучше всего подходит именно вам',
    img: '/img/articles/articles-6.jpg',
    tags: ['Статья', 'Поступление', 'Колледжи'],
    date: '09.02.24',
  },
  {
    title: 'Изучаем требования к поступлению: как не упустить важные детали',
    img: '/img/articles/articles-7.jpg',
    tags: ['Статья', 'Поступление'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-5.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
  {
    title: 'Выбор колледжа: как определить, что лучше всего подходит именно вам',
    img: '/img/articles/articles-4.png',
    tags: ['Реклама'],
    date: '09.02.24',
  },
  {
    title: 'Изучаем требования к поступлению: как не упустить важные детали',
    img: '/img/articles/articles-7.jpg',
    tags: ['Статья', 'Поступление'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-6.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-5.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
  {
    title: 'Изучаем требования к поступлению: как не упустить важные детали',
    img: '/img/articles/articles-7.jpg',
    tags: ['Статья', 'Поступление'],
    date: '09.02.24',
  },
  {
    title: 'Финансовая помощь при поступлении: обзор грантов, стипендий и кредитов',
    img: '/img/articles/articles-5.jpg',
    tags: ['Статья', 'Стоимость'],
    date: '09.02.24',
  },
  {
    title: 'Изучаем требования к поступлению: как не упустить важные детали',
    img: '/img/articles/articles-7.jpg',
    tags: ['Статья', 'Поступление'],
    date: '09.02.24',
  },
];
</script>

<style lang="scss" scoped>
@import './blog.scss';
.blog__articles-line {
  grid-template-columns: repeat(v-bind('inLineBlocks'), minmax(0, 1fr));
}
</style>
