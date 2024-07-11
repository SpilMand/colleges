import { useRuntimeConfig } from '#imports';

export default async function change(opts, token) {
  console.log('token', token);
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'X-Auth-Token': `Bearer ${token}`,
    };
    const { data } = await useAsyncData(`change`, () =>
      $fetch(`v1/auth/email/change`, {
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
