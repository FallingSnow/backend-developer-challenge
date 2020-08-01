import { promisify } from "util";

import jwt from "jsonwebtoken";

// Create async jwt token creation function
const jwtSignAsync = promisify(jwt.sign);

import { basic } from "../../../security.mjs";

export const get = {
  async handler(req, res) {

    // Get process wide secret from express app locals
    const SECRET = req.app.locals.SECRET;

    // Authentication may be encoded to match spec, so attempt to decode
    const decodedUsername = decodeURIComponent(req.auth.user);

    // Create JWT token with subject: decodedUsername
    const token = await jwtSignAsync({sub: decodedUsername}, SECRET);

    // Return token
    res.status(200).json({token});
  },

  // Use basic security to validate user authentication
  security: basic
};
