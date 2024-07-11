import { useRuntimeConfig } from '#imports';

export default async function getSubjectRelationships(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData('subject-relationships', () =>
      $fetch(`v1/organization/colleges/${id}/relationships/subject`, {
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
