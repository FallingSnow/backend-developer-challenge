import assert from "assert";

import got from "got";
import test from "ava";

import { Server } from "../index.mjs";

export function setup() {
  test.beforeEach(async t => {
    const server = new Server();

    await server.listen(0);
    const {port} = server.listener.address();

    const client = got.extend({
      retry: 0,
      throwHttpErrors: false,
      prefixUrl: `http://localhost:${port}`
    });

    t.context = {
      server,
      port,
      client
    };
  });
  test.afterEach(async t => {
    await t.context.server.close();
  });
};

export async function authenticate(t) {
  const {headers, body, statusCode} = await t.context.client.get("api/v1/user/token", {
    username: 'demo.man@example.com',
    password: "demo",
    responseType: "json"
  });

  // t.log('Authentication response:', body);
  t.is(statusCode, 200, 'authentication failed');

  t.context.client = t.context.client.extend({headers: {
    authorization: `Bearer ${body.token}`
  }});
}
