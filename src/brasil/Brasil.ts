import { pickRandom } from "../utils.ts";
import banks from "./banks.ts";
import estados from "./estados.ts";

export interface Cidade {
  nome: string;
  codigoIBGE: string;
}

// Tipo union para estados brasileiros (funciona como enum)
export type EstadoBrasil = typeof estados[number];

/**
 * Class containing many methods that contain brasilian info.
 *
 * @class Brasil
 */
export class Brasil {
  /**
   * Returns a valid Brasil Bank or Fintech.
   *
   * @returns a Bank or a Fintech.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const banco = saci.brasil.bank() // Bradesco, Banco Inter, BTG Pactual
   * ```
   */

  bank(): string {
    return pickRandom(banks);
  }

  /**
   * Returns a random city from a random Brazilian state.
   *
   * @returns a Cidade object with nome and codigoIBGE.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const cidade = await saci.brasil.cidade(); // Random state
   * ```
   */
  async cidade(): Promise<Cidade>;
  
  /**
   * Returns a random city from a specific Brazilian state.
   *
   * @param estado - The state UF code (e.g., "SP", "RJ", "MG")
   * @returns a Cidade object with nome and codigoIBGE from the specified state.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const cidadeSP = await saci.brasil.cidade("SP"); // São Paulo state
   * const cidadeRJ = await saci.brasil.cidade("RJ"); // Rio de Janeiro state
   * ```
   */
  async cidade(estado: EstadoBrasil): Promise<Cidade>;
  async cidade(estado?: EstadoBrasil): Promise<Cidade> {
    const estadoUF = estado || pickRandom(estados);
    
    const cidadesModule = await import(`./cidades/${estadoUF}.ts`);
    const cidades = cidadesModule.default;
    
    return pickRandom(cidades);
  }

  /**
   * Returns a random Brazilian state UF code.
   *
   * @returns a state UF code.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const uf = saci.brasil.estado() // "SP", "RJ", "MG", etc.
   * ```
   */
  estado(): EstadoBrasil {
    return pickRandom(estados);
  }
}
