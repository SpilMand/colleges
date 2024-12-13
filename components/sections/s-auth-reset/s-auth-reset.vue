<template>
  <section class="s-auth">
    <m-popup width="35rem" class="s-auth__popup" @close="emit('close')">
      <form class="s-form" @submit.prevent="onSubmit">
        <div class="s-form__wrapper">
          <div class="s-form__content">
            <h2 class="s-form__title f-text-xxxl mbx6">{{ title }}</h2>
            <div class="s-form__items t-left">
              <div class="s-form__item s-form__item-password">
                <div class="s-form__item-inner">
                  <input
                    v-model="password"
                    v-bind="passwordAttrs"
                    :type="passwordVisible ? 'text' : 'password'"
                    placeholder="Пароль"
                    class="s-form__input f-text-m"
                    :class="{ invalid: errors.password, valid: pValid.valid }"
                    test-id="input-s-auth-reg-reset-password"
                    @blur="pBlur"
                  />
                  <div
                    v-if="password !== ''"
                    class="s-form__item-icon"
                    @click="togglePasswordVisibility"
                    v-html="currentEyeIcon.value"
                  ></div>
                </div>
                <span v-if="errors.password" class="f-text-xs red mbt2">{{ errors.password }}</span>
              </div>
              <div class="s-form__item s-form__item-password">
                <div class="s-form__item-inner">
                  <input
                    v-model="passwordConfirm"
                    v-bind="passwordConfirmAttrs"
                    :type="passwordConfirmVisible ? 'text' : 'password'"
                    placeholder="Повторите пароль"
                    class="s-form__input f-text-m"
                    :class="{ invalid: errors.passwordConfirm, valid: pcValid.valid }"
                    test-id="input-s-auth-reg-reset-password-confirm"
                    @blur="pcBlur"
                  />
                  <div
                    v-if="passwordConfirm !== ''"
                    class="s-form__item-icon"
                    @click="togglePasswordConfirmVisibility"
                    v-html="currentEyeConfirmIcon.value"
                  ></div>
                </div>
                <span v-if="errors.passwordConfirm" class="f-text-xs red mbt2">{{ errors.passwordConfirm }}</span>
              </div>
              <div class="s-form__item">
                <a-button
                  type="submit"
                  label="Сменить пароль"
                  color="orange"
                  size="large"
                  textSize="f-text-m"
                  class="s-form__button"
                  test-id="btn-s-auth-reg-reset-submit"
                  :disabled="isSubmitting"
                />
              </div>
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
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: yup.object({
    password: yup.string().required('Неверный пароль').min(8, 'Пароль должен содержать не менее 8 символов'),
    passwordConfirm: yup
      .string()
      .required('Пожалуйста, подтвердите пароль')
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  }),
});

const authStore = useAuthStore();
const emit = defineEmits(['openAuth', 'close']);
const router = useRoute();
const [password, passwordAttrs] = defineField('password');
const { meta: pValid, handleChange: pBlur } = useField('password');

const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm');
const { meta: pcValid, handleChange: pcBlur } = useField('passwordConfirm');

const onSubmit = handleSubmit(async (values) => {
  try {
    const formattedValues = {
      email: router.query.email,
      token: router.query.token,
      password: values.password,
      return_url: '?auth=login',
      password_confirmation: values.passwordConfirm,
    };
    await authStore.resetPassword(formattedValues);
    emit('close');
  } catch (error) {
    console.error(error);
  }
});

const title = computed(() => {
  return `Создайте новый пароль`;
});

const passwordVisible = ref(false);
const togglePasswordVisibility = () => (passwordVisible.value = !passwordVisible.value);
const currentEyeIcon = computed(() => (passwordVisible.value ? eyeIcon : eyeCloseIcon));

const passwordConfirmVisible = ref(false);
const togglePasswordConfirmVisibility = () => (passwordConfirmVisible.value = !passwordConfirmVisible.value);
const currentEyeConfirmIcon = computed(() => (passwordConfirmVisible.value ? eyeIcon : eyeCloseIcon));

