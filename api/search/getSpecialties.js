import { useRuntimeConfig } from '#imports';

export default async function getSpecialties(opts, id = 'specialties') {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Cache-Control': 'no-cache',
    };

    const { data } = await useAsyncData(id, () =>
      $fetch(`v1/entities/search/specialties`, {
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
