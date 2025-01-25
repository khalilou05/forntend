const options = [
  { name: "size", items: ["s", "m", "l"] },
  { name: "color", items: ["red", "blue"] },
];

const [firstOption, ...rest] = options;

let firstVariant = firstOption.items.map((item) => ({
  [firstOption.name]: item,
}));

for (const option of rest) {
  firstVariant = firstVariant.flatMap((variant) =>
    option.items.map((item) => ({ ...variant, [option.name]: item }))
  );
}

// console.log(firstVariant);
console.log(Object.groupBy(firstVariant, ({ color }) => color));
