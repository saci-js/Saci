import { Person } from "./person/Person.ts";

/**
 * The Saci main class
 */

export class Saci {
  person: Person;
  constructor() {
    this.person = new Person();
  }
}
