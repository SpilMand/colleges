<template>
  <section v-if="colleges?.data" class="s-colleges-list">
    <div class="container">
      <h4 v-if="colleges.meta?.page.total > 0" class="title-h4">
        Найдено
        <span test-id="counter-s-colleges-list">{{ getTitle(colleges, 'колледж') }}</span>
      </h4>
      <h4 v-else class="title-h4">
        К сожалению, по вашему запросу колледжей не нашлось, но мы подобрали для Вас другие колледжи
        <span v-if="cityFilter.attributes?.name_rp">{{ cityFilter.attributes.name_rp }}</span>
      </h4>
      <div class="s-colleges-list__cards" test-id="counter-s-colleges-list-cards">
        <template v-if="colleges.data && colleges.data.length">
          <m-card
            v-for="(college, index) in colleges.data"
            :key="index"
            :style="`order: ${index}`"
            :options="college"
            :alternative="1"
            :included="colleges.included"
          />
        </template>
        <m-card
          v-for="(college, index) in otherColleges.data"
          :key="index"
          :style="`order: ${index}`"
          :options="college"
          :included="otherColleges.included"
        />

        <m-card-college-rklm
          v-for="(commercial, index) in filteredCommercials"
          :key="index"
          :style="`order: ${getCommercialOrder(index)}`"
          :visibility="visibility"
          :logo="commercial.logo"
          :link="commercial.url"
          :options="commercial.options"
        />

        <s-quiz />
      </div>
    </div>
  </section>
</template>

<script setup>
import { getTitle } from '~/composables/utils';
// import getCommercials from '~/api/commercials/getCommercials';
import getColleges from '~/api/colleges/getColleges';

const props = defineProps({
  colleges: { type: Object, default: () => ({}) },
  curPage: { type: Number, required: true },
  cityFilter: { type: Object, default: () => ({}) },
});

const visibility = ref();
// const commercials = ref([]);

// Функция для явного задания порядка карточек с коммерческими предложениями
const getCommercialOrder = (index) => {
  const commercialOrders = [2, 5, 7, 11, 15]; // Укажите фиксированные порядки для рекламных карточек
  return commercialOrders[index] !== undefined ? commercialOrders[index] : index;
  // Возвращаем значение из фиксированного массива или индекс, если индекса не существует
};

// Фильтрация рекламных карточек в зависимости от текущей страницы
const filteredCommercials = computed(() => {
  // return commercials.value.filter((commercial) => {
  //   const id = parseInt(commercial.id, 10);
  //   return props.curPage % 2 === 0 ? id % 2 === 0 : id % 2 !== 0;
  // });

  return [];
});

// const onCommercial = async () => {
//   try {
//     const response = await getCommercials({
//       include: 'media',
//     });

//     const included = response.included;

//     // Теперь мы будем проходить через каждое commercial и искать соответствующее изображение для каждого
//     commercials.value = response.data.map((commercial) => {
//       // Определяем, есть ли ссылка на галерею в commercial.relationships.gallery.data
//       const galleryId = commercial?.relationships?.media?.data?.id;

//       // Если есть, ищем соответствующий объект в included массиве
//eslint-disable-next-line
//       const galleryImage = galleryId ? included.find((item) => item.type === 'media' && item.id === galleryId) : null;

//       // Если нашли объект галереи, берем URL изображения, иначе пустая строка
//       const imageUrl = galleryImage ? galleryImage.attributes.url : '';

//       return {
//         id: commercial.id,
//         url: commercial.attributes.url,
//         logo: imageUrl,
//         options: {
//           title: commercial.attributes.properties.title,
//           description: commercial.attributes.properties.description,
//           city: commercial.attributes.properties.city.name,
//           accreditation: commercial.attributes.properties.accreditation,
//           establishment: commercial.attributes.properties.establishment,
//           showLogic: commercial.attributes.properties.showLogic,
//           visibility: commercial.attributes.visibility,
//         },
//       };
//     });
//   } catch (error) {
//     console.error('Ошибка при загрузке рекламы:', error);
//   }
// };

onMounted(() => {
  // onCommercial();
});

const otherColleges = ref([]);

watch(
  () => props.colleges.meta?.page.total,
  async () => {
    if (props.colleges.meta.page.total === 0) {
      otherColleges.value = await getColleges({
        'page[size]': 15,
        'filter[hasSpecialties]': true,
        'filter[city_id]': props.cityFilter.id,
        'sort': 'sort',
        'include': ['monitorings'],
      });
    } else {
      otherColleges.value = [];
    }
  },
);
</script>

<style scoped>
@import './s-colleges-list.scss';
.section-l {
  padding: 0;
}
</style>
