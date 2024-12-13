<template>
  <slot name="head" />
  <nav class="m-menu">
    <ul class="m-menu__list">
      <li v-for="(item, index) in items" :key="index" class="m-menu__item">
        <NuxtLink
          v-if="item.name !== 'directions'"
          class="m-menu__link f-text-s f-font-700"
          :to="item.link"
          :test-id="`link-m-menu-anchor-${item.name}`"
        >
          {{ item.anchor }}
        </NuxtLink>
        <div
          v-else
          :class="{ active: showDirectionsList }"
          class="m-menu__link m-menu__directions f-text-s f-font-700"
          :test-id="`link-m-menu-anchor-toggle`"
          @click="toggleDirectionsList"
        >
          {{ item.anchor }}
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.773247 0H8.22658C8.35843 0.000552821 8.48715 0.0401894 8.59647 0.113898C8.7058 0.187607 8.79081 0.292077 8.84076 0.414099C8.89071 0.53612 8.90336 0.670213 8.8771 0.799422C8.85084 0.928631 8.78686 1.04715 8.69325 1.14L4.97325 4.86C4.91127 4.92249 4.83754 4.97208 4.7563 5.00593C4.67506 5.03977 4.58792 5.0572 4.49991 5.0572C4.41191 5.0572 4.32477 5.03977 4.24353 5.00593C4.16229 4.97208 4.08856 4.92249 4.02658 4.86L0.30658 1.14C0.212966 1.04715 0.148985 0.928631 0.122728 0.799422C0.0964714 0.670213 0.109118 0.53612 0.159068 0.414099C0.209018 0.292077 0.29403 0.187607 0.403352 0.113898C0.512674 0.0401894 0.641398 0.000552821 0.773247 0Z"
              fill="#343434"
            />
          </svg>
          <m-directions-menu
            v-show="showDirectionsList"
            :directions="directions"
            @click.stop
            @choosedDirection="showDirectionsList = false"
          />
        </div>
      </li>
    </ul>
  </nav>
  <slot name="button" />
</template>
<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  apiDirections: {
    type: Object,
    default: () => ({}),
  },
});

const directions = ref([]);
const showDirectionsList = ref(false);
const toggleDirectionsList = (event) => {
  if (!event.target.closest('.m-menu__directions-list')) {
    event.stopPropagation();
  }
  showDirectionsList.value = !showDirectionsList.value;
};
const closeDirectionsList = (event) => {
  if (!event.target.closest('.m-menu__directions-list') && showDirectionsList.value) {
    showDirectionsList.value = false;
  }
};

watchEffect(() => {
  const newDirections = props.apiDirections;
  if (newDirections && newDirections.data) {
    directions.value = newDirections.data.map(({ id, attributes }) => ({
      id,
      name: attributes.name,
      slug: attributes.slug,
    }));
  }
});

onMounted(async () => {
  document.addEventListener('click', closeDirectionsList);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDirectionsList);
});

defineEmits(['click']);
</script>

<style lang="scss">
@import './m-menu.scss';
</style>
