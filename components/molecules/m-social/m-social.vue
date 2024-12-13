<template>
  <div class="m-social s-footer__social">
    <a
      v-for="(item, index) in items"
      :key="index"
      :class="['m-social__item', 'm-social__' + item.icon]"
      target="_blank"
      :href="item.href"
      :test-id="`link-${sectionId}-social-${item.icon}`"
    >
    </a>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  sectionId: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
@import './m-social.scss';
</style>
