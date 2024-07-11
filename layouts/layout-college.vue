<template>
  <s-header />
  <s-college-head :info="info.data" :included="info.included" :collegeId="route.params.id" />
  <main class="layout-college">
    <div class="container">
      <div class="layout-college__inner" :class="{ grid: (helpNeed && width >= 1500) || (isQuestion && width > 980) }">
        <div class="layout-college__content">
          <NuxtPage :collegeId="route.params.id" :info="info.data" :included="info.included" @blocksNeed="blocksNeed" @isQuestionSet="isQuestionSet" />
        </div>
        <div v-if="helpNeed" class="layout-college__right" :class="{ absolute: width < 1500 && !isQuestion }">
          <s-feedback :isMobile="false" :isQuestion="isQuestion" />
        </div>
      </div>
      <s-quiz v-if="additionalNeed" class="section-l" />
      <s-professions v-if="additionalNeed" :professions="professions" />
      <s-form
        v-if="formNeed"
        class="layout-college__form section-l"
        subtitle="Оставь заявку, наши менеджеры свяжутся с тобой,
          и помогут в поиске правильного учебного заведения!"
        title="Нужна помощь в выборе колледжа?"
        checkboxLabel="Я согласен на обработку своих персональных данных и получение информационных рассылок,
        а также принимаю условия
        <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
      />
    </div>
  </main>
  <s-footer />
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
import getCollege from '~/api/colleges/getCollege';
import getProfessions from '~/api/professions/getProfessions';

const route = useRoute();

const info = ref({});

const professions = ref();

onMounted(() => {
  setTimeout(async () => {
    info.value = await getCollege(route.params.id, {
      include: 'city,monitorings,forms,galleries,admissionOffices',
    });
  });
});

const { width } = useWindowSize();
const helpNeed = ref(true);
const formNeed = ref(true);
const additionalNeed = ref(false);
const isQuestion = ref(false);

const blocksNeed = (help, form, additional) => {
  helpNeed.value = help;
  formNeed.value = form;
  additionalNeed.value = additional;
};
const isQuestionSet = (value) => {
  isQuestion.value = value;
};
</script>

<style lang="scss">
.layout-college {
  margin-top: var(--a-margin-x12);
  &__inner {
    position: relative;
    // @media (min-width: 1500px) {
    width: 100%;
    &.grid {
      display: grid;
      column-gap: 2%;
      grid-template-columns: 75% 23%;
    }
    .s-feedback {
      .a-rklm {
        display: none;
        @media (min-width: 1500px) {
          display: flex;
        }
      }
    }
    // }
  }
  &__main {
    max-width: 100%;
  }
  &__right {
    .s-feedback {
      @media (max-width: 1499px) {
        margin: 0;
      }
    }
    @media (max-width: 980px) {
      display: none;
    }
    // @media (max-width: 1499px) {
    &.absolute {
      position: absolute;
      top: 0;
      right: 0;
      width: to-rem(311);
    }
    // }
  }
}
</style>
