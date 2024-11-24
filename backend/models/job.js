/**
 * Job Schema for Mongoose, defining the structure of the job documents
 * stored in MongoDB, including various job-related fields like name, 
 * manager ID, description, skills required, and deadlines.
 */const mongoose = require("mongoose");
/**
 * Defines the schema for a job listing.
 * This schema will be used to create and validate job documents in the database.
 */
const jobSchema = new mongoose.Schema({
  // The name of the job posting.
  name: {
    type: String, // The type of the 'name' field is a string.
    required: true, // The 'name' field is required for the document to be valid.
  },
  // The ID of the manager associated with the job.
  managerid: { 
    type: String, // The type of 'managerid' is a string.
    required: true, // This field is required.
  },
  // The affiliation of the manager.
  managerAffilication: {
    type: String, // The 'managerAffilication' field type is string.
    required: true, // This field is required.
  },
  // The current status of the job (default is 'open').
  status: {
    type: String, // 'status' is a string field.
    default: "open", // Default value is "open" if not specified.
  },
   // The location of the job.
  location: {
    type: String, // The 'location' field is a string.
    required: true, // This field is required.
  },
  // A description of the job position.
  description: {
    type: String, // The 'description' is a string.
    required: true, // This field is required.
  },
  // The pay associated with the job.
  pay: {
    type: String, // 'pay' is a string type field.
    required: true, // This field is required.
  },
  // Skills required for the job.
  requiredSkills: {
    type: String, // 'requiredSkills' is a string.
    required: true,  // Required field.
  },
   // The type of the job (e.g., full-time, part-time).
  type: {
    type: String, // 'type' is a string.
    required: true, // Required field.
  },
  // The first question for job applicants.
  question1: {
    type: String, // 'question1' is a string.
    required: true, // Required field.
  },
  // The second question for job applicants.
  question2: {
    type: String, // 'question2' is a string.
    required: true, // Required field.
  },
   // The third question for job applicants.
  question3: {
    type: String,  // 'question3' is a string.
    required: true, // Required field.
  },
   // The fourth question for job applicants.
  question4: {
    type: String, // 'question4' is a string.
    required: true, // Required field.
  },
  // Boolean indicating if the job has been saved by the user (default is false).
  saved: {
    type: Boolean, // 'saved' is a boolean type field.
    deafult: false, // Default value is false, meaning the job is not saved by default.
  },
  // The deadline for the job posting.
  jobDeadline: {
    type: Date, // 'jobDeadline' is a date field.
    required: true, // This field is required.
  },
});
/**
 * Create a model for 'Job' based on the jobSchema.
 * This model will provide methods to interact with job documents in the database.
 */
const Job = mongoose.model("Job", jobSchema); // Create Job model using the defined schema
// Export the Job model to make it available for use in other files.
module.exports = Job;
