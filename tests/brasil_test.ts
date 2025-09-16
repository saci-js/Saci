import { assert } from "@std/assert";
import {
  Brasil,
  type City,
  CityOptions,
  type StateBrasil,
} from "../src/brasil/Brasil.ts";
import bancos from "../src/brasil/banks.ts";
import states from "../src/brasil/states.ts";

Deno.test("brasil.bank()", () => {
  const brasil = new Brasil();
  const banco = brasil.bank();

  assert(bancos.includes(banco));
});

Deno.test("brasil.city()", async () => {
  const brasil = new Brasil();

  const cityNoState: City | string = await brasil.city();
  assert(typeof cityNoState === "string");
  assert(cityNoState.length > 0);

  [true, false, undefined].forEach((ibge: boolean | undefined) => {
    [...states].forEach(async (state) => {
      const city: City | string = await brasil.city(
        { state, ibge } as CityOptions,
      );

      if (ibge) {
        assert(typeof city === "object");
        assert(typeof city.name === "string");
        assert(typeof city.ibgeCode === "string");
        assert(city.name.length > 0);
        assert(/^\d{7}$/.test(city.ibgeCode));
      } else {
        assert(typeof city === "string");
        assert(city.length > 0);
      }
    });
  });
});

Deno.test("brasil.state()", () => {
  const brasil = new Brasil();
  const state: StateBrasil = brasil.state();

  assert(states.includes(state));
  assert(typeof state === "string");
  assert(state.length === 2);
});
