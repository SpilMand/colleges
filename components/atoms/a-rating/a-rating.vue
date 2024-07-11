<template>
  <div class="a-rating" :class="{'notMain': !isMain}">
    <div class="a-rating__stars">
      <img src="/icons/star-full.svg" alt="">
      <img src="/icons/star-full.svg" alt="">
      <img src="/icons/star-full.svg" alt="">
      <img src="/icons/star-full.svg" alt="">
      <img src="/icons/star-full.svg" alt="">
      <span class="f-text-l orange">{{ rating }}</span>
    </div>
    <div class="a-rating__params">
      <div class="a-rating__param">
        <div id="edu-range" class="a-rating__param-range"></div>
        <div class="a-rating__param-label f-text-xxs">Обучение</div>
      </div>
      <div class="a-rating__param">
        <div id="atmosphere-range" class="a-rating__param-range"></div>
        <div class="a-rating__param-label f-text-xxs">Атмосфера</div>
      </div>
      <div class="a-rating__param">
        <div id="teachers-range" class="a-rating__param-range"></div>
        <div class="a-rating__param-label f-text-xxs">Преподаватели</div>
      </div>
      <div class="a-rating__param">
        <div id="activity-range" class="a-rating__param-range"></div>
        <div class="a-rating__param-label f-text-xxs">Активность
          <img src="/icons/info.svg" alt="" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
          <div
            v-if="showTooltip"
            class="a-rating__param-tooltip"
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
          >
            Активности в колледже: студенческая жизнь, поездки, экскурсии, КВН, выставки, олимпиады и др.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  rating: { type: Number, default: 0 },
  edu: { type: String, default: '50%' },
  atmosphere: { type: String, default: '50%' },
  teachers: { type: String, default: '50%' },
  activity: { type: String, default: '50%' },
  isMain: { type: Boolean, default: false },
})
const showTooltip = ref(false);
</script>

<style lang="scss">
  @import './a-rating.scss';
  #edu-range {
    &::after {
      width: v-bind('edu');
    }
  }
  #atmosphere-range {
    &::after {
      width: v-bind('atmosphere');
    }
  }
  #teachers-range {
    &::after {
      width: v-bind('teachers');
    }
  }
  #activity-range {
    &::after {
      width: v-bind('activity');
    }
  }
</style>
