import { Brasil } from "./brasil/Brasil.ts";
import { Person } from "./person/Person.ts";
import { Student } from "./student/Student.ts";

/**
 * The Saci main class
 */

export class Saci {
  person: Person;
  brasil: Brasil;
  student: Student;
  constructor() {
    this.person = new Person();
    this.brasil = new Brasil();
    this.student = new Student();
  }
}
