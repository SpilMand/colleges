<template>
  <div class="blog-article">
    <s-toc v-if="info.data?.attributes.short_text" :text="info.data?.attributes.short_text" :title="title" />
    <!-- <div v-for="(tag, index) in tags" :key="index" class="blog-article__tags-tag">
      {{ tag.theme }}
    </div> -->
    <img v-if="preview?.attributes?.url" :src="preview?.attributes.url" class="blog-article__preview" />
    <div class="blog-article__content" v-html="info.data?.attributes.full_text" />

    <!-- <div v-if="mediaUrls.length > 0" class="blog-article__pic">
      <ul>
        <li v-for="(pic, index) in mediaUrls" :key="index">
          <img :src="pic" alt="" />
        </li>
      </ul>
    </div> -->
    <div class="blog-article__author">
      <span class="blog-article__author-title f-text-m f-font-700">Автор:</span>
      <div class="blog-article__author-info">
        <img src="/img/article/author.png" alt="" />
        <span class="blog-article__author-name f-text-s">{{ author?.data?.attributes.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'layout-news',
});

const props = defineProps({
  info: { type: Object, default: () => ({}) },
  included: { type: Array, default: () => [] },
  author: {
    type: Object,
    default: () => {
      {
      }
    },
  },
});

const title = ref('Содержание новости');

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

const emit = defineEmits(['setType']);

const { info } = toRefs(props);

// const mediaUrls = computed(() => {
//   if (!info.value || !info.value.data || !info.value.included) {
//     return [];
//   }

//   const mediaIds = info.value.data.relationships.media.data.map((media) => media.id);
//   return info.value.included
//     .filter((mediaItem) => mediaIds.includes(mediaItem.id))
//     .map((mediaItem) => mediaItem.attributes.url);
// });

const preview = computed(() => {
  const arr = getIncludeData(props.info.data, props.info.included, 'media');
  return arr.find((element) => element.attributes.collection_name === 'preview');
});

onMounted(() => {
  emit('setType', false);
});
</script>

<style lang="scss">
.blog-article {
  display: flex;
  flex-direction: column;
  gap: to-rem(24);
  @media (min-width: 1280px) {
    gap: to-rem(32);
  }

  &__form {
    .s-form__wrapper {
      padding: var(--a-padding-x16) !important;
    }
  }

  &__info {
    display: flex;
    gap: to-rem(24);
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  &__author {
    display: flex;
    flex-direction: column;
    gap: to-rem(12);
    @media (min-width: 1280px) {
      gap: to-rem(16);
    }

    &-info {
      display: flex;
      align-items: center;
      gap: to-rem(8);
    }
  }

  &__share {
    display: flex;
    flex-direction: column;
    gap: to-rem(12);
    @media (min-width: 1280px) {
      gap: to-rem(16);
    }

    &-actions {
      display: flex;
      gap: to-rem(8);
    }
    &-action {
      background-color: var(--color-black);
      padding: to-rem(10);
      width: to-rem(40);
      height: to-rem(40);
      border-radius: 50%;
      @media (min-width: 1280px) {
        width: to-rem(48);
        height: to-rem(48);
        padding: var(--a-padding-x3);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &__preview {
    height: to-rem(542);
  }

  &__content {
    p {
      margin-bottom: to-rem(22);
    }
  }
}
</style>
