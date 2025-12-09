import { pickRandom, randomBetween } from "../utils.ts";
import type { NamesOptions, PhoneOptions } from "./options.ts";
import ddds from "./ddds.ts";
import { fem, masc } from "./names/firstNames.ts";
import lastNames from "./names/lastNames.ts";
import type { Options } from "../interface.ts";
import { format } from "jsr:@std/internal@^1.0.10/format";

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
   * import { saci } from "@saci-js/saci";
   * const cpf = saci.person.cpf() // 123.456.789-01
   * ```
   */
  cpf(opts?: Options): string {
    const { formated = true } = opts ?? {};

    const digits = Array.from({ length: 9 }, () => randomBetween(0, 9));

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

    if (!formated) return digits.join("");

    return `${firstThree}.${secondThree}.${lastThree}-${digit1}${digit2}`;
  }
  /**
   * Generates a random valid RG
   *
   * @returns a valid RG.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const rg = saci.person.rg() // 12.456.789-X
   * ```
   */
  rg(opts?: Options): string {
    const { formated = true } = opts ?? {};
    const digits = Array.from({ length: 8 }, () => randomBetween(0, 9));

    const weightedSum = digits.reduce(
      (acc, digit, idx) => acc + digit * (9 - idx),
      0,
    );

    const digit = weightedSum % 11 === 10 ? "X" : weightedSum % 11;

    const firstTwo = digits.slice(0, 2).join("");
    const secondThree = digits.slice(2, 5).join("");
    const lastThree = digits.slice(5, 8).join("");

    if (!formated) return digits.join("");

    return `${firstTwo}.${secondThree}.${lastThree}-${digit}`;
  }

  /**
   * Generates a random first name.
   *
   * @returns a first name string.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
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
   * import { saci } from "@saci-js/saci";
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
   * import { saci } from "@saci-js/saci";

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

  /**
   * Generates a phone number.
   *
   * @returns a phone number.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   *
   * const yudi = {
   *   name: "Yudi",
   *   whatsapp: saci.person.phone({ ddi: true, ddd: true, length = 9, formated = true }), // +55 (11) 91234-5678
   *   fixo: saci.person.phone({ length: 8 }) // (11) 4002-8922
   * }
   *
   * ```
   */
  phone(opts?: PhoneOptions): string {
    const { ddd = true, ddi = false, formated = true, length = 9 } = opts ?? {};
    const BRAZIL_CODE = "55";
    const DDD = String(pickRandom(ddds));

    const firstHalf = randomBetween(1000, 9999);
    const secondHalf = randomBetween(1000, 9999);

    const isMobile = length === 9;
    const number = isMobile
      ? `9${firstHalf}-${secondHalf}`
      : `${firstHalf}-${secondHalf}`;

    if (formated) {
      if (ddi && ddd) return `+${BRAZIL_CODE} (${DDD}) ${number}`;
      if (ddd) return `(${DDD}) ${number}`;
      if (ddi) return `+${BRAZIL_CODE} ${number}`;
      return number;
    }

    const parts: string[] = [];
    if (ddi) parts.push(BRAZIL_CODE);
    if (ddd) parts.push(DDD);
    parts.push(
      isMobile ? `9${firstHalf}${secondHalf}` : `${firstHalf}${secondHalf}`,
    );
    return parts.join("");
  }

  /**
   * Generates a random valid CNH
   *
   * @returns a valid CNH.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const cnh = saci.person.cnh() // 12345678901
   * ```
   */
  cnh(): string {
    const baseDigits = Array.from({ length: 9 }, () => randomBetween(0, 9));

    let sum = baseDigits.reduce(
      (acc, digit, idx) => acc + digit * (9 - idx),
      0,
    );
    let firstCheckDigit = sum % 11;
    let firstIsGreaterThanNine = false;
    if (firstCheckDigit > 9) {
      firstCheckDigit = 0;
      firstIsGreaterThanNine = true;
    }

    sum = baseDigits.reduce((acc, digit, idx) => acc + digit * (idx + 1), 0);
    let secondCheckDigit = sum % 11;
    if (firstIsGreaterThanNine) {
      secondCheckDigit = secondCheckDigit - 2 < 0
        ? secondCheckDigit + 9
        : secondCheckDigit - 2;
    }
    if (secondCheckDigit > 9) secondCheckDigit = 0;

    baseDigits.push(firstCheckDigit, secondCheckDigit);

    return baseDigits.join("");
  }

  // Por enquanto fica aqui
  /**
   * Generates a random valid CNPJ
   *
   * @returns a valid CNPJ.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const cnh = saci.person.cnpj() // 36.333.513/0002-42
   * ```
   */
  cnpj(opts?: Options): string {
    const { formated = true } = opts ?? {};
    const firstBlock = Array.from({ length: 8 }, () => {
      return randomBetween(1, 9);
    });

    const secondBlock = [0, 0, 0, randomBetween(1, 3)];

    let sum = [...secondBlock.reverse(), ...firstBlock.reverse()].reduce(
      (acc, digit, idx) => acc + digit * ((idx % 8) + 2),
      0,
    );

    let modulo = 11 - (sum % 11);
    const firstDigit = modulo >= 10 ? 0 : modulo;

    sum = [firstDigit, ...secondBlock.reverse(), ...firstBlock.reverse()]
      .reduce(
        (acc, digit, idx) => acc + digit * ((idx % 8) + 2),
        0,
      );

    modulo = 11 - (sum % 11);
    const secondDigit = modulo >= 10 ? 0 : modulo;
    if (!formated) {
      return `${firstBlock.splice(0, 2).join("")}${
        firstBlock.splice(0, 3).join("")
      }${firstBlock.splice(0, 3).join("")}${
        secondBlock.join("")
      }${firstDigit}${secondDigit}`;
    }

    return `${firstBlock.splice(0, 2).join("")}.${
      firstBlock.splice(0, 3).join("")
    }.${firstBlock.splice(0, 3).join("")}/${
      secondBlock.join("")
    }-${firstDigit}${secondDigit}`;
  }
}
