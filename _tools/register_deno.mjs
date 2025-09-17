// https://github.com/denoland/std/tree/main/_tools

import { Deno, testDefinitions } from "@deno/shim-deno-test";
globalThis.Deno = Deno;
globalThis.testDefinitions = testDefinitions;
