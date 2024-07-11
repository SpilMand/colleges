import { useRuntimeConfig } from '#imports';

export default async function forgotPassword(opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };
    const { data } = await useAsyncData(`forgotPassword`, () =>
      $fetch(`v1/auth/forgot-password`, {
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
    throw new Error('Неверная почта');
  }
}
