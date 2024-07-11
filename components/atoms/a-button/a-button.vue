<template>
  <button
    class="a-button"
    :type="typeBtn"
    :class="classes"
    :disabled="disabled"
    role="button"
    :area-label="label"
    @click="isOpen = !isOpen"
  >
    <span :class="`${textSize} f-font-${textWeight}`" class="a-button__label">{{ label }}</span>
    <!-- <img v-if="img" :src="img" class="a-button__arrow" :class="isOpen ? 'active' : ''" /> -->
    <div
      v-if="img"
      class="a-button__img"
      :class="{'active': isOpen && needRot}"
      v-html="img"
    />
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },
  needRot: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  typeBtn: {
    type: String,
    default: 'button',
  },
  size: {
    type: String,
    validator(value) {
      return ['medium', 'small', 'large', 'extra-large'].indexOf(value) !== -1;
    },
    default: 'medium',
  },
  center: {
    type: Boolean,
    default: true,
  },
  textSize: {
    type: String,
    default: '',
  },
  textWeight: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    validator(value) {
      return ['violet-5', 'orange', 'outline', 'outline-orange', 'white'].indexOf(value) !== -1;
    },
    default: 'violet-5',
  },
});

const isOpen = ref(false);

const classes = computed(() => ({
  [`a-button--${props.size}`]: true,
  [`a-button--${props.color}`]: true,
  'a-button--disabled': props.disabled,
  'a-button--center': props.center,
}));
</script>

<style lang="scss">
@import './a-button.scss';
</style>
