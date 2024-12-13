<template>
  <nav class="m-menu-footer">
    <ul class="m-menu-footer__list">
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink
          class="f-text-s f-font-700"
          :to="item.href"
          :test-id="`link-m-menu-footer-${item.href.replace(/\W|_/g, '')}`"
        >
          {{ item.text }}</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss">
@import './m-menu-footer.scss';
</style>
