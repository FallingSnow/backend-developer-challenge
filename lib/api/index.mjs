import { traverse, normalizeRelativeUrl } from "../utils.mjs";

import * as handlers from "./v1/index.mjs";

const methods = ['get', 'post', 'put', 'patch', 'head', 'all']

export function _routes() {
  const routes = [];

  // Traverses all exported routes and builts a tree with path, handler and method
  traverse(handlers, (k, v, p) => {
    if (typeof v === 'object') {

      // Check if object has any keys named "get", "post", etc..
      for (const method of methods) {
        const config = v[method];
        if (config) {

          // Make sure the path starts with a slash
          const path = normalizeRelativeUrl([...p, ...(config.path || [k])].join('/'));

          // Add our route configuration to the routes array
          routes.push({...config, method, path});
        }
      }
    }
  }, ['api', 'v1']);

  return routes;
};


// Export the entry point to the v1 api
export * as v1 from "./v1/index.mjs";
