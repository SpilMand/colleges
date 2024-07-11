<template>
  <div class="a-loading">
    <div class="a-loading__progress" :style="{ width: progress + '%' }"></div>
  </div>
</template>
<script setup>
// Принимаем пропсы progress и isLoading
defineProps({
  progress: {
    type: Number,
    required: true,
  },
});
</script>
<style scoped>
.a-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: var(--color-violet-10);
  z-index: 9999;
}

.a-loading__progress {
  height: 100%;
  background-color: var(--color-violet-80);
  transition: width 0.3s ease;
}
</style>
