<template>
  <s-header />
  <s-college-head v-if="info" :info="info.data" :included="info.included" :collegeId="route.params.id" />
  <main class="layout-college-review">
    <div class="container">
      <div class="layout-college-review__inner">
        <div class="layout-college-review__right">
          <div class="layout-college-review__right-inner">
            <a-rating :isMain="true" />
            <a-button
              label="Оставить отзыв"
              color="orange"
              test-id="btn-college-reviews-send"
              @click="navigateTo('#review-send')"
            />
            <a-button
              label="Фильтры по отзывам"
              :img="arrowDown"
              :needRot="true"
              test-id="btn-college-reviews-filter"
              @click="isFilterOpen = !isFilterOpen"
            />
            <div v-if="isFilterOpen" class="layout-college-review__filter">
              <div class="layout-college-review__filter-title f-text-m">Отзывы с оценками:</div>
              <div class="layout-college-review__filter-param">
                <input id="5star" type="checkbox" test-id="input-college-reviews-checkbox-stars-5" />
                <label for="5star">
                  <ul>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                  </ul>
                </label>
                <span class="layout-college-review__filter-count f-text-s gray">15</span>
              </div>
              <div class="layout-college-review__filter-param">
                <input id="4star" type="checkbox" test-id="input-college-reviews-checkbox-stars-4" />
                <label for="4star">
                  <ul>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                  </ul>
                </label>
                <span class="layout-college-review__filter-count f-text-s gray">15</span>
              </div>
              <div class="layout-college-review__filter-param">
                <input id="3star" type="checkbox" test-id="input-college-reviews-checkbox-stars-3" />
                <label for="3star">
                  <ul>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                  </ul>
                </label>
                <span class="layout-college-review__filter-count f-text-s gray">15</span>
              </div>
              <div class="layout-college-review__filter-param">
                <input id="2star" type="checkbox" test-id="input-college-reviews-checkbox-stars-2" />
                <label for="2star">
                  <ul>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                  </ul>
                </label>
                <span class="layout-college-review__filter-count f-text-s gray">15</span>
              </div>
              <div class="layout-college-review__filter-param">
                <input id="1star" type="checkbox" test-id="input-college-reviews-checkbox-stars-1" />
                <label for="1star">
                  <ul>
                    <li><img src="/icons/star-full.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                    <li><img src="/icons/star-stroke.svg" /></li>
                  </ul>
                </label>
                <span class="layout-college-review__filter-count f-text-s gray">15</span>
              </div>
            </div>
            <div v-if="isFilterOpen" class="layout-college-review__sort">
              <div class="layout-college-review__sort-title f-text-m">Сортировка:</div>
              <ul>
                <li>
                  <input id="1" type="radio" name="sort" test-id="input-college-reviews-sort-new" checked /><label
                    for="1"
                    >Сначала новые</label
                  >
                </li>
                <li>
                  <input id="2" type="radio" name="sort" test-id="input-college-reviews-sort-old" /><label for="2"
                    >Сначала старые</label
                  >
                </li>
                <li>
                  <input id="3" type="radio" name="sort" test-id="input-college-reviews-sort-high" /><label for="3"
                    >Сначала с выс. оценкой</label
                  >
                </li>
                <li>
                  <input id="4" type="radio" name="sort" test-id="input-college-reviews-sort-low" /><label for="4"
                    >Сначала с низ. оценкой</label
                  >
                </li>
                <li>
                  <input id="5" type="radio" name="sort" test-id="input-college-reviews-sort-usefull" /><label for="5"
                    >Сначала полезные</label
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="layout-college-review__content">
          <NuxtPage />
        </div>
      </div>
      <s-review-send class="section-m" />
    </div>
  </main>
  <s-footer />
</template>

<script setup>
import getCollege from '~/api/colleges/getCollege';

const route = useRoute();
const info = ref();

onMounted(async () => {
  info.value = await getCollege(route.params.id, {
    include: 'city,monitorings,forms,media',
  });
});

const isFilterOpen = ref(false);

const arrowDown = `<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.773247 0H8.22658C8.35843 0.000552821 8.48715 0.0401894 8.59647 0.113898C8.7058 0.187607 8.79081 0.292077 8.84076 0.414099C8.89071 0.53612 8.90336 0.670213 8.8771 0.799422C8.85084 0.928631 8.78686 1.04715 8.69325 1.14L4.97325 4.86C4.91127 4.92249 4.83754 4.97208 4.7563 5.00593C4.67506 5.03977 4.58792 5.0572 4.49991 5.0572C4.41191 5.0572 4.32477 5.03977 4.24353 5.00593C4.16229 4.97208 4.08856 4.92249 4.02658 4.86L0.30658 1.14C0.212966 1.04715 0.148985 0.928631 0.122728 0.799422C0.0964714 0.670213 0.109118 0.53612 0.159068 0.414099C0.209018 0.292077 0.29403 0.187607 0.403352 0.113898C0.512674 0.0401894 0.641398 0.000552821 0.773247 0Z" fill="#977AD6"/>
</svg>`;
</script>

<style lang="scss">
.layout-college-review {
  margin-top: var(--a-margin-x12);
  &__inner {
    position: relative;
    @media (min-width: 980px) {
      width: 100%;
      display: grid;
      column-gap: 2%;
      grid-template-columns: 23% 75%;
    }
    @media (min-width: 1280px) {
      grid-template-columns: 75% 23%;
    }
  }
  &__content {
    @media (min-width: 1280px) {
      grid-row: 1/2;
    }
  }
  &__main {
    max-width: 100%;
  }
  &__right {
    @media (min-width: 1280px) {
      grid-column: 2/3;
    }
    &-inner {
      position: sticky;
      top: to-rem(80);
      display: flex;
      flex-direction: column;
      gap: to-rem(24);
      margin-bottom: to-rem(32);
      @media (min-width: 980px) {
        margin-bottom: to-rem(116);
      }
      .a-button {
        width: 100%;
      }
    }
  }
  &__filter {
    display: flex;
    flex-direction: column;
    gap: to-rem(8);
    &-title {
      margin-bottom: var(--a-margin-x1);
    }
    &-param {
      display: flex;
      align-items: center;
      gap: to-rem(12);
    }
    ul {
      display: flex;
      align-items: center;
      gap: to-rem(4);
    }
  }
  &__sort {
    &-title {
      margin-bottom: var(--a-margin-x3);
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: to-rem(8);
    }
    li {
      input {
        margin-right: var(--a-margin-x3);
      }
    }
  }
  input[type='checkbox'],
  input[type='radio'] {
    position: relative;
    &::after {
      content: '';
      width: to-rem(16);
      height: to-rem(16);
      position: absolute;
      top: 50%;
      left: 50%;
      margin: to-rem(-8) 0 0 to-rem(-8);
      border: to-rem(1) solid var(--color-violet-100);
      background: var(--color-white) no-repeat center;
      border-radius: var(--border-radius-x1);
    }
    &:checked {
      &::after {
        background-image: url('/icons/check.svg');
      }
    }
  }
}
</style>
