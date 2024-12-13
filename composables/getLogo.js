export function getLogo(arr) {
  let logo = '';
  arr.forEach((element) => {
    if (element.attributes.name === 'logo') {
      logo = element.attributes.url;
    }
  });
  return logo;
}
