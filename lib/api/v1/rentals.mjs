import { createRequire } from 'module';

import { jwt } from "../../security.mjs";

const require = createRequire(import.meta.url);

// Load database of all rentals
const rentals = require("../../../data/rentals.json");

export const get = {
  handler(req, res) {

    // Return all rentals
    res.status(200).json(rentals);
  },

  // Use JWT security
  security: jwt
};
