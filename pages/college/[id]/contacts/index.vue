<template>
  <div class="contacts">
    <s-contacts
      :info="info"
      :city="city.attributes.name"
      :contacts="contacts[0]"
      class="section-l"
    />
    <!-- <s-other-branches :faculties="faculties" /> -->
    <s-contacts
      :info="info"
      :city="city.attributes.name"
      :contacts="contacts[0]"
      :isAdmission="true"
      class="section-m"
    />
  </div>
</template>

<script setup>
import { getIncludeData } from '~/composables/getIncludeData';

const props = defineProps({
  info: { type: Object, default: () => ({}) },
  included: { type: Object, default: () => ({}) },
});

definePageMeta({
  layout: 'layout-college',
});

const emit = defineEmits(['blocksNeed', 'isQuestionSet']);

onMounted(() => {
  emit('blocksNeed', true, false, false);
  emit('isQuestionSet', false);
});

const contacts = computed(() => {
  return getIncludeData(props.info, props.included, 'admissionOffices');
});
const city = computed(() => {
  return getIncludeData(props.info, props.included, 'city');
});
</script>
