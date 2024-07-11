export function declineWord(count, word) {
  const cases = {
    колледж: ['колледж', 'колледжа', 'колледжей'],
    направление: ['направление', 'направления', 'направлений'],
    специальность: ['специальность', 'специальности', 'специальностей'],
    профессия: ['профессия', 'профессии', 'профессий'],
  };

  if (count === 1) {
    return cases[word][0];
  } else if (count >= 2 && count <= 4) {
    return cases[word][1];
  } else {
    return cases[word][2];
  }
}

export function getTitle(apiData, entityType) {
  if (apiData && apiData.meta && apiData.meta.page) {
    const count = apiData.meta.page.total;
    const declinedWord = declineWord(count, entityType);
    return count + ' ' + declinedWord;
  }
  return entityType;
}
