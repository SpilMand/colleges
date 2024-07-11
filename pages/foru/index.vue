<template>
  <div class="container">
    <a-breadcrumbs :items="breadcrumbs" />
    <s-foru />
  </div>
  <s-form
    title="Свяжитесь с нами: мы здесь, чтобы помочь"
    subtitle="Если у Вас остались вопросы по работе сайта, 
      пишите нам на электронную почту <a class='f-link-white' 
      href='mailto:1234@ruscollege.ru'>1234@ruscollege.ru</a> или 
      оставьте свои контактные данные и мы свяжемся с Вами."
    checkboxLabel="Я согласен на обработку своих персональных данных и получение информационных рассылок,
        а также принимаю условия
        <a href='/' target='_blank' class='s-form__politics'>Политики   конфиденциальности сайта Колледжи.рф</a>"
    type="stretch"
  />
</template>

<script setup>
const breadcrumbs = [{ label: 'Колледжи России', link: '/foru' }];
</script>
