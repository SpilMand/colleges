<template>
  <section v-if="info.attributes" class="s-contacts">
    <h3 v-if="!isAdmission" class="title-h3">{{ pageTitle }}</h3>
    <h3 v-else class="title-h3">Приемная комиссия колледжа</h3>
    <div class="s-contacts__content f-text-m" :class="{ isAdmission: isAdmission }">
      <div class="s-contacts__contact s-contacts__phone">
        <img src="/icons/phone.svg" alt="" />
        <span v-for="(phone, index) in info.attributes.phone" :key="index">{{ phone }}</span>
      </div>
      <div v-if="isAdmission" class="s-contacts__contact location">
        <img src="/icons/location.svg" alt="" />
        <span>г. {{ city.attributes.name }}, {{ info.attributes.address }}</span>
      </div>
      <div class="s-contacts__contact">
        <img src="/icons/internet.svg" alt="" />
        <a :href="info.attributes.site" target="blank">{{ info.attributes.site }}</a>
      </div>
      <!-- <div v-if="isAdmission" class="s-contacts__contact">
        <img src="/icons/calendar.svg" alt="" />
        <span>{{ contacts.attributes.schedule[0].days }}: {{ contacts.attributes.schedule[0].time }}</span>
      </div> -->
      <div class="s-contacts__contact">
        <img src="/icons/mail.svg" alt="" />
        <span>{{ info.attributes.email[0] }}</span>
      </div>
      <div v-if="!isAdmission" class="s-contacts__contact location">
        <img src="/icons/location.svg" alt="" />
        <span>г. {{ city.attributes.name }}, {{ info.attributes.address }}</span>
      </div>
      <!-- <div v-if="isAdmission" class="s-contacts__contact">
        <img src="/icons/college.svg" alt="" />
        <span>Приемная комиссия работает круглый год</span>
        {{ startDate }} - {{ endDate }}
      </div> -->
      <!-- <div v-if="!isAdmission" class="s-contacts__actions">
        <a href="">
          <img src="/icons/telegram-white.svg" alt="" />
        </a>
        <a href="">
          <img src="/icons/youtube-white.svg" alt="" />
        </a>
        <a href="">
          <img src="/icons/dzen-white.svg" alt="" />
        </a>
        <a href="">
          <img src="/icons/vk-white.svg" alt="" />
        </a>
      </div> -->
      <m-map
        v-if="!isAdmission && info.attributes.coordinates"
        class="s-contacts__map"
        :markers="markers"
        :center="coordinates"
      />
      <s-feedback />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  info: { type: Object, default: () => ({}) },
  city: { type: String, default: '' },
  contacts: { type: Object, default: () => ({}) },
  isAdmission: { type: Boolean, default: false },
  pageTitle: { type: String, default: 'Контакты колледжа' },
});

const coordinates = computed(() => {
  let arr = props.info.attributes.coordinates.split(/\s*,\s*/);
  arr = arr.reverse();
  arr = arr.map((num) => {
    return Number(num);
  });
  return arr;
});

const markers = computed(() => {
  return { data: [props.info] };
});

const dateOptions = ref({
  day: 'numeric',
  month: 'long',
});

// const startDate = computed(() => {
//   let date = new Date(props.contacts.attributes.start_date);
//   date = date.toLocaleDateString('ru', dateOptions.value);
//   return date;
// });

const endDate = computed(() => {
  let date = new Date(props.contacts.attributes.end_date);
  date = date.toLocaleDateString('ru', dateOptions.value);
  return date;
});
</script>

<style>
@import './s-contacts.scss';
</style>
