// Built-in modules
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Internal modules
import * as API from "./api/index.mjs";

// External modules
import express from "express";
import morgan from "morgan";
import router from "express-promise-router";

// Current directory path
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const packageJSON = require("../package.json");

// Define express global variables
const locals = packageJSON.variables;

export class Server {
  constructor({staticPath = '../data/static', ...expressOptions} = {}) {
    this.app = express(expressOptions);
    this.app.locals = locals;

    // Store options on server
    this._options = {
      staticPath
    };
  }


  async _init() {

    // Setup logging for express
    this.app.use(morgan('tiny'));

    // Serve static files such as images
    const staticPath = resolve(__dirname, this._options.staticPath);
    console.debug(`Serving static assets from`, staticPath, 'at', '/static');
    this.app.use('/static', express.static(staticPath));

    // Setup a router specifically for api calls
    const apiRouter = router();
    apiRouter.use(express.json());

    for (const {path, handler, method, security} of API._routes()) {
      console.debug(`Registering route ${method.toUpperCase()} ${path}`);
      const middlwares = [handler];

      // Add security middleware before handler if specified
      if (security) {
        middlwares.unshift(security);
      }

      // Register route with express
      apiRouter[method](path, ...middlwares);
    }

    // Add api router to express app
    this.app.use(apiRouter);
  }


  async listen(port = 8080) {
    // Setup server
    await this._init();

    // Start listening on port and store returned listener as this.listener
    const listener = this.listener = await this.app.listen(port);
    console.info(`Server Listening:`, listener.address());
    return listener;
  }

  async close() {
    // Stop the express app
    await this.listener.close();
  }
}
