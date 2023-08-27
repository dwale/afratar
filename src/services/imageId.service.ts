export const getImageId = (input: string | number, maxValue: number) => {
  const inputStr = String(input);
  console.log(inputStr, "inputString");
  const numericValue = inputStr
    .split("")
    .reduce((accumulator, char) => accumulator + char.charCodeAt(0), 1);
  console.log(maxValue, "max", numericValue, "translation");

  const imageId = (numericValue % maxValue) + 1;
  4;
  return imageId;
};
