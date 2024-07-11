import { useRuntimeConfig, useFetch } from '#imports';

export default async function useRequest(url, method, opts, body) {
  const config = useRuntimeConfig();

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
  };

  const formBody = new URLSearchParams(body);

  const fetchData = await useFetch(url, {
    baseURL: config.public.baseURL,
    headers,
    method,
    ...opts,
    body: formBody,
  });

  return fetchData.data;
}
