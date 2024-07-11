<template>
  <section class="s-auth">
    <m-popup width="35rem" class="s-auth__popup" @close="emit('close')">
      <form class="s-form" @submit.prevent="onSubmit">
        <div class="s-form__wrapper">
          <div class="s-form__content">
            <h2 class="s-form__title f-text-xxxl mbx6">{{ title }}</h2>
            <div class="s-form__subtitle f-text-m">{{ subtitle }}</div>
            <div class="f-text-m f-font-700 mbx2">{{ email }}</div>
            <div class="s-form__items t-left mbt8">
              <div class="s-form__item">
                <a-button
                  type="submit"
                  :label="buttonLabel"
                  size="large"
                  textSize="f-text-m"
                  class="s-form__button"
                  :disabled="buttonDisabled"
                />
              </div>
              <div class="f-text-xs gray t-center">
                {{ text }}
                <a class="f-link" href="mailto:info@">info@</a>
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
import { useAuthStore } from '~/store/useAuthStore';
defineProps({
  email: {
    type: String,
    default: '',
  },
});
const authStore = useAuthStore();
const onSubmit = async () => {
  try {
    const formattedValues = {
      return_url: '?auth=login',
    };
    await authStore.resend(formattedValues);
  } catch (error) {
    console.log('error', error);
  }
  resetTimer();
};

const emit = defineEmits(['openAuth', 'close']);

const change = () => {
  emit('openRegChange');
};

const countdown = ref(240);
const buttonDisabled = ref(true);
let countdownTimer = null;

const startTimer = () => {
  buttonDisabled.value = true;
  countdown.value = 240;
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownTimer);
      buttonDisabled.value = false;
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(countdownTimer);
  startTimer();
};

startTimer();

const formattedCountdown = computed(() => {
  const minutes = Math.floor(countdown.value / 60);
  const seconds = countdown.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const buttonLabel = computed(() => {
  return buttonDisabled.value ? `Отправить письмо повторно ${formattedCountdown.value}` : 'Отправить письмо';
});

onUnmounted(() => {
  clearInterval(countdownTimer);
});

const title = computed(() => {
  return `Проверьте электронную почту`;
});

const subtitle = computed(() => {
  return `Ссылка для восстановления пароля была отправлена на адрес:`;
});

const text = computed(() => {
  return `Не пришло письмо-подтверждение? Проверьте папку спам или напишите в тех.поддержку на почту`;
});
</script>
<style lang="scss">
@import '../s-auth/s-auth.scss';
</style>
