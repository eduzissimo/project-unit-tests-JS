const average = (array) => {
  if (array.length === 0) {
    return undefined;
  }

  let sum = 0;
  let count = 0;

  for (let index = 0; index < array.length; index += 1) {
    if (typeof array[index] !== 'number') {
      return undefined;
    }
    sum += array[index];
    count += 1;
  }

  const media = sum / count;

  return Math.round(media);
};

module.exports = average;
