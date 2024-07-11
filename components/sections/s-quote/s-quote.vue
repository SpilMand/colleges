<template>
  <section class="s-quote">
    <img class="s-quote__img" src="/icons/quote.svg" alt="" />
    <p class="s-quote__text f-text-xl">{{ text }}</p>
    <span class="f-text-l f-font-700">{{ author }}</span>
    <img class="s-quote__bg" src="/img/article/quote-decor.svg" alt="" />
  </section>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: `Моушн-дизайн как навык ценится на рынке и помогает 
заработать, потому что в странах СНГ студии предпочитают нанимать 
генералистов — дизайнеров, способных выполнить задачу комплексно. Однако 
доход любого специалиста зависит от того, насколько он хорош в своём деле. 
Именно постоянное прокачивание своих скилов неизбежно ведёт к увеличению 
дохода. Под руководством практикующих специалистов вы познакомитесь с теоретическими понятиями.`,
  },
  author: { type: String, default: 'Аслан Джантемиров тимлид команды студии Dobro ССS' },
});
</script>

<style>
@import './s-quote.scss';
</style>
