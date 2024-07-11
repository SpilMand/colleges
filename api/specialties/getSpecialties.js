import { useRuntimeConfig } from '#imports';

export default async function getSpecialties(opts, id) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };
    const { data } = await useAsyncData(`specialties-${id}`, () =>
      $fetch(`v1/organization/specialties`, {
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
