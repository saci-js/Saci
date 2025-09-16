import { pickRandom, randomBetween } from "../utils.ts";
import { fem, masc } from "./names/firstNames.ts";
import lastNames from "./names/lastNames.ts";

/** Options for {@linkcode Person.firstName} or {@linkcode Person.fullName}. */
export interface NamesOptions {
  /**
   * The set to where to get the name from.
   *
   * @default {"neutral"}
   */
  set: "neutral" | "masculine" | "feminine";
}

/**
 * Class containing many methods that are useful for creating fake data about a person.
 *
 * @class Person
 */
export class Person {
  /**
   * Generates a random valid CPF
   *
   * @returns a valid CPF.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const cpf = saci.person.cpf() // 123.456.789-01
   * ```
   */
  // TODO(wasix): No futuro talvez seja legal ter uma opção para voltar formatado ou não
  cpf(): string {
    const N = randomBetween(100_000_000, 999_999_999);
    const digits = String(N).split("").map(Number);

    let weightedSum = digits.reduce(
      (acc, digit, idx) => acc + digit * (10 - idx),
      0,
    );
    let remainder = (weightedSum * 10) % 11;
    const digit1 = remainder === 10 ? 0 : remainder;

    digits.push(digit1);

    weightedSum = digits.reduce(
      (acc, digit, idx) => acc + digit * (11 - idx),
      0,
    );

    remainder = (weightedSum * 10) % 11;
    const digit2 = remainder === 10 ? 0 : remainder;

    const firstThree = digits.slice(0, 3).join("");
    const secondThree = digits.slice(3, 6).join("");
    const lastThree = digits.slice(6, 9).join("");

    return `${firstThree}.${secondThree}.${lastThree}-${digit1}${digit2}`;
  }
  /**
   * Generates a random valid RG
   *
   * @returns a valid RG.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const rg = saci.person.rg() // 12.456.789-X
   * ```
   */
  rg(): string {
    const N = randomBetween(10_000_000, 99_999_999);
    const digits = String(N).split("").map(Number);

    const weightedSum = digits.reduce(
      (acc, digit, idx) => acc + digit * (9 - idx),
      0,
    );

    const digit = weightedSum % 11 === 10 ? "X" : weightedSum % 11;

    const firstTwo = digits.slice(0, 2).join("");
    const secondThree = digits.slice(2, 5).join("");
    const lastThree = digits.slice(5, 8).join("");

    return `${firstTwo}.${secondThree}.${lastThree}-${digit}`;
  }

  /**
   * Generates a random first name.
   *
   * @returns a first name string.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const neutralName = saci.person.firstName() // Lucas, Ana, Rodrigo, Maria, ...
   *
   * const mascName = saci.person.firstName({ set: "masculine" }) // Lucas, Rodrigo, ...
   *
   * const femName = saci.person.firstName({ set: "feminine" }) // Ana, Maria, ...
   * ```
   */
  firstName(opts?: NamesOptions): string {
    const { set = "neutral" } = opts ?? {};

    if (set === "neutral") return pickRandom([...masc, ...fem]);

    return set === "masculine" ? pickRandom(masc) : pickRandom(fem);
  }

  /**
   * Generates a random last name.
   *
   * @returns a last name string.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const neutralName = saci.person.lastName() // Gonçalves, Soares, Souza, ...
   * ```
   */
  lastName(): string {
    return pickRandom(lastNames);
  }

  /**
   * Generates a full name.
   *
   * @returns a full name string.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";

   * const neutralName = saci.person.fullName() // João de Castro Barbosa, Ana Lima Freitas ...
   *
   * const mascName = saci.person.fullName({ set: "masculine" }) // João do Castro Barbosa, ...
   *
   * const femName = saci.person.fullName({ set: "feminine" }) // Ana Lima da Freitas, ...
   * ```
   */
  fullName(opts?: NamesOptions): string {
    const { set = "neutral" } = opts ?? {};

    const lastNamesNumber = randomBetween(1, 3);
    const particles = ["do", "da", "de"];

    const first = this.firstName({ set });

    const last = Array.from({ length: lastNamesNumber }, () => {
      const name = this.lastName();
      return randomBetween(1, 10) > 7
        ? `${pickRandom(particles)} ${name}`
        : name;
    });

    return `${first} ${last.join(" ")}`;
  }
}
