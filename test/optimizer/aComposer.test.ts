import aComposer from "../../optimizer/aComposer.ts";
import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

Deno.test(
  "Query",
  async (_) =>
    assertEquals(
      (await aComposer({ hasName: "http://localhost:8080/" })({
        param: { elements: ["id"] },
        path: "/test",
        f: (r) => r.query.hello || "nothing",
      })(["query"]))(new Request("http://localhost:8080/test?hello=hi")).query
        .hello,
      "hi",
    ),
);
Deno.test(
  "Query",
  async (_) =>
    assertEquals(
      (await aComposer()({
        path: "/test",
        param: { elements: ["id"] },
        f: (r) => r.query.hello || "nothing",
      })(["query"]))(new Request("http://localhost:8080/test?hello=hi")).query
        .hello,
      "hi",
    ),
);
Deno.test(
  "Query",
  async (_) =>
    assertEquals(
      (await aComposer({ hasName: "http://localhost:8080/" })({
        param: { elements: ["id"] },
        path: "/test",
        f: (r) => r.query.hello || "nothing",
      })(["query", "req"]))(new Request("http://localhost:8080/test?hello=hi"))
        .query.hello,
      "hi",
    ),
);
Deno.test(
  "Params",
  async (_) =>
    assertEquals(
      (await aComposer({ hasName: "http://localhost:8080/" })({
        path: "/test/:id",
        param: { elements: ["id"] },
        f: (r) => r.param.id,
      })(["param"]))(new Request("http://localhost:8080/test/1")).param.id,
      "1",
    ),
);

Deno.test(
  "Params",
  async (_) =>
    assertEquals(
      (await aComposer({ hasName: "http://localhost:8080/" })({
        path: "/test/:a/:b/:c/",
        param: { elements: ["a", "b", "c"] },
        f: (r) => r.param.id,
      })(["param"]))(new Request("http://localhost:8080/test/1/2/3/")).param.b,
      "2",
    ),
);
Deno.test(
  "Params",
  async (_) =>
    assertEquals(
      (await aComposer()({
        path: "/test/:a/:b/:c/",
        f: (r) => r.param.id.toString(),
      })(["param"]))(new Request("http://localhost:8080/test/1/2/3/")).param.b,
      "2",
    ),
);
