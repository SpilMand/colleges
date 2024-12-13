<template>
  <div class="a-breadcrumbs f-text-xs">
    <ul class="a-breadcrumbs__list">
      <li class="a-breadcrumbs__item">
        <NuxtLink to="/" class="a-breadcrumbs__link">Главная</NuxtLink>
      </li>
      <li v-for="(item, index) in items" :key="index" class="a-breadcrumbs__item">
        <NuxtLink :to="item.link" class="a-breadcrumbs__link" @click="clickItem(item)">{{ item.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
});

const emits = defineEmits(['action']);

const clickItem = (item) => {
  emits('action', item);
};
</script>

<style>
@import 'a-breadcrumbs-new.scss';
</style>
