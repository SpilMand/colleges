import { useRuntimeConfig } from '#imports';
import { useAuthStore } from '~/store/useAuthStore';

export default async function uploadFile(formData) {
  const config = useRuntimeConfig();
  const store = useAuthStore();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${store.$state.access_token}`,
    };

    const { data } = await useAsyncData('upload-file', () =>
      $fetch('/v1/galleries/upload', {
        baseURL: config.public.baseURL,
        headers,
        method: 'POST',
        body: formData,
      }),
    );

    return data.value;
  } catch {
    return [];
  }
}
