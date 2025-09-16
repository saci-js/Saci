import { pickRandom } from "../utils.ts";
import banks from "./banks.ts";
import states from "./states.ts";

export interface City {
  nome: string;
  codigoIBGE?: string;
}

// Tipo union para states brasileiros (funciona como enum)
export type StateBrasil = 
  | "AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" 
  | "GO" | "MA" | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" 
  | "PE" | "PI" | "RJ" | "RN" | "RS" | "RO" | "RR" | "SC" 
  | "SP" | "SE" | "TO";

// export interface CityOptions {
//   state?: StateBrasil,
//   ibge?: boolean
// }
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
   * @returns a City object with nome and codigoIBGE.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const city = await saci.brasil.city(); // Random state
   * ```
   */
  
  /**
   * Returns a random city from a specific Brazilian state.
   *
   * @param state - The state UF code (e.g., "SP", "RJ", "MG")
   * @returns a City object from the specified state.
   * @param ibge - If true, returns a City object with nome and codigoIBGE.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const citySP = await saci.brasil.city("SP"); // São Paulo state without ibge code
   * const cityRJ = await saci.brasil.city("RJ", true); // Rio de Janeiro state and ibge code
   * ```
   */
  //opts: CityOptions = {} as CityOptions
  async city(state? : StateBrasil, ibge? : boolean): Promise<City> {
    
    const stateUF : StateBrasil = state || this.state();
    
    const citiesModule = await import(`./cities/${stateUF}.ts`);
    const city : City = pickRandom(citiesModule.default);

    return ibge ? city : {nome: city.nome};
  }

  /**
   * Returns a random Brazilian state UF code.
   *
   * @returns a state UF code.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const uf = saci.brasil.state() // "SP", "RJ", "MG", etc.
   * ```
   */
  state(): StateBrasil {
    return pickRandom(states);
  }
}
