/**
 * Mongoose schema for storing resume information.
 * This schema is used to define the structure of the resume document in the database.
 *
 * @class Resume
 * @property {ObjectId} applicantId - The ID of the applicant, referencing the "User" model.
 * @property {String} fileName - The name of the resume file.
 * @property {Buffer} fileData - The binary data of the resume file.
 * @property {String} contentType - The MIME type of the resume file (default: "application/pdf").
 * @property {Date} uploadedAt - The date and time when the resume was uploaded (default: current date).
 */
const mongoose = require("mongoose");
// Import mongoose to interact with MongoDB database
const resumeSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId, // Field type is ObjectId
    required: true, // This field is required
    ref: "User", // This field references the "User" model for applicant details
  },
  fileName: {
    type: String, // Field type is String
    required: true, // This field is required
  },
  fileData: {
    type: Buffer, // Field type is Buffer for storing binary data
    required: true, // This field is required
  },
  contentType: {
    type: String, // Field type is String
    required: true, // This field is required
    default: "application/pdf", // Default MIME type is "application/pdf"
  },
  uploadedAt: {
    type: Date, // Field type is Date
    default: Date.now, // Default value is the current date/time
  },
}); // Define the schema for the Resume model

const Resume = mongoose.model("Resume", resumeSchema); // Create the "Resume" model using the schema defined above

module.exports = Resume; // Export the "Resume" model for use in other parts of the application
