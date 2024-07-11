<template>
  <header class="s-header">
    <div class="container">
      <div class="s-header__wrapper">
        <nuxt-link v-if="!(width <= 1199 && isSearch)" to="/" class="s-header__logo" aria-label="Перейти на главную">
          <img v-if="width > 768" loading="lazy" src="/img/header/logo.svg" alt="колледжи" />
          <img v-else loading="lazy" src="/img/header/logo-mob.svg" alt="колледжи" />
        </nuxt-link>
        <div v-if="width >= 1500 && isMenuOpen" class="s-header-menu">
          <m-menu :apiDirections="apiDirections" :items="menuItems" />
        </div>
        <div :class="['s-header__box', { active: isSearch }]">
          <a-search
            v-if="router.name !== 'index'"
            :isSearch="isSearch"
            class="s-header__search"
            placeholder="Поиск по сайту"
            @toggleSearch="toggleSearch"
          />
          <a v-if="width >= 767" class="s-header__phone f-text-s" href="tel:+78003023620">
            <span>8 800 302-36-20</span>
          </a>
          <div v-if="selectedCity" class="s-header__city f-text-s" @click="isPopup = !isPopup">
            {{ selectedCity }}
          </div>
          <a-button
            v-if="width >= 767 && !selectedCity"
            label="Выбрать город"
            color="violet-5"
            size="small"
            textSize="f-text-s"
            class="s-header__button f-font-700"
            @click="isPopup = !isPopup"
          />
          <a class="s-header__button scroll" href="#quiz">
            <a-button label="Подобрать обучение" color="orange" size="small" textSize="f-text-s" class="f-font-700" />
          </a>
          <div v-if="width >= 767">
            <div v-if="isAuthenticated" class="s-header__auth violet-100" @click="logout">
              <span class="d-flex" v-html="iconAuth"></span>
              <span class="f-text-s">{{ userData?.first_name }}</span>
            </div>
            <div v-else class="s-header__auth violet-100" @click="isAuth = !isAuth">
              <span class="d-flex" v-html="iconAuth"></span>
              <span class="f-text-s">Войти</span>
            </div>
          </div>
          <div v-if="width < 1500" class="s-header__hamburger" @click="isMenuOpenMobile = !isMenuOpenMobile"></div>
        </div>
      </div>
    </div>
    <div v-if="isMenuOpenMobile && width < 1500" class="s-header__menu-mobile">
      <m-menu :apiDirections="apiDirections" :items="menuItems" @click="isMenuOpenMobile = !isMenuOpenMobile">
        <template #head>
          <div class="s-header__menu-mobile-head">
            <div class="s-header__menu-mobile-title f-font-700">Меню</div>
            <span class="s-header__menu-mobile-close" @click="isMenuOpenMobile = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M12.9998 0.999818C12.8123 0.812347 12.558 0.707031 12.2928 0.707031C12.0277 0.707031 11.7733 0.812347 11.5858 0.999818L6.99982 5.58582L2.41382 0.999818C2.22629 0.812347 1.97198 0.707031 1.70682 0.707031C1.44165 0.707031 1.18735 0.812347 0.999818 0.999818C0.812347 1.18735 0.707031 1.44165 0.707031 1.70682C0.707031 1.97198 0.812347 2.22629 0.999818 2.41382L5.58582 6.99982L0.999818 11.5858C0.812347 11.7733 0.707031 12.0277 0.707031 12.2928C0.707031 12.558 0.812347 12.8123 0.999818 12.9998C1.18735 13.1873 1.44165 13.2926 1.70682 13.2926C1.97198 13.2926 2.22629 13.1873 2.41382 12.9998L6.99982 8.41382L11.5858 12.9998C11.7733 13.1873 12.0277 13.2926 12.2928 13.2926C12.558 13.2926 12.8123 13.1873 12.9998 12.9998C13.1873 12.8123 13.2926 12.558 13.2926 12.2928C13.2926 12.0277 13.1873 11.7733 12.9998 11.5858L8.41382 6.99982L12.9998 2.41382C13.1873 2.22629 13.2926 1.97198 13.2926 1.70682C13.2926 1.44165 13.1873 1.18735 12.9998 0.999818Z"
                  fill="#343434"
                />
              </svg>
            </span>
          </div>
          <a-select
            v-if="width < 767"
            v-model="selectedValue"
            placeholder="Выбрать город"
            :options="cities"
            @selectedItemId="handleSelectedItemId"
          />
        </template>
        <template #button>
          <a class="s-header__phone f-text-s" href="tel:+78003023620">
            <span>8 800 302-36-20</span>
          </a>
          <div v-if="width < 767">
            <a-button
              v-if="isAuthenticated"
              :img="iconAuth"
              :label="userData?.first_name"
              color="violet-5"
              size="small"
              class="s-header__menu-auth w-100"
              textSize="f-text-s f-font-700"
              @click="logout"
            />
            <a-button
              v-else
              :img="iconAuth"
              label="Войти"
              color="violet-5"
              size="small"
              class="s-header__menu-auth w-100"
              textSize="f-text-s f-font-700"
              @click="isAuth = !isAuth"
            />
          </div>
        </template>
      </m-menu>
    </div>
    <m-popup v-if="isPopup" :visible="isPopup" class="s-header__popup" width="26.25rem" @close="isPopup = false">
      <div class="s-header__popup-title f-font-700">{{ cityTitle }}</div>
      <a-select
        v-model="selectedValue"
        showSelectButton
        showSelectLocation
        placeholder="Выбрать город"
        :options="cities"
        @save="selectCity"
      >
        <span class="s-header__popup-location"></span>
      </a-select>
    </m-popup>
    <s-auth v-if="isAuth" @openRecovery="openRecovery" @openReg="openReg" @close="isAuth = !isAuth" />
    <s-auth-reg
      v-if="isReg"
      @mailTransfer="getEmail"
      @openAuth="openAuth"
      @openConfirm="openConfirm"
      @close="isReg = !isReg"
    />
    <s-auth-reg-change
      v-if="isRegChange"
      @mailTransfer="getEmail"
      @openConfirm="openConfirm"
      @close="isRegChange = !isRegChange"
    />
    <s-auth-recovery
      v-if="isRecovery"
      @mailTransfer="getEmail"
      @openExamination="openExamination"
      @close="isRecovery = !isRecovery"
    />
    <s-auth-confirm v-if="isConfirm" :email="email" @close="isConfirm = !isConfirm" @openRegChange="openRegChange" />
    <s-auth-examination
      v-if="isExamination"
      :email="email"
      @close="isExamination = !isExamination"
      @openRegChange="openRegChange"
    />
    <s-auth-reset v-if="isReset" @close="isReset = !isReset" />
  </header>
