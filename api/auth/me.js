import { useRuntimeConfig } from '#imports';

export default async function me(token) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'X-Auth-Token': `Bearer ${token}`,
    };
    const { data } = await useAsyncData(`me`, () =>
      $fetch(`v1/auth/me`, {
        baseURL: config.public.baseURL,
        headers,
        method: 'POST',
      }),
    );

    return data.value.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
