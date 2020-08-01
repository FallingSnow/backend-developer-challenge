import { createRequire } from 'module';
import { callbackify } from 'util';

import ejwt from "express-jwt";
import basicAuth from "express-basic-auth";
import argon2 from "argon2";


//// BASIC AUTHENTICATION

const require = createRequire(import.meta.url);
const users = require("../data/users.json");

async function authorizer(username, password) {
  // Usernames with @ symbols are percent encoded, so we need to decode
  const dedcodedUsername = decodeURIComponent(username);
  // console.debug(`Authorizing: ${username}`);
  // Try to find user
  const matchedUsers = users.filter(u => u.email === dedcodedUsername);

  // Return false if user does not exist
  // console.debug('Users:', matchedUsers);
  if (matchedUsers.length < 1) return false;

  // Verify passwqord
  // console.debug('Verifying password...');
  const passwordValid = await argon2.verify(matchedUsers[0].password, password);

  return passwordValid;
}

export const basic = basicAuth( { authorizer: callbackify(authorizer), authorizeAsync: true, challenge: true } );



//// JWT AUTHENTICATION

// Load secret from package.json
const packageJSON = require("../package.json");
const SECRET = packageJSON.variables.SECRET;

export const jwt = ejwt({ secret: SECRET, algorithms: ['HS256'] });
