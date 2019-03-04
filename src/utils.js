export const spaceSeparate = number => {
  return number
    .toString()
    .split('')
    .slice()
    .reverse()
    .map((x, index) => {
      return index % 3 === 0 ? x + ' ' : x;
    })
    .reverse()
    .join('');
};
