<template>
  <div class="a-pagination">
    <a
      href="#start"
      src="/icons/arrow-prev.svg"
      class="arrow"
      :class="{ disabled: curPage == 0 }"
      test-id="link-a-pagination-arrow-prev"
      @click="SwitchPage('left')"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.733087 11.7416L3.95809 14.9999C4.03556 15.078 4.12772 15.14 4.22927 15.1823C4.33082 15.2246 4.43974 15.2464 4.54975 15.2464C4.65976 15.2464 4.76868 15.2246 4.87023 15.1823C4.97178 15.14 5.06395 15.078 5.14142 14.9999C5.21953 14.9224 5.28152 14.8303 5.32383 14.7287C5.36614 14.6272 5.38792 14.5183 5.38792 14.4083C5.38792 14.2982 5.36614 14.1893 5.32383 14.0878C5.28152 13.9862 5.21953 13.8941 5.14142 13.8166L2.17475 10.8333H19.1664C19.3874 10.8333 19.5994 10.7455 19.7557 10.5892C19.912 10.4329 19.9998 10.2209 19.9998 9.99992C19.9998 9.7789 19.912 9.56694 19.7557 9.41066C19.5994 9.25438 19.3874 9.16658 19.1664 9.16658H2.12475L5.14142 6.14992C5.28916 5.99494 5.37158 5.78903 5.37158 5.57492C5.37158 5.3608 5.28916 5.1549 5.14142 4.99992C5.06395 4.92181 4.97178 4.85981 4.87023 4.81751C4.76868 4.7752 4.65976 4.75342 4.54975 4.75342C4.43974 4.75342 4.33082 4.7752 4.22927 4.81751C4.12772 4.85981 4.03556 4.92181 3.95809 4.99992L0.733087 8.20825C0.264918 8.677 0.00195313 9.31242 0.00195312 9.97492C0.00195312 10.6374 0.264918 11.2728 0.733087 11.7416Z"
          fill="#BFB3EE"
        />
      </svg>
    </a>
    <div class="a-pagination__pages txt-s">
      <a
        v-for="num in PaginationSteps"
        :key="num"
        href="#start"
        class="f-text-xs"
        :class="[
          { active: num == curPage + 1 },
          num != '...' ? 'a-pagination__pages-num' : 'a-pagination__pages-points',
        ]"
        :test-id="`link-a-pagination-${num}`"
        @click="SwitchPage('', num)"
        >{{ num }}
      </a>
    </div>
    <a
      href="#start"
      class="arrow"
      :class="{ disabled: curPage == countPage - 1 }"
      test-id="link-a-pagination-arrow-next"
      @click="SwitchPage('right')"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1860_1801)">
          <path
            d="M19.2667 8.25831L16.0417 4.99998C15.9642 4.92187 15.872 4.85988 15.7705 4.81757C15.6689 4.77526 15.56 4.75348 15.45 4.75348C15.34 4.75348 15.2311 4.77526 15.1295 4.81757C15.028 4.85988 14.9358 4.92187 14.8583 4.99998C14.7031 5.15611 14.616 5.36732 14.616 5.58748C14.616 5.80763 14.7031 6.01884 14.8583 6.17498L17.825 9.16664H0.833333C0.61232 9.16664 0.400358 9.25444 0.244078 9.41072C0.0877974 9.567 0 9.77896 0 9.99998C0 10.221 0.0877974 10.433 0.244078 10.5892C0.400358 10.7455 0.61232 10.8333 0.833333 10.8333H17.875L14.8583 13.8416C14.7802 13.9191 14.7182 14.0113 14.6759 14.1128C14.6336 14.2144 14.6118 14.3233 14.6118 14.4333C14.6118 14.5433 14.6336 14.6522 14.6759 14.7538C14.7182 14.8553 14.7802 14.9475 14.8583 15.025C14.9358 15.1031 15.028 15.1651 15.1295 15.2074C15.2311 15.2497 15.34 15.2715 15.45 15.2715C15.56 15.2715 15.6689 15.2497 15.7705 15.2074C15.872 15.1651 15.9642 15.1031 16.0417 15.025L19.2667 11.7916C19.7348 11.3229 19.9978 10.6875 19.9978 10.025C19.9978 9.36248 19.7348 8.72706 19.2667 8.25831Z"
            fill="#BFB3EE"
          />
        </g>
        <defs>
          <clipPath id="clip0_1860_1801">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  countPage: {
    type: Number,
    default: 1,
  },
  curPage: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['updateCurPage']);

const PaginationSteps = computed(() => {
  const step = props.curPage + 1;
  const allSteps = props.countPage;
  let arr = [step - 1, step, step + 1];
  if (step + 1 < allSteps) {
    step + 2 < allSteps ? arr.push('...', allSteps) : arr.push(allSteps);
  }
  if (step - 1 > 1) {
    step - 2 > 1 ? (arr = [1, '...', ...arr]) : (arr = [1, ...arr]);
  }
  arr = arr.filter((element) => {
    return (element > 0 && element <= allSteps) || element == '...';
  });
  return arr;
});

const SwitchPage = (dir, num) => {
  if (dir) {
    if (dir == 'left' && props.curPage > 0) {
      emit('updateCurPage', props.curPage - 1);
    } else if (dir == 'right' && props.curPage < props.countPage - 1) {
      emit('updateCurPage', props.curPage + 1);
    }
  } else if (num != '...') {
    if (num - 1 != props.curPage) {
      emit('updateCurPage', num - 1);
    }
  }
};
</script>

<style>
@import './a-pagination.scss';
</style>
