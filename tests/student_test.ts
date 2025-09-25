import { assertEquals } from "@std/assert/equals";
import { assert } from "@std/assert";
import { Student } from "../src/student/Student.ts";
import courses from "../src/student/course/courses.ts";

const student = new Student();

Deno.test("student.ra()", () => {
  const raDefault = student.ra();
  assertEquals(raDefault.length, 8);

  const customLength = 10;
  const raCustom = student.ra({ length: customLength });
  assertEquals(raCustom.length, customLength);
});

Deno.test("student.course()", () => {
  const courseDefault = student.course();
  assertEquals(courses.includes(courseDefault), true);
  assertEquals(courseDefault.length > 0, true);
});

Deno.test("student.college() string", () => {
  const college = student.college();
  assertEquals(typeof college, "string");
  assert(college.length > 0);
});

Deno.test("student.college() College", () => {
  const college = student.college({ complete: true });
  assertEquals(typeof college, "object");
  assert(college.acronym !== undefined);
  assert(college.name !== undefined);
  assert(college.type !== undefined);
});
