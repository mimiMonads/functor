import { funRouterOptions } from "../types.ts";
import { ObjectRawCommonRequest, ObjectRawResponseCommon } from "./types.ts";
import checker from "./checker.ts";
import aComposer from "./aComposer.ts";
import mime from "../components/util/mime.ts";
import jsonComposer from "../components/stringify/main.ts";

export default (o?: funRouterOptions) =>
  (f: ObjectRawResponseCommon | ObjectRawCommonRequest) =>
    ((el) =>
      ((c) =>
        "type" in f
          ? async (r: Request) => f.f((await c)(r))
          : f.f.constructor.name === "AsyncFunction" || "signer" in f
          ? "status" in f || "header" in f
            ? ((h: ResponseInit) =>
              "json" in f
                ? (
                  (j) =>
                    async (r: Request) =>
                      new Response(
                        j(f.f((await c)(r))) as BodyInit,
                        h,
                      )
                )(
                  jsonComposer(f.json.scheme),
                )
                : async (r: Request) =>
                  new Response(
                    await (f.f((await c)(r))) as BodyInit,
                    h,
                  ))(
                {
                  headers: "header" in f
                    ? typeof f.header === "string"
                      ? {
                        "Content-Type": mime.find((x) => x[0] === f.header)![1],
                      }
                      : f.header as Record<string, string>
                    : { "Content-Type": "text/plain" },
                  status: "status" in f ? f.status : 200,
                },
              )
            : "json" in f
            ? (
              (j) =>
                async (r: Request) =>
                  new Response(
                    j(f.f((await c)(r))) as BodyInit,
                  )
            )(
              jsonComposer(f.json.scheme),
            )
            : async (r: Request) =>
              new Response(
                await (f.f((await c)(r))) as BodyInit,
              )
          : "status" in f || "header" in f
          ? ((h: ResponseInit) =>
            "json" in f
              ? (
                (j) =>
                  async (r: Request) =>
                    new Response(j(f.f((await c)(r))) as BodyInit, h)
              )(
                jsonComposer(f.json.scheme),
              )
              : async (r: Request) =>
                new Response(f.f((await c)(r)) as BodyInit, h))({
              headers: "header" in f
                ? typeof f.header === "string"
                  ? { "Content-Type": mime.find((x) => x[0] === f.header)![1] }
                  : f.header as Record<string, string>
                : { "Content-Type": "text/plain" },
              status: "status" in f ? f.status : 200,
            })
          : "json" in f
          ? (
            (j) =>
              async (r: Request) =>
                new Response(j(f.f((await c)(r))) as BodyInit)
          )(
            jsonComposer(f.json.scheme),
          )
          : async (r: Request) => new Response(f.f((await c)(r)) as BodyInit))(
          aComposer(o)(f as ObjectRawResponseCommon)(el),
        ))(
        checker(f?.delete || [])(["param", "query", "req"])(f?.add || [])(
          f.f.toString(),
        ),
      );
