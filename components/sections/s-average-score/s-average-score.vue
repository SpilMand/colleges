<template>
  <section v-if="monitorings[0]" class="s-average-score section-m">
    <h3 class="title-h3">Средний балл аттестатов поступивших на очное на 2023/24</h3>
    <div class="s-average-score__blocks">
      <div class="s-average-score__block">
        <h4 class="title-h4">{{ parseFloat(data.att).toFixed(0) !== '0' ? data.att : '-' }}</h4>
        <p class="f-text-m">Средний балл аттестата, принятых по очной форме обучения</p>
      </div>
      <div class="s-average-score__block">
        <h4 class="title-h4">{{ parseFloat(data.attF).toFixed(0) !== '0' ? data.attF : '-' }}</h4>
        <p class="f-text-m">Средний балл аттестата, принятых по очной форме обучения на бюджет</p>
      </div>
      <div class="s-average-score__block">
        <h4 class="title-h4">{{ parseFloat(data.attP).toFixed(0) !== '0' ? data.attP : '-' }}</h4>
        <p class="f-text-m">Средний балл аттестата, принятых по очной форме обучения, платно</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  monitorings: { type: Array, default: () => [] },
});

const data = ref({});

watch(
  () => props.monitorings,
  (monitorings) => {
    data.value = monitorings.reduce((acc, item) => {
      const { label, value } = item.attributes;
      const numWithoutComma = value.replace(',', '.');
      const numWithTwoDecimalPlaces = parseFloat(numWithoutComma).toFixed(2);

      acc[label] = numWithTwoDecimalPlaces.replace('.', ',');

      return acc;
    }, {});
  },
  { deep: true, immediate: true },
);
</script>

<style>
@import './s-average-score.scss';
</style>
