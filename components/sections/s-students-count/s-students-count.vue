<template>
  <section v-if="monitorings[2]" class="s-students-count section-m">
    <h3 class="title-h3">Сколько учится студентов в 2023/24</h3>
    <div class="s-students-count__content">
      <div class="s-students-count__diagram">
        <span>Общее кол-во</span>
        <span class="subtitle f-font-700">{{ monitorings[0].attributes.value }}</span>
      </div>
      <ul class="s-students-count__info f-text-m">
        <li>
          <span>Доля учащихся очно</span>
          <span class="f-text-xl f-font-700">{{ monitorings[1].attributes.value }} %</span>
        </li>
        <li>
          <span>Доля учащихся на бюджете</span>
          <span class="f-text-xl f-font-700">{{ monitorings[2].attributes.value }} %</span>
        </li>
        <li>
          <span>Доля студентов по очной форме обучения, имеющих средний балл аттестата не менее 4-х баллов</span>
          <span class="f-text-xl f-font-700">{{ monitorings[6].attributes.value }} %</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
defineProps({
  monitorings: { type: Object, default: () => ({}) },
});
</script>

<style>
@import './s-students-count.scss';
</style>
