// Vamos criar uma API de transferência de dinheiro que retorna dados aleatórios.

import express from "express";
import process from "node:process";
import { saci } from "../../src/mod.ts";
import { randomUUID } from "node:crypto";

const port = process.env.PORT || 5000;
const app = express();

app.get("/", (_req: express.Request, res: express.Response) => {
  return res.status(200).json({
    transaction_id: randomUUID(),
    amout: Math.random() * 700,
    to: {
      name: saci.person.fullName(),
      phone: saci.person.phone({ ddi: true, ddd: true, formated: true }),
      cpf: saci.person.cpf(),
      bank: saci.brasil.bank(),
    },
    from: {
      name: saci.person.fullName(),
      phone: saci.person.phone({ ddi: true, ddd: true, formated: true }),
      cpf: saci.person.cpf(),
      bank: saci.brasil.bank(),
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});
