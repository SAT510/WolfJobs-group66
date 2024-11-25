// Importing mongoose to define schema and interact with MongoDB
const mongoose = require("mongoose");
/**
 * @description Defines the schema for a job application.
 * This schema includes all the necessary fields to store information about a job applicant,
 * their personal details, job application details, and answers to job-specific questions.
 */
const applicationSchema = new mongoose.Schema({
  /**
   * @description Job ID reference, referencing the "Job" model.
   * This field is used to associate the application with a particular job.
   */
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  /**
   * @description Job name, required field to store the name of the job the applicant is applying for.
   */
  jobname: {
    type: String,
    required: true,
  },
  /**
   * @description Applicant ID reference, referencing the "User" model.
   * This field is used to associate the application with the applicant (a user).
   */
  applicantid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  /**
   * @description Applicant's name, required field to store the applicant's full name.
   */
  applicantname: {
    type: String,
    required: true,
    default: "",
  },
  /**
   * @description Applicant's email, stores the email address of the applicant.
   */
  applicantemail: {
    type: String,
    default: "",
  },
  /**
   * @description Applicant's skills, stores information about the skills the applicant possesses.
   */
  applicantskills: {
    type: String,
    default: "",
  },
  /**
   * @description Applicant's phone number.
   */
  phonenumber: {
    type: String,
    default: "",
  },
  /**
   * @description Manager ID, stores the ID of the manager responsible for the application (if applicable).
   */
  managerid: {
    type: String,
    default: "",
  },
  /**
   * @description Applicant's address, stores the address of the applicant.
   */
  address: {
    type: String,
    default: "",
  },
  /**
   * @description Applicant's phone number (duplicate field - seems like an error, as it already exists above).
   */
  phonenumber: {
    type: String,
    default: "",
  },
  /**
   * @description Hours available for the job, stores the number of hours the applicant can work.
   */
  hours: {
    type: String,
    default: "",
  },
  /**
   * @description Date of birth of the applicant.
   */
  dob: {
    type: String,
    default: "",
  },
  /**
   * @description Gender of the applicant.
   */
  gender: {
    type: String,
    default: "",
  },
  /**
   * @description Application status, default value is "applied", used to track the current status of the application.
   */
  status: {
    type: String,
    default: "applied",
  },
  /**
   * @description Job name, again stores the job name (appears redundant since jobname already exists).
   */
  jobname: {
    type: String,
    required: true,
  },
  /**
   * @description Job ID, appears again (duplicate of jobid).
   */
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  /**
   * @description Job application deadline, stores the deadline for the job application.
   */
  jobDeadline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  /**
   * @description Answer 1 to the first question in the application.
   */
  answer1: {
    type: String,
    default: "",
  },
  /**
   * @description Answer 2 to the second question in the application.
   */
  answer2: {
    type: String,
    default: "",
  },
  /**
   * @description Answer 3 to the third question in the application.
   */
  answer3: {
    type: String,
    default: "",
  },
  /**
   * @description Answer 4 to the fourth question in the application.
   */
  answer4: {
    type: String,
    default: "",
  },
  /**
   * @description Applicant's rating, used to store a rating for the application (possibly based on the interview or overall impression).
   */
  rating: {
    type: String,
    default: "",
  },
});
/**
 * @description Model for the Application collection, which uses the applicationSchema to define the structure of the documents.
 */
const Application = mongoose.model("Application", applicationSchema);
// Exporting the Application model to be used in other parts of the application
module.exports = Application;
