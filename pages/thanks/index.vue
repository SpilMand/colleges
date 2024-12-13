<template>
  <div class="container">
    <a-breadcrumbs :items="breadcrumbs" />
  </div>

  <s-main-about :pageTitle="pageTitle" :description="description" />

  <div class="container">
    <div class="s-main-about-box">
      <div class="title-about">Ваш компас в мире колледжей</div>
      <p class="text-about">
        На сайте представлены
        <b>{{ getTitle(apiColleges, 'колледж') }}</b> по 123&nbsp;городам России, а также
        <b>{{ getTitle(apiProfessions, 'профессия') }}</b> и <b>{{ getTitle(apiSpecialties, 'специальность') }}</b
        >. Информация по каждому колледжу актуализируется и подтверждается Минобрнаука.
      </p>
    </div>
  </div>

  <s-about
    class="s-about-page"
    :showDirectionsCard="false"
    :apiColleges="apiColleges"
    :apiProfessions="apiProfessions"
    :apiSpecialties="apiSpecialties"
    :showDescText="showDescText"
  />
  <s-info />

  <!-- <div class="container">
    <s-quiz
      quizTitle="Найдите идеальный колледж"
      quizSubtitle=""
      quizText="Если ваш ребёнок не уверен или не знает, куда поступать,
      то предложите ему пройти квиз и наши специалисты помогут определиться, где учиться."
      class="section-l s-parents__quiz"
    />
  </div> -->

  <s-search-colleges />

  <s-form
    title="Свяжитесь с нами: мы здесь, чтобы помочь"
    subtitle="Если у Вас остались вопросы по работе сайта,
      пишите нам на электронную почту <a class='f-link-white'
      href='mailto:1234@ruscollege.ru'>1234@ruscollege.ru</a> или
      оставьте свои контактные данные и мы свяжемся с Вами."
    checkboxLabel="Я согласен на обработку своих персональных данных и получение информационных рассылок,
        а также принимаю условия
        <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    type="stretch"
  />
</template>

<script setup>
import { getTitle } from '~/composables/utils';
import useCanonicalHead from '~/composables/useCanonicalHead';
// import { useCityIdStore } from '~/store/city';
const pageTitle = ref('Спасибо!');
const shortTitle = computed(() => pageTitle.value.replace(/!$/, ''));

useHead({
  title: `${shortTitle.value} | Колледжи.рф`,
  // eslint-disable-next-line max-len
  description: `${shortTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
});

defineProps({
  apiSpecialties: {
    type: Object,
    default: () => ({}),
  },
  apiColleges: {
    type: Object,
    default: () => ({}),
  },
  apiProfessions: {
    type: Object,
    default: () => ({}),
  },
});

useCanonicalHead();

const showDescText = ref(false);
const breadcrumbs = [{ label: 'Спасибо' }];
const description = `Ваша заявка принята. В ближайшее время наш специалист свяжется с вами и ответит на все вопросы.
А пока вы можете ознакомиться с сайтом Колледжи.рф поближе`;

// const cityStore = useCityIdStore();
</script>
