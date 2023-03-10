import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import string from "../../../components/stringify/methods/string.ts";

Deno.test(
  "string",
  (_) =>
    assertEquals(
      string({ type: "string", name: "hello", required: true, path: ".hello" }),
      `'"hello":' + str(o.hello)`,
    ),
);

Deno.test(
  "string",
  (_) =>
    assertEquals(
      string({
        type: "string",
        name: "hello",
        required: false,
        path: ".hello",
      }),
      `'"hello":' + (typeof o.hello === "string"?str(o.hello):'null')`,
    ),
);

Deno.test(
  "string",
  (_) =>
    assertEquals(
      string({ type: "string", name: "hello", required: true, const: "hi" }),
      `'"hello":"hi"'`,
    ),
);

Deno.test(
  "string",
  (_) =>
    assertEquals(
      string({ type: "string", name: "hello", required: true, default: "hi" }),
      string({ type: "string", name: "hello", required: false, default: "hi" }),
    ),
);
