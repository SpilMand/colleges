<template>
  <form class="s-form" :class="classes" @submit.prevent="onSubmit">
    <div class="s-form__wrapper">
      <div class="s-form__content">
        <h2 v-if="title" class="s-form__title violet-100 title-h2">
          {{ title }}
        </h2>
        <div v-if="subtitle" class="s-form__subtitle subtitle f-font-700" v-html="subtitle"></div>
        <div class="s-form__items">
          <div v-if="type != 'mail'" class="s-form__item">
            <input
              v-model="name"
              type="text"
              placeholder="Ваше имя"
              class="s-form__input"
              :class="{ invalid: nError }"
              @blur="nBlur"
            />
          </div>
          <div v-if="type != 'mail'" class="s-form__item">
            <input
              v-model="phone"
              v-mask="'+7 (###) ###-##-##'"
              type="text"
              placeholder="Ваш телефон"
              class="s-form__input"
              :class="{ invalid: pError }"
              @blur="pBlur"
            />
          </div>
          <div v-else class="s-form__item">
            <input
              v-model="email"
              type="text"
              placeholder="Ваш email"
              class="s-form__input"
              :class="{ invalid: eError }"
              @blur="eBlur"
            />
          </div>
          <div class="s-form__item">
            <a-button
              type="submit"
              label="Отправить заявку"
              color="orange"
              size="large"
              textSize="f-text-m"
              class="s-form__button"
              :disabled="isSubmitting || !checked"
            />
          </div>
        </div>
        <label class="s-form__more">
          <div class="s-form__checkbox">
            <input v-model="checked" type="checkbox" />
            <span></span>
          </div>
          <p class="s-form__checkbox-label f-text-xs" v-html="checkboxLabel" />
        </label>
        <div v-if="type == 'mail'" class="s-form__links">
          <NuxtLink to="/" class="s-form__link">
            <img src="/icons/vk.svg" alt="" />
          </NuxtLink>
          <NuxtLink to="/" class="s-form__link">
            <img src="/icons/telegram.svg" alt="" />
          </NuxtLink>
          <NuxtLink to="/" class="s-form__link">
            <img src="/icons/dzen.svg" alt="" />
          </NuxtLink>
        </div>
      </div>
      <div v-if="type == 'mail'" class="s-form__img">
        <img src="/img/form/form-man.png" alt="" />
      </div>
    </div>
  </form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { mask } from 'vue-the-mask';
const checked = ref(true);

const props = defineProps({
  type: {
    type: String,
    validator(value) {
      return value === '' || ['quiz', 'mail', 'stretch'].indexOf(value) !== -1;
    },
    default: '',
  },
  title: {
    type: String,
    default: 'Нужна помощь в выборе колледжа?',
  },
  subtitle: {
    type: String,
    default: 'Оставь заявку, наши менеджеры свяжутся с тобой, и помогут в поиске правильного учебного заведения!',
  },
  checkboxLabel: {
    type: String,
    default:
      'Я согласен на получение информационных рассылок, а также принимаю <br>' +
      "условия <a href='/' target='_blank' class='s-form__politics'>Политики конфиденциальности сайта Колледжи.рф</a>",
  },
  answers: {
    type: Array,
    default: () => [],
  },
});
const { handleSubmit, isSubmitting } = useForm();
const { value: name, errorMessage: nError, handleChange: nBlur } = useField('name', yup.string().required());
const { value: phone, errorMessage: pError, handleChange: pBlur } = useField('phone', yup.string().required());
const { value: email, errorMessage: eError, handleChange: eBlur } = useField('email', yup.string().required().email());

const onSubmit = handleSubmit((values) => {
  const comment = props.answers.length > 0 ? Object.values(props.answers).join(', ') : '';

  const formData = comment ? { ...values, comment } : { ...values };
});

const classes = computed(() => ({
  [`s-form--${props.type}`]: true,
}));
</script>

<script>
export default {
  directives: { mask },
};
</script>

<style lang="scss">
@import './s-form.scss';
</style>
