// https://github.com/denoland/std/tree/main/_tools
import "./register_deno.mjs";
import { test } from "node:test";

import "../tests/saci_test.ts";
import "../tests/utils_test.ts";
import "../tests/person_test.ts";
import "../tests/brasil_test.ts";

for (const testDef of testDefinitions) {
  if (testDef.ignore) {
    test.skip(testDef.name, testDef.fn);
  } else {
    test(testDef.name, testDef.fn);
  }
}
