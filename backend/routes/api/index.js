// Importing the express module to use its router functionality
const express = require("express");
// Creating a new router object using express.Router()
const router = express.Router();
/**
 * Middleware for handling routes under the "/v1" path.
 * Routes related to version 1 of the API will be handled by the "v1" router.
 */
router.use("/v1", require("./v1"));
// Exporting the configured router for use in other parts of the application
module.exports = router;
