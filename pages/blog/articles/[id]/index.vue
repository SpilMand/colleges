<template>
  <div class="blog-article">
    <s-toc :text="info.data?.attributes.short_text" :title="title" />
    <img :src="preview?.attributes.url" class="blog-article__preview" />
    <div class="blog-article__content" v-html="info.data?.attributes.full_text" />
    <div class="blog-article__info">
      <div class="blog-article__author">
        <span class="blog-article__author-title f-text-m f-font-700">Автор:</span>
        <div class="blog-article__author-info">
          <img src="/img/article/author.png" alt="" />
          <span class="blog-article__author-name f-text-s">{{ author?.data?.attributes.name }}</span>
        </div>
      </div>
      <!-- <div class="blog-article__share">
        <div class="blog-article__share-title f-text-m f-font-700">Поделиться</div>
        <div class="blog-article__share-actions">
          <div class="blog-article__share-action">
            <img src="/icons/share-link.svg" alt="" />
          </div>
          <div class="blog-article__share-action">
            <img src="/icons/vk-white.svg" alt="" />
          </div>
          <div class="blog-article__share-action">
            <img src="/icons/telegram-white.svg" alt="" />
          </div>
        </div>
      </div> -->
    </div>
    <!-- <s-ask placeholder="Оставить комментарий…" btnText="Отправить" /> -->
  </div>
</template>

<script setup>
import { getIncludeData } from '~/composables/getIncludeData';

const props = defineProps({
  info: { type: Object, default: () => ({}) },
  author: {
    type: Object,
    default: () => {
      {
      }
    },
  },
});

const title = ref('Содержание статьи');

watch(
  () => props.info,
  (info) => {
    const pageTitle = ref(info.data?.attributes.name);

    useHead({
      title: `${pageTitle.value} | Колледжи.рф`,
      // eslint-disable-next-line max-len
      description: `${pageTitle.value}. Лучший сайт для абитуриентов колледжей. Помогаем с подбором профессии, сравнением колледжей, подсчетом баллов ЕГЭ и ОГЭ. Начните путь к успешной карьере с нами!`,
    });
  },
  { immediate: true },
);

definePageMeta({
  layout: 'layout-article',
});

const emit = defineEmits(['setType']);

onMounted(() => {
  emit('setType', false);
});

const preview = computed(() => {
  const arr = getIncludeData(props.info.data, props.info.included, 'media');
  return arr.find((element) => element.attributes.collection_name === 'preview');
});
</script>

<style lang="scss">
@import './blog-article.scss';
</style>
