<template>
  <div class="m-popup" :class="classes">
    <div class="m-popup__backdrop" @click="closePopup" @keydown.esc="closePopup" />
    <div class="m-popup__container" :class="{ map: props.type == 'map' }" :style="`max-width: ${width}`">
      <div class="m-popup__close" @click="closePopup" @keydown.esc="closePopup">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 7.99988C23.75 7.74992 23.4109 7.6095 23.0573 7.6095C22.7038 7.6095 22.3647 7.74992 22.1147 7.99988L16 14.1145L9.88533 7.99988C9.6353 7.74992 9.29622 7.6095 8.94267 7.6095C8.58912 7.6095 8.25004 7.74992 8 7.99988C7.75004 8.24992 7.60962 8.58899 7.60962 8.94255C7.60962 9.2961 7.75004 9.63518 8 9.88521L14.1147 15.9999L8 22.1145C7.75004 22.3646 7.60962 22.7037 7.60962 23.0572C7.60962 23.4108 7.75004 23.7498 8 23.9999C8.25004 24.2498 8.58912 24.3903 8.94267 24.3903C9.29622 24.3903 9.6353 24.2498 9.88533 23.9999L16 17.8852L22.1147 23.9999C22.3647 24.2498 22.7038 24.3903 23.0573 24.3903C23.4109 24.3903 23.75 24.2498 24 23.9999C24.25 23.7498 24.3904 23.4108 24.3904 23.0572C24.3904 22.7037 24.25 22.3646 24 22.1145L17.8853 15.9999L24 9.88521C24.25 9.63518 24.3904 9.2961 24.3904 8.94255C24.3904 8.58899 24.25 8.24992 24 7.99988Z"
            fill="#343434"
          />
        </svg>
      </div>
      <div class="m-popup__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    validator: (value) => ['iframe', 'content', 'map'].indexOf(value) !== -1,
    default: 'content',
  },
  link: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
  fullscreen: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const emit = defineEmits(['close']);

const closePopup = () => emit('close');

const classes = computed(() => ({
  [`m-popup--iframe`]: props.link.length,
  [`m-popup--fullscreen`]: props.fullscreen,
  ['visible']: props.visible,
}));
</script>

<style lang="scss">
@import './m-popup.scss';
</style>
