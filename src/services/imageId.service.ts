export const getImageId = (input: string | number, maxValue: number) => {
  const inputStr = String(input);
  console.log("id from user", input, maxValue);

  const numericValue = inputStr
    .split("")
    .reduce((accumulator, char) => accumulator + char.charCodeAt(0), 0);

  const imageId = (numericValue % (maxValue - 1)) + 1;
  return imageId;
};
