<template>
  <div class="m-review-card">
    <div class="m-review-card__inner">
      <a-rating :rating="rating" :edu="edu" :atmosphere="atmosphere" :teachers="teachers" :activity="activity" />
      <div class="m-review-card__review f-text-s">
        <div class="m-review-card__info">
          <span class="m-review-card__name f-text-m f-font-700">Владислав Пономарев</span>
          <span class="m-review-card__date f-text-xxs gray">30 ноября 2023</span>
        </div>
        <p class="m-review-card__review-text" :class="{ opened: isOpenedReview }">{{ reviewText }}</p>
        <div class="m-review-card__more" @click="isOpenedReview = !isOpenedReview">
          <span v-if="isOpenedReview" class="violet-100">Свернуть</span>
          <span v-else class="violet-100">Читать больше</span>
          <img src="/icons/arrow-down-violet.svg" :class="{ active: isOpenedReview }" />
        </div>
        <div class="m-review-card__photos">
          <img v-for="(photo, index) in photos" :key="index" class="m-review-card__photo" :src="photo" />
        </div>
        <div v-if="answers.length > 0" class="m-review-card__more" @click="isOpenedAnswers = !isOpenedAnswers">
          <span class="violet-100">Ответы</span>
          <img src="/icons/arrow-down-violet.svg" :class="{ active: isOpenedAnswers }" />
        </div>
        <div v-if="answers.length > 0 && isOpenedAnswers" class="m-review-card__answers">
          <a-answer
            v-for="(answer, index) in answers"
            :key="index"
            :name="answer.name"
            :date="answer.date"
            :text="answer.text"
          />
        </div>
        <div class="m-review-card__actions">
          <a-button label="Оставить комментарий" color="outline" />
          <div class="m-review-card__action f-text-xs" @click="like">
            {{ likes }}
            <div v-html="likeIcon" />
          </div>
          <div class="m-review-card__action f-text-xs" @click="dislike">
            {{ dislikes }}
            <div v-html="likeIcon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: Number, default: 0 },
  reviewText: { type: String, default: '' },
  photos: { type: Array, default: () => [] },
  rating: { type: Number, default: 0 },
  edu: { type: String, default: '50%' },
  atmosphere: { type: String, default: '50%' },
  teachers: { type: String, default: '50%' },
  activity: { type: String, default: '50%' },
  answers: { type: Object, default: () => ({}) },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});
const emit = defineEmits(['changeLikes']);

const isOpenedReview = ref(false);
const isOpenedAnswers = ref(false);

const like = () => {
  emit('changeLikes', { id: props.id, likes: props.likes + 1 });
};
const dislike = () => {
  emit('changeLikes', { id: props.id, dislikes: props.dislikes + 1 });
};

const likeIcon = ref(`<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.773 8.2204C22.3041 7.68001 21.7245 7.24668 21.0736 6.94976C20.4226 6.65283 19.7155 6.49925 19 6.4994H15.011L15.347 4.4584C15.4659 3.73966 15.3225 3.00214 14.9429 2.38034C14.5633 1.75854 13.9728 1.29391 13.2792 1.07119C12.5856 0.848472 11.835 0.882502 11.1644 1.16708C10.4938 1.45165 9.94777 1.96781 9.626 2.6214L7.712 6.4994H5C3.67441 6.50099 2.40356 7.02828 1.46622 7.96562C0.528882 8.90296 0.00158786 10.1738 0 11.4994L0 16.4994C0.00158786 17.825 0.528882 19.0958 1.46622 20.0332C2.40356 20.9705 3.67441 21.4978 5 21.4994H18.3C19.5035 21.4945 20.6652 21.0577 21.5738 20.2686C22.4824 19.4794 23.0776 18.3903 23.251 17.1994L23.956 12.1994C24.0553 11.4901 24.001 10.7678 23.7969 10.0813C23.5928 9.39485 23.2437 8.76022 22.773 8.2204ZM2 16.4994V11.4994C2 10.7038 2.31607 9.94069 2.87868 9.37808C3.44129 8.81547 4.20435 8.4994 5 8.4994H7V19.4994H5C4.20435 19.4994 3.44129 19.1833 2.87868 18.6207C2.31607 18.0581 2 17.295 2 16.4994ZM21.971 11.9184L21.265 16.9184C21.1618 17.6324 20.8057 18.2856 20.2616 18.7593C19.7175 19.2329 19.0214 19.4956 18.3 19.4994H9V8.2334C9.09424 8.1513 9.17226 8.05225 9.23 7.9414L11.419 3.5064C11.5011 3.35833 11.6171 3.23185 11.7576 3.13736C11.8981 3.04287 12.059 2.98307 12.2271 2.96286C12.3952 2.94265 12.5657 2.96262 12.7246 3.02113C12.8834 3.07963 13.0262 3.175 13.141 3.2994C13.2392 3.41365 13.3111 3.54817 13.3513 3.69337C13.3916 3.83857 13.3994 3.99087 13.374 4.1394L12.846 7.3394C12.8228 7.48238 12.831 7.62869 12.8699 7.76821C12.9089 7.90772 12.9776 8.03711 13.0715 8.14743C13.1654 8.25775 13.2821 8.34636 13.4136 8.40713C13.545 8.4679 13.6882 8.49938 13.833 8.4994H19C19.4294 8.49934 19.8538 8.59147 20.2445 8.76955C20.6353 8.94763 20.9832 9.20751 21.2649 9.53164C21.5465 9.85576 21.7553 10.2366 21.8772 10.6483C21.999 11.0601 22.031 11.4932 21.971 11.9184Z" fill="#8E8E8E"/>
</svg>`);
</script>

<style scoped lang="scss">
@import './m-review-card.scss';
</style>
