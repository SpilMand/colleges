import { defineStore } from 'pinia';

export const useCollegeStore = defineStore('colleges', {
  state: () => ({
    filters: {
      cities: {},
      bases: {},
      types: {},
      directions: {},
      conditions: {},
      forms: {},
      domitory: {
        value: undefined,
      },
      // min_cost: localStorage.getItem('curMin'),
      // max_cost: undefined,
      title: 'колледжи и техникумы',
    },
    cityFilters: {
      name: '',
      page: 1,
    },
    curMaxCost: 600000,
    colleges: [],
    curPage: 0,
    countPage: 0,
    activeCity: null,
    activeCityKey: 'college-active-city',
  }),
  actions: {
    setFilters(filters) {
      this.filters = filters;
    },
    setFilterByType(type, value) {
      this.filters[type] = value;
    },
    clearFilters() {
      this.filters = {
        cities: {},
        bases: {},
        types: {},
        directions: {},
        conditions: {},
        forms: {},
        domitory: {
          value: undefined,
        },
        // min_cost: {},
        // max_cost: {},
        title: 'колледжи и техникумы',
      };
      this.setActiveCity(null);
      this.curMaxCost = 600000;
    },
    clearFilter(type) {
      this.filters[type] = {};
      if (type === 'cities') {
        this.setActiveCity(null);
        if (Object.entries(this.filters).length > 1) {
          Object.entries(this.filters).forEach((element) => {
            if (
              element[0] !== 'bases' &&
              element[0] !== 'domitory' &&
              element[0] !== 'cities' &&
              element[0] !== 'min_cost' &&
              element[0] !== 'max_cost'
            ) {
              this.clearFilter(element[0]);
            }
          });
        }
      }
    },
    setColleges(colleges) {
      this.colleges = colleges;
    },
    setCurPage(curPage) {
      this.curPage = curPage;
    },
    setCountPage(countPage) {
      this.countPage = countPage;
    },
    setActiveCity(city) {
      this.activeCity = city;
      localStorage.setItem(this.activeCityKey, JSON.stringify(city));
    },
    clearActiveCity() {
      localStorage.setItem(this.activeCityKey, JSON.stringify(null));
      this.activeCity = null;
    },
    getLocalStorageActiveCity() {
      return this.activeCity ?? JSON.parse(localStorage.getItem(this.activeCityKey));
    },
    setCityNameFilter(name) {
      this.cityFilters.name = name;
    },
    getCityNameFilter() {
      return this.cityFilters.name;
    },
    setCityPageFilter(page) {
      this.cityFilters.page = page;
    },
    getCityPageFilter() {
      return this.cityFilters.page;
    },
    nextCityPage() {
      this.cityFilters.page += 1;
    },
    clearCityFilter() {
      this.setCityNameFilter('');
      this.setCityPageFilter(1);
    },
  },
});
