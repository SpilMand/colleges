<template>
  <div class="a-breadcrumbs f-text-xs">
    <ul class="a-breadcrumbs__list">
      <li class="a-breadcrumbs__item">
        <NuxtLink to="/" class="a-breadcrumbs__link" test-id="link-a-breacrumbs-main">Главная</NuxtLink>
      </li>
      <li v-for="(item, index) in items" :key="index" class="a-breadcrumbs__item">
        <NuxtLink
          :to="item.link"
          class="a-breadcrumbs__link"
          :test-id="`link-a-breacrumbs-${item.link === '' ? item.link.replace(/\W|_/g, '') : ''}`"
          @click="clickItem(index)"
          >{{ item.label }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
});
const emits = defineEmits(['action']);

const clickItem = (index) => {
  if (index != props.items.length - 1) {
    emits('action', index);
  }
};
</script>

<style>
@import './a-breadcrumbs.scss';
</style>
