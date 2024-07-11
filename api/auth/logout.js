import { useRuntimeConfig } from '#imports';

export default async function logout(token) {
  const config = useRuntimeConfig();
  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'X-Auth-Token': `Bearer ${token}`,
    };
    const { data } = await useAsyncData(`logout`, () =>
      $fetch(`v1/auth/logout`, {
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
