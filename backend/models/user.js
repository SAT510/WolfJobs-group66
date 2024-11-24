/**
 * Mongoose schema definition for the "User" model.
 * This schema defines the structure of the user document in MongoDB.
 * It includes fields like email, password, name, role, etc., with validation rules and default values where appropriate.
 * The timestamps option is enabled to automatically add createdAt and updatedAt fields.
 */
const mongoose = require("mongoose"); // Importing mongoose to define the schema and interact with MongoDB
// Define the schema for the "User" model
const userSchema = new mongoose.Schema(
  {
    // Email field, required and unique
    email: {
      type: String, // Data type is String
      required: true, // Field is required
      unique: true, // Email must be unique
    },
    // Verification status field, defaults to true (verified)
    isVerified: {
      type: Boolean, // Data type is Boolean
      default: true, // Default value is true
    },
    // Password field, required
    password: {
      type: String, // Data type is String
      required: true, // Field is required
    },
    // Name field, required
    name: {
      type: String, // Data type is String
      required: true, // Field is required
    },
    // Unity ID field, defaults to an empty string if not provided
    unityid: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Role field, required (e.g., user, admin, etc.)
    role: {
      type: String, // Data type is String
      required: true, // Field is required
    },
    // Address field, defaults to an empty string if not provided
    address: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Phone number field, defaults to an empty string if not provided
    phonenumber: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Hours field, defaults to an empty string if not provided
    hours: {
      type: String, // Data type is String 
      default: "", // Default value is an empty string
    },
    // Date of birth field, data type is Date
    dob: {
      type: Date, // Data type is Date
    },
    // Gender field, defaults to an empty string if not provided
    gender: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Availability field, defaults to an empty string if not provided
    availability: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Affiliation field, defaults to an empty string if not provided
    affiliation: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Skills field, defaults to an empty string if not provided
    skills: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Projects field, defaults to an empty string if not provided
    projects: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
     // Experience field, defaults to an empty string if not provided
    experience: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Resume field, defaults to an empty string if not provided
    resume: {
      type: String, // Data type is String
      default: "", // Default value is an empty string
    },
    // Resume ID field, references a "Resume" document by its ObjectId (optional)
    resumeId: {
      type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId (mongoose specific)
      required: false, // Field is optional
      ref: "Resume", // Reference to a "Resume" model
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
// Create the "User" model using the defined schema
const User = mongoose.model("User", userSchema);
// Export the "User" model so it can be used in other parts of the application
module.exports = User;
