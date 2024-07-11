<template>
  <div class="a-select" :class="classes">
    <div class="a-select__box">
      <div class="a-select__row">
        <div tabindex="0" class="a-select__input" @click="toggle(undefined, $event.target)" @blur="hide()">
          <span class="a-select__hint">{{ hint }}</span>
          <input
            v-if="type === 'select'"
            v-model="selectedItemLabel"
            :name="name"
            :placeholder="placeholder"
            class="a-select__label f-font-500"
            @blur="hide()"
            @input="handleInput"
          />
        </div>
        <div class="a-select__img" :class="{ 'a-select__img--open': visible && optionsThis.length > 0 }">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.40999 0H12.59C12.7878 0.000829231 12.9809 0.0602841 13.1448 0.170847C13.3088 0.28141 13.4363 0.438116 13.5113 0.621148C13.5862 0.804181 13.6052 1.00532 13.5658 1.19913C13.5264 1.39295 13.4304 1.57073 13.29 1.71L7.70999 7.29C7.61703 7.38373 7.50643 7.45812 7.38457 7.50889C7.26271 7.55966 7.132 7.5858 6.99999 7.5858C6.86798 7.5858 6.73727 7.55966 6.61542 7.50889C6.49356 7.45812 6.38296 7.38373 6.28999 7.29L0.709992 1.71C0.569571 1.57073 0.4736 1.39295 0.434214 1.19913C0.394829 1.00532 0.413798 0.804181 0.488724 0.621148C0.56365 0.438116 0.691166 0.28141 0.85515 0.170847C1.01913 0.0602841 1.21222 0.000829231 1.40999 0Z"
              fill="#8E8E8E"
            />
          </svg>
        </div>
        <transition name="a-select__list">
          <div v-if="optionsThis.length > 0" :class="{ visible: visible }" class="a-select__list" @mousedown.prevent>
            <div class="a-select__wrapper" :class="{ multiple: multiple }">
              <div v-for="(item, index) in optionsThis" :key="index">
                <div v-if="!multiple" class="a-select__option" @click="select(item, this)">
                  <label>{{ item?.attributes?.name }}</label>
                </div>
                <div v-else class="a-select__option">
                  <input :id="index" type="checkbox" @click="select(item, this)" />
                  <label :for="index">{{ item?.attributes?.name }}</label>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <span v-if="showSelectLocation" class="a-select__location">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_3907_2190)">
            <path
              d="M12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11993 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z"
              fill="#343434"
            />
            <path
              d="M12.0003 24.0001C11.1583 24.0044 10.3274 23.8069 9.57738 23.4241C8.82733 23.0413 8.17991 22.4844 7.68931 21.8C3.87831 16.543 1.94531 12.591 1.94531 10.053C1.94531 7.3863 3.00468 4.82877 4.89035 2.94309C6.77603 1.05741 9.33356 -0.00195312 12.0003 -0.00195312C14.6671 -0.00195312 17.2246 1.05741 19.1103 2.94309C20.9959 4.82877 22.0553 7.3863 22.0553 10.053C22.0553 12.591 20.1223 16.543 16.3113 21.8C15.8207 22.4844 15.1733 23.0413 14.4232 23.4241C13.6732 23.8069 12.8424 24.0044 12.0003 24.0001ZM12.0003 2.18105C9.91273 2.18343 7.91133 3.01377 6.43518 4.48992C4.95904 5.96606 4.12869 7.96746 4.12631 10.055C4.12631 12.065 6.01931 15.782 9.45531 20.521C9.74701 20.9228 10.1297 21.2498 10.572 21.4753C11.0144 21.7008 11.5038 21.8183 12.0003 21.8183C12.4968 21.8183 12.9863 21.7008 13.4286 21.4753C13.8709 21.2498 14.2536 20.9228 14.5453 20.521C17.9813 15.782 19.8743 12.065 19.8743 10.055C19.8719 7.96746 19.0416 5.96606 17.5654 4.48992C16.0893 3.01377 14.0879 2.18343 12.0003 2.18105Z"
              fill="#343434"
            />
          </g>
          <defs>
            <clipPath id="clip0_3907_2190">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </div>

    <div v-if="showSelectButton" class="a-select__block">
      <a-button label="Сохранить" color="orange" size="medium" class="a-select__button" @click="$emit('save')" />

      <a-button
        label="Отменить"
        color="violet-5"
        placeholder="Выберите город"
        size="medium"
        class="a-select__button"
        @click="clearOptions"
      />
    </div>
  </div>
</template>

<script setup>
import { useCityIdStore } from '~/store/city';
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  name: { type: String, default: '' },
  hint: { type: String, default: '' },
  type: { type: String, default: () => 'select' },
  options: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: () => false },
  showSelectButton: { type: Boolean, default: () => false },
  showSelectLocation: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  param: { type: String, default: '' },
});

const cityStore = useCityIdStore();

const emit = defineEmits(['update:modelValue', 'toggle', 'save', 'selectedItemId', 'addFilter', 'filter', 'get-data']);

const selectedItemLabel = ref('');

watch(selectedItemLabel, (item) => {
  emit('update:modelValue', item);
});

onMounted(() => {
  if (props.modelValue) selectedItemLabel.value = getOption(props.modelValue)?.label;
});

const optionsThis = computed(() => {
  switch (props.type) {
    case 'select':
      return props.options;
    default:
      return [];
  }
});

const getOption = (value) => {
  return props.options.find((i) => i.value === value);
};

const handleInput = () => {
  if (selectedItemLabel.value.trim().length > 0) {
    visible.value = true;
  }
  emit('filter', selectedItemLabel.value);
};

const select = (item) => {
  emit('addFilter', props.param, item);
  emit('update:modelValue', item.value);
  emit('selectedItemId', item?.id, item?.slug?.name, item?.attributes?.name);
  emit('get-data', item);
  if (item.type === 'cities') {
    cityStore.setSelectedOptionValue(item?.attributes?.name);
    cityStore.setSelectedOptionValueRp(item?.attributes?.name_rp);
  }
  if (!props.multiple) {
    hide();
    selectedItemLabel.value = item?.attributes?.name;
  } else {
  }
};

const classes = computed(() => ({
  ['a-select--' + props.type]: true,
  'a-select--disabled': props.disabled,
}));

const visible = ref(false);

const toggle = (value, element) => {
  let elementLabel;
  if (element) {
    if (element.classList.contains('.a-select__input')) {
      elementLabel = element.querySelector('.a-select__label');
    } else {
      elementLabel = element.closest('.a-select__input').querySelector('.a-select__label');
    }
  }
  if (value != undefined) {
    visible.value = value;
  } else {
    visible.value = !visible.value;
    if (visible.value == true) {
      emit('filter');
      if (elementLabel.value == '') {
        clearOptions();
      }
    }
  }
  emit('toggle', visible.value);
};

const hide = () => {
  // console.log(event);
  // if (event) {
  //   const targetElement = event.target;
  //   if (targetElement && !targetElement.closest('.a-select')) {
  //     toggle({value: false});
  //   }
  // } else {
  toggle(false);
  // }
};

const clearOptions = () => {
  selectedItemLabel.value = '';
  emit('update:modelValue', null);
};
</script>

<style lang="scss">
@import './a-select.scss';
</style>
