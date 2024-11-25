const User = require("../models/user");
/**
 * Controller for user-related actions like profile viewing, sign up, sign in, and session management.
 */

/**
 * Renders the user profile page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The rendered user profile page.
 */
module.exports.profile = function (req, res) {
  // Renders the 'user_profile' view with the title 'User Profile'.
  return res.render("user_profile", {
    title: "User Profile",
  });
};
/**
 * Renders the sign-up page if the user is not authenticated, otherwise redirects to the profile.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The rendered sign-up page or redirection.
 */
module.exports.signUp = function (req, res) {
  // If the user is authenticated, redirect to their profile.
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  // Renders the 'user_sign_up' view with the title 'WolfJobs | Sign Up'.
  return res.render("user_sign_up", {
    title: "WolfJobs | Sign Up",
  });
};
/**
 * Renders the sign-in page if the user is not authenticated, otherwise redirects to the profile.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The rendered sign-in page or redirection.
 */
module.exports.signIn = function (req, res) {
  // If the user is authenticated, redirect to their profile.
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  // Renders the 'user_sign_in' view with the title 'WolfJobs | Sign In'.
  return res.render("user_sign_in", {
    title: "WolfJobs | Sign In",
  });
};
/**
 * Creates a new user if passwords match and email is not already registered.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object.
 * @returns {Object} - Redirection or error logging.
 */
module.exports.create = function (req, res) {
  // If the password and confirm password don't match, redirect back.
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  // Search for an existing user with the same email.
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      // Logs error if there is an issue in finding the user.
      console.log("Error in finding user in Signing Up");
      return;
    }

    if (!user) {
      // If no user exists, create a new user using the provided details.
      User.create(req.body, function (err, user) {
        if (err) {
          // Logs error if there is an issue in creating the user.
          console.log("Error in creating a user while signing up");
          return;
        }
        // Redirects to the sign-in page after successful user creation.
        return res.redirect("/users/sign-in");
      });
    } else {
      // Redirects back if the email is already in use.
      return res.redirect("back");
    }
  });
};
/**
 * Creates a session for the user upon successful sign-in.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Redirection to the homepage.
 */
module.exports.createSession = function (req, res) {
  // Redirects to the homepage after successful sign-in.
  return res.redirect("/");
};
/**
 * Destroys the user's session (logs them out).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Redirection to the homepage.
 */
module.exports.destroySession = function (req, res) {
  // Logs the user out of the session.
  req.logout();
  // Redirects to the homepage after logging out.
  return res.redirect("/");
};
