import { pickRandom, randomBetween } from "../utils.ts";
import courses from "./course/courses.ts";
import { Brasil, StateBrasil } from "../brasil/Brasil.ts";

/** Options for {@linkcode Student.ra}. */
export interface RaOptions {
  /**
   * A certain length of the RA generated.
   *
   * @default {8}
   */
  length?: number;
}

export interface College {
  name: string;
  acronym: string;
  type: string;
}

export interface CollegeOptions {
  /**
   * A state to select the college from.
   *
   * @default {saci.brasil.state()}
   * Random state from Brasil.
   */
  state?: StateBrasil;

  /**
   * If true will return both the college name, acronym and type.
   *
   * @default {false}
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const college = saci.student.college({ complete: true }) // { name: "Universidade Federal do Rio de Janeiro", acronym: "UFRJ", type: "publica" }
   * ```
   * In the other hand, if false will return only the college name.
   *
   * @example
   * ```ts
   * import { saci } from "@saci5/saci";
   * const college = saci.student.college({ complete: false }) // "Universidade Federal do Rio de Janeiro"
   * ```
   */
  complete?: boolean;
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

  course(): string {
    /**
     * Generates a random course.
     *
     * @returns a random course.
     *
     * @example
     * ```ts
     * import { saci } from "@saci5/saci";
     * const course1 = saci.student.course() // Administração Pública
     * const course2 = saci.student.course({ length: 10 }) // Administração
     * ```
     */
    return pickRandom([...courses]);
  }

  async college(opts?: CollegeOptions): Promise<College | string> {
    /**
     * Generates a random college.
     *
     * @returns a random college.
     *
     * @example
     * ```ts
     * import { saci } from "@saci5/saci";
     * const college1 = saci.student.college() // Universidade Federal do Rio de Janeiro
     * const college2 = saci.student.college({ length: 10 }) // Universidade Federal do Rio de Janeiro
     * ```
     */
    const brasil = new Brasil();
    const stateUF: StateBrasil = opts?.state || brasil.state();
    const complete: boolean = opts?.complete || false;

    const collegeModule = await import(`./colleges/${stateUF}.ts`);
    const college: College = pickRandom(collegeModule.default);
    return complete ? college : college.name;
  }
}
