import { assert } from "@std/assert";
import { Brasil, type City, type StateBrasil } from "../src/brasil/Brasil.ts";
import bancos from "../src/brasil/banks.ts";
import states from "../src/brasil/states.ts";

Deno.test("brasil.banco()", () => {
  const brasil = new Brasil();
  const banco = brasil.bank();

  assert(bancos.includes(banco));
});

Deno.test("brasil.city()", async () => {
  const brasil = new Brasil();
  const city: City = await brasil.city();
  
  assert(typeof city === "object");
  assert(typeof city.nome === "string");
  assert(typeof city.codigoIBGE === "string");
  assert(city.nome.length > 0);
  
  assert(/^\d{7}$/.test(city.codigoIBGE));
});

Deno.test("brasil.city() with params", () => {
  const ibge = [true, false, undefined];
  ibge.forEach((ibge) => {
    const states : StateBrasil[] = [ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    states.forEach(async (state) => {
      const brasil = new Brasil();
      const city: City = await brasil.city(state, ibge);
    
      assert(typeof city === "object");
      assert(typeof city.nome === "string");
      if(ibge) 
        assert(typeof city.codigoIBGE === "string");
      else
        assert(city.codigoIBGE === undefined);

      assert(city.nome.length > 0);
      if(ibge)
        assert(/^\d{7}$/.test(city.codigoIBGE!));
      else
        assert(city.codigoIBGE === undefined);
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