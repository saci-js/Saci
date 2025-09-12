import { pickRandom, randomBetween } from "../src/utils.ts";

import { assert, assertGreaterOrEqual, assertLessOrEqual } from "@std/assert";

Deno.test("pickRandom() returns a random element from an array", () => {
  const choices = [
    "São Paulo",
    "Rio de Janeiro",
    "Brasília",
    "Curitiba",
    "Natal",
  ];

  const choosen = pickRandom(choices);

  assert(choices.includes(choosen));
});

Deno.test("randomBetween() generates a number between a range", () => {
  const min = 1;
  const max = 10;
  for (let i = 0; i < 100; i++) {
    const N = randomBetween(min, max);

    assertGreaterOrEqual(N, min);
    assertLessOrEqual(N, max);
  }
});
