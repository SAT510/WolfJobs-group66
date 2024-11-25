/**
 * Express router to handle different routes.
 *
 * This module sets up routing for the application, specifically handling
 * requests that are routed through the "/users" path. The "/users" route
 * is delegated to a separate "users" router module.
 */

const express = require("express"); // 1. Import the Express module to access routing functionality.

const router = express.Router(); // 2. Create a new router instance for handling routes.

router.use("/users", require("./users")); // 3. Set up the "/users" route to be handled by the users module.

module.exports = router; // 4. Export the router to be used in other parts of the application.