const eyeCloseIcon = ref(`<svg width="24" height="24" viewBox="0 0 24 24"
fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.8 9.8C19.8 8 16.5 6 12 6C7.5 6 4.2 8 2.2 9.8C1.4 10.4
1 11.4 1 12.4C1 13.4 1.4 14.4 2.2 15C4.2 16.7 7.5 18.8 12 18.8C16.5
18.8 19.8 16.8 21.8 15C22.6 14.4 23 13.4 23 12.4C23 11.4 22.6 10.4
21.8 9.8ZM20.5 13.5C18.8 15 15.9 16.8 12 16.8C8.1 16.8 5.2 15 3.5
13.5C3.2 13.2 3 12.8 3 12.4C3 12 3.2 11.6 3.5 11.3C5.2 9.8 8.1 8
12 8C15.9 8 18.8 9.8 20.5 11.3C20.8 11.5 21 11.9 21 12.4C21 12.8
20.8 13.2 20.5 13.5Z" fill="#343434"/>
<path d="M12.0004 14.7001C13.2707 14.7001 14.3004 13.6704 14.3004
12.4001C14.3004 11.1298 13.2707 10.1001 12.0004 10.1001C10.7302
10.1001 9.70044 11.1298 9.70044 12.4001C9.70044 13.6704
10.7302 14.7001 12.0004 14.7001Z" fill="#343434"/>
</svg>`);

const eyeIcon = ref(`<svg width="24" height="24" viewBox="0 0 24 24"
fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.8005 9.8C19.8005 8.1 16.5005 6 12.0005
6C11.5005 6 11.0005 6 10.7005 6.1C10.1005 6.2 9.70047
6.7 9.80047 7.3C9.90047 7.8 10.4005 8.2 10.9005
8.2C11.2005 8.2 11.6005 8.1 12.0005 8.1C15.9005
8.1 18.8005 9.9 20.5005 11.4C20.8005 11.6 21.0005
12 21.0005 12.5C21.0005 13 20.8005 13.3 20.5005
13.6C19.9005 14.1 19.2005 14.6 18.5005 15C18.0005
15.3 17.9005 15.9 18.1005 16.4C18.3005 16.7 18.6005
16.9 19.0005 16.9C19.2005 16.9 19.3005 16.9 19.5005
16.8C20.3005 16.3 21.1005 15.8 21.8005 15.2C22.6005
14.5 23.0005 13.6 23.0005 12.6C23.0005 11.4
22.6005 10.5 21.8005 9.8Z" fill="#343434"/>
<path d="M4.2 3.3C3.8 2.9 3.2 2.9 2.8 3.3C2.4 3.7
2.4 4.3 2.8 4.7L5.6 7.5C4.2 8.3 3 9.2 2.2 9.8C1.4
10.5 1 11.4 1 12.5C1 13.6 1.4 14.5 2.2 15.1C4.2
16.8 7.5 18.9 12 18.9C13.5 18.9 14.9 18.7 16.3
18.2L19.8 21.7C20 21.9 20.3 22 20.5 22C20.7 22
21 21.9 21.2 21.7C21.6 21.3 21.6 20.7 21.2
20.3L4.2 3.3ZM12 16.8C8.1 16.8 5.2 15 3.5
13.5C3.2 13.3 3 12.9 3 12.5C3 12.1 3.2 11.7
3.5 11.4C4.3 10.7 5.6 9.8 7.2 9.1L9.8 11.7C9.7
11.9 9.7 12.2 9.7 12.5C9.7 13.8 10.7 14.8 12
14.8C12.3 14.8 12.5 14.7 12.8 14.7L14.7
16.6C13.8 16.7 12.9 16.8 12 16.8Z" fill="#343434"/>
</svg>
`);
</script>
<style lang="scss">
@import '../s-auth/s-auth.scss';
</style>
