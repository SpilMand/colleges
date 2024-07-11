import { useRuntimeConfig } from '#imports';

export default async function getOksoRelationshipsjs(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData('okso-relationships', () =>
      $fetch(`v1/organization/specialties/${id}/relationships/okso-specialty`, {
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
