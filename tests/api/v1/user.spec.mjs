import { createRequire } from 'module';

import test from "ava";
import jwt from "jsonwebtoken";

import {setup, authenticate} from "../../_utils.mjs";

const require = createRequire(import.meta.url);
const packageJSON = require("../../../package.json");
const SECRET = packageJSON.variables.SECRET;

setup();

test("bad credentials", async t => {
  t.plan(1);

  const {headers, body, statusCode} = await t.context.client.get("api/v1/user/token", {
    username: "demo.man@example.com",
    password: "badd-password",
    responseType: "json"
  });
  t.is(statusCode, 401);
});

test("good credentials", async t => {
  t.plan(2);

  const {headers, body, statusCode} = await t.context.client.get("api/v1/user/token", {
    username: "demo.man@example.com",
    password: "demo",
    responseType: "json"
  });
  t.is(statusCode, 200);
  t.is(jwt.verify(body.token, SECRET).sub, "demo.man@example.com");
});
