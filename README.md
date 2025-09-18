# Saci
[![ci](https://github.com/Saci5/Saci/actions/workflows/ci.yml/badge.svg)](https://github.com/Saci5/Saci/actions/workflows/ci.yml)

Uma biblioteca de dados sintéticos brasileiros para mockups, testes e MVPs.

> [!IMPORTANT]
> Os dados criados pela biblioteca são criados de forma randômica
> e tem apenas a intenção de parecerem reais. Por favor não os use em produção.

___

# Features 🏆
- Brasil: cidades, estados, CEPs, e mais.
- Pessoas: Nome, Sobrenome, RG, CPF, CNH, e mais.
- Estudantes: RA, Faculdades, Cursos, e mais.


# Uso 🏗️

Baixe com o [jsr](https://jsr.io/)

```bash
$ jsr add @saci5/saci
```

Use com: 

```typescript
import { saci } from "@saci5/saci"

const pessoa = {
    nome: saci.person.firstName(),
    sobrenome: saci.person.lastName(),
    telefone: saci.person.phone(),
    cpf: saci.person.cpf(),
    banco: saci.brasil.bank(),
    estado: saci.brasil.state()
}
```
veja a pasta `examples` para mais!
___

# Acknowledgements 🤝
- [Faker-js](https://github.com/faker-js/faker)
