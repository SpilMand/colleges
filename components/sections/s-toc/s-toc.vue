<template>
  <section class="s-toc">
    <div class="s-toc__title" @click="isOpen = !isOpen">
      <h5 class="title-h5">Содержание статьи</h5>
      <img src="/icons/arrow-down.svg" alt="" :class="{ opened: isOpen }" />
    </div>
    <ol v-if="isOpen" class="s-toc__list f-text-xl">
      <li class="s-toc__item">Отложенная отправка писем и новая схема обновления пакетов в Рассылках</li>
      <li class="s-toc__item">Подсветка кода в Мессенджере</li>
      <li class="s-toc__item">Вложения к встречам в Календаре</li>
      <li class="s-toc__item">Воспроизведение звука при демонстрации экрана в Телемосте</li>
      <li class="s-toc__item">6 марта состоится вебинар про переезд в Яндекс 360 для бизнеса</li>
      <li class="s-toc__item">Компания ЦЕМЕНТУМ мигрировала в Яндекс 360 для бизнеса</li>
      <li class="s-toc__item">Яндекс 360 запустил блог на Хабре</li>
    </ol>
  </section>
</template>

<script setup>
const isOpen = ref(false);
</script>

<style>
@import './s-toc.scss';
</style>
