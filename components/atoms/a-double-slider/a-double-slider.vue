<template>
  <div class="a-double-slider">
    <div class="a-double-slider__numbers">
      <input
        v-model="sliderMin"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :value="curMin"
        :placeholder="min"
        @input="emit('setCost', 'min_cost', $event.target.value)"
      />
      <input
        v-model="sliderMax"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :value="curMax"
        :placeholder="max"
        @input="emit('setCost', 'max_cost', $event.target.value)"
      />
    </div>
    <div class="a-double-slider__range">
      <input
        v-model="sliderMin"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="curMin"
        @mouseup="emit('setCost', 'min_cost', $event.target.value)"
      />
      <input
        v-model="sliderMax"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="curMax"
        @mouseup="emit('setCost', 'max_cost', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  step: { type: Number, default: 1 },
  // curMin: { type: Number, default: 0 },
  // curMax: { type: Number, default: 0 }
});

const emit = defineEmits(['setCost']);

const curMin = ref(props.min);
const curMax = ref(props.max);

const sliderMin = computed({
  get() {
    var val = parseInt(curMin.value);
    return val;
  },
  set(val) {
    val = parseInt(val);
    if (val > curMax.value) {
      curMax.value = val;
    }
    curMin.value = val;
  },
});
const sliderMax = computed({
  get() {
    var val = parseInt(curMax.value);
    return val;
  },
  set(val) {
    val = parseInt(val);
    if (val < curMin.value) {
      curMin.value = val;
    }
    curMax.value = val;
  },
});

watch(props, () => {
  sliderMin.value = 0;
  sliderMax.value = props.max;
});
</script>

<style>
@import './a-double-slider.scss';
</style>
