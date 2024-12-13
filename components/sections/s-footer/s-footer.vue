<template>
  <footer class="s-footer">
    <div class="container">
      <div class="s-footer__box">
        <nuxt-link to="/" class="s-footer__logo" aria-label="Перейти на главную" test-id="link-s-footer-back">
          <img :src="logoSrc" loading="lazy" :alt="logoAlt" />
        </nuxt-link>
        <m-menu-footer :items="menuItems" />
        <div class="s-footer__contacts">
          <a
            :href="width > 768 ? null : 'tel:' + phoneNumber"
            class="s-footer__phone s-footer__contacts-item f-text-s f-font-700"
            test-id="link-s-footer-phone"
          >
            {{ formattedPhoneNumber }}
          </a>
          <a
            :href="'mailto: ' + emailAddress"
            class="s-footer__email s-footer__contacts-item f-text-s f-font-700"
            test-id="link-s-footer-email"
          >
            {{ emailAddress }}
          </a>
          <m-social section-id="s-footer" :items="social" />
        </div>
        <div class="s-footer__policy f-text-xs">{{ copyrightText }}</div>
        <a
          :href="userAgreementLink"
          target="_blank"
          class="s-footer__policy f-text-xs"
          test-id="link-s-footer-agreement"
          >{{ userAgreementText }}</a
        >
        <a
          :href="privacyPolicyLink"
          target="_blank"
          class="s-footer__policy f-text-xs"
          test-id="link-s-footer-policy"
          >{{ privacyPolicyText }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();

const logoSrc = '/img/footer/logo.svg';
const logoAlt = 'колледжи';

const social = ref([
  {
    href: 'https://vk.com/kolledzhirf',
    icon: 'vk',
  },
  {
    href: 'https://t.me/kolledzhirf',
    icon: 'telegram',
  },
]);

const menuItems = ref([
  {
    href: '/about',
    text: 'О проекте',
  },
  {
    href: '/contacts',
    text: 'Контакты',
  },
  {
    href: '/applicants',
    text: 'Абитуриентам',
  },
  {
    href: '/parents',
    text: 'Родителям',
  },
  {
    href: '/forcolleges',
    text: 'Информация для колледжей',
  },
]);

const phoneNumber = '+78003023620';
const formattedPhoneNumber = '8 800 302-36-20';

const emailAddress = '';

const copyrightText = '© 2023 Колледж.рф. Все права защищены';

const userAgreementLink = '/agreement';
const userAgreementText = 'Пользовательское соглашение';

const privacyPolicyLink = '/policy';
const privacyPolicyText = 'Политика конфиденциальности';
</script>

<style lang="scss">
@import './s-footer.scss';
</style>
