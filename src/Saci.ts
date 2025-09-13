import { Brasil } from "./brasil/Brasil.ts";
import { Person } from "./person/Person.ts";

/**
 * The Saci main class
 */

export class Saci {
  person: Person;
  brasil: Brasil;
  constructor() {
    this.person = new Person();
    this.brasil = new Brasil();
  }
}
