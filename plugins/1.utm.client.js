export default defineNuxtPlugin(() => {
  const route = useRoute().fullPath;
  const cookie = useCookie('utms', { maxAge: 86400 });
  const utmsObject = route.split(/\s*[?&]\s*/);
  let utms = cookie.value ?? {};

  utmsObject.splice(0, 1);

  // обнуляем если utmsObject не пустой
  if (utmsObject.length) {
    utms = {};
  }

  Object.keys(utmsObject).forEach((key) => {
    utmsObject[key] = utmsObject[key].replace('/?', '');
    const objectValues = utmsObject[key].split('=');
    if (objectValues[0].includes('utm')) {
      utms[objectValues[0]] = objectValues[1];
    }
  });

  cookie.value = utms;
});
