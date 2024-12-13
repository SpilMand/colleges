<template>
  <div class="m-search-item">
    <div class="m-search-item-title f-text-xs gray">{{ title }}</div>
    <ul class="m-search-item-list">
      <li v-for="(item, index) in displayedItems" :key="index" class="f-text-m">
        <nuxt-link :to="item.name + '/' + item.id">{{ item.title }}</nuxt-link>
      </li>
    </ul>
    <div
      v-if="showAllItemsVisible && !showAllItems"
      class="m-search-item-more f-font-700 f-link f-text-s"
      @click="toggleShowAllItems"
    >
      Посмотреть все
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Object,
    default: () => ({}),
  },
});

const showAllItems = ref(false);

const toggleShowAllItems = () => {
  showAllItems.value = !showAllItems.value;
};

const displayedItems = computed(() => {
  if (showAllItems.value) {
    return Object.values(props.items);
  } else {
    return Object.values(props.items).slice(0, 3);
  }
});

const showAllItemsVisible = computed(() => {
  return Object.values(props.items).length > 4;
});
</script>
<style lang="scss">
@import './m-search-item.scss';
</style>
