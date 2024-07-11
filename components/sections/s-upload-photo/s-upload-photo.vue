<template>
  <section class="s-upload-photo">
    <p class="subtitle">
      Поделитесь вашим опытом!<br />
      Добавьте фото из жизни в колледже.
    </p>
    <div class="s-upload-photo__content" :class="{ grid: addingPhoto.length > 0 }">
      <div v-for="(photo, index) in addingPhoto" :key="index" class="s-upload-photo__photo">
        <img class="s-upload-photo__icon" src="/icons/picture.svg" alt="" />
        <button class="s-upload-photo__cross" @click="removePhoto(index)"><img src="/icons/close.svg" alt="" /></button>
        <img class="s-upload-photo__img" :src="photo.url" alt="" />
      </div>
      <div class="s-upload-photo__input">
        <span v-if="addingPhoto.length > 0" class="f-text-m violet-100">Загрузить<br />еще</span>
        <div v-else>
          <p class="f-text-l f-font-700 violet-100">Загрузите или перетащите сюда файлы</p>
          <p class="f-text-s gray">Поддерживаемые форматы: PNG, JPG<br />до 10 Мб</p>
        </div>
        <input type="file" accept="image/*" @change="addPhoto" />
      </div>
    </div>
    <div v-if="addingPhoto.length > 0" class="s-upload-photo__actions">
      <a-button label="Поделиться" textWeight="700" color="orange" @click="sharePhoto" />
      <a-button label="Удалить все" textWeight="700" color="outline-orange" @click="isPopup = !isPopup" />
    </div>
    <m-popup :visible="isPopup" class="s-upload-photo__popup" width="26.25rem" @close="isPopup = false">
      <div class="s-upload-photo__popup-title f-font-700">
        <p class="f-text-l">Вы уверены, что хотите удалить все загруженные материалы?</p>
        <div class="s-upload-photo__popup-actions">
          <a-button label="Удалить" textWeight="700" color="orange" @click="removePhoto('all')" />
          <a-button label="Отменить" textWeight="700" color="violet-5" @click="isPopup = false" />
        </div>
      </div>
    </m-popup>
  </section>
</template>

<script setup>
const addingPhoto = ref([]);

const addPhoto = (event) => {
  let file = event.target.files[0];
  let url = '';
  var reader = new FileReader();
  reader.readAsDataURL(file);
  if (file.type.indexOf('image/png') !== -1 || file.type.indexOf('image/jpeg') !== -1) {
    reader.onload = () => {
      url = reader.result.substring(reader.result.indexOf(',') + 1);
      for (let index = 0; index < addingPhoto.value.length; index++) {
        if ('data:image/jpeg;base64,' + url == addingPhoto.value[index].url) {
          return;
        }
      }
      addingPhoto.value.push({
        id: addingPhoto.value.length,
        url: 'data:image/jpeg;base64,' + url,
      });
    };
  }
  event.target.value = '';
};
const removePhoto = (index) => {
  if (index != 'all') {
    addingPhoto.value.splice(index, 1);
  } else {
    addingPhoto.value = [];
    isPopup.value = false;
  }
};

// const sharePhoto = () => {
//   console.log(addingPhoto.value);
// }
const isPopup = ref(false);
</script>

<style>
@import './s-upload-photo.scss';
</style>
