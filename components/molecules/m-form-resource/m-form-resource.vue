<template>
  <div class="m-form-resource">
    <a
      v-for="(link, index) in links"
      :key="index"
      class="m-form-resource__link"
      :href="link.href"
      v-show="isVisible(link.alt)"
      @click.prevent="handleIconClick(link.alt)"
    >
      <img :src="link.icon" loading="lazy" :alt="link.alt" />
    </a>
  </div>
</template>

<script setup>
const emit = defineEmits(['showAuthPhone', 'showAuthEmail']);
const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
});

const isPhoneVisible = ref(true);
const isEmailVisible = ref(false);

const isVisible = (alt) => {
  if (alt === 'Phone') return isPhoneVisible.value;
  if (alt === 'Email') return isEmailVisible.value;
  return true;
};

const handleIconClick = (alt) => {
  if (alt === 'Phone') {
    isPhoneVisible.value = false;
    isEmailVisible.value = true;
    emit('showAuthPhone');
  } else if (alt === 'Email') {
    isPhoneVisible.value = true;
    isEmailVisible.value = false;
    emit('showAuthEmail');
  }
};
</script>

<style lang="scss">
@import './m-form-resource.scss';
</style>
