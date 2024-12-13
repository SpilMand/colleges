<template>
  <div v-if="options.visibility" class="m-card cards-stretched m-card-college-rklm">
    <!-- Desktop Version -->
    <div v-if="!isMobile" class="m-card__content m-card-college-rklm__content">
      <div class="m-card__logo m-card-college-rklm__logo">
        <img :src="logo" alt="" />
      </div>

      <div class="m-card__info-main m-card-college-rklm__main">
        <div class="m-card__tags f-text-xs m-card-college-rklm__tags">
          <div class="m-card-college-rklm__tag-type">
            <span class="m-card__tags f-text-xs">
              <div class="m-card__tags-tag m-card-college-rklm__city">
                {{ options.city }}
              </div>
              <div class="m-card__tags-tag m-card-college-rklm__establishment">
                {{ options.establishment }}
              </div>
              <div class="m-card__tags-tag m-card-college-rklm__accreditation">
                {{ options.accreditation }}
              </div>
            </span>
          </div>
          <span class="m-card-college-rklm__span">Реклама</span>
        </div>
        <h5 class="m-card-college-rklm__title title-h5">{{ options.title }}</h5>
        <div class="m-card-college-rklm__text">{{ options.description }}</div>
      </div>
      <div class="m-card__actions m-card-college-rklm__actions">
        <a-button
          class="m-card__adBtn"
          label="Хочу поступить"
          color="orange"
          :test-id="`link-m-card-college-rklm-${link.replace(/\W|_/g, '')}`"
          @click="navigateTo(link)"
        />
      </div>
    </div>

    <!-- Mobile Version -->
    <div v-if="isMobile" class="mobile-card m-card__content m-card-college-rklm__content">
      <div class="m-card-college-rklm__top">
        <img class="m-card__logo" :src="logo" alt="" />
        <div class="m-card-college-rklm__span--mobile">Реклама</div>
      </div>
      <h5 class="m-card-college-rklm__title--mobile">{{ options.title }}</h5>
      <div class="m-card__tags f-text-xs m-card-college-rklm__tags">
        <div class="m-card-college-rklm__tag-type">
          <span class="m-card__tags f-text-xs">
            <div class="m-card__tags-tag m-card-college-rklm__city">
              {{ options.city }}
            </div>
            <div class="m-card__tags-tag m-card-college-rklm__establishment">
              {{ options.establishment }}
            </div>
            <div class="m-card__tags-tag m-card-college-rklm__accreditation">
              {{ options.accreditation }}
            </div>
          </span>
        </div>
      </div>
      <div class="m-card-college-rklm__text">{{ options.description }}</div>
      <div class="m-card-college-rklm__actions--mobile">
        <a-button
          class="m-card__adBtn"
          label="Хочу поступить"
          color="orange"
          :test-id="`link-m-card-college-rklm-${link.replace(/\W|_/g, '')}-mobile`"
          @click="navigateTo(link)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: { type: Object, default: () => ({}) },
  logo: { type: String },
  link: { type: String },
  visibility: { type: Boolean, required: true },
});

const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 950;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
@import './m-card-college-rklm.scss';
</style>
