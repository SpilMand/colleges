import { useRuntimeConfig } from '#imports';

export default async function resend(opts, token) {
  const config = useRuntimeConfig();
  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'X-Auth-Token': `Bearer ${token}`,
    };
    const { data } = await useAsyncData(`resend`, () =>
      $fetch(`v1/auth/email/verify/resend`, {
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
