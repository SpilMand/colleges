import { useRuntimeConfig } from '#imports';
import { useAuthStore } from '~/store/useAuthStore';

export default async function removeQuestionDislikes(id, bodyOpts) {
  const config = useRuntimeConfig();
  const store = useAuthStore();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${store.$state.access_token}`,
    };

    const { data } = await useAsyncData(`remove-question-dislike-${id}`, () =>
      $fetch(`v1/questions/${id}/relationships/dislike-question-users`, {
        baseURL: config.public.baseURL,
        headers,
        cache: 'no-cache',
        method: 'DELETE',
        body: JSON.stringify(bodyOpts),
      }),
    );

    return data.value;
  } catch {
    return [];
  }
}
