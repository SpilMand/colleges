<template>
  <div class="container">
    <a-breadcrumbs :items="breadcrumbs" />
  </div>
  <s-advertiser />
</template>

<script setup>
const breadcrumbs = [{ label: 'Информация о рекламодателе', link: '/advertiser' }];
</script>
