<template>
  <section class="s-auth">
    <m-popup width="35rem" class="s-auth__popup" @close="emit('close')">
      <form class="s-form" @submit.prevent="onSubmit">
        <div class="s-form__wrapper">
          <div class="s-form__content">
            <h2 class="s-form__title f-text-xxxl mbx6">{{ title }}</h2>
            <div class="s-form__subtitle f-text-m">{{ subtitle }}</div>
            <div class="s-form__items t-left">
              <div class="s-form__item">
                <input
                  v-model="email"
                  v-bind="emailAttrs"
                  type="text"
                  placeholder="E-mail"
                  class="s-form__input f-text-m"
                  :class="{ invalid: errors.email, valid: eValid.valid }"
                  test-id="input-s-auth-reg-recovery-email"
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
                  label="Сбросить пароль"
                  color="orange"
                  size="large"
                  textSize="f-text-m"
                  class="s-form__button"
                  test-id="btn-s-auth-reg-recovery-submit"
                  :disabled="isSubmitting || errors.email || !value.email"
                />
              </div>
              <NuxtLink class="f-text-m mbt6 f-link t-center" to="/" @click="emit('close')"
                >Вернуться на главный экран</NuxtLink
              >
            </div>
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
import { useRuntimeConfig } from '#imports';
const {
  values: value,
  errors,
  handleSubmit,
  isSubmitting,
  defineField,
} = useForm({
  validationSchema: yup.object({
    email: yup.string().required('Введите E-mail').email('Неверный E-mail'),
  }),
});

const config = useRuntimeConfig();
const authStore = useAuthStore();
const emit = defineEmits(['openExamination', 'close', 'mailTransfer']);
const [email, emailAttrs] = defineField('email');
const { meta: eValid, handleChange: eBlur } = useField('email');
const errorMessage = ref('');
const onSubmit = handleSubmit(async (values) => {
  try {
    const formattedValues = {
      email: values.email,
      return_url: config.public.siteURL,
    };
    await authStore.forgotPassword(formattedValues);
    emit('openExamination');
    emit('mailTransfer', values.email);
  } catch (error) {
    errorMessage.value = error.message;
  }
});

const title = computed(() => {
  return `Восстановление пароля`;
});

const subtitle = computed(() => {
  return `Введите адрес электронной почты, связанный с вашим аккаунтом, и мы вышлем вам ссылку для изменения пароля`;
});
</script>
<style lang="scss">
@import '../s-auth/s-auth.scss';
</style>
