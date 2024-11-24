/**
 * @fileoverview This file configures the Passport.js middleware to use JWT (JSON Web Token) 
 * authentication. It defines the strategy for extracting and validating JWTs, enabling 
 * secure authentication for the application.
 */

// Importing Passport.js for handling authentication.
const passport = require("passport");

// Importing the Passport JWT strategy for validating JSON Web Tokens.
const JWTStrategy = require("passport-jwt").Strategy;

// Importing the function to extract JWTs from requests.
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Importing the User model to query the database for user information.
const User = require("../models/user");

/**
 * @constant {Object} opts - Options for configuring the JWT strategy.
 * @property {Function} jwtFromRequest - Specifies how to extract the JWT from the request header.
 * @property {string} secretOrKey - The secret key used to verify the JWT signature.
 */
let opts = {
  // Specifies that the JWT should be extracted from the Authorization header as a Bearer token.
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  // The secret key used for verifying the JWT's signature.
  secretOrKey: "wolfjobs",
};

/**
 * Configures Passport.js to use a JWT strategy for authentication.
 * 
 * @callback jwtVerifyCallback
 * @param {Object} jwtPayload - The payload extracted from the JWT, typically containing user information.
 * @param {Function} done - Callback function to be called after verification.
 * 
 * @description The strategy finds a user in the database by the `_id` in the JWT payload.
 * If found, the user object is passed to the `done` callback. Otherwise, an error or 
 * a `false` value is passed.
 */
passport.use(
  // Defining the JWT strategy with options and a callback for verification.
  new JWTStrategy(opts, function (jwtPayload, done) {
    // Finds the user in the database by ID from the JWT payload.
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        // Logs an error message if a database error occurs.
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        // Passes the user object to the `done` callback if found.
        return done(null, user);
      } else {
        // Passes `false` to the `done` callback if the user is not found.
        return done(null, false);
      }
    });
  })
);
/**
 * @module passport
 * @description Exports the configured Passport.js instance to be used in the application.
 */
// Exports the Passport instance for use in other parts of the application.
module.exports = passport;
