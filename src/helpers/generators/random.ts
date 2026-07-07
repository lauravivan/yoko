export const generateRandomString = (actualValue: string, values: string[]) => {
  let random = values[Math.floor(Math.random() * values.length)];

  while (random == actualValue) {
    random = values[Math.floor(Math.random() * values.length)];
  }

  return random;
};
