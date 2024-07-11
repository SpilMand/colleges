import { useRuntimeConfig } from '#imports';

export default async function refreshToken(token) {
  const config = useRuntimeConfig();

  try {
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'X-Auth-Token': `Bearer ${token}`,
    };
    const { data } = await useAsyncData('refresh', () =>
      $fetch('/v1/auth/refresh', {
        baseURL: config.public.baseURL,
        headers,
        method: 'POST',
      }),
    );
    return data.value.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    return {};
  }
}
