import { Options } from "../interface.ts";

/** Options for {@linkcode Person.firstName} or {@linkcode Person.fullName}. */
export interface NamesOptions {
  /**
   * The set to where to get the name from.
   *
   * @default {"neutral"}
   */
  set: "neutral" | "masculine" | "feminine";
}

/** Options for {@linkcode Person.phone}. */
export interface PhoneOptions extends Options {
  /**
   * If the phone should include a DDD.
   *
   * @default {true}
   */
  ddd?: boolean;

  /**
   * If the phone should include brazilian DDI.
   *
   * @default {false}
   */
  ddi?: boolean;

  /**
   * The length of the phone number.
   *
   * @default {9}
   */
  length?: 9 | 8;
}
