export default function useSortArray(array) {
  if (array && array.length) {
    return array.sort((a, b) => {
      if (a.attributes.sort < b.attributes.sort) {
        return -1;
      }

      if (a.attributes.sort > b.attributes.sort) {
        return 1;
      }

      return 0;
    });
  } else {
    return [];
  }
}
