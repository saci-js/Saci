import { pickRandom, randomBetween } from "../utils.ts";
import courses from "./course/courses.ts";
import colleges from "./colleges.ts";

/** Options for {@linkcode Student.ra}. */
export interface RaOptions {
  /**
   * A certain length of the RA generated.
   *
   * @default {8}
   */
  length?: number;
}

/** College object to be returned in {@linkcode Student.college}. */
export interface College {
  /**
   * The full name of the college.
   */
  name: string;

  /**
   * The reduced name of the college.
   */
  acronym: string;

  /**
   * If the college is public or a private institution.
   */
  type: string;
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
   * import { saci } from "@saci-js/saci";
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

  /**
   * Generates a random course.
   *
   * @returns a random course.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const course1 = saci.student.course() // Administração Pública
   * const course2 = saci.student.course() // Administração
   * ```
   */
  course(): string {
    return pickRandom(courses);
  }

  /**
   * Generates a random college.
   *
   * @returns a random college.
   *
   * @example
   * ```ts
   * import { saci } from "@saci-js/saci";
   * const course1 = saci.student.college() // "Universidade de São Paulo"
   * const { name, acronym, type } = saci.student.course({ complete: true }) // { name: "Universidade de Campinas", acronym: "UNICAMP", type: "publica" }
   * ```
   */
  college(): string;
  college(opts: { complete: true }): College;
  college(opts: { complete: false }): string;
  college(opts?: { complete?: boolean }): College | string {
    const complete: boolean = opts?.complete ?? false;
    const college: College = pickRandom(colleges);
    return complete ? college : college.name;
  }
}
