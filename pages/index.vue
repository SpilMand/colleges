<template>
  <s-main
    :apiDirections="apiDirections"
    :apiColleges="apiColleges"
    :apiSpecialties="apiSpecialties"
    :apiProfessions="apiProfessions"
  />
  <s-colleges />
  <div class="container">
    <s-quiz id="quiz" class="section-l" />
  </div>
  <s-professions :apiProfessions="apiProfessionsFavorite" />
  <div class="container">
    <s-form
      class="section-l"
      subtitle="Оставь заявку, наши менеджеры свяжутся с тобой, и помогут в поиске правильного учебного заведения!"
      title="Нужна помощь в выборе колледжа?"
      checkboxLabel="Я согласен на обработку своих персональных данных и получение информационных рассылок,
      а также принимаю условия
      <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    />
  </div>
  <s-directions :apiDirections="apiDirections" />
  <s-about
    :apiColleges="apiColleges"
    :apiDirections="apiDirections"
    :apiSpecialties="apiSpecialties"
    :apiProfessions="apiProfessions"
  />
  <s-reviews />
  <s-articles />
</template>
<script setup>
import getProfessions from '~/api/professions/getProfessions';
defineProps({
  apiDirections: {
    type: Object,
    default: () => ({}),
  },
  apiSpecialties: {
    type: Object,
    default: () => ({}),
  },
  apiColleges: {
    type: Object,
    default: () => ({}),
  },
  apiProfessions: {
    type: Object,
    default: () => ({}),
  },
});

const apiProfessionsFavorite = ref([]);

async function fetchData() {
  try {
    apiProfessionsFavorite.value = await getProfessions(
      {
        'filter[is_favorite]': true,
      },
      'favorite',
    );
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}
onMounted(fetchData);
</script>
