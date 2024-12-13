<template>
  <div class="a-slider">
    <div class="a-slider__numbers">
      <span class="a-slider__number-min">{{ min }}</span>
      <input
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :value="isNaN(maxVal) ? max : maxVal"
        :placeholder="max"
        @input="setCost('max_cost', $event)"
      />
    </div>
    <div class="a-slider__range">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="isNaN(maxVal) ? max : maxVal"
        @mouseup="setCost('max_cost', $event)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  maxVal: { type: Number, default: 0 },
  step: { type: Number, default: 1 },
});

const emit = defineEmits(['setCost']);

const setCost = (key, event) => {
  emit('setCost', key, +event.target.value);
};
</script>

<style>
@import './a-slider.scss';
</style>
