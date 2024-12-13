<template>
  <section id="review-send" class="s-review-send">
    <h3 class="title-h3">Оставьте свой отзыв</h3>
    <div class="s-review-send__content">
      <form action="" class="s-review-send__form">
        <p class="subtitle f-font-700">Расскажите подробнее. Также вы можете приложить фото.</p>
        <div class="s-review-send__textarea f-text-s">
          <textarea ref="textarea" maxlength="1000" test-id="textarea-s-review-send" @input="enterText" />
          <!-- <img src="/icons/icon-size.svg" alt=""> -->
        </div>
        <span class="s-review-send__s-count f-text-xxs gray">{{ sCount }} / 1000</span>
        <div class="s-review-send__actions">
          <a-button label="Оставить отзыв" color="orange" test-id="btn-s-review-send-text" />
          <a-button label="Прикрепить файл" color="violet-5" test-id="btn-s-review-send-file" :img="paperClip" />
        </div>
      </form>
      <div class="s-review-send__rating f-font-700">
        <p class="subtitle">Дайте оценку колледжу</p>
        <div class="s-review-send__params">
          <div class="s-review-send__param">
            <ul>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
            </ul>
            <span class="f-text-l">Общая оценка</span>
          </div>
          <div class="s-review-send__param">
            <ul>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
            </ul>
            <span class="f-text-l">Обучение</span>
          </div>
          <div class="s-review-send__param">
            <ul>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
            </ul>
            <span class="f-text-l">Атмосфера</span>
          </div>
          <div class="s-review-send__param">
            <ul>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
            </ul>
            <span class="f-text-l">Преподаватели</span>
          </div>
          <div class="s-review-send__param">
            <ul>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
              <li><img src="/icons/star-stroke.svg" /></li>
            </ul>
            <div class="s-review-send__param-activity f-text-l">
              Активность
              <img src="/icons/info.svg" alt="" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" />
              <div
                v-if="showTooltip"
                class="s-review-send__param-tooltip f-text-s f-font-500"
                @mouseenter="showTooltip = true"
                @mouseleave="showTooltip = false"
              >
                Активности в колледже: студенческая жизнь, поездки, экскурсии, КВН, выставки, олимпиады и др.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const sCount = ref(0);
const textarea = ref(null);
const showTooltip = ref(false);

const enterText = () => {
  sCount.value = textarea.value.value.length;
};

const paperClip = `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2604_3042)">
<path d="M12 2.5C11.6333 2.5 11.3333 2.8 11.3333 3.16667V11.8333C11.3333 13.6733 9.83998 15.1667 7.99998 15.1667C6.15998 15.1667 4.66665 13.6733 4.66665 11.8333V3.83333C4.66665 2.73333 5.56665 1.83333 6.66665 1.83333C7.76665 1.83333 8.66665 2.73333 8.66665 3.83333V11.8333C8.66665 12.2 8.36665 12.5 7.99998 12.5C7.63331 12.5 7.33331 12.2 7.33331 11.8333V4.5C7.33331 4.13333 7.03331 3.83333 6.66665 3.83333C6.29998 3.83333 5.99998 4.13333 5.99998 4.5V11.8333C5.99998 12.9333 6.89998 13.8333 7.99998 13.8333C9.09998 13.8333 9.99998 12.9333 9.99998 11.8333V3.83333C9.99998 1.99333 8.50665 0.5 6.66665 0.5C4.82665 0.5 3.33331 1.99333 3.33331 3.83333V11.8333C3.33331 14.4067 5.42665 16.5 7.99998 16.5C10.5733 16.5 12.6666 14.4067 12.6666 11.8333V3.16667C12.6666 2.8 12.3666 2.5 12 2.5Z" fill="#4C3B8A"/>
</g>
</svg>`;
</script>

<style>
@import './s-review-send.scss';
</style>
