<template>
  <NuxtLink :to="`/profession/${professions.id}`">
    <div v-if="info.attributes" class="m-colleges-profession-card">
      <div class="m-colleges-profession-card__recomendation">
        <span v-if="info.attributes.is_perspective">Перспективная</span>
      </div>
      <h4 class="m-colleges-profession-card__title">{{ info.attributes.name }}</h4>
      <ul class="m-colleges-profession-card__info f-text-xs f-font-700">
        <li>
          <span>Колледжей</span>
          <span class="f-text-s">{{ info.attributes.calc_data.count_colleges }}</span>
        </li>
      </ul>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  info: { type: Object, default: () => ({}) },
  professions: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style>
@import './m-colleges-profession-card.scss';
</style>
