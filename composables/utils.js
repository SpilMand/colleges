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

export function validDate(str) {
  const date = new Date(str);
  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  const dateNum = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return [dateNum, months[month], year].join(' ');
}
