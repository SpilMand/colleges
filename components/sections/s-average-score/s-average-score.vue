<template>
  <section v-if="monitorings[3]" class="s-average-score section-m">
    <h3 class="title-h3">Средний балл аттестатов поступивших на очное на 2023/24</h3>
    <div class="s-average-score__blocks">
      <div class="s-average-score__block">
        <h4 v-if="monitorings[3].attributes.value != 0" class="title-h4">{{ monitorings[3].attributes.value }}</h4>
        <h4 v-else class="title-h4">−</h4>
        <p class="f-text-m">Средний балл аттестата, принятых по очной форме обучения</p>
      </div>
      <div class="s-average-score__block">
        <h4 v-if="monitorings[4].attributes.value != 0" class="title-h4">{{ monitorings[4].attributes.value }}</h4>
        <h4 v-else class="title-h4">−</h4>
        <p class="f-text-m">Средний балл аттестата, принятых по очной форме обучения на бюджет</p>
      </div>
      <div class="s-average-score__block">
        <h4 v-if="monitorings[5].attributes.value != 0" class="title-h4">{{ monitorings[5].attributes.value }}</h4>
        <h4 v-else class="title-h4">−</h4>
        <p class="f-text-m">Средний балл аттестата, принятых по очной форме обучения, платно</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  monitorings: { type: Object, default: () => ({}) },
});
</script>

<style>
@import './s-average-score.scss';
</style>
