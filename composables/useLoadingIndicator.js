export default function useLoadingIndicator(opts) {
  const progress = ref(0);
  const isLoading = ref(true);
  const step = computed(() => 10000 / opts.duration);

  let _timer = null;
  let _throttle = null;

  const start = () => {
    clear();
    progress.value = 0;

    if (opts.throttle && process.client) {
      _throttle = setTimeout(() => {
        isLoading.value = true;
        _startTimer();
      }, opts.throttle);
    } else {
      isLoading.value = true;
      _startTimer();
    }
  };

  const finish = () => {
    progress.value = 100;
    _hide();
  };

  const clear = () => {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  };

  const _increase = (num) => {
    progress.value = Math.min(100, progress.value + num);
  };

  const _hide = () => {
    clear();
    if (process.client) {
      setTimeout(() => {
        isLoading.value = false;
        setTimeout(() => {
          progress.value = 0;
        }, 400);
      }, 500);
    }
  };

  const _startTimer = () => {
    if (process.client) {
      _timer = setInterval(() => {
        _increase(step.value);
      }, 100);
    }
  };

  return {
    progress,
    isLoading,
    start,
    finish,
    clear,
  };
}
