export function calculateDurationText(minDurationMonths) {
  const durationText = computed(() => {
    if (minDurationMonths >= 12) {
      const years = Math.floor(minDurationMonths / 12);
      const remainingMonths = minDurationMonths % 12;
      return `от ${years} ${years > 1 ? 'лет' : 'года'}${remainingMonths > 0 ? ` ${remainingMonths} мес.` : ''}`;
    } else {
      return `от ${minDurationMonths} мес.`;
    }
  });

  return durationText;
}
