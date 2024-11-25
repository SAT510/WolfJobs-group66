/**
 * Base API URL for the application.
 * Change this to the appropriate endpoint for production or staging environments.
 */
const API_ROOT = "http://localhost:8000/api/v1";
/**
 * URL for the login API endpoint.
 * This endpoint is used to authenticate users and create a session.
 * @type {string}
 */
export const loginURL = `${API_ROOT}/users/create-session`;
/**
 * URL for the signup API endpoint.
 * This endpoint is used to register new users to the application.
 * @type {string}
 */
export const signupURL = `${API_ROOT}/users/signup`;
/**
 * URL for the create job API endpoint.
 * This endpoint allows authenticated users to create new job listings.
 * @type {string}
 */
export const createJobURL = `${API_ROOT}/users/createjob`;
