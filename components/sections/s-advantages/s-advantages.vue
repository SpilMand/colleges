<template>
  <section v-if="info.attributes" class="s-advantages section-l">
    <h3 class="title-h3">Преимущества колледжа:</h3>
    <div class="s-advantages__content">
      <ul class="s-advantages__list f-text-m" :class="{ show: isVisible }">
        <li>Есть общежитие</li>
        <li>Поступление без ОГЭ, вступительных испытаний и конкурса аттестатов</li>
        <li>Гарантия поступления в университет СИНЕРГИЯ после колледжа</li>
        <li>Преподаватели-практики из университета СИНЕРГИЯ и ведущих ВУЗов Москвы</li>
        <li>Обучение востребованным профессиям в: экономике, юриспруденции и IT</li>
      </ul>
      <div v-if="!isVisible" ref="gradient" class="s-advantages__gradient"></div>
    </div>
    <div v-if="!isVisible" class="s-advantages__more f-font-700" @click="isVisible = !isVisible">
      <span>Развернуть</span>
      <img src="/icons/arrow-down-violet.svg" alt="" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  info: { type: Object, default: () => ({}) },
});

const isVisible = ref(false);
</script>

<style scoped>
@import './s-advantages.scss';
</style>
