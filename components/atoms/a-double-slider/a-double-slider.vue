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
        :test-id="`input-a-double-${sectionId}slider-min-numbers`"
        @input="setCost('min_cost', $event)"
      />
      <input
        v-model="sliderMax"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :value="curMax"
        :placeholder="max"
        :test-id="`input-a-double-slider-${sectionId}-max-numbers`"
        @input="setCost('max_cost', $event)"
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
        :test-id="`input-a-double-slider-${sectionId}-min-range`"
        @mouseup="setCost('min_cost', $event)"
      />
      <input
        v-model="sliderMax"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="curMax"
        :test-id="`input-a-double-slider-${sectionId}-max-range`"
        @mouseup="setCost('max_cost', $event)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  step: { type: Number, default: 1 },
  // curMin: { type: Number, default: 0 },
  // curMax: { type: Number, default: 0 }
  sectionId: { type: String, default: '' },
});

const emit = defineEmits(['setCost']);

onMounted(() => {
  if (localStorage.getItem('curMin')) {
    curMin.value = JSON.parse(localStorage.getItem('curMin'));
  }
  if (localStorage.getItem('curMax')) {
    curMax.value = JSON.parse(localStorage.getItem('curMax'));
  }
});

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
    localStorage.setItem('curMin', curMin.value);
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
    localStorage.setItem('curMax', curMax.value);
  },
});

const setCost = (key, event) => {
  // event.stopPropagation();
  emit('setCost', key, event.target.value);
};

// watch(props, () => {
//   sliderMin.value = 0;
//   sliderMax.value = props.max;
// });
</script>

<style>
@import './a-double-slider.scss';
</style>
