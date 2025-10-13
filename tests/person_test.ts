import { fem, masc } from "../src/person/names/firstNames.ts";
import lastNames from "../src/person/names/lastNames.ts";
import { Person } from "../src/person/Person.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
  assertStringIncludes,
} from "@std/assert";

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const RG_REGEX = /^\d{1,2}\.?\d{3}\.?\d{3}-?[0-9Xx]$/;
const PARTICLES = ["do", "da", "de"];
const FIXO_REGEX = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?\d{4}-\d{4}$/;
const MOBILE_REGEX = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?9\d{4}-\d{4}$/;

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

export function isValidCnh(cnh: string): boolean {
  const nums = cnh.replace(/\D/g, "").split("").map(Number);
  if (nums.length !== 11) return false;

  let sum1 = 0;
  for (let i = 0; i < 9; i++) sum1 += nums[i] * (9 - i);
  const dv1Raw = sum1 % 11;
  const dv1 = dv1Raw > 9 ? 0 : dv1Raw;
  const firstExceeded = dv1Raw > 9;

  let sum2 = 0;
  for (let i = 0; i < 9; i++) sum2 += nums[i] * (i + 1);
  let dv2Raw = sum2 % 11;
  if (firstExceeded) dv2Raw = dv2Raw - 2 < 0 ? dv2Raw + 9 : dv2Raw - 2;
  const dv2 = dv2Raw > 9 ? 0 : dv2Raw;

  return nums[9] === dv1 && nums[10] === dv2;
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

Deno.test("person.firstName()", () => {
  const name = person.firstName();

  assertEquals(typeof name, "string");
  assert([...fem, ...masc].includes(name));

  const masculineName = person.firstName({ set: "masculine" });

  assertEquals(typeof masculineName, "string");
  assert(masc.includes(masculineName));
  assert(!fem.includes(masculineName));

  const feminineName = person.firstName({ set: "feminine" });

  assertEquals(typeof feminineName, "string");
  assert(fem.includes(feminineName));
  assert(!masc.includes(feminineName));
});

Deno.test("person.lastName()", () => {
  const lastName = person.lastName();

  assertEquals(typeof lastName, "string");
  assert(lastNames.includes(lastName));
});

Deno.test("person.fullName()", () => {
  const fullName = person.fullName();

  assertEquals(typeof fullName, "string");

  const sections = fullName.split(" ");
  const first = sections[0];

  assert([...fem, ...masc].includes(first));

  const restNames = sections.slice(1).filter((val) => !PARTICLES.includes(val));
  assertArrayIncludes(lastNames, restNames);
});

Deno.test("person.phone()", () => {
  const fone = person.phone();
  assert(MOBILE_REGEX.test(fone));

  const fixo = person.phone({ length: 8 });
  assert(FIXO_REGEX.test(fixo));

  const nonFormat = person.phone({ formated: false, ddi: true, ddd: true });
  // 9 + 2 (ddd) + 2 (ddi)
  assertEquals(nonFormat.length, 13);

  const ddiNoDdd = person.phone({ ddi: true, ddd: false });

  assert(!ddiNoDdd.includes("("));
  const brasilFormat = ddiNoDdd.split(" ")[0];
  assertEquals(brasilFormat, "+55");
});

Deno.test("person.cnh()", () => {
  const cnh = person.cnh();

  assert(isValidCnh(cnh));
});

Deno.test("person.cnh() does not return the same cnh", () => {
  const cnh1 = person.cnh();
  const cnh2 = person.cnh();

  assertNotEquals(cnh1, cnh2);
});

Deno.test("person.cnpj()", () => {
  const cnpj = person.cnpj();

  assertEquals(cnpj.length, 18);
  assertStringIncludes(cnpj, "/");
  assertStringIncludes(cnpj, ".");
  assertStringIncludes(cnpj, "-");
});
