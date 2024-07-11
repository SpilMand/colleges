import { useRuntimeConfig } from '#imports';

export default async function getCities(opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData('cities', () =>
      $fetch(`v1/address/cities`, {
        baseURL: config.public.baseURL,
        headers,
        method: 'GET',
        params: {
          ...opts,
        },
      }),
    );

    return data.value;
  } catch {
    return [];
  }
}

// export const getTopCities = () => [
//   { id: '26', attributes: { name: 'Москва' } },
//   { id: '44', attributes: { name: 'Санкт-Петербург' } },
//   { id: '32', attributes: { name: 'Новосибирск' } },
//   { id: '11', attributes: { name: 'Екатеринбург' } },
//   { id: '30', attributes: { name: 'Нижний Новгород' } },
//   { id: '14', attributes: { name: 'Казань' } },
//   { id: '58', attributes: { name: 'Челябинск' } },
//   { id: '33', attributes: { name: 'Омск' } },
//   { id: '43', attributes: { name: 'Самара' } },
//   { id: '40', attributes: { name: 'Ростов-на-Дону' } },
//   { id: '54', attributes: { name: 'Уфа' } },
//   { id: '21', attributes: { name: 'Красноярск' } },
//   { id: '37', attributes: { name: 'Пермь' } },
//   { id: '10', attributes: { name: 'Воронеж' } },
//   { id: '8', attributes: { name: 'Волгоград' } },
//   { id: '20', attributes: { name: 'Краснодар' } },
//   { id: '45', attributes: { name: 'Саратов' } },
//   { id: '52', attributes: { name: 'Тюмень' } },
// ];
