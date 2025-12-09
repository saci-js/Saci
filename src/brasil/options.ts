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
