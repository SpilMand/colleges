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
          <div v-if="type != 'mail'" class="s-form__item">
            <input
              v-model="fieldsData.name"
              type="text"
              placeholder="Ваше имя"
              class="s-form__input"
              :class="{ invalid: nError }"
              :test-id="`input-${sectionId}-name`"
              @blur="nBlur"
              @input="checkedValidateError"
            />
          </div>
          <div v-if="type != 'mail'" class="s-form__item">
            <input
              v-model="fieldsData.phone"
              v-mask="'+7 (###) ###-##-##'"
              type="text"
              placeholder="Ваш телефон"
              class="s-form__input"
              :class="{ invalid: pError }"
              :test-id="`input-${sectionId}-phone`"
              @blur="pBlur"
              @input="checkedValidateError"
            />
          </div>
          <div v-else class="s-form__item">
            <input
              v-model="fieldsData.mail"
              type="text"
              placeholder="Ваш email"
              class="s-form__input"
              :class="{ invalid: eError }"
              :test-id="`input-${sectionId}-email`"
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
              :test-id="`btn-${sectionId}-submit`"
            />
          </div>
        </div>
        <label v-if="!isSent" class="s-form__more">
          <div class="s-form__checkbox">
            <input v-model="checked" type="checkbox" :test-id="`input-${sectionId}-checkbox`" />
            <span :test-id="`input-${sectionId}-checkbox-span`"></span>
          </div>
          <p class="s-form__checkbox-label f-text-xs" v-html="checkboxLabel" />
        </label>
        <div v-if="type == 'mail'" class="s-form__links">
          <NuxtLink
            v-for="(link, index) in socialLinks"
            :key="index"
            :to="link.url"
            class="s-form__link"
            target="_blank"
            :test-id="`link-${sectionId}-social`"
          >
            <img :src="link.icon" alt="" />
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
import { mask } from 'vue-the-mask';

const { $lander } = useNuxtApp();

const route = useRoute();

const props = defineProps({
  socialLinks: {
    type: Array,
    required: true,
  },
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
    default: 'Оставь заявку, наши менеджеры свяжутся с тобой, и помогут в поиске правильного учебного заведения!',
  },
  checkboxLabel: {
    type: String,
    default:
      'Я согласен на получение информационных рассылок, а также принимаю <br>' +
      "условия <a href='/policy' target='_blank'" +
      "class='s-form__politics'>Политики конфиденциальности сайта Колледжи.рф</a>",
  },
  answers: {
    type: Array,
    default: () => [],
  },
  sectionId: {
    type: String,
    default: '',
  },
});

const isSent = ref(false);
const submitTitle = 'Спасибо за Вашу подписку!';
const submitSubtitle = 'Будем держать Вас в курсе самых свежих и полезных статей и новостей';
const isSubmitting = ref(false);

const isValidate = ref(false);

let fieldsData = reactive({
  name: '',
  phone: '',
  mail: '',
});

let errors = reactive({
  name: true,
  phone: true,
  mail: true,
});

const checked = ref(true);

let validFlag = ref(false);

const checkedValidateError = () => {
  errors.name = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(fieldsData.name) && fieldsData.name !== '';
  errors.mail = !$lander.valid([{ value: fieldsData.mail, type: 'mail' }]);
  errors.phone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i.test(
    fieldsData.phone,
  );
  validFlag.value = errors.name && errors.phone && errors.mail;

  return validFlag.value;
};

const sendForm = () => {
  if (validFlag.value) {
    $lander.storage.save('popupform', fieldsData);

    // if (props.ym) {
    //   $lander.storage.save('yMetrika', props.ym);
    // }

    $lander
      .send(
        fieldsData,
        {},
        route.name === 'edu-platform-slug' || route.name === 'edu-platform' ? route.path : undefined,
      )
      .then(() => {
        // emit('onSend');
      });
    {
    }
  } else {
    isValidate.value = true;
  }

  if (props.type == 'stretch' || props.type == 'mail') {
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

<style lang="scss">
@import './s-form.scss';
</style>
