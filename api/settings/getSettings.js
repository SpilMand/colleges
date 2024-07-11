import { useRuntimeConfig } from '#imports';

export default async function getItems(opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData('settings', () =>
      $fetch(`v1/organization/settings`, {
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
