/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
/**
 * A custom hook to handle API requests and manage loading, error, and response state.
 *
 * This hook provides a convenient way to make an API request and manage common states
 * such as loading, error, and response data. It abstracts away the logic for handling
 * asynchronous API calls and provides the result to the consuming component.
 *
 * @param apiFunc - The API function to be called. It should return a promise that resolves to the response data.
 * @returns An object containing:
 *   - `data`: The response data from the API.
 *   - `error`: Any error message if the API request fails.
 *   - `loading`: A boolean indicating if the request is in progress.
 *   - `request`: A function that triggers the API call.
 */
export default (apiFunc: any) => {
  // State to store the API response data
  const [data, setData] = useState<any>(null);
  // State to store any error messages
  const [error, setError] = useState("");
  // State to indicate the loading state of the request
  const [loading, setLoading] = useState(false);
  /**
   * Initiates the API request, updates the state accordingly, and handles errors.
   *
   * @param args - Arguments passed to the `apiFunc` function.
   * @returns A promise that resolves once the API call is complete.
   */
  const request = async (...args: any[]) => {
    setLoading(true); // Set loading to true when the request starts
    try {
      // Call the API function and store the result in state
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err: any) {
      // If an error occurs, set the error state
      setError(err.message || "Unexpected Error!");
    } finally {
      // Set loading to false once the request completes
      setLoading(false);
    }
  };
  // Return the state variables and the request function to the component
  return {
    data,
    error,
    loading,
    request,
  };
};
