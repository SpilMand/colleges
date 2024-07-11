import { useRuntimeConfig } from '#imports';

export default async function resetPassword(opts, token) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'X-Auth-Token': `Bearer ${token}`,
    };
    const { data } = await useAsyncData(`resetPassword`, () =>
      $fetch(`v1/auth/reset-password`, {
        baseURL: config.public.baseURL,
        headers,
        method: 'POST',
        body: {
          ...opts,
        },
      }),
    );

    return data.value.data;
  } catch (error) {
    console.error(error);
  }
}
