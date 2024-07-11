<template>
  <section class="s-auth s-auth-sms">
    <m-popup width="26.75rem" class="s-auth__popup">
      <form class="s-form" @submit.prevent="checkPinCode">
        <div class="s-form__wrapper">
          <div class="s-form__content">
            <h2 class="s-form__title f-text-xxxl">Введите код из SMS</h2>
            <div class="s-form__subtitle f-text-m">
              Введите код из смс, отправленный на номер <br />
              +7 (977) 777-77-77
              <NuxtLink class="f-link" to="/auth">Изменить</NuxtLink>
            </div>
            <div class="s-form__items">
              <input
                ref="pinInput1"
                v-model="pin1"
                class="s-form__input"
                type="text"
                maxlength="1"
                @input="moveToNextField(1, $event)"
                @paste="handlePaste(1, $event)"
                @keypress="allowOnlyDigits"
              />
              <input
                ref="pinInput2"
                v-model="pin2"
                class="s-form__input"
                type="text"
                maxlength="1"
                @input="moveToNextField(2, $event)"
                @paste="handlePaste(2, $event)"
                @keypress="allowOnlyDigits"
              />
              <input
                ref="pinInput3"
                v-model="pin3"
                class="s-form__input"
                type="text"
                maxlength="1"
                @input="moveToNextField(3, $event)"
                @paste="handlePaste(3, $event)"
                @keypress="allowOnlyDigits"
              />
              <input
                ref="pinInput4"
                v-model="pin4"
                class="s-form__input"
                type="text"
                maxlength="1"
                @input="moveToNextField(4, $event)"
                @paste="handlePaste(4, $event)"
                @keypress="allowOnlyDigits"
              />
              <input
                ref="pinInput5"
                v-model="pin5"
                class="s-form__input"
                type="text"
                maxlength="1"
                @input="moveToNextField(5, $event)"
                @paste="handlePaste(5, $event)"
                @keypress="allowOnlyDigits"
              />
            </div>
            <a-button
              type="submit"
              label="Запросить код повторно через 20 секунд"
              color="orange"
              size="large"
              textSize="f-text-m"
              class="s-form__button"
            />
          </div>
        </div>
      </form>
    </m-popup>
  </section>
</template>
<script setup>
import { ref } from 'vue';

const pin1 = ref('');
const pin2 = ref('');
const pin3 = ref('');
const pin4 = ref('');
const pin5 = ref('');

const pinInput1 = ref(null);
const pinInput2 = ref(null);
const pinInput3 = ref(null);
const pinInput4 = ref(null);
const pinInput5 = ref(null);

const moveToNextField = (fieldNumber, event) => {
  const nextField = fieldNumber + 1;
  const inputValue = event.target.value.trim();

  if (nextField <= 5 && inputValue !== '') {
    const nextFieldInput = getField(nextField);
    if (nextFieldInput && nextFieldInput.value.length === 0) {
      nextFieldInput.focus();
    }
  }

  if (inputValue == '') {
    const prevField = fieldNumber - 1;
    if (prevField >= 1) {
      getField(prevField).focus();
    }
  }

  const allFieldsFilled = [pin1, pin2, pin3, pin4, pin5].every((field) => field.value.trim() !== '');
  if (allFieldsFilled) {
    checkPinCode();
  }
};

const handlePaste = (fieldNumber, event) => {
  event.preventDefault();

  const pastedText = event.clipboardData.getData('text');

  if (pastedText && /^\d+$/.test(pastedText)) {
    const characters = pastedText.split('');
    characters.forEach((char, index) => {
      const currentField = fieldNumber + index;
      if (currentField <= 5) {
        const nextFieldInput = getField(currentField);
        if (nextFieldInput) {
          nextFieldInput.value = char;
        }
      }
    });
  }
};

const getField = (fieldNumber) => {
  switch (fieldNumber) {
    case 1:
      return pinInput1.value;
    case 2:
      return pinInput2.value;
    case 3:
      return pinInput3.value;
    case 4:
      return pinInput4.value;
    case 5:
      return pinInput5.value;
    default:
      return null;
  }
};

const checkPinCode = () => {
  const fullPin = pin1.value + pin2.value + pin3.value + pin4.value + pin5.value;
  if (fullPin.length === 5) {
    console.log('Пин-код введен: ' + fullPin);
  } else {
    console.log('Пожалуйста, введите все 5 цифр пин-кода.');
  }
};

const allowOnlyDigits = (event) => {
  const keyCode = event.keyCode;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
    event.preventDefault();
  }
};
</script>
<style lang="scss">
@import '../s-auth/s-auth.scss';
</style>
