<template>
  <div class="s-ask">
    <h3 class="title-h3">{{ title }}</h3>
    <form action="" class="s-ask__content">
      <a-select v-if="themes.length > 0" placeholder="Выбрать" :options="themes" hint="Тема вопроса" />
      <div class="s-ask__textarea f-text-s">
        <textarea ref="textarea" :placeholder="placeholder" maxlength="1000" @input="enterText" />
        <img src="/icons/icon-size.svg" alt="" />
      </div>

      <span class="s-ask__s-count f-text-xxs gray">{{ sCount }} / 1000</span>
      <a-button :label="btnText" color="orange" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: { type: String, default: '' },
  btnText: { type: String, default: 'Отправить вопрос' },
  themes: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
});

const sCount = ref(0);

const textarea = ref(null);

const enterText = () => {
  sCount.value = textarea.value.value.length;
};
</script>

<style>
@import './s-ask.scss';
</style>
