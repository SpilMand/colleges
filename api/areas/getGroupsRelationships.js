import { useRuntimeConfig } from '#imports';

export default async function getGroupsRelationships(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData('groups-relationships', () =>
      $fetch(`v1/education/areas/${id}/relationships/groups`, {
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
