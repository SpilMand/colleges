<template>
  <section v-if="monitorings[0]" class="s-students-count section-m">
    <h3 class="title-h3">Сколько учится студентов в 2023/24</h3>
    <div class="s-students-count__content">
      <div class="s-students-count__diagram">
        <span>Общее кол-во</span>
        <span class="subtitle f-font-700">{{ data.peop }}</span>
      </div>
      <ul class="s-students-count__info f-text-m">
        <li>
          <span>Доля учащихся очно</span>
          <span class="f-text-xl f-font-700">{{ data.o }} %</span>
        </li>
        <li>
          <span>Доля учащихся на бюджете</span>
          <span class="f-text-xl f-font-700">{{ data.free }} %</span>
        </li>
        <li>
          <span>Доля студентов по очной форме обучения, имеющих средний балл аттестата не менее 4-х баллов</span>
          <span class="f-text-xl f-font-700">{{ data.gos4 }} %</span>
        </li>
      </ul>
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

      acc[label] = label !== 'peop' ? numWithTwoDecimalPlaces.replace('.', ',') : value;

      return acc;
    }, {});
  },
  { deep: true, immediate: true },
);
</script>

<style>
@import './s-students-count.scss';
</style>
