<template>
  <div v-if="markers.data" class="m-map">
    <client-only>
      <yandex-map ref="map" v-model="map" :settings="settings" width="100%" height="100%" @sizechange="changeZoom">
        <yandex-map-default-features-layer />
        <yandex-map-default-scheme-layer />
        <yandex-map-clusterer v-model="clusterer" :grid-size="2 ** gridSize" zoom-on-cluster-click>
          <yandex-map-marker
            v-for="(marker, index) in markers.data"
            :id="marker.id"
            :key="index"
            :settings="{
              coordinates: marker.attributes.coordinates.split(/\s*,\s*/).reverse(),
            }"
            position="top-center left-center"
          >
            <div class="m-map__point">
              <div class="m-map__nameuniversity f-font-700 f-text-xxs" @click="openCard($event.target)">
                <span :class="{ active: marker.isActive }">
                  {{ marker.attributes.short_name }}
                  <!-- {{ marker.attributes.coordinates }} -->
                  <div class="m-map__nameuniversity-arrow" v-html="arrow" />
                </span>
                <div class="m-map__carduniversity">
                  <div class="m-map__carduniversity-info">
                    <img
                      class="m-map__carduniversity-logo"
                      :src="marker.attributes.calc_data.logo_url"
                      :alt="marker.attributes.name"
                      :class="{ 'no-logo': !marker.attributes.calc_data.logo_url }"
                    />
                    <div class="m-map__carduniversity-text">
                      <span v-if="marker.isActive" class="green f-font-500">Идёт набор</span>
                      <p class="m-map__carduniversity-name f-text-xxs f-font-700">
                        {{ marker.attributes.name }}
                      </p>
                      <p
                        v-if="marker?.attributes?.faculties_addresses"
                        class="m-map__carduniversity-address f-text-xxs f-font-500"
                      >
                        {{ marker.attributes.calc_data.city }},
                        {{ marker.attributes.faculties_addresses[0] }}
                      </p>
                    </div>
                    <img class="m-map__carduniversity-close" src="/icons/close.svg" alt="" @click="closeCard" />
                  </div>
                  <NuxtLink :to="{ path: `/college/${marker.id}` }" class="violet-100 f-text-xs f-font-700"
                    >Профиль колледжа</NuxtLink
                  >
                  <div class="m-map__carduniversity-arrow" v-html="cardArrow" />
                </div>
              </div>
            </div>
          </yandex-map-marker>
          <template #cluster="{ length }">
            <div class="m-map__cluster f-text-m">
              {{ length }}
            </div>
          </template>
        </yandex-map-clusterer>
      </yandex-map>
    </client-only>
    <div class="m-map__zoom">
      <button class="m-map__zoom-plus" @click="changeZoom(1)">+</button>
      <button class="m-map__zoom-minus" @click="changeZoom(-1)">-</button>
    </div>
    <!-- <div class="debug f-text-xxs">
      <span v-for="(marker, index) in markers.data" :key="index">
        {{ getIncludeData(marker, markers.included, 'city').attributes.name }} - {{ marker.attributes.coordinates }}<br>
      </span>
    </div> -->
  </div>
</template>

<script setup>
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
  YandexMapClusterer,
} from 'vue-yandex-maps';
// import { getIncludeData } from '~/composables/getIncludeData';

const props = defineProps({
  markers: { type: Object, default: () => ({}) },
  gridSize: { type: Number, default: 8 },
  // center: { type: Array, default: () => ['37.617644', '55.755819'] }
});

const settings = computed(() => {
  return {
    location: {
      center: props.markers.data[0].attributes.coordinates.split(/\s*,\s*/).reverse(),
      zoom: 9,
    },
    mapsRenderWaitDuration: false,
  };
});

// const gridSize = computed(() => {
//   return 9 / settings.value.location.zoom;
// })

const openCard = (element) => {
  if (document.querySelector('.card-opened')) {
    closeCard();
  }
  element.classList.add('card-opened');
};
const closeCard = () => {
  document.querySelector('.card-opened').classList.remove('card-opened');
};

const changeZoom = (value) => {
  settings.value.location.zoom += value;
};

const arrow = `<svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.87796 8.7998C7.67858 9.03003 7.32142 9.03003 7.12204 8.7998L2.81575 3.82733C2.53531 3.5035 2.76533 3 3.19371 3L11.8063 3C12.2347 3 12.4647 3.5035 12.1843 3.82733L7.87796 8.7998Z" fill="white" stroke="#4C3B8A"/>
<path d="M8.67202 3.99574C7.8827 4.00506 8.41842 3.99627 7.8827 3.99574L2.48405 3.99574C1.5217 3.24588 2.04172 2 3.62352 2H11.4182C12.8087 2 13.52 3.24588 12.5577 3.99574H8.67202Z" fill="white"/>
</svg>`;
const cardArrow = `<svg width="36" height="23" viewBox="0 0 36 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2391 20.9883L1.89514 8.11444C-0.848089 5.25346 1.17961 0.5 5.14326 0.5H29.8313C33.7949 0.5 35.8226 5.25345 33.0794 8.11444L20.7354 20.9883C18.964 22.8357 16.0105 22.8357 14.2391 20.9883Z" fill="#F6F6F6" stroke="#DBD8E8"/>
<path d="M21.31 8.99761C18.789 9.03963 20.5 9 18.789 8.99761L1.54601 8.99761C-1.52767 5.61693 0.133253 0 5.1854 0H30.0812C34.5223 0 36.7942 5.61692 33.7206 8.99761H21.31Z" fill="#F6F6F6"/>
</svg>`;
</script>
<style>
@import './m-map.scss';
</style>
