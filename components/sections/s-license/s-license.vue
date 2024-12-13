<template>
  <section v-if="info.attributes" class="s-license section-m">
    <h3 class="title-h3">Лицензия и аккредитация</h3>
    <div class="s-license__content">
      <div class="s-license__card license-card">
        <div class="s-license__logo">
          <img src="/img/college/orel.svg" alt="" />
        </div>
        <div class="s-license__info">
          <div class="s-license__text">
            <span class="s-license__title f-text-m">Лицензия</span>
            <span class="f-text-l f-font-700">{{ info.attributes.licence_num }}</span>
          </div>
          <div class="s-license__text">
            <span v-if="info.attributes.licence_num" class="s-license__title green">Действует</span>
            <span v-else class="s-license__title red">Отозвана</span>
            <span v-if="info.attributes.licence_num" class="s-license__date f-text-l f-font-700">
              Бессрочно с
              {{ new Date(info.attributes.licence_date).toLocaleDateString('ru') }}
            </span>
          </div>
        </div>
      </div>
      <div class="s-license__card accr-card">
        <div class="s-license__logo">
          <img src="/img/college/orel.svg" alt="" />
        </div>
        <div class="s-license__info">
          <div class="s-license__text">
            <span class="s-license__title f-text-m">Аккредитация</span>
            <span class="f-text-l f-font-700">№ 50Л01 0010007 рег. № {{ info.attributes.accreditation_number }}</span>
          </div>
          <div class="s-license__text">
            <span v-if="info.attributes.accreditation_number" class="s-license__title green">Действует</span>
            <span v-else class="s-license__title red">Отозвана</span>
            <span v-if="info.attributes.accreditation_number" class="s-license__date f-text-l f-font-700">
              Бессрочно с
              {{ new Date(info.attributes.accreditation_date).toLocaleDateString('ru') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  info: { type: Object, default: () => ({}) },
  licenseValid: { type: Boolean, default: true },
  accrValid: { type: Boolean, default: true },
});

onMounted(() => {
  // licenceDate.value = new Date()
});
</script>

<style>
@import './s-license.scss';
</style>
