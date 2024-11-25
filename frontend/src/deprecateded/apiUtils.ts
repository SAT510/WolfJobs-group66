/**
 * Converts an object of parameters into a URL-encoded query string for use in HTTP requests.
 *
 * This function takes an object where each key-value pair represents a form field name and value, 
 * and returns a string that can be used as the body of an HTTP request, typically in a POST request with content type `application/x-www-form-urlencoded`.
 * Each key and value are URL-encoded to ensure proper handling of special characters.
 *
 * @param {Record<string, any>} params - The object containing key-value pairs to be URL-encoded and converted into a query string.
 * @returns {string} The URL-encoded query string, where each key-value pair is joined by "&".
 *
 * @example
 * const params = { name: "John Doe", age: 25 };
 * const queryString = getFormBody(params);
 * console.log(queryString); // "name=John%20Doe&age=25"
 */
export function getFormBody(params: any) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
}
