export function getIncludeData(data, included, type) {
  let arr = [];
  let includeType;
  switch (type) {
    case 'city':
      includeType = 'cities';
      break;
    case 'college':
      includeType = 'colleges';
      break;
    case 'oksoSpecialty':
      includeType = 'okso-specialties';
      break;
    case 'form':
      includeType = 'forms';
      break;
    case 'admissionOffices':
      includeType = 'admission-offices';
      break;
    case 'theme':
      includeType = 'question-themes';
      break;
    case 'user':
      includeType = 'users';
      break;
    default:
      includeType = type;
      break;
  }
  try {
    for (let item of included) {
      if (item.type == includeType) {
        if (data.relationships[type].data.length) {
          for (let param of data.relationships[type].data) {
            if (param.id == item.id) {
              arr.push(item);
            }
          }
        } else {
          if (data.relationships[type].data.id == item.id) {
            arr = item;
          }
        }
      }
    }
  } catch {}
  return arr;
}
