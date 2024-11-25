/**
 * @file jobsApi.js
 * @description Provides API methods to interact with the jobs endpoint.
 * This module handles HTTP requests related to job data.
 */
import client from "./client";
/**
 * Fetches the list of jobs from the server.
 *
 * @function getJobs
 * @returns {Promise} A promise that resolves with the response containing job data.
 *
 * @example
 * getJobs().then(response => console.log(response.data));
 *
 * @note Ensure that the `client` instance is properly configured with base URL
 *       and any necessary headers (e.g., authentication tokens).
 */

const getJobs = () => client.get("/api/v1/jobs");

export { getJobs };
