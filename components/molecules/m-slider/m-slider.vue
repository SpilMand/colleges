<template>
  <div class="m-slider">
    <div class="m-slider__numbers">
      <span class="m-slider__number-min">{{ min }}</span>
      <input
        v-model="curMax"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :value="curMax"
        :placeholder="max"
        @input="setCost('max_cost', $event)"
      />
    </div>
    <div class="m-slider__range">
      <input
        v-model="curMax"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="curMax"
        @mouseup="setCost('max_cost', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { useProfessionStore } from '~/store/useProfessionStore';

const professionStore = useProfessionStore();

const route = useRoute();

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  step: { type: Number, default: 1 },
});

const emit = defineEmits(['setCost']);

const curMax = computed(() => {
  if (route.path.split('/')[1] === 'professions') {
    return professionStore.curMaxCost;
  }
});

const setCost = (key, event) => {
  emit('setCost', key, event.target.value);
};
</script>

<style>
@import './m-slider.scss';
</style>
