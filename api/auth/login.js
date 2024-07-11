import { useRuntimeConfig } from '#imports';

export default async function login(opts) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      Accept: 'application/vnd.api+json',
    };
    const { data } = await useAsyncData(`login`, () =>
      $fetch(`v1/auth/login`, {
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
    return {};
  }
}
