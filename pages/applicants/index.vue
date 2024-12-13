<template>
  <s-applicants
    :apiColleges="apiColleges"
    :apiDirections="apiDirections"
    :apiSpecialties="apiSpecialties"
    :apiProfessions="apiProfessions"
    :pageTitle="pageTitle"
  />
  <div class="container">
    <s-quiz
      quizTitle="Найдите идеальный колледж"
      quizSubtitle=""
      quizText="Если вы не уверены и не знаете, куда поступать,
      то пройдите квиз и наши специалисты помогут вам определить, где учиться."
      class="section-l s-parents__quiz"
    />
  </div>
  <!-- <div class="container">
    <s-more-articles
      title="Полезные советы в нашем блоге"
      text="Узнать больше полезной информации Вы можете в нашем Блоге.
      Полезные статьи помогут Вам собрать для себя важную информацию,
      расширить кругозор и помочь своему ребенку сделать правильный выбор."
      :articles="articles"
      class="s-parents__articles"
    />
  </div> -->
  <s-form
    title="Свяжитесь с нами: мы здесь, чтобы помочь"
    subtitle="Если у Вас остались вопросы по работе сайта,
      пишите нам на электронную почту <a class='f-link-white'
      href='mailto:1234@ruscollege.ru'>1234@ruscollege.ru</a> или
      оставьте свои контактные данные и мы свяжемся с Вами."
    checkboxLabel="Я согласен на обработку своих персональных данных и получение информационных рассылок,
        а также принимаю условия
        <a href='/policy' target='_blank'
        class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    type="stretch"
    section-id="applicants-page"
  />
</template>
<script setup>
import useCanonicalHead from '~/composables/useCanonicalHead';

useCanonicalHead();

defineProps({
  apiDirections: {
    type: Object,
    default: () => ({}),
  },
  apiColleges: {
    type: Object,
    default: () => ({}),
  },
  apiSpecialties: {
    type: Object,
    default: () => ({}),
  },
  apiProfessions: {
    type: Object,
    default: () => ({}),
  },
});
const pageTitle = ref('Абитуриентам');

useHead({
  title: `${pageTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});
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
