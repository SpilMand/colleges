<template>
  <div class="s-ask">
    <h3 class="title-h3">{{ title }}</h3>
    <div class="s-ask__content">
      <form @submit.prevent="submitQuestion">
        <a-select
          v-if="themes.length > 0"
          placeholder="Выбрать"
          :options="themes"
          hint="Тема вопроса"
          :modelValue="questionTheme"
          @update:modelValue="updateQuestionTheme"
        />
        <div class="s-ask__textarea f-text-s">
          <textarea
            ref="textarea"
            v-model.trim="questionMessage"
            :placeholder="placeholder"
            maxlength="1000"
            @input="enterText"
          />
          <img src="/icons/icon-size.svg" alt="" />
        </div>

        <span class="s-ask__s-count f-text-xxs gray">{{ sCount }} / 1000</span>
        <a-button type="submit" :label="btnText" color="orange" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/useAuthStore';
import createQuestion from '~/api/questions/createQuestion';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  title: { type: String, default: '' },
  btnText: { type: String, default: 'Отправить вопрос' },
  themes: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
});

const sCount = ref(0);
const questionMessage = ref('');
const questionTheme = ref('');
const textarea = ref(null);

const updateQuestionTheme = (theme) => {
  questionTheme.value = theme;
};

const enterText = () => {
  sCount.value = textarea.value.value.length;
};

const submitQuestion = () => {
  if (!sCount.value) {
    return;
  }

  if (!authStore.isAuthenticated) {
    authStore.setPopupAuthShow(true);

    return;
  }

  const themeId = (props.themes.find(({ attributes }) => attributes.name === questionTheme.value) || {}).id;
  const collegeId = route.params.id;

  createQuestion({
    data: {
      type: 'questions',
      attributes: {
        sort: 0,
        question: questionMessage.value,
        published: true,
      },
      relationships: {
        theme: {
          data: {
            id: themeId,
            type: 'question-themes',
          },
        },
        college: {
          data: {
            id: collegeId,
            type: 'colleges',
          },
        },
      },
    },
  })
    .then(() => router.go(0))
    .catch((err) => {
      throw err;
    });
};
</script>

<style>
@import './s-ask.scss';
</style>
