/**
 * Home controller function that renders the home page.
 *
 * @param {Object} req - The request object containing details about the HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @returns {Object} - Sends a response that renders the "home" view with a title of "Home".
 */
module.exports.home = function (req, res) {
  // Render the "home" view and send it to the client, with the title property set to "Home"
  return res.render("home", {
    title: "Home", // Sets the title of the page to "Home"
  });
};
