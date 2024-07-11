<template>
  <div class="m-reviews-card">
    <div class="m-reviews-card__img">
      <img
        :src="reviews?.galleries[0]?.url ? reviews.galleries[0]?.url : '/img/reviews/reviews-1.png'"
        :alt="reviews?.name"
        class="lazy"
      />
    </div>
    <div class="m-reviews-card__content">
      <div class="m-reviews-card__name f-text-m mbx2">{{ reviews?.name }}</div>
      <p class="m-reviews-card__desc mbx4 f-text-xs gray">
        {{ reviews?.short_text }}
      </p>
      <div ref="blockContentRef" class="m-reviews-card__text" :class="{ show: showClass }">
        <div ref="textContentRef" :class="{ show: showClasstext }" class="f-text-m" v-html="reviews?.full_text"></div>
      </div>
    </div>
    <div v-if="showMoreButton" class="m-reviews-card__more f-text-m f-link" @click="toggleMoreContent">
      {{ more }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  reviews: { type: Object, default: () => ({}) },
});

const blockContentRef = ref(null);
const textContentRef = ref(null);
const showMoreButton = ref(false);
const showClass = ref(false);
const showClasstext = ref(false);

onMounted(() => {
  nextTick(() => {
    if (textContentRef.value.clientHeight > blockContentRef.value.clientHeight) {
      showMoreButton.value = true;
      showClasstext.value = true;
    }
  });
});

const toggleMoreContent = () => {
  showClass.value = true;
  showMoreButton.value = false;
  showClasstext.value = false;
};

const more = ref('Читать полностью');
</script>
<style lang="scss">
@import './m-reviews-card.scss';
</style>
