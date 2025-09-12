import { assertInstanceOf } from "@std/assert";
import { saci } from "../src/mod.ts";
import { Saci } from "../src/Saci.ts";
import { Person } from "../src/person/Person.ts";

Deno.test("saci is instanceof Saci", () => {
  assertInstanceOf(saci, Saci);
});

Deno.test("saci.person is instanceof Person", () => {
  assertInstanceOf(saci.person, Person);
});
