<template>
  <div class="m-main-list">
    <NuxtLink
      v-for="item in list"
      :key="item.text"
      class="f-font-700 f-text-l"
      :to="
        item.link +
        (item.link.includes('#directions') ? '' : selectedCityOptionSlug ? '/' + selectedCityOptionSlug : '')
      "
      :class="['m-main-item', 'm-main-item--' + item.icon, { scroll: item.name === 'directions' }]"
      :test-id="`link-${sectionId}-item-${item.link.replace(/\W|_/g, '')}`"
    >
      <span class="">{{ item.count }}</span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useCityIdStore } from '~/store/city';

const cityStore = useCityIdStore();
const selectedCityOptionSlug = computed(() => cityStore.$state.selectedOptionSlug);
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  sectionId: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
@import './m-main-list.scss';
</style>
