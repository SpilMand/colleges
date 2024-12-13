<template>
  <div class="container">
    <a-breadcrumbs v-if="info.attributes" :items="breadcrumbs" />
  </div>
  <section v-if="info.attributes" class="s-college-head">
    <div class="container">
      <div class="s-college-head__info">
        <div class="s-college-head__logo" :class="{ 'no-logo': !logo }">
          <img v-if="logo" :src="logo" alt="" />
          <img v-else src="/img/colleges/logo.svg" alt="" />
        </div>
        <div class="s-college-head__tags f-text-xs">
          <div class="s-college-head__tags-tag">{{ city.attributes.name }}</div>
          <div v-if="info.attributes.is_state" class="s-college-head__tags-tag">Государственный</div>
          <div v-else class="s-college-head__tags-tag">Не государственный</div>
          <!-- <div class="s-college-head__tags-tag">При вузе</div> -->
          <div v-if="info.attributes.licence_num" class="s-college-head__tags-tag green">Лицензия</div>
          <!-- <div v-if="info.attributes.accreditation_number == ''" class="s-college-head__tags-tag red">
            Не аккредитован
          </div>
          <div v-else class="s-college-head__tags-tag green">Аккредитован</div> -->
        </div>
        <h5 class="title-h5">{{ info.attributes.name }}</h5>
        <div class="s-college-head__sub f-text-s f-font-700">
          <div class="s-college-head__sub-block average-score">
            <label class="f-text-xs f-font-500">средний проходной балл</label>
            <div>
              <span class="s-font-500">бюджет</span>
              <span class="black">
                {{ parseFloat(monitorings.attF).toFixed(0) != '0' ? monitorings.attF : '-' }}
              </span>
            </div>
            /
            <div>
              <span class="s-font-500">платно</span>
              <span class="black">
                {{ parseFloat(monitorings.attP).toFixed(0) != '0' ? monitorings.attP : '-' }}
              </span>
            </div>
          </div>
          <div class="s-college-head__sub-block">
            <label class="f-text-xs f-font-500">формы обучения</label>
            <div>
              <span v-for="(form, index) in forms" :key="index" class="s-college-head__forms-item">
                {{ form.attributes.name }}
              </span>
            </div>
          </div>
          <div class="s-college-head__sub-block">
            <label class="f-text-xs f-font-500">бюджетных мест</label>
            {{ info.attributes.calc_data.budget_places }}
          </div>
          <div class="s-college-head__sub-block">
            <label class="f-text-xs f-font-500">срок обучения</label>
            {{ info.attributes.calc_data.min_duration ? duration : '−' }}
          </div>
          <div class="s-college-head__sub-block">
            <label class="f-text-xs f-font-500">стоимость/год</label>
            от {{ info.attributes.calc_data.min_cost / 1000 }} т.р.
          </div>
        </div>
      </div>

      <div class="s-college-head__actions f-text-xs">
        <div class="s-college-head__open-door s-college-head__action">
          <b class="f-text-s">Событий нет</b>
          <!-- <span>День открытых дверей</span> -->
        </div>
        <NuxtLink class="s-college-head__action btn" test-id="link-s-college-head-filials">
          Филиалы: <b class="f-text-s">нет инф.</b>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.2667 8.25831L16.0417 4.99998C15.9642 4.92187 15.872 4.85988 15.7705 4.81757C15.6689 4.77526 15.56 4.75348 15.45 4.75348C15.34 4.75348 15.2311 4.77526 15.1295 4.81757C15.028 4.85988 14.9358 4.92187 14.8583 4.99998C14.7031 5.15611 14.616 5.36732 14.616 5.58748C14.616 5.80763 14.7031 6.01884 14.8583 6.17498L17.825 9.16664H0.833333C0.61232 9.16664 0.400358 9.25444 0.244078 9.41072C0.0877974 9.567 0 9.77896 0 9.99998C0 10.221 0.0877974 10.433 0.244078 10.5892C0.400358 10.7455 0.61232 10.8333 0.833333 10.8333H17.875L14.8583 13.8416C14.7802 13.9191 14.7182 14.0113 14.6759 14.1128C14.6336 14.2144 14.6118 14.3233 14.6118 14.4333C14.6118 14.5433 14.6336 14.6522 14.6759 14.7538C14.7182 14.8553 14.7802 14.9475 14.8583 15.025C14.9358 15.1031 15.028 15.1651 15.1295 15.2074C15.2311 15.2497 15.34 15.2715 15.45 15.2715C15.56 15.2715 15.6689 15.2497 15.7705 15.2074C15.872 15.1651 15.9642 15.1031 16.0417 15.025L19.2667 11.7916C19.7348 11.3229 19.9978 10.6875 19.9978 10.025C19.9978 9.36248 19.7348 8.72706 19.2667 8.25831Z"
              fill="#BFB3EE"
            />
          </svg>
        </NuxtLink>
        <NuxtLink class="s-college-head__action btn" test-id="link-s-college-head-specialties">
          Специальности:
          <b class="f-text-s">{{ info.attributes.calc_data.count_specialties }}</b>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.2667 8.25831L16.0417 4.99998C15.9642 4.92187 15.872 4.85988 15.7705 4.81757C15.6689 4.77526 15.56 4.75348 15.45 4.75348C15.34 4.75348 15.2311 4.77526 15.1295 4.81757C15.028 4.85988 14.9358 4.92187 14.8583 4.99998C14.7031 5.15611 14.616 5.36732 14.616 5.58748C14.616 5.80763 14.7031 6.01884 14.8583 6.17498L17.825 9.16664H0.833333C0.61232 9.16664 0.400358 9.25444 0.244078 9.41072C0.0877974 9.567 0 9.77896 0 9.99998C0 10.221 0.0877974 10.433 0.244078 10.5892C0.400358 10.7455 0.61232 10.8333 0.833333 10.8333H17.875L14.8583 13.8416C14.7802 13.9191 14.7182 14.0113 14.6759 14.1128C14.6336 14.2144 14.6118 14.3233 14.6118 14.4333C14.6118 14.5433 14.6336 14.6522 14.6759 14.7538C14.7182 14.8553 14.7802 14.9475 14.8583 15.025C14.9358 15.1031 15.028 15.1651 15.1295 15.2074C15.2311 15.2497 15.34 15.2715 15.45 15.2715C15.56 15.2715 15.6689 15.2497 15.7705 15.2074C15.872 15.1651 15.9642 15.1031 16.0417 15.025L19.2667 11.7916C19.7348 11.3229 19.9978 10.6875 19.9978 10.025C19.9978 9.36248 19.7348 8.72706 19.2667 8.25831Z"
              fill="#BFB3EE"
            />
          </svg>
        </NuxtLink>
        <NuxtLink class="s-college-head__action btn" test-id="link-s-college-head-professions">
          Профессии:
          <b class="f-text-s">{{ info.attributes.calc_data.count_professions }}</b>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.2667 8.25831L16.0417 4.99998C15.9642 4.92187 15.872 4.85988 15.7705 4.81757C15.6689 4.77526 15.56 4.75348 15.45 4.75348C15.34 4.75348 15.2311 4.77526 15.1295 4.81757C15.028 4.85988 14.9358 4.92187 14.8583 4.99998C14.7031 5.15611 14.616 5.36732 14.616 5.58748C14.616 5.80763 14.7031 6.01884 14.8583 6.17498L17.825 9.16664H0.833333C0.61232 9.16664 0.400358 9.25444 0.244078 9.41072C0.0877974 9.567 0 9.77896 0 9.99998C0 10.221 0.0877974 10.433 0.244078 10.5892C0.400358 10.7455 0.61232 10.8333 0.833333 10.8333H17.875L14.8583 13.8416C14.7802 13.9191 14.7182 14.0113 14.6759 14.1128C14.6336 14.2144 14.6118 14.3233 14.6118 14.4333C14.6118 14.5433 14.6336 14.6522 14.6759 14.7538C14.7182 14.8553 14.7802 14.9475 14.8583 15.025C14.9358 15.1031 15.028 15.1651 15.1295 15.2074C15.2311 15.2497 15.34 15.2715 15.45 15.2715C15.56 15.2715 15.6689 15.2497 15.7705 15.2074C15.872 15.1651 15.9642 15.1031 16.0417 15.025L19.2667 11.7916C19.7348 11.3229 19.9978 10.6875 19.9978 10.025C19.9978 9.36248 19.7348 8.72706 19.2667 8.25831Z"
              fill="#BFB3EE"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
    <nav class="s-college-head__nav">
      <div class="container">
        <ul class="f-text-m">
          <NuxtLink :to="`/college/${collegeId}`" test-id="link-s-college-head-nav-1"><li>О колледже</li></NuxtLink>
          <NuxtLink :to="`/college/${collegeId}/contacts`" test-id="link-s-college-head-nav-2"
            ><li>Контакты</li></NuxtLink
          >
          <NuxtLink :to="`/college/${collegeId}/specialties`" test-id="link-s-college-head-nav-3"
            ><li>Специальности</li></NuxtLink
          >
          <NuxtLink :to="`/college/${collegeId}/professions`" test-id="link-s-college-head-nav-4"
            ><li>Профессии</li></NuxtLink
          >
          <NuxtLink v-if="false" :to="`/college/${collegeId}/gallery`" test-id="link-s-college-head-nav-51"
            ><li>Галерея</li></NuxtLink
          >
          <NuxtLink v-if="false" :to="`/college/${collegeId}/reviews`" test-id="link-s-college-head-nav-6"
            ><li>Отзывы</li></NuxtLink
          >
          <NuxtLink :to="`/college/${collegeId}/questions`" test-id="link-s-college-head-nav-7"
            ><li>Вопросы</li></NuxtLink
          >
        </ul>
      </div>
    </nav>
  </section>
