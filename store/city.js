import { defineStore } from 'pinia';
export const useCityIdStore = defineStore({
  id: 'cityId',
  state: () => {
    return {
      selectedOptionId: '',
      selectedOptionValue: '',
      selectedOptionValueRp: '',
      selectedOptionSlug: '',
    };
  },

  actions: {
    setSelectedOptionId(id) {
      this.selectedOptionId = id;
    },
    setSelectedOptionValue(value) {
      this.selectedOptionValue = value;
    },
    setSelectedOptionSlug(slug) {
      this.selectedOptionSlug = slug;
    },
    setSelectedOptionValueRp(value) {
      this.selectedOptionValueRp = value;
    },
  },
});
