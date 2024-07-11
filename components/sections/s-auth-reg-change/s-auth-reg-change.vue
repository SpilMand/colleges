<template>
  <section class="s-auth">
    <m-popup width="29.625rem" class="s-auth__popup" @close="emit('close')">
      <form class="s-form" @submit.prevent="onSubmit">
        <div class="s-form__wrapper">
          <div class="s-form__content">
            <h2 class="s-form__title f-text-xxxl">Укажите новую почту</h2>
            <div class="s-form__items t-left">
              <div class="s-form__item">
                <input
                  v-model="email"
                  v-bind="emailAttrs"
                  type="text"
                  placeholder="E-mail"
                  class="s-form__input f-text-m"
                  :class="{ invalid: errors.email, valid: eValid.valid }"
                  @blur="eBlur"
                />
                <span v-if="errors.email" class="f-text-xs red mbt2">{{ errors.email }}</span>
              </div>
              <div v-if="errorMessage" class="s-form__item">
                <span class="f-text-xs red mbt2"> {{ errorMessage }} </span>
              </div>
              <div class="s-form__item">
                <a-button
                  type="submit"
                  label="Сменить почту"
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
              <p class="s-form__checkbox-label f-text-xs t-left" v-html="label"></p>
            </label>
          </div>
        </div>
      </form>
    </m-popup>
  </section>
</template>
<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '~/store/useAuthStore';

const authStore = useAuthStore();
const errorMessage = ref('');
const checked = ref(true);
const emit = defineEmits(['close', 'openConfirm', 'mailTransfer']);
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().required('Введите E-mail').email('Неверный E-mail'),
  }),
});

const [email, emailAttrs] = defineField('email');
const { meta: eValid, handleChange: eBlur } = useField('email');

const onSubmit = handleSubmit(async (values) => {
  try {
    const formattedValues = {
      email: values.email,
      return_url: '?auth=login',
    };
    console.log('formattedValues', formattedValues);
    await authStore.change(formattedValues);
    emit('openConfirm');
    emit('mailTransfer', values.email);
  } catch (error) {
    errorMessage.value = error.message;
  }
});

const label = ref(
  `Нажимая на кнопку вы принимаете
<a href="/" target="_blank" class="s-form__politics">Пользовательское соглашение</a>
и <a href="/" target="_blank" class="s-form__politics">Политики конфиденциальности</a>
и даёте согласие на обработку персональных данных.`,
);
</script>

<style lang="scss">
@import '../s-auth/s-auth.scss';
</style>
