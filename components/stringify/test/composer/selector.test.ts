import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import selector from "../../composer/selector.ts"
import strings from "../../methods/strings.ts"

// Deno.test(
//     "hello",
//     _ =>
//         assertEquals(
//             selector([{type: "string", name: "hello", required: true},{type: "string", name: "helflo", required: true}]),
//             ""
//         )
// )