<template>
  <div class="m-directions-menu">
    <ul class="m-directions-wrap">
      <li v-for="direction in directions" :key="direction.id" class="m-directions-menu__item f-font-500">
        <NuxtLink
          class="m-directions-menu__link"
          :to="{ path: `/colleges/${direction.slug}`, params: { id: direction.id } }"
          :test-id="`link-m-menu-anchor-directions-${direction.slug}`"
          @click="emit('choosedDirection')"
          >{{ direction.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  directions: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['choosedDirection']);
</script>

<style lang="scss">
@import './m-directions-menu.scss';
</style>