</template>

<script setup>
import { getIncludeData } from '~/composables/getIncludeData';

const props = defineProps({
  collegeId: { type: String, default: '' },
  info: { type: Object, default: () => ({}) },
  included: { type: Object, default: () => ({}) },
});

const breadcrumbs = computed(() => {
  return [{ label: 'Колледжи', link: '/colleges' }, { label: `${props.info.attributes.short_name}` }];
});

const logo = computed(() => {
  let arr = getIncludeData(props.info, props.included, 'media');
  return arr.pop().attributes.url;
});

const city = computed(() => {
  return getIncludeData(props.info, props.included, 'city');
});

const monitorings = ref({});

watch(
  () => props.included,
  (included) => {
    monitorings.value = included
      .filter(({ type }) => type === 'monitorings')
      .reduce((acc, { attributes: { label, value } }) => {
        const numWithoutComma = value.replace(',', '.');
        const numWithTwoDecimalPlaces = parseFloat(numWithoutComma).toFixed(2);

        acc[label] = numWithTwoDecimalPlaces.replace('.', ',');

        return acc;
      }, {});
  },
  { deep: true },
);

const forms = computed(() => {
  return getIncludeData(props.info, props.included, 'forms');
});

const duration = computed(() => {
  let years = props.info.attributes.calc_data.min_duration / 12;
  years = Math.floor(years);
  let months = props.info.attributes.calc_data.min_duration % 12;
  let durationText;
  if (years == 1) {
    durationText = `от ${years} года ${months} мес.`;
  } else if (years > 1) {
    durationText = `от ${years} лет ${months} мес.`;
  } else {
    durationText = `от ${months} мес.`;
  }
  return durationText;
});
</script>

<style>
@import './s-college-head.scss';
</style>
