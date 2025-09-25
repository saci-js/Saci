import { assert, assertEquals } from "@std/assert";
import { Brasil, type StateBrasil } from "../src/brasil/Brasil.ts";
import bancos from "../src/brasil/banks.ts";
import states from "../src/brasil/states.ts";

const brasil = new Brasil();
Deno.test("brasil.bank()", () => {
  const banco = brasil.bank();

  assert(bancos.includes(banco));
});

Deno.test("brasil.city() string", async () => {
  const cityNoState = await brasil.city();
  assertEquals(typeof cityNoState, "string");
  assert(cityNoState.length > 0);
});

Deno.test("brasil.city() City", async () => {
  const city = await brasil.city({ state: "SP", ibge: true });
  assertEquals(typeof city, "object");
  assert(city.name !== undefined);
  assert(city.ibgeCode !== undefined);
});

Deno.test("brasil.state()", () => {
  const state: StateBrasil = brasil.state();

  assert(states.includes(state));
  assertEquals(typeof state, "string");
  assertEquals(state.length, 2);
});
