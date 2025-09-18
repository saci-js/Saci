import { assertEquals } from "@std/assert/equals";
import { Student } from "../src/student/Student.ts";

const student = new Student();

Deno.test("student.ra()", () => {
  const raDefault = student.ra();
  assertEquals(raDefault.length, 8);

  const customLength = 10;
  const raCustom = student.ra({ length: customLength });
  assertEquals(raCustom.length, customLength);
});
