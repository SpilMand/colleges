<template>
  <div class="m-professions-card">
    <h4 class="m-professions-card__title title-h4">
      {{ professions.name }}
    </h4>
    <div class="m-professions-card-wrap">
      <nuxt-link :to="getLinkUrl" class="" :test-id="`link-m-professions-card-professions-${professions.id}`">
        <a-button class="w-100" :label="collegesLabel" color="white" textSize="f-text-m" :img="arrow" :center="false" />
      </nuxt-link>

      <nuxt-link
        v-if="type === 'profession'"
        :to="`/profession/${professions.id}/specialties`"
        class=""
        :test-id="`link-m-professions-card-specialties-${professions.id}`"
      >
        <a-button
          class="w-100"
          :label="specialtiesLabel"
          color="white"
          textSize="f-text-m"
          :img="arrow"
          :center="false"
        />
      </nuxt-link>

      <nuxt-link
        v-else-if="type === 'specialty'"
        class="w-100"
        :label="professionsLabel"
        color="white"
        textSize="f-text-m"
        :img="arrow"
        :center="false"
        :test-id="`link-m-professions-card-specialty-${professions.id}`"
        @click="navigateTo(`/specialty/${professions.id}/professions`)"
      />
    </div>
  </div>
</template>
<script setup>
import { declineWord } from '~/composables/utils';

const props = defineProps({
  professions: {
    type: Object,
    default: () => ({}),
  },
  type: { type: String, default: '' },
});

const getLinkUrl = computed(() => {
  if (props.type === 'specialty') {
    return `/specialty/${props.professions.id}`;
  }

  return `/profession/${props.professions.id}`;
});
const openCard = () => {
  if (props.type === 'profession') {
    navigateTo(`/profession/${props.professions.id}`);
  } else {
    navigateTo(`/specialty/${props.professions.id}`);
  }
};

const collegesLabel = props.professions.colleges + ' ' + declineWord(props.professions.colleges, 'колледж');
const specialtiesLabel =
  props.professions.specialties + ' ' + declineWord(props.professions.specialties, 'специальность');
const professionsLabel = props.professions.professions + ' ' + declineWord(props.professions.professions, 'профессия');
const arrow = `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 6.00056C13.9951 5.47445 13.7832 4.97146 13.41 4.60056L9.12 0.300559C8.93264 0.114308 8.67919 0.00976563 8.415 0.00976562C8.15082 0.00976563 7.89736 0.114308 7.71 0.300559C7.61627 0.393522 7.54188 0.504123 7.49111 0.625982C7.44034 0.747841 7.4142 0.878547 7.4142 1.01056C7.4142 1.14257 7.44034 1.27328 7.49111 1.39513C7.54188 1.51699 7.61627 1.6276 7.71 1.72056L11 5.00056H1C0.734784 5.00056 0.48043 5.10592 0.292893 5.29345C0.105357 5.48099 0 5.73534 0 6.00056C0 6.26577 0.105357 6.52013 0.292893 6.70766C0.48043 6.8952 0.734784 7.00056 1 7.00056H11L7.71 10.2906C7.5217 10.4775 7.41538 10.7317 7.41444 10.997C7.41351 11.2624 7.51802 11.5173 7.705 11.7056C7.89198 11.8939 8.1461 12.0002 8.41147 12.0011C8.67683 12.0021 8.9317 11.8975 9.12 11.7106L13.41 7.41056C13.7856 7.03721 13.9978 6.53014 14 6.00056Z" fill="#FD8B21"/>
  </svg>`;
</script>
<style lang="scss">
@import './m-professions-card.scss';
</style>
