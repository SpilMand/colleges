<template>
  <section class="s-errors-404 section-l">
    <div class="container">
      <a-breadcrumbs :items="breadcrumbs" />
      <div class="s-errors-404__wrapper">
        <div class="s-errors-404__content">
          <h1 class="s-errors-404__title title-h3 mbx8">Страницы, что вы ищите, не существует!</h1>
          <div v-if="width <= 767" class="s-errors-404__img mbx8">
            <img src="/img/error/404.svg" alt="Страницы, что вы ищите, не существует!" />
          </div>
          <p class="f-text-l mbx5 f-font-700">
            К сожалению, запрашиваемой вами страницы не существует.<br />
            Возможно, это случилось по одной из указанных ниже причин:
          </p>
          <ul class="s-errors-404__list mbx8">
            <li class="f-text-m">В запрашиваемой страницы никогда не было на сайте или она была удалена</li>
            <li class="f-text-m">Вы ошиблись при наборе адреса страницы (URL)</li>
            <li class="f-text-m">Перешли по некорректной (неработающей, неправильной) ссылке</li>
          </ul>
          <p class="f-text-l mbx4 f-font-700">
            Мы просим прощение за доставленные неудобства<br />
            и предлагаем следующие пути решения:
          </p>
          <div class="s-errors-404__button mbx10">
            <nuxt-link to="/">
              <a-button label="На главную" color="orange" size="extra-large" textSize="f-text-m" class="f-font-700" />
            </nuxt-link>
            <nuxt-link to="/">
              <a-button
                label="Вернуться назад"
                color="outline"
                size="extra-large"
                textSize="f-text-m"
                class="f-font-700"
              />
            </nuxt-link>
          </div>
          <div class="s-errors-404__info f-text-m">
            Если вы уверены в правильности набранного адреса страницы и считаете, что эта ошибка произошла по нашей
            вине, пожалуйста, сообщите нам об этом при помощи электронной почты
            <a class="f-link" href="mailto:support@college.ru">support@college.ru</a>
          </div>
        </div>
        <div v-if="width > 767" class="s-errors-404__img">
          <img src="/img/error/404.svg" alt="Страницы, что вы ищите, не существует!" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
const breadcrumbs = [{ label: 'Страница второго порядка', link: '/404' }];

const { width } = useWindowSize();
</script>

<style lang="scss">
@import './s-errors-404.scss';
</style>
