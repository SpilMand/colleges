import { useRuntimeConfig } from '#imports';

export default async function register(opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };
    const { data } = await useAsyncData(`register`, () =>
      $fetch(`v1/auth/register`, {
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
    throw new Error('С таким email уже зарегистрирован пользователь');
  }
}
