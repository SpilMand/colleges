import { useRoute } from 'vue-router';

export default function useCanonicalHead(callback) {
  const route = useRoute();
  const href = window.location.origin + (callback instanceof Function ? callback(route) : route.path);

  useHead({
    link: [{ rel: 'canonical', href }],
  });
}
