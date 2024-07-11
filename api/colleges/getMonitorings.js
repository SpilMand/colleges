import { useRuntimeConfig } from '#imports';

export default async function getMonitorings(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData(`monitorings-${id}`, () =>
      $fetch(`v1/organization/colleges/${id}/monitorings`, {
        baseURL: config.public.baseURL,
        headers,
        method: 'GET',
        params: {
          ...opts,
        },
        initialCache: false,
      }),
    );

    return data.value;
  } catch {
    return [];
  }
}
