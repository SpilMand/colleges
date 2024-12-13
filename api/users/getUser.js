import { useRuntimeConfig } from '#imports';

export default async function getUser(id, token, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'X-Auth-Token': `Bearer ${token}`,
    };

    const { data } = await useAsyncData('user', () =>
      $fetch(`v1/auth/users/${id}`, {
        baseURL: config.public.baseURL,
        headers,
        cache: 'no-cache',
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
