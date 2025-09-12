import { Person } from "../src/person/Person.ts";
import { assert, assertNotEquals } from "@std/assert";

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

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

Deno.test("person.cpf() returns a valid cpf", () => {
  const person = new Person();

  const cpf = person.cpf();

  assert(isValidCpf(cpf));
});

Deno.test("person.cpf() does not return the same cpf", () => {
  const person = new Person();

  const cpf1 = person.cpf();
  const cpf2 = person.cpf();

  assertNotEquals(cpf1, cpf2);
});
