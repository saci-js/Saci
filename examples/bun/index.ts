// Vamos criar um arquivo `pessoas.csv` e escrever 100_000 registros lá

import { saci } from "../../src/mod.ts";
import { appendFile } from "node:fs/promises";

const PATH = "pessoas.csv";
Bun.file(PATH);

async function* generateRandomPerson(
  { to }: { to: number },
): AsyncGenerator<string> {
  for (let i = 0; i < to; i++) {
    const state = saci.brasil.state();
    // @ts-ignore Será string
    const city: string = await saci.brasil.city({ state });

    const nome = saci.person.firstName();
    const sobrenome = saci.person.lastName();
    const telefone = saci.person.phone();

    yield `${nome};${sobrenome};${telefone};${state};${city}\n`;
  }
}

for await (const pessoas of generateRandomPerson({ to: 100_000 })) {
  appendFile(PATH, pessoas);
}
