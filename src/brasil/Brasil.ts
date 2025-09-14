import { pickRandom } from "../utils.ts";
import banks from "./banks.ts";
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
   * import { saci } from "@saci5/saci";
   * const banco = saci.brasil.bank() // Bradesco, Banco Inter, BTG Pactual
   * ```
   */
  bank(): string {
    return pickRandom(banks);
  }
}
