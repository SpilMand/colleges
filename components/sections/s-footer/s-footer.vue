<template>
  <footer class="s-footer">
    <div class="container">
      <div class="s-footer__box">
        <nuxt-link to="/" class="s-footer__logo" aria-label="Перейти на главную">
          <img :src="logoSrc" loading="lazy" :alt="logoAlt" />
        </nuxt-link>
        <m-menu-footer :items="menuItems" />
        <div class="s-footer__contacts">
          <a :href="'tel:' + phoneNumber" class="s-footer__phone s-footer__contacts-item f-text-s f-font-700">
            {{ formattedPhoneNumber }}
          </a>
          <a :href="'mailto:' + emailAddress" class="s-footer__email s-footer__contacts-item f-text-s f-font-700">
            {{ emailAddress }}
          </a>
          <m-social :items="social" />
        </div>
        <div class="s-footer__policy f-text-xs">{{ copyrightText }}</div>
        <a :href="userAgreementLink" class="s-footer__policy f-text-xs">{{ userAgreementText }}</a>
        <a :href="privacyPolicyLink" class="s-footer__policy f-text-xs">{{ privacyPolicyText }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const logoSrc = '/img/footer/logo.svg';
const logoAlt = 'колледжи';

const social = ref([
  {
    href: 'https://vk.com/kolledzhirf',
    icon: 'vk',
  },
  {
    href: 'https://www.youtube.com/@kolledzhirf ',
    icon: 'youtube',
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
    href: '/applicants',
    text: 'Абитуриентам',
  },
  {
    href: '/parents',
    text: 'Родителям',
  },
  {
    href: '/foru',
    text: 'Информация для колледжей',
  },
]);

const phoneNumber = '+78003023620';
const formattedPhoneNumber = '8 800 302-36-20';

const emailAddress = 'example@email.ru';

const copyrightText = '© 2023 Колледж.рф. Все права защищены';

const userAgreementLink = '#';
const userAgreementText = 'Пользовательское соглашение';

const privacyPolicyLink = '#';
const privacyPolicyText = 'Политика конфиденциальности';
</script>

<style lang="scss">
@import './s-footer.scss';
</style>
