/**
 * Axios HTTP Client Module
 * 
 * This module initializes an Axios instance configured with a base URL pointing
 * to the local backend server (`http://localhost:8000`). It can be imported and 
 * used throughout the application to send HTTP requests to the backend.
 *
 * Usage:
 * - Import the `client` object in your module.
 * - Use it to make HTTP requests (e.g., GET, POST) to the backend API.
 * 
 * Example:
 * ```javascript
 * import client from "./client";
 * 
 * client.get("/api/resource").then(response => {
 *   console.log(response.data);
 * }).catch(error => {
 *   console.error(error);
 * });
 * ```
 */
import axios from "axios";
// Create an Axios instance with the specified base URL.
// This ensures all requests made using `client` are prefixed with "http://localhost:8000".
const client = axios.create({ baseURL: "http://localhost:8000" });

export default client;
