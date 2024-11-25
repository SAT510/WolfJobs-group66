/**
 * Module for user authentication using Passport.js.
 *
 * This module configures Passport.js with local authentication strategy,
 * handles serialization and deserialization of user information, and provides
 * middleware to check and set authenticated users.
 */
const passport = require("passport"); // Import Passport.js for authentication

const LocalStrategy = require("passport-local").Strategy; // Import LocalStrategy for local authentication

const User = require("../models/user"); // Import the User model for database interaction

//Authentication using passport

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Specifies the field to use as the username (email in this case)
    },
    /**
     * Callback for handling user authentication.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @param {function} done - Callback to indicate success or failure.
     */
    function (email, password, done) {
      //find a user and establish the identity

      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding the user ---> Passport"); // Log error if user lookup fails
          return done(err); // Pass error to Passport
        }
        // Check if the user exists and if the password matches
        if (!user || user.password != password) {
          console.log("Invalid Username/Password"); // Log invalid credentials
          return done(null, false); // Indicate authentication failure
        }
        // If user is found and password matches, return the user
        return done(null, user);
      });
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
/**
 * Serialize user information into a session cookie.
 *
 * @param {Object} user - The authenticated user object.
 * @param {function} done - Callback to complete the serialization.
 */

passport.serializeUser(function (user, done) {
  done(null, user.id); // Store the user ID in the session
});

// Deserializing the user from the key in the cookies
/**
 * Deserialize user information from a session cookie.
 *
 * @param {string} id - The user's ID stored in the session.
 * @param {function} done - Callback to complete the deserialization.
 */
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding the user ---> Passport"); // Log error if user lookup fails
      return done(err); // Pass error to Passport
    }

    return done(null, user); // If user is found, return the user object
  });
});

// Middleware to check if a user is authenticated
/**
 * Middleware to check if the user is authenticated.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {function} next - Callback to proceed to the next middleware.
 */
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in, pass on the request to the next function
  if (req.isAuthenticated()) {
    return next();
  }

  /// If the user is not signed in, redirect to the sign-in page
  return res.redirect("/users/sign-in");
};

// Middleware to set the authenticated user
/**
 * Middleware to set the authenticated user in the response locals.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {function} next - Callback to proceed to the next middleware.
 */
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed-in user from the session cookie
    // Set the user object in response locals for the view
    res.locals.user = req.user;
  }

  next(); // Proceed to the next middleware
};
// Export the configured passport instance
module.exports = passport;
