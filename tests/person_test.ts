import { Person } from "../src/person/Person.ts";
import { assert, assertNotEquals } from "@std/assert";

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const RG_REGEX = /^\d{1,2}\.?\d{3}\.?\d{3}-?[0-9Xx]$/;

// dirty hack to check if the cpf string is valid
function isValidCpf(cpf: string) {
  if (!CPF_REGEX.test(cpf)) return false;
  const digits = cpf.replace(/\D/g, "").split("").map(Number);
  for (let j = 9; j < 11; j++) {
    const sum = digits
      .slice(0, j)
      .reduce((acc, d, i) => acc + d * (j + 1 - i), 0);
    const check = (sum * 10) % 11 % 10;
    if (check !== digits[j]) return false;
  }
  return true;
}

export function isValidRg(rg: string): boolean {
  return RG_REGEX.test(rg);
}

const person = new Person();

Deno.test("person.cpf()", () => {
  const cpf = person.cpf();

  assert(isValidCpf(cpf));
});

Deno.test("person.cpf() does not return the same cpf", () => {
  const cpf1 = person.cpf();
  const cpf2 = person.cpf();

  assertNotEquals(cpf1, cpf2);
});

Deno.test("person.rg()", () => {
  const rg = person.rg();

  assert(isValidRg(rg));
});

Deno.test("person.rg() does not return the same rg", () => {
  const rg1 = person.rg();
  const rg2 = person.rg();

  assertNotEquals(rg1, rg2);
});
