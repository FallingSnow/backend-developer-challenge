import test from "ava";

import {setup, authenticate} from "../../_utils.mjs";

setup();

test("unauthorized create home", async t => {
  t.plan(1);

  const data = {
    title: "Example home"
  };

  const {headers, body, statusCode} = await t.context.client.post("api/v1/rental", {
    json: data,
    responseType: "json"
  });
  t.is(statusCode, 401);
});

test("create home", async t => {
  t.plan(3);

  const data = {
    title: "Example home"
  };

  await authenticate(t);
  const {headers, body, statusCode} = await t.context.client.post("api/v1/rental", {
    json: data,
    responseType: "json"
  });
  t.is(statusCode, 200);
  t.assert(body.id);
});
