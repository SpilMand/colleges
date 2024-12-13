import { useRuntimeConfig } from '#imports';

export default async function getProfessionSpecialty(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Cache-Control': 'no-cache',
    };

    const { data } = await useAsyncData(`profession-${id}`, () =>
      $fetch(`v1/organization/professions/${id}/specialties`, {
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
