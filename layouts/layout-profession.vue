<template>
  <s-header class="s-header" />
  <s-profession-head :info="content" :professionId="route.params.id" :page="page" />
  <main class="layout-profession container">
    <div class="layout-profession__grid">
      <div class="layout-profession__grid-main">
        <NuxtPage :info="content" @forWhat="forWhat" @needBlocks="needBlocks" />
      </div>
      <div class="layout-profession__grid-right">
        <s-feedback :isMobile="false" :collegeHelp="true" />
      </div>
    </div>
    <s-form id="form" class="section-l" />
    <!-- <s-colleges v-if="moreCollegesNeed" :title="subTitle" titleSize="h4" />
    <s-professions v-else :title="subTitle" titleSize="h4" /> -->
    <s-professions :apiProfessions="contentSimilar" title="Похожие профессии:" titleSize="h4" />
  </main>
  <s-footer class="s-footer" />
</template>

<script setup>
import getProfession from '~/api/professions/getProfession';
import getProfessions from '~/api/professions/getProfessions';
import getOkso from '~/api/okso/getOkso';
const page = ref();
const headTitle = ref();
const route = useRoute();
const content = ref({});
const contentSimilar = ref({});
const forWhat = (what, title) => {
  page.value = what;
  headTitle.value = title;
};

onMounted(async () => {
  await loadData();
});

async function loadData() {
  if (route.params.id) {
    if (page.value === 'profession') {
      content.value = await getProfession(route.params.id);
    } else {
      content.value = await getOkso(route.params.id);
    }
  }
  contentSimilar.value = await getProfessions({
    'page[size]': 10,
  });
}

watch(page, async () => {
  await loadData();
});

const moreCollegesNeed = ref(false);
const subTitle = ref();

const needBlocks = (isColleges, text) => {
  moreCollegesNeed.value = isColleges;
  subTitle.value = text;
};
</script>

<style lang="scss">
.layout-profession {
  margin-top: var(--a-margin-x6);
  &__grid {
    @media (min-width: 1550px) {
      display: grid;
      column-gap: 2%;
      grid-template-columns: 75% 23%;
      .layout-profession__grid-right {
        display: flex;
      }
    }
    &-right {
      display: none;
      @media (min-width: 1550px) {
        margin-top: var(--a-margin-x20);
      }
    }
  }
}
</style>
