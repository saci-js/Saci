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
