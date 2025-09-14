import { randomBetween } from "../utils.ts";

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
}
