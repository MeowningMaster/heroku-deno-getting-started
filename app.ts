#!/usr/bin/env -S deno run --allow-net=:8080 --allow-env=PORT

import {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { port } from "./port.ts";

const callbacks = new Array<{ data: string; signature: string }>();
const router = new Router()
  .get("/", (ctx: Context) => {
    ctx.response.body = callbacks.map(x => JSON.stringify(x)).join(",\n");
  })
  .post("/callback", (ctx: Context) => {
    const data = ctx.request.url.searchParams.get("data") ?? "[null]";
    const signature = ctx.request.url.searchParams.get("signature") ?? "[null]";
    callbacks.push({ data, signature });
    ctx.response.status = 200;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port });
