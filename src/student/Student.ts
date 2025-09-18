import { randomBetween } from "../utils.ts";

/** Options for {@linkcode Student.ra}. */
export interface RaOptions {
  /**
   * A certain length of the RA generated.
   *
   * @default {8}
   */
  length?: number;
}

/**
 * Class containing many methods that are useful for creating fake data about a student.
 *
 * @class Student
 */
export class Student {
  /**
   * Generates a random RA.
   *
   * @returns a random RA.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const ra1 = saci.student.ra() // 59817749
   * const ra2 = saci.student.ra({ length: 10 }) // 0719502597
   * ```
   */
  ra(opts?: RaOptions): string {
    const { length = 8 } = opts ?? {};

    const n = Array.from({ length }, () => {
      return randomBetween(0, 9);
    });

    return n.join("");
  }
}
