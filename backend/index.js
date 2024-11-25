/**
 * This is the main entry point for the Express.js server.
 * The application sets up various middleware, connects to the database, and configures authentication strategies.
 * It also configures session handling, static file serving, and view engine settings.
 * The app listens on a specified port (8000) and handles routes defined in the routes folder.
 */

// Import necessary modules
const express = require("express"); // Express framework for handling requests
const cookieParser = require("cookie-parser"); // Middleware to parse cookies
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing
const app = express(); // Creates an instance of the Express application
const port = 8000; // Port for the server to listen on
// Import additional modules for layouts and database connection
const expressLayouts = require("express-ejs-layouts"); // Used to configure layout settings for EJS templates

const db = require("./config/mongoose"); // Database configuration file (e.g., MongoDB connection)

// Import session management and passport modules

const session = require("express-session"); // Middleware for handling session

const passport = require("passport"); // Authentication middleware for Passport

const passportLocal = require("./config/passport-local-strategy"); // Local authentication strategy

const passportJWT = require("./config/passport-jwt-strategy"); // JWT authentication strategy
// Middleware to enable CORS
app.use(cors());
// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(express.urlencoded());
// Middleware to parse cookies
app.use(cookieParser());
// Middleware to serve static files (e.g., images, stylesheets)
app.use(express.static("./assets"));
// Use express-ejs-layouts for layout management in EJS templates
app.use(expressLayouts);
// Configure EJS layout settings to extract styles and scripts into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// Set up the view engine as EJS (Embedded JavaScript)
app.set("view engine", "ejs");
// Define the location of views (EJS templates)
app.set("views", "./views");
// Set up session middleware
app.use(
  session({
    name: "wolfjobs", // Name of the session cookie
    //TODO change the secret before deployment in production mode
    secret: "blahsomething", // Secret key used to sign the session cookie
    saveUninitialized: false, // Do not save uninitialized sessions
    resave: false, // Do not resave session if it wasn't modified
    cookie: {
      maxAge: 1000 * 60 * 100, // Expiration time for the session cookie (100 minutes)
    },
  })
);
// Initialize Passport for authentication
app.use(passport.initialize());
// Set up session management for Passport
app.use(passport.session());
// Set authenticated user information to the request object for further use
app.use(passport.setAuthenticatedUser);

// Use router for handling application routes

app.use("/", require("./routes"));
// Start the server and listen on the specified port
app.listen(port, function (err) {
  if (err) {
    console.log("Error", err); // Log an error if the server fails to start
  }

  console.log("Server is running on", port); // Log a success message if the server starts successfully
});
