import { useRuntimeConfig } from '#imports';

export default async function getOkso(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData('okso', () =>
      $fetch(`v1/education/groups/${id}/okso-specialties`, {
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
