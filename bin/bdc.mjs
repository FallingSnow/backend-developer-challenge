import { Server } from "../index.mjs";

async function main() {
  const app = new Server();

  await app.listen();
}

main().catch(console.error);
