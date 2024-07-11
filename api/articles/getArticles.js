import { useRuntimeConfig } from '#imports';

export default async function getArticles(opts, id) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };

    const { data } = await useAsyncData(`articles-${id}`, () =>
      $fetch(`v1/article/articles`, {
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
