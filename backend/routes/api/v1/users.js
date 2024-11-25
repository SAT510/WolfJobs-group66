/**
 * Express router for handling API requests related to users and job management.
 * Each route corresponds to a different user or job-related action.
 * Methods include user session management, job creation, profile updates, etc.
 */
const express = require("express"); // Import the express library for creating the server and routes

const router = express.Router(); // Create a new router instance from express to define the API routes

const usersApi = require("../../../controllers/api/v1/users_api"); // Import the usersApi controller for handling route actions

const bodyParser = require("body-parser"); // Import body-parser to parse incoming request bodies

const jsonParser = bodyParser.json(); // Create a JSON parser middleware from body-parser
/**
 * POST route to create a user session.
 * Calls the createSession method in usersApi.
 */
router.post("/create-session", usersApi.createSession);
/**
 * POST route to sign up a user.
 * Calls the signUp method in usersApi.
 */
router.post("/signup", usersApi.signUp);
/**
 * POST route to edit a user's profile.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the editProfile method in usersApi.
 */
router.post("/edit", jsonParser, usersApi.editProfile);
/**
 * GET route to retrieve a user's profile by user ID.
 * Calls the getProfile method in usersApi.
 */
router.get("/getprofile/:id", usersApi.getProfile);
/**
 * GET route to search for users by name.
 * Calls the searchUser method in usersApi.
 */
router.get("/search/:name", usersApi.searchUser);
/**
 * POST route to create a job history for a user.
 * Calls the createHistory method in usersApi.
 */
router.post("/createhistory", usersApi.createHistory);
/**
 * GET route to retrieve a user's job history.
 * Calls the getHistory method in usersApi.
 */
router.get("/gethistory", usersApi.getHistory);
/**
 * POST route to create a new job listing.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the createJob method in usersApi.
 */
router.post("/createjob", jsonParser, usersApi.createJob);
/**
 * GET route to fetch the index of available routes or status.
 * Calls the index method in usersApi.
 */
router.get("/", usersApi.index);
/**
 * GET route to fetch applications for a user.
 * Calls the fetchApplication method in usersApi.
 */
router.get("/fetchapplications", usersApi.fetchApplication);
/**
 * POST route to accept an application for a job.
 * Calls the acceptApplication method in usersApi.
 */
router.post("/acceptapplication", usersApi.acceptApplication);
/**
 * POST route to modify an existing application.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the modifyApplication method in usersApi.
 */
router.post("/modifyApplication", jsonParser, usersApi.modifyApplication);
/**
 * POST route to modify an application in the final stage.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the modifyApplicationFinalStage method in usersApi.
 */
router.post(
  "/modifyApplicationFinalStage",
  jsonParser,
  usersApi.modifyApplicationFinalStage
);
/**
 * POST route to generate a one-time password (OTP) for verification.
 * Calls the generateOtp method in usersApi.
 */
router.post("/generateOTP", usersApi.generateOtp);
/**
 * POST route to verify a provided OTP.
 * Calls the verifyOtp method in usersApi.
 */
router.post("/verifyOTP", usersApi.verifyOtp);
/**
 * POST route to reject an application for a job.
 * Calls the rejectApplication method in usersApi.
 */
router.post("/rejectapplication", usersApi.rejectApplication);
/**
 * POST route to close a job listing.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the closeJob method in usersApi.
 */
router.post("/closejob", jsonParser, usersApi.closeJob);

/**
 * DELETE route to delete a job listing.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the deleteJob method in usersApi.
 */
router.delete("/deletejob", jsonParser, usersApi.deleteJob);

/**
 * PUT route to edit an existing job listing.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the editJob method in usersApi.
 */
router.put("/editjob", jsonParser, usersApi.editJob);
/**
 * POST route to create a job application.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the createApplication method in usersApi.
 */
router.post("/createapplication", jsonParser, usersApi.createApplication);
/**
 * POST route to save a job listing to a user's saved jobs list.
 * Uses JSON parser middleware to handle the incoming JSON data.
 * Calls the saveJob method in usersApi.
 */
router.post("/saveJob", jsonParser, usersApi.saveJob);
/**
 * GET route to fetch the list of saved jobs for a user by their ID.
 * Uses JSON parser middleware to handle the incoming request data.
 * Calls the saveJobList method in usersApi.
 */
router.get("/saveJobList/:id", jsonParser, usersApi.saveJobList);
router.post("/getJobId", jsonParser, usersApi.findJobIdByName);

module.exports = router; // Exports the router instance for use in other parts of the application
