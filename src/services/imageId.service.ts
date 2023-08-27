export const getImageId = (input: string | number, maxValue: number) => {
  const inputStr = String(input);
  const numericValue = inputStr
    .split("")
    .reduce((accumulator, char) => accumulator + char.charCodeAt(0), 1);

  const imageId = (numericValue % maxValue) + 1;
  4;
  return imageId;
};
