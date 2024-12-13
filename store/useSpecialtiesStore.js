import { defineStore } from 'pinia';

export const useSpecialtiesStore = defineStore('specialties', {
  state: () => ({
    filters: {
      cities: {},
      forms: {},
      // title: 'колледжи и техникумы',
    },
    cityFilters: {
      name: '',
      page: 1,
    },
    curMaxCost: 600000,
    specialties: [],
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
        forms: {},
        title: 'колледжи и техникумы',
      };
      this.setActiveCity(null);
      this.curMaxCost = 600000;
    },
    clearFilter(type) {
      this.filters[type] = {};
    },
    setSpecialties(specialties) {
      this.specialties = specialties;
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
