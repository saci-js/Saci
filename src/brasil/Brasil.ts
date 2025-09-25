import { pickRandom, randomBetween } from "../utils.ts";
import banks from "./banks.ts";
import states from "./states.ts";

/** City object to be returned in {@linkcode Brasil.city}. */
export interface City {
  /**
   * The name of the city.
   */
  name: string;

  /**
   * City IBGE code.
   */
  ibgeCode?: string;
}

export type StateBrasil =
  | "AC"
  | "AL"
  | "AM"
  | "AP"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MT"
  | "MS"
  | "MG"
  | "PA"
  | "PB"
  | "PR"
  | "PE"
  | "PI"
  | "RJ"
  | "RN"
  | "RS"
  | "RO"
  | "RR"
  | "SC"
  | "SP"
  | "SE"
  | "TO";

/** Options for {@linkcode Brasil.city}. */
export interface CityOptions {
  /**
   * A state to select the city from.
   *
   * @default {pickRandom(states)}
   */
  state?: StateBrasil;

  /**
   * If true will return the city ibgeCode.
   *
   * @default {true}
   */
  ibge?: true;
}

/** Options for {@linkcode Brasil.city}. */
export interface StringOptions {
  /**
   * A state to select the city from.
   *
   * @default {pickRandom(states)}
   */
  state?: StateBrasil;

  /**
   * If true will return the city ibgeCode.
   *
   * @default {false}
   */
  ibge?: false | undefined;
}

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
   * import { saci } from "@saci-js/saci";
   * const banco = saci.brasil.bank() // Bradesco, Banco Inter, BTG Pactual
   * ```
   */

  bank(): string {
    return pickRandom(banks);
  }

  /**
   * Returns a random city from a Brazilian state.
   *
   * @param opts Options for returning a random city
   * @returns
   * - `string` → when `ibge` is not provided or `false`, returns only the city name.
   * - `City` → when `ibge` is `true`, returns an object with city information.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const randomCity = await saci.brasil.city();
   *
   * const citySP = await saci.brasil.city({ state: "SP" });
   *
   * const cityObj = await saci.brasil.city({ state: "RJ", ibge: true });
   * ```
   */
  async city(opts: CityOptions): Promise<City>;
  async city(opts?: StringOptions): Promise<string>;
  async city(opts?: CityOptions | StringOptions): Promise<City | string> {
    const stateUF: StateBrasil = opts?.state || this.state();
    const ibge: boolean = opts?.ibge || false;

    const citiesModule = await import(`./cities/${stateUF}.ts`);
    const city: City = pickRandom(citiesModule.default);
    return ibge ? city : city.name;
  }

  /**
   * Returns a random Brazilian state UF code.
   *
   * @returns a state UF code.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const uf = saci.brasil.state() // "SP", "RJ", "MG", etc.
   * ```
   */
  state(): StateBrasil {
    return pickRandom(states) as StateBrasil;
  }

  /**
   * Returns a random Brazilian CEP code.
   *
   * @returns a CEP code.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const uf = saci.brasil.cep() // 	18320-970
   * ```
   */
  cep(): string {
    const cep = Array.from({ length: 8 }, () => {
      return randomBetween(0, 9);
    });
    // splice modifies the array
    return `${cep.splice(0, 5).join("")}-${cep.join("")}`;
  }
}
