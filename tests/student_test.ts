import { assertEquals } from "@std/assert/equals";
import { assert } from "@std/assert";
import {
  type College,
  type CollegeOptions,
  Student,
} from "../src/student/Student.ts";
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

Deno.test("student.college()", () => {
  const student = new Student();

  const collegeDefault: College | string = student.college();
  assert(typeof collegeDefault === "string");
  assert(collegeDefault.length > 0);

  const completeOptions = [true, false, undefined];

  for (const complete of completeOptions) {
    const college: College | string = student.college(
      { complete } as CollegeOptions,
    );

    if (complete) {
      assert(typeof college === "object");
      assert(typeof (college as College).name === "string");
      assert(typeof (college as College).acronym === "string");
      assert(typeof (college as College).type === "string");
      assert((college as College).name.length > 0);
      assert((college as College).acronym.length > 0);
      assert((college as College).type.length > 0);
      assert(
        (college as College).type === "publica" ||
          (college as College).type === "privada",
      );
    } else {
      assert(typeof college === "string");
      assert(college.length > 0);
    }
  }
});
