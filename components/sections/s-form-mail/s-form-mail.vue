<template>
  <form class="s-form" :class="classes" @submit.prevent="sendForm">
    <div class="s-form__wrapper">
      <div class="s-form__content">
        <h2 v-if="title" class="s-form__title violet-100 title-h2">
          {{ !isSent ? title : submitTitle }}
        </h2>
        <div
          v-if="subtitle"
          class="s-form__subtitle subtitle f-font-700"
          v-html="!isSent ? subtitle : submitSubtitle"
        />
        <div v-if="!isSent" class="s-form__items">
          <div class="s-form__item">
            <input
              v-model="fieldsData.mail"
              type="text"
              placeholder="Ваш email"
              class="s-form__input"
              :class="{ invalid: eError }"
              @blur="eBlur"
              @input="checkedValidateError"
            />
          </div>
          <div class="s-form__item">
            <a-button
              typeBtn="submit"
              label="Отправить заявку"
              color="orange"
              size="large"
              textSize="f-text-m"
              class="s-form__button"
              :disabled="isSubmitting || !checked"
            />
          </div>
        </div>
        <label v-if="!isSent" class="s-form__more">
          <div class="s-form__checkbox">
            <input v-model="checked" type="checkbox" />
            <span></span>
          </div>
          <p class="s-form__checkbox-label f-text-xs" v-html="checkboxLabel" />
        </label>
        <div class="s-form__links">
          <m-social :items="socialLinks" />
          <!-- <NuxtLink
            v-for="(link, index) in socialLinks"
            :key="index"
            :to="link.url"
            :class="['s-form__link', 's-form___' + link.icon]"
            target="_blank"
          >
            <img :src="link.icon" alt="" />
          </NuxtLink> -->
        </div>
      </div>
      <div v-if="type === 'mail'" class="s-form__img">
        <img src="/img/form/form-man.png" alt="" />
      </div>
    </div>
  </form>
</template>

<script setup>
import { mask } from 'vue-the-mask';

const { $lander } = useNuxtApp();
const route = useRoute();

const props = defineProps({
  type: {
    type: String,
    validator(value) {
      return value === '' || ['mail'].indexOf(value) !== -1;
    },
    default: 'mail',
  },
  title: {
    type: String,
    default: 'Нужна помощь в выборе колледжа?',
  },
  subtitle: {
    type: String,
    default: 'Оставь заявку, наши менеджеры свяжутся с тобой, и помогут в поиске правильного учебного заведения!',
  },
  checkboxLabel: {
    type: String,
    default:
      'Я согласен на получение информационных рассылок, а также принимаю <br>' +
      "условия <a href='/policy' target='_blank'" +
      "class='s-form__politics'>Политики конфиденциальности сайта Колледжи.рф</a>",
  },
});

const isSent = ref(false);
const submitTitle = 'Спасибо за Вашу подписку!';
const submitSubtitle = 'Будем держать Вас в курсе самых свежих и полезных статей и новостей';
const isSubmitting = ref(false);
const isValidate = ref(false);

let fieldsData = reactive({
  mail: '',
});

let errors = reactive({
  mail: true,
});

const checked = ref(true);
let validFlag = ref(false);

const checkedValidateError = () => {
  errors.mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldsData.mail);
  validFlag.value = errors.mail;

  return validFlag.value;
};

const socialLinks = ref([
  {
    href: 'https://vk.com/kolledzhirf',
    icon: 'vk',
  },
  {
    href: 'https://t.me/kolledzhirf',
    icon: 'telegram',
  },
]);

const sendForm = () => {
  if (validFlag.value) {
    $lander.storage.save('popupform', fieldsData);

    $lander
      .send(
        fieldsData,
        {
          noRedirect: true,
        },
        route.name === 'edu-platform-slug' || route.name === 'edu-platform' ? route.path : undefined,
      )
      .then(() => {
        // emit('onSend');
      });
  } else {
    isValidate.value = true;
  }

  if (props.type === 'mail') {
    isSent.value = true;
  }
};

const classes = computed(() => ({
  [`s-form--${props.type}`]: true,
}));
</script>

<script>
export default {
  directives: { mask },
};
</script>

<style lang="scss" scope>
@import './s-form-mail.scss';

.m-social .m-social__item {
  background-color: var(--color-white);
}
</style>
