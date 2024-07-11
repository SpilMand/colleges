import { useRuntimeConfig } from '#imports';

export default async function getCapitalRelationships(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData('capital-relationships', () =>
      $fetch(`v1/address/subjects/${id}/relationships/capital`, {
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
