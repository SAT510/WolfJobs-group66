// Import necessary modules
const express = require("express"); // Import the express module to handle routing
const router = express.Router(); // Create an instance of the express router for routing requests

const passport = require("passport"); // Import passport for user authentication

const usersController = require("../controllers/users_controller"); // Import users controller to handle user-related actions

// Import the resume controller for handling resume-related functionality
const resumeController = require("../controllers/resume_controller");
// Define the routes and link them to the respective controllers and middleware

/**
 * Route for displaying user profile page.
 * Only accessible to authenticated users.
 */
router.get("/profile", passport.checkAuthentication, usersController.profile);
// passport.checkAuthentication is middleware to check if the user is authenticated
// usersController.profile handles rendering the profile page

/**
 * Route for displaying the sign-up page.
 */
router.get("/sign-up", usersController.signUp); // usersController.signUp handles rendering the sign-up page

/**
 * Route for displaying the sign-in page.
 */
router.get("/sign-in", usersController.signIn); // usersController.signIn handles rendering the sign-in page

router.post("/create", usersController.create); // usersController.create handles the creation of a new user

/**
 * Route for handling the creation of a new user.
 */
// passport.authenticate("local") is used to authenticate the user using the local strategy
// If authentication fails, the user is redirected to the sign-in page
// usersController.createSession handles the session creation (logging in the user)
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
/**
 * Route for uploading a resume.
 * Uses multer middleware for file upload.
 */
router.post(
  "/uploadResume",
  resumeController.upload.single("resume"), // Multer middleware for file upload
  resumeController.uploadResume // The controller function to handle the resume upload
);
/**
 * Route for getting a specific applicant's resume.
 */
router.get("/applicantresume/:id", resumeController.getResume); // resumeController.getResume handles fetching the resume for a specific applicant using the provided ID
/**
 * Route for signing out the user (destroying session).
 */
router.get("/sign-out", usersController.destroySession); // usersController.destroySession handles destroying the user session (logging out the user)
/**
 * Route for pinging the server to check if it's alive.
 */
router.get("/ping", resumeController.ping); // resumeController.ping handles the "ping" functionality, typically used for server health checks
// Export the router for use in the main application
module.exports = router;
