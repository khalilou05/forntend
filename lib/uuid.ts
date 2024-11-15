export const genRandString = () => {
  const chars = "A1B2C3D4E5F6J7";
  let generated = "";
  for (let index = 0; index < 8; index++) {
    const random = Math.round(Math.random() * 10 + 2);

    generated += chars[random];
  }
  return generated;
};
