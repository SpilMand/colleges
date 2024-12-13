import { useRuntimeConfig } from '#imports';

export default async function getSearchArticles(opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Cache-Control': 'no-cache',
    };

    const { data } = await useAsyncData('articles', () =>
      $fetch(`v1/entities/search/articles`, {
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
