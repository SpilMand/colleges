import { useRuntimeConfig } from '#imports';
import { useAuthStore } from '~/store/useAuthStore';

export default async function createQuestion(bodyOpts, params) {
  const config = useRuntimeConfig();
  const store = useAuthStore();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${store.$state.access_token}`,
    };

    const { data } = await useAsyncData('create-question', () =>
      $fetch(`v1/questions`, {
        baseURL: config.public.baseURL,
        headers,
        method: 'POST',
        params: {
          ...params,
        },
        body: JSON.stringify(bodyOpts),
      }),
    );

    return data.value;
  } catch {
    return [];
  }
}
