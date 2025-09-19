// Queremos testar nossa solução, porém ainda não temos um Banco de dados pronto

import { assertEquals, assertStringIncludes } from "@std/assert";
import { saci } from "../../src/mod.ts";

interface Aluno {
  name: string;
  ra: string;
  rg: string;
  grade: number;
}

interface QueryOpts {
  where: string;
  equals?: string;
  greater?: number;
}

class PostgresStub {
  #rows: Array<Aluno>;
  constructor() {
    this.#rows = [];
  }

  insert(aluno: Aluno): boolean {
    this.#rows.push(aluno);
    return true;
  }

  get(opts?: QueryOpts): Aluno[] {
    const { where = "*", equals = "", greater = 0 } = opts ?? {};
    const result: Aluno[] = [];

    for (const aluno of this.#rows) {
      if (where === "*") {
        result.push(aluno);
        continue;
      }

      const keys = Object.keys(aluno);
      const index = keys.indexOf(where);

      if (index < 0) continue;
      const key = keys[index];
      // @ts-ignore Essa key existe
      const col = aluno[key];

      if (col === equals) {
        result.push(aluno);
        continue;
      }

      if (typeof col === "number" && col > greater) {
        result.push(aluno);
        continue;
      }
    }
    return result;
  }
}

const db = new PostgresStub();
const mockData = Array.from({ length: 7 }, () => {
  return {
    name: saci.person.fullName(),
    rg: saci.person.rg(),
    ra: saci.student.ra(),
    grade: Math.floor(Math.random() * 11),
  };
});

class NSARevamp {
  constructor() {
  }

  static gradeFloat(int: number): string {
    return int.toFixed(2);
  }

  static congratulations(aluno: Aluno): string {
    return `Parabéns ${aluno.name} (${aluno.ra}), você conseguiu uma média maior que 7`;
  }
}

mockData.forEach((aluno) => {
  db.insert(aluno);
});

Deno.test("NSARevamp.gradeFloat()", () => {
  for (const { grade } of db.get()) {
    const fixed = NSARevamp.gradeFloat(grade);
    assertStringIncludes(fixed, ".");

    const parsedBack = parseFloat(fixed);
    assertEquals(parsedBack, grade);
  }
});

Deno.test("NSARevamp.congratulations()", () => {
  const rows = db.get({ where: "grade", greater: 7 });

  const results = [];

  for (const aluno of rows) {
    results.push(NSARevamp.congratulations(aluno));
  }

  assertEquals(results.length, rows.length);
});
