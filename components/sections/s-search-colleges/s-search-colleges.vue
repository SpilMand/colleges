<template>
  <section class="s-search-colleges section-l">
    <div class="container">
      <div class="s-search-colleges__box">
        <div class="s-search-colleges__wrap">
          <h3 class="title-h3 mbx4">Поиск колледжей на сайте Колледжи.рф поможет быстро найти:</h3>
          <p class="f-text-xxxl">
            колледж, специальность, профессию с помощью умных фильтров. Также Вы можете искать колледжи по всей России
            или по определенному городу на карте.
          </p>
        </div>
        <picture class="s-search-colleges__img">
          <source media="(min-width: 1200px)" srcset="/img/search/icon-desc.svg" />
          <source media="(min-width: 768px)" srcset="/img/search/icon-tab.svg" />
          <img class="m-info-card__img" src="/img/search/icon-mob.svg" alt="" />
        </picture>
      </div>
      <m-search-colleges />
    </div>
  </section>
</template>
<script setup></script>

<style lang="scss">
@import './s-search-colleges.scss';
</style>
