<template>
  <div class="m-foru-faq" :class="{ active: !showFaq }" @click="showFaq = !showFaq">
    <h4 class="title-h4 m-foru-faq__title">{{ faq.title }} <span v-html="arrow"></span></h4>
    <p v-if="!showFaq" class="f-text-xl" v-html="faq.text"></p>
  </div>
</template>

<script setup>
defineProps({
  faq: {
    type: Object,
    default: () => ({}),
  },
});
const showFaq = ref(true);
const arrow = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.40999 0H12.59C12.7878 0.000829231 12.9809 0.0602841 13.1448 0.170847C13.3088 0.28141 13.4363 0.438116 13.5113 0.621148C13.5862 0.804181 13.6052 1.00532 13.5658 1.19913C13.5264 1.39295 13.4304 1.57073 13.29 1.71L7.70999 7.29C7.61703 7.38373 7.50643 7.45812 7.38457 7.50889C7.26271 7.55966 7.132 7.5858 6.99999 7.5858C6.86798 7.5858 6.73727 7.55966 6.61542 7.50889C6.49356 7.45812 6.38296 7.38373 6.28999 7.29L0.709992 1.71C0.569571 1.57073 0.4736 1.39295 0.434214 1.19913C0.394829 1.00532 0.413798 0.804181 0.488724 0.621148C0.56365 0.438116 0.691166 0.28141 0.85515 0.170847C1.01913 0.0602841 1.21222 0.000829231 1.40999 0Z" fill="#343434"/>
</svg>
`;
</script>

<style lang="scss">
@import './m-foru-faq.scss';
</style>