</template>
<script setup>
defineProps({
  apiDirections: {
    type: Object,
    default: () => ({}),
  },
});
import { useCityIdStore } from '~/store/city';
import { useWindowSize } from '@vueuse/core';
import scrollToSection from '~/composables/scrollToSection';
import getCities from '~/api/cities/getCities';
import { useAuthStore } from '~/store/useAuthStore';

const email = ref('');
const router = useRoute();
const { width } = useWindowSize();
const isScrolled = ref(false);
const cityStore = useCityIdStore();
const authStore = useAuthStore();
const apiCities = await getCities({
  'filter[has_colleges]': true,
  'page[size]': 2000,
  'sort': '-total_colleges',
});

const openReg = () => {
  isAuth.value = false;
  isReg.value = true;
};

const openAuth = () => {
  isAuth.value = true;
  isReg.value = false;
  isRecovery.value = false;
};

const openRecovery = () => {
  isRecovery.value = true;
  isAuth.value = false;
  isReg.value = false;
};

const openConfirm = () => {
  isConfirm.value = true;
  isReg.value = false;
};

const openExamination = () => {
  isExamination.value = true;
  isRecovery.value = false;
};

const openRegChange = () => {
  isRegChange.value = true;
  isConfirm.value = false;
  isExamination.value = false;
};

const getEmail = (value) => {
  email.value = value;
};

const userData = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const logout = async () => {
  await authStore.logout();
};

const menuItems = ref([
  { name: 'index', anchor: 'Колледжи', link: '/colleges/' },
  { name: 'directions', anchor: 'Направления', link: '/directions' },
  { name: 'specialties', anchor: 'Специальности', link: '/specialties' },
  { name: 'professions', anchor: 'Профессии', link: '/professions' },
  { name: 'blog', anchor: 'Блог', link: '/blog' },
]);

const isSearch = ref(false);
const isMenuOpen = ref(true);
const toggleSearch = () => {
  isSearch.value = !isSearch.value;
  isMenuOpen.value = !isSearch.value;
};

const cityTitle = ref('Выберите ваш город');
const isMenuOpenMobile = ref(false);
const isPopup = ref(false);
const isAuth = ref(false);
const isReg = ref(false);
const isRegChange = ref(false);
const isRecovery = ref(false);
const isConfirm = ref(false);
const isReset = ref(false);
const isExamination = ref(false);
const selectedValue = ref(null);
const selectedCity = ref('');
const cities = ref([]);

const selectCity = async () => {
  const selectedOption = cities.value.find((option) => option?.attributes?.name === selectedValue.value);
  selectedCity.value = selectedOption ? selectedOption?.attributes?.name : '';
  const selectedOptionId = selectedOption ? selectedOption?.id : '';
  const selectedOptionSlug = selectedOption ? selectedOption?.slug?.name : '';
  cityStore.setSelectedOptionId(selectedOptionId);
  cityStore.setSelectedOptionSlug(selectedOptionSlug);
  isPopup.value = false;
};

const loadСities = async () => {
  const response = await getCities({ 'filter[name]': selectedValue.value });
  if (response && response.data) {
    cities.value = response.data.map(({ id, attributes }) => ({
      id,
      slug: { name: attributes.slug },
      attributes: { name: attributes.name },
    }));
  }
};

const handleSelectedItemId = (itemId, itemSlug, itemValue) => {
  selectedCity.value = itemValue ? itemValue : '';
  cityStore.setSelectedOptionId(itemId);
  cityStore.setSelectedOptionSlug(itemSlug);
};

watchEffect(() => {
  if (router.query.auth) {
    isAuth.value = true;
  }

  if (router.query.token && router.query.email) {
    isReset.value = true;
  }

  if (selectedValue.value && selectedValue.value.length >= 2) {
    loadСities();
  } else {
    if (apiCities && apiCities.data) {
      cities.value = apiCities.data.map(({ id, attributes }) => ({
        id,
        slug: { name: attributes.slug },
        attributes: { name: attributes.name },
      }));
    }
  }
});

onMounted(async () => {
  scrollToSection();
  const mainWrapper = document.querySelector('body');
  addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 64;
    mainWrapper.classList.toggle('moved', isScrolled.value);
  });
});

const iconAuth = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 17.5V15.8333H15.8333V4.16667H10V2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H10ZM8.33333 14.1667L7.1875 12.9583L9.3125 10.8333H2.5V9.16667H9.3125L7.1875 7.04167L8.33333 5.83333L12.5 10L8.33333 14.1667Z" fill="#4C3B8A"/>
</svg>
`;
</script>
<style lang="scss">
@import './s-header.scss';
</style>
