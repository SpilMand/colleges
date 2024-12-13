import { useRuntimeConfig } from '#imports';

export default async function getQuestions(id, opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Cache-Control': 'no-cache',
    };

    const { data } = await useAsyncData('college-questions', () =>
      $fetch(`v1/organization/colleges/${id}/questions`, {
        baseURL: config.public.baseURL,
        headers,
        cache: 'no-cache',
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
