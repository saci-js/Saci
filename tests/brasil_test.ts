import { assert } from "@std/assert";
import { Brasil, type Cidade, type EstadoBrasil } from "../src/brasil/Brasil.ts";
import bancos from "../src/brasil/banks.ts";
import estados from "../src/brasil/estados.ts";

Deno.test("brasil.banco()", () => {
  const brasil = new Brasil();
  const banco = brasil.bank();

  assert(bancos.includes(banco));
});

Deno.test("brasil.cidade()", async () => {
  const brasil = new Brasil();
  const cidade: Cidade = await brasil.cidade();
  
  assert(typeof cidade === "object");
  assert(typeof cidade.nome === "string");
  assert(typeof cidade.codigoIBGE === "string");
  assert(cidade.nome.length > 0);
  
  assert(/^\d{7}$/.test(cidade.codigoIBGE));
});

Deno.test("brasil.cidade() com estado - São Paulo", async () => {
  const brasil = new Brasil();
  const cidade: Cidade = await brasil.cidade("SP");

  assert(typeof cidade === "object");
  assert(typeof cidade.nome === "string");
  assert(typeof cidade.codigoIBGE === "string");
  
  assert(cidade.nome.length > 0);
  assert(/^\d{7}$/.test(cidade.codigoIBGE));
  assert(cidade.codigoIBGE.startsWith("35"));
});

Deno.test("brasil.cidade() com estado - Rio de Janeiro", async () => {
  const brasil = new Brasil();
  const cidade: Cidade = await brasil.cidade("RJ");

  assert(typeof cidade === "object");
  assert(typeof cidade.nome === "string");
  assert(typeof cidade.codigoIBGE === "string");
  
  assert(cidade.nome.length > 0);
  assert(/^\d{7}$/.test(cidade.codigoIBGE));
  assert(cidade.codigoIBGE.startsWith("33"));
});

Deno.test("brasil.estado()", () => {
  const brasil = new Brasil();
  const estado: EstadoBrasil = brasil.estado();

  assert(estados.includes(estado));
  assert(typeof estado === "string");
  assert(estado.length === 2);
});