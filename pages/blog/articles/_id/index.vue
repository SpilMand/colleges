<template>
  <div class="blog-article">
    <s-toc />
    <img src="/img/article/article-bg.png" alt="" />
    <p class="f-text-xl">
      В мире, где технологии развиваются с беспрецедентной скоростью, образование играет ключевую роль в подготовке
      молодых умов к предстоящим вызовам. С этой целью был разработан и запущен инновационный курс обучения, призванный
      не только передать студентам актуальные знания, но и научить их адаптироваться к постоянно меняющемуся будущему.
    </p>
    <h5 class="title-h5">Цель курса</h5>
    <p class="f-text-xl">
      Основная цель курса — подготовить студентов к работе в высокотехнологичных и динамично меняющихся отраслях,
      развить у них гибкость мышления и способность быстро осваивать новые навыки. В программе курса уделено внимание не
      только техническим и специализированным дисциплинам, но и развитию критического мышления, умения работать в
      команде и адаптивности.
    </p>
    <h5 class="title-h5">Структура курса</h5>
    <p class="f-text-xl">
      Курс включает в себя несколько модулей, каждый из которых посвящён определённому аспекту современного мира:
      искусственный интеллект, большие данные, кибербезопасность, устойчивое развитие, цифровое предпринимательство и
      другие. Обучение проходит в интерактивной форме с использованием последних достижений в области образовательных
      технологий, включая виртуальную и дополненную реальность.
    </p>
    <s-quote />
    <s-article-image image="/img/article/article-image-1.jpg" subtitle="Фото: Мина Омар, бриф для «SOUL nails»" />
    <s-article-table />
    <h5 class="title-h5">Четыре совета будущим моушн-дизайнерам</h5>
    <p class="f-text-xl">
      Куратор программы «Основы моушн-дизайна» Анна Мазина о том, без чего невозможно построить карьеру:
    </p>
    <ul class="f-text-xl">
      <li>
        Прокачивайте базу. В сочетании «моушн-дизайн» вторая часть — важнее. Моушн никогда не идет сам по себе, это
        всегда продолжение общей концепции. Поэтому необходимо познакомиться с основами работы с цветом и светом,
        подружиться с типографикой и иллюстрацией.
      </li>
      <li>
        Вложитесь в технику. Позаботьтесь о том, чтобы ваш компьютер выдерживал нагрузку, а видеокарта была совместима с
        нужным софтом.
      </li>
      <li>
        Постоянно развивайтесь. В моушн, как и в любом направлении дизайна, не получится стоять на месте. Программы
        постоянно обновляются, появляются новые тренды. Освоили новую фичу — быстрее примените в работе или просто в
        жизни (можно сделать классное видеопоздравление коллеге или бабушке).
      </li>
    </ul>
    <s-article-image
      image="/img/article/article-image-2.jpg"
      subtitle="Иллюстрация: Мина Омар, бриф для «SOUL nails»"
    />
    <div class="blog-article__form">
      <s-form class="blog-article__form" />
    </div>
    <h5 class="title-h5">Четыре совета будущим моушн-дизайнерам</h5>
    <p class="f-text-xl">
      Куратор программы «Основы моушн-дизайна» Анна Мазина о том, без чего невозможно построить карьеру:
    </p>
    <ul class="f-text-xl">
      <li>
        Прокачивайте базу. В сочетании «моушн-дизайн» вторая часть — важнее. Моушн никогда не идет сам по себе, это
        всегда продолжение общей концепции. Поэтому необходимо познакомиться с основами работы с цветом и светом,
        подружиться с типографикой и иллюстрацией.
      </li>
      <li>
        Вложитесь в технику. Позаботьтесь о том, чтобы ваш компьютер выдерживал нагрузку, а видеокарта была совместима с
        нужным софтом.
      </li>
      <li>
        Постоянно развивайтесь. В моушн, как и в любом направлении дизайна, не получится стоять на месте. Программы
        постоянно обновляются, появляются новые тренды. Освоили новую фичу — быстрее примените в работе или просто в
        жизни (можно сделать классное видеопоздравление коллеге или бабушке).
      </li>
    </ul>
    <s-article-image image="/img/article/article-video.jpg" subtitle="Видео: Мина Омар, бриф для «SOUL nails»" />
    <div class="blog-article__info">
      <div class="blog-article__author">
        <span class="blog-article__author-title f-text-m f-font-700">Автор:</span>
        <div class="blog-article__author-info">
          <img src="/img/article/author.png" alt="" />
          <span class="blog-article__author-name f-text-s">Мария Косыренкова</span>
        </div>
      </div>
      <div class="blog-article__share">
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
      </div>
    </div>
    <s-ask placeholder="Оставить комментарий…" btnText="Отправить" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'layout-article',
});

const emit = defineEmits(['setType']);

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

  .s-ask {
    &__textarea {
      max-width: unset;
      textarea {
        min-height: to-rem(160);
      }
    }
  }
}
</style>
