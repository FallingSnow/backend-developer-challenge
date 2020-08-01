import { createRequire } from 'module';

import { v1 as uuidv1 } from 'uuid';

import { jwt } from "../../security.mjs";

const require = createRequire(import.meta.url);

// Load rental data
const rentals = require("../../../data/rentals.json");

// Get basic details of existing proerpty
export const get = {
  handler(req, res) {
    const id = req.params.id;

    // Ensure an ID was provided in request
    if (!id) {
      res.status(400).json({errors: ["must include id"]});
    }

    // Search for rental with matching ID
    const matchedRentals = rentals.filter(h => h.id === id);

    // Error if a rental was not found
    if (matchedRentals.length < 1) {
      res.status(400).json({errors: [`no properties matching "${id}"`]});
    }

    // Return matches
    res.status(200).json(matchedRentals[0]);
  },

  // Add :id to path
  path: ["rental", ":id"],

  // Use JWT security for this path
  security: jwt
};

// Change an existing property
export const patch = {
  handler(req, res) {
    const id = req.params.id;
    const changes = req.body;
    // Ensure an ID was provided in request
    if (!id) {
      res.status(400).json({errors: ["must include id"]});
    }
    // Ensure changes was provided in request
    if (!changes) {
      res.status(400).json({errors: ["request must include changes in body"]});
    }

    const matchedRentals = rentals.filter(h => h.id === id);

    if (matchedRentals.length < 1) {
      res.status(400).json({errors: [`no properties matching "${id}"`]});
    }

    Object.assign(matchedRentals[0], changes);

    res.status(200).json(matchedRentals[0]);
  },
  path: ["rental", ":id"],
  security: jwt
};


export const post = {
  handler(req, res) {
    const rentalData = req.body;

    // Ensure a body was provided with request
    if (!rentalData || Object.keys(rentalData).length < 1) {
      res.status(400).json({errors: ["request must include data in body"]});
    }

    // Create a id for the rental
    rentalData.id = uuidv1();

    // Write rental data to database
    rentals.push(rentalData);

    // Return newly created rental id
    res.status(200).json({id: rentalData.id});
  },
  security: jwt
};
