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
          <div v-if="info.attributes.accreditation_number == ''" class="s-college-head__tags-tag red">
            Не аккредитован
          </div>
          <div v-else class="s-college-head__tags-tag green">Аккредитован</div>
        </div>
        <h5 class="title-h5">{{ info.attributes.name }}</h5>
        <div class="s-college-head__sub f-text-s f-font-700">
          <div class="s-college-head__sub-block average-score">
            <label class="f-text-xs f-font-500">средний проходной балл</label>
            <div>
              <span class="s-font-500">бюджет</span>
              <span v-if="monitorings.length > 1" class="black">
                {{ monitorings[4]?.attributes?.value || '−' }}
              </span>
              <span v-else class="black">-</span>
            </div>
            /
            <div>
              <span class="s-font-500">платно</span>
              <span v-if="monitorings.length > 1" class="black">
                {{ monitorings[5]?.attributes?.value || '−' }}
              </span>
              <span v-else class="black">-</span>
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
            {{ info.attributes.calc_data.budget_places || 'нет' }}
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
        <NuxtLink class="s-college-head__action btn">
          Филиалы: <b class="f-text-s">нет</b>
        </NuxtLink>
        <NuxtLink class="s-college-head__action btn">
          Специальности:
          <b class="f-text-s">{{ info.attributes.calc_data.count_specialties }}</b>
        </NuxtLink>
        <NuxtLink class="s-college-head__action btn">
          Профессии:
          <b class="f-text-s">{{ info.attributes.calc_data.count_professions }}</b>
        </NuxtLink>
      </div>
    </div>
    <nav class="s-college-head__nav">
      <div class="container">
        <ul class="f-text-m">
          <NuxtLink :to="`/college/${collegeId}`"><li>О колледже</li></NuxtLink>
          <NuxtLink :to="`/college/${collegeId}/contacts`"><li>Контакты</li></NuxtLink>
          <NuxtLink :to="`/college/${collegeId}/specialties`"><li>Специальности</li></NuxtLink>
          <NuxtLink :to="`/college/${collegeId}/professions`"><li>Профессии</li></NuxtLink>
          <!-- <NuxtLink :to="`/college/${collegeId}/gallery`"><li>Галерея</li></NuxtLink>
          <NuxtLink :to="`/college/${collegeId}/reviews`"><li>Отзывы</li></NuxtLink> -->
          <NuxtLink :to="`/college/${collegeId}/questions`"><li>Вопросы</li></NuxtLink>
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
  let arr = getIncludeData(props.info, props.included, 'galleries');
  return arr.pop().attributes.url;
});

const city = computed(() => {
  return getIncludeData(props.info, props.included, 'city');
});

const monitorings = computed(() => {
  return getIncludeData(props.info, props.included, 'monitorings');
});

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
