import { assert } from "@std/assert";
import { Brasil } from "../src/brasil/Brasil.ts";
import bancos from "../src/brasil/banks.ts";

Deno.test("brasil.bank()", () => {
  const brasil = new Brasil();
  const banco = brasil.bank();

  assert(bancos.includes(banco));
});
