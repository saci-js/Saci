/**
 * Method to return a random element from an array
 *
 * @param array a vector of any type.
 * @returns a random element from that array.
 *
 * @example
 * ```ts
 * import { pickRandom } from "utils.ts";
 * const choices = [
 *      "1",
 *      "2",
 *      "3",
 *      "4",
 *      "5"
 * ]
 * const choosen = pickRandom(choices)
 * ```
 */
export function pickRandom<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Method to return a random number between a range
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param min the minimum value to be choosen.
 * @param max the maximum value to be choosen.
 * @returns a random number.
 *
 * @example
 * ```ts
 * import { randomBetween } from "utils.ts";
 * const n = randomBetween(5, 10)
 * console.log(n) // 5, 6, 7, 8, 9 or 10
 * ```
 */
export function randomBetween(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
