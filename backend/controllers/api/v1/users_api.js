/**
 * This file defines multiple functions for handling job applications, user profiles, history, and job management
 * in the WolfJobs application. It uses MongoDB models and integrates email notifications for various user and job statuses.
 */
const User = require("../../../models/user"); // User model
const jwt = require("jsonwebtoken"); // For JWT token generation
const Food = require("../../../models/food"); // Food model (not used here)
const History = require("../../../models/history"); // History model for tracking user activity
const Job = require("../../../models/job"); // Job model
const Application = require("../../../models/application"); // Job application model
const AuthOtp = require("../../../models/authOtp"); // Authentication OTP model (not used here)
const SavedJob = require("../../../models/savedApplication"); // Saved jobs model (not used here)

require("dotenv").config(); // Load environment variables

const nodemailer = require("nodemailer"); // Nodemailer for email sending
/**
 * Accepts a job application, updates its status to "accepted," and sends a notification email to the applicant.
 * @param {Object} req - The request object containing application ID and other details.
 * @param {Object} res - The response object used to send the result.
 */
module.exports.acceptApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationid); // Fetch the application by ID

    console.log(application);

    if (!application.applicantemail) {
      // Ensure the applicant's email is present
      return res.status(400).json({
        message: "Applicant email is missing from the application",
      });
    }

    application.status = "1"; // Update the application status to accepted

    await application.save(); // Save changes to the database

    const applicantEmail = application.applicantemail;
    const subject = "Your Application Has Been Accepted!";
    const text =
      "Congratulations! Your application has been accepted by the manager.";

    try {
      sendMail(applicantEmail, subject, text); // Send email notification
      console.log("Email sent successfully");
    } catch (emailError) {
      // Handle email sending errors
      console.error("Error sending email:", emailError);

      return res.status(500).json({
        // Respond with partial success message
        message: "Application is updated, but email could not be sent.",
        error: emailError, // Catch and handle unexpected errors
      });
    }

    res.status(200).json({
      // Respond with success message
      message: "Application is updated successfully, and email has been sent.",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    // Catch and handle unexpected errors
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
/**
 * Rejects a job application, updates its status to "rejected," and sends a notification email to the applicant.
 * @param {Object} req - The request object containing application ID and other details.
 * @param {Object} res - The response object used to send the result.
 */
module.exports.rejectApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationid); // Fetch the application by ID

    if (!application) {
      // Ensure the application exists
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "2"; // Update the application status to rejected
    await application.save(); // Save changes to the database

    const mailOptions = {
      from: "softwareengineering510@gmail.com", // Sender's email
      to: application.applicantemail, // Sender's email
      sub: "Your Job Application Status",
      msg: "We regret to inform you that your application has been rejected. Thank you for applying, and we encourage you to apply for future opportunities.",
    };

    sendMail(mailOptions, function (err, info) {
      // Send email notification
      if (err) {
        console.error("Error sending rejection email:", err);
        return res.status(500).json({
          message: "Failed to send email notification",
        });
      }
      console.log("Rejection email sent:", info.response);
    });

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message:
        "Application rejected successfully, and applicant has been notified via email.",
      data: { application, applicantEmail },
      success: true,
    });
  } catch (err) {
    // Catch and handle unexpected errors
    console.error("Error rejecting application:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
/**
 * Authenticates a user, verifies credentials, and generates a JWT token upon successful login.
 * @param {Object} req - The request object containing login credentials.
 * @param {Object} res - The response object used to send the result.
 */
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email }); // Find the user by email
    res.set("Access-Control-Allow-Origin", "*");
    if (!user || user.password != req.body.password) {
      // Validate user credentials
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      // Return a JWT token and user details
      message: "Sign In Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "wolfjobs", { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    // Catch and handle unexpected errors
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Creates a new history entry for a user, tracking their activity data.
 * @param {Object} req - The request object containing history details.
 * @param {Object} res - The response object used to send the result.
 */
module.exports.createHistory = async function (req, res) {
  try {
    let history = await History.create({
      date: req.body.date,
      caloriesgain: req.body.total,
      caloriesburn: req.body.burnout,
      user: req.body.id,
    }); // Create a new history entry

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      // Respond with success message
      message: "History Created Successfully",

      data: {
        history: history,
      },
      success: true,
    });
  } catch (err) {
    // Catch and handle unexpected errors
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Module: Job Portal API Controllers
 * Description: This module contains the backend logic for handling various API endpoints
 * related to user management, job creation, applications, and other functionalities in a job portal.
 */
module.exports.signUp = async function (req, res) {
  /**
   * Signs up a user.
   * @param {Object} req - HTTP request object containing user signup details.
   * @param {Object} res - HTTP response object to send the response.
   *
   * - Checks if the password and confirm password match.
   * - Searches for an existing user by email.
   * - Creates a new user if not already registered.
   * - Generates a JWT token for the user.
   * - Handles errors and sends appropriate responses.
   */
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(422, {
        message: "Passwords donot match",
      });
    }

    User.findOne({ email: req.body.email }, function (err, user) {
      if (user) {
        res.set("Access-Control-Allow-Origin", "*");
        return res.json(200, {
          message: "Sign Up Successful, here is your token, plz keep it safe",

          data: {
            //user.JSON() part gets encrypted

            token: jwt.sign(user.toJSON(), "wolfjobs", {
              expiresIn: "100000",
            }),
            user,
          },
          success: true,
        });
      }

      if (!user) {
        let user = User.create(req.body, function (err, user) {
          if (err) {
            return res.json(500, {
              message: "Internal Server Error",
            });
          }

          // let userr = User.findOne({ email: req.body.email });
          res.set("Access-Control-Allow-Origin", "*");
          return res.json(200, {
            message: "Sign Up Successful, here is your token, plz keep it safe",

            data: {
              //user.JSON() part gets encrypted

              token: jwt.sign(user.toJSON(), "wolfjobs", {
                expiresIn: "100000",
              }),
              user,
            },
            success: true,
          });
        });
      } else {
        return res.json(500, {
          message: "Internal Server Error",
        });
      }
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Fetches user profile details by ID.
 * @param {Object} req - HTTP request object containing user ID.
 * @param {Object} res - HTTP response object to send the response.
 *
 * - Retrieves user data using the ID from the database.
 * - Sends back the user information.
 */
module.exports.getProfile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The User info is",

      data: {
        //user.JSON() part gets encrypted

        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Updates the user profile details.
 * @param {Object} req - HTTP request object containing updated user details.
 * @param {Object} res - HTTP response object to send the response.
 *
 * - Finds the user by ID.
 * - Updates the user profile attributes.
 * - Saves the updated user data and responds with success.
 */
module.exports.editProfile = async function (req, res) {
  // if (req.body.password == req.body.confirm_password) {
  // Check if the password matches the confirmation password. The line is commented out and not used.
  try {
    // Attempt to find the user by their unique ID from the request body
    let user = await User.findById(req.body.id); // Dynamically assigns all updates from the request body.
    // Update user's profile with the provided data from the request body
    user.name = req.body.name; // Update the user's name
    user.password = req.body.password; // Update the user's password
    user.unityid = req.body.unityid; // Update the user's unity ID
    user.role = req.body.role; // Update the user's role
    user.address = req.body.address; // Update the user's address
    user.phonenumber = req.body.phonenumber; // Update the user's phone number
    user.hours = req.body.hours; // Update the user's working hours
    user.availability = req.body.availability; // Update the user's availability
    user.gender = req.body.gender; // Update the user's gender
    // user.dob = req.body.dob;
    check = req.body.skills; // Capture the skills from the request body.
    user.skills = check; // Assign the skills to the user.
    user.projects = req.body.projects; // Update the user's projects
    user.experience = req.body.experience; // Update the user's experience
    user.save(); // Save the changes to the database
    // Set the Access-Control-Allow-Origin header to allow requests from any origin
    res.set("Access-Control-Allow-Origin", "*");
    // Return a successful JSON response with a status code 200 and a success message
    return res.json(200, {
      message: "User is updated Successfully",

      data: {
        user, // Return the updated user object in the response
      },
      success: true, // Indicate that the operation was successful
    });
  } catch (err) {
    // If an error occurs, log the error and return a 500 internal server error response
    console.log(err);
    // Return a JSON response with a status code 500 and an error message
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Searches for users by name and returns the list of matching users.
 *
 * @param {Object} req - The request object containing the user's search parameters.
 * @param {Object} res - The response object used to send the result back to the client.
 *
 * @returns {Object} - JSON response containing the list of users matching the search criteria or an error message.
 */
module.exports.searchUser = async function (req, res) {
  try {
    // Create a case-insensitive regular expression from the search name parameter
    var regex = new RegExp(req.params.name, "i");
    // Search for users in the Job collection where the 'name' matches the regex
    let users = await Job.find({ name: regex });
    // Set Access-Control-Allow-Origin header to allow cross-origin requests
    res.set("Access-Control-Allow-Origin", "*");
    // Send a successful JSON response with the list of found users
    return res.json(200, {
      message: "The list of Searched Users",

      data: {
        // Returning the list of users found by the regex search
        users: users,
      },
      success: true,
    });
  } catch (err) {
    // Log any errors encountered during the process
    console.log(err);
    // Send an error response with status 500 for internal server error
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

/**
 * Retrieves the history of a user based on the provided user ID and date.
 *
 * @function getHistory
 * @async
 * @param {Object} req - The request object containing the query parameters.
 * @param {Object} res - The response object used to send the JSON response.
 * @returns {Object} JSON response containing user history data or an error message.
 *
 * @throws {Error} In case of an internal server error, a 500 response with an error message is returned.
 */
module.exports.getHistory = async function (req, res) {
  try {
    // Retrieves the user's history from the database based on the provided user ID and date.
    let history = await History.findOne({
      user: req.query.id,
      date: req.query.date,
    });
    // Sets the CORS header to allow access from any origin.
    res.set("Access-Control-Allow-Origin", "*");
    // Returns a JSON response with the retrieved history data and success status.
    return res.json(200, {
      message: "The User Profile",

      data: {
        // user.JSON() part is commented out (potential encryption or token generation).
        // token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        history: history,
      },
      success: true,
    });
  } catch (err) {
    // Logs the error to the console if an exception occurs.
    console.log(err);
    // Returns a 500 response indicating an internal server error.
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.findJobIdByName = async function (req, res) {
  try {
    // Extract the job name from the request body or query parameters
    const jobName = req.body.name || req.query.name;

    if (!jobName) {
      return res.status(400).json({
        message: "Job name is required",
        success: false,
      });
    }

    // Query the database for a job with the specified name
    const job = await Job.findOne({ name: jobName });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Respond with the job ID
    return res.status(200).json({
      data: {
        jobId: job._id,
      },
      message: "Job ID found successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

/**
 * createJob - Creates a new job posting in the database.
 *
 * This function is responsible for handling the request to create a new job. It expects the
 * job details to be included in the request body, retrieves the user associated with the
 * job creation, and then attempts to create a new job document in the database.
 *
 * @param {Object} req - The request object containing the job details in the body.
 * @param {Object} res - The response object to send the status of the job creation.
 *
 * @returns {Object} - Returns a JSON response with a success message and job data,
 *                     or an error message if the job creation fails.
 */
module.exports.createJob = async function (req, res) {
  // Log the request body to the console for debugging purposes
  console.log("Request Body:", req.body);
  // Retrieve the user from the database based on the ID provided in the request body
  let user = await User.findOne({ _id: req.body.id });
  // Extract skills from the request body, although not used directly in the job creation
  check = req.body.skills;
  try {
    // Attempt to create a new job using the details from the request body
    let job = await Job.create({
      name: req.body.name, // Job name
      managerid: user._id, // ID of the user managing the job
      managerAffilication: user.affiliation, // Affiliation of the job manager
      type: req.body.type, // Type of job (e.g., full-time, part-time)
      location: req.body.location, // Location of the job
      description: req.body.description, // Job description
      pay: req.body.pay, // Pay for the job
      requiredSkills: req.body.requiredSkills, // Skills required for the job
      question1: req.body.question1, // First question for applicants
      question2: req.body.question2, // Second question for applicants
      question3: req.body.question3, // Third question for applicants
      question4: req.body.question4, // Fourth question for applicants
      jobDeadline: req.body.jobDeadline, // Deadline for job applications
    });
    // Set the CORS header to allow requests from any origin
    res.set("Access-Control-Allow-Origin", "*");
    // Return a JSON response indicating the job was successfully created
    return res.json(200, {
      data: {
        job: job, // Include the created job details in the response
        // token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }) // Optional token generation for authentication
      },
      message: "Job Created!!", // Success message
      success: true, // Flag indicating success
    });
  } catch (err) {
    // Log any errors that occurred during the job creation process
    console.log(err);
    // Return a JSON response indicating an error occurred while creating the job
    return res.json(500, {
      message: "NOT CREATED",
    });
  }
};
/**
 * Handles the listing of all jobs, sorted by creation date.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
module.exports.index = async function (req, res) {
  let jobs = await Job.find({}).sort("-createdAt");

  // Set CORS headers for JSON response
  res.set("Access-Control-Allow-Origin", "*");
  return res.json(200, {
    message: "List of jobs",

    jobs: jobs,
  });
};
/**
 * Handles fetching all applications, sorted by creation date.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
module.exports.fetchApplication = async function (req, res) {
  // Fetch all applications, sorted by creation date in descending order
  let application = await Application.find({}).sort("-createdAt");

  // Set CORS headers for JSON response
  res.set("Access-Control-Allow-Origin", "*");
  // Respond with status code 200 and a JSON object containing the list of applications
  return res.json(200, {
    message: "List of Applications",

    application: application,
  });
};
/**
 * Creates a new job application if the applicant hasn't already applied for the same job.
 * Sends a response with the created application or an error message if the application already exists.
 */
module.exports.createApplication = async function (req, res) {
  try {
    // Check if the applicant has already applied for the job
    const existingApplication = await Application.findOne({
      applicantid: req.body.applicantId,
      jobid: req.body.jobId,
    });

    if (existingApplication) {
      // If application already exists, respond with an error
      res.set("Access-Control-Allow-Origin", "*");
      return res.json(400, {
        message: "You have already applied for the job",
        error: true,
      });
    }
    // Create a new application
    let application = await Application.create({
      applicantid: req.body.applicantid,
      applicantname: req.body.applicantname,
      applicantemail: req.body.applicantemail,
      applicantskills: req.body.applicantSkills,
      skills: req.body.skills,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      hours: req.body.hours,
      dob: req.body.dob,
      gender: req.body.gender,
      jobname: req.body.jobname,
      jobid: req.body.jobid,
      managerid: req.body.managerid,
    });
    // Set CORS header and respond with status code 200 and the created application
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      data: {
        application: application,
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);
    // In case of an error, respond with status code 500
    return res.json(500, {
      message: "NOT CREATED",
    });
  }
};

const sendMail = require("../../../models/nodemailer");
/**
 * Modify the application status and update details based on the provided request.
 * This method handles various statuses like 'grading', 'rating', 'screening', and 'rejected'.
 * It also sends emails for 'screening' and 'rejected' statuses and updates the application in the database.
 *
 * @param {Object} req - The request object containing application details and status.
 * @param {Object} res - The response object used to send a response back to the client.
 */
module.exports.modifyApplication = async function (req, res) {
  // Find the application by ID from the database
  try {
    let application = await Application.findById(req.body.applicationId);
    // Update the application status based on the provided status in the request
    application.status = req.body.status;
    console.log("Request Body:", req.body);

    // If the status is 'grading', update the answers for the application
    if (req.body.status === "grading") {
      application.answer1 = req.body.answer1;
      application.answer2 = req.body.answer2;
      application.answer3 = req.body.answer3;
      application.answer4 = req.body.answer4;
    }
    // If the status is 'rating', update the rating for the application
    if (req.body.status === "rating") {
      application.rating = req.body.rating;
    }
    // Extract applicant email for sending notifications
    const applicantEmail = application.applicantemail;

    let subject = "";
    let message = "";
    // If the status is 'screening', send a success email to the applicant
    if (req.body.status === "screening") {
      subject = `WolfJobs Application Status Update`;
      message = `<p>Congratulations ${req.body.applicantname}! Your application for the ${req.body.jobname} role
                has made it to the next stage. Please fill out the related interview questions on the job portal.</p>`;
      try {
        // Send the email to the applicant
        await sendMail(applicantEmail, subject, message);
        console.log("Email sent successfully");
      } catch (error) {
        // If email fails to send, log the error and return response with failure
        console.error("Failed to send email:", error);
        return res.status(500).json({
          message: "Failed to send email",
          error: error.message || "Unknown error",
        });
      }
      // If the status is 'rejected', send a rejection email to the applicant
    } else if (req.body.status === "rejected") {
      subject = `WolfJobs Application Status Update`;
      message = `<p>Greetings ${req.body.applicantname}. Your application status for the ${req.body.jobname} role
                 has been updated to: <strong>Rejected</strong>.</p>`;
      try {
        // Send the email to the applicant
        await sendMail(applicantEmail, subject, message);
        console.log("Email sent successfully");
      } catch (error) {
        // If email fails to send, log the error and return response with failure
        console.error("Failed to send email:", error);
        return res.status(500).json({
          message: "Failed to send email",
          error: error.message || "Unknown error",
        });
      }
    }
    // Save the updated application in the database
    application.save();
    // Set CORS header and send back a successful response with updated application
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Application is updated Successfully",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    // If an error occurs, log the error and return a generic internal server error
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Final stage of modifying an application status and sending relevant emails.
 * Handles the 'accepted' and 'rejected' statuses and sends appropriate emails to the applicant.
 *
 * @param {Object} req - The request object containing the application details and status.
 * @param {Object} res - The response object used to send a response back to the client.
 */
module.exports.modifyApplicationFinalStage = async function (req, res) {
  try {
    // Find the application by ID from the database
    let application = await Application.findById(req.body.applicationId);
    // Update the application status based on the provided status in the request
    application.status = req.body.status;
    // Extract applicant email for sending notifications
    const applicantEmail = application.applicantemail;

    let subject = "";
    let message = "";
    // If the status is 'accepted', send a success email to the applicant
    if (req.body.status === "accepted") {
      subject = `WolfJobs Application Status Update`;
      message = `<p>Congratulations ${req.body.applicantname}! Your application status for the 
                  ${req.body.jobname} role has been updated to: <strong>Accepted</strong>.</p>`;

      try {
        // Send the email to the applicant
        await sendMail(applicantEmail, subject, message);
        console.log("Email sent successfully");
      } catch (error) {
        // If email fails to send, log the error and return response with failure
        console.error("Failed to send email:", error);
        return res.status(500).json({
          message: "Failed to send email",
          error: error.message || "Unknown error",
        });
      }
      // If the status is 'rejected', send a rejection email to the applicant
    } else if (req.body.status === "rejected") {
      subject = `WolfJobs Application Status Update`;
      message = `<p>Greetings  ${req.body.applicantname}. Your application status for the 
                 ${req.body.jobname} role has been updated to: <strong>Rejected</strong>.</p>`;
      try {
        // Send the email to the applicant
        await sendMail(applicantEmail, subject, message);
        console.log("Email sent successfully");
      } catch (error) {
        // If email fails to send, log the error and return response with failure
        console.error("Failed to send email:", error);
        return res.status(500).json({
          message: "Failed to send email",
          error: error.message || "Unknown error",
        });
      }
    }
    // Save the updated application in the database
    application.save();
    // Set CORS header and send back a successful response with updated application
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Application is updated Successfully",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    // If an error occurs, log the error and return a generic internal server error
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Closes a job by updating its status to "closed" and returns a success response.
 *
 * @param {Object} req - The request object containing the job ID in the body.
 * @param {Object} res - The response object used to send the response back.
 * @returns {Object} JSON response indicating the status of the update.
 */
module.exports.closeJob = async function (req, res) {
  try {
    // Retrieve the job from the database by its ID
    let job = await Job.findById(req.body.jobid);
    // Set the job's status to "closed"
    job.status = "closed";
    // Save the updated job status to the database
    job.save();
    // Set CORS headers to allow requests from any origin
    res.set("Access-Control-Allow-Origin", "*");
    // Return a success response with the updated job data
    return res.json(200, {
      message: "Job is updated Successfully",

      data: {
        job,
      },
      success: true,
    });
  } catch (err) {
    // Log any error that occurs during the process
    console.log(err);
    // Return a failure response in case of an error
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Deletes a job from the database by its ID.
 *
 * @param {Object} req - The request object containing the job ID to delete.
 * @param {Object} res - The response object to send the status.
 * @returns {Object} JSON response indicating success or failure.
 */
module.exports.deleteJob = async function (req, res) {
  try {
    // Find the job by ID and remove it from the database
    const job = await Job.findByIdAndDelete(req.body.jobid);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Respond with a success message
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (err) {
    // Log any error that occurs during the process
    console.log(err);
    // Return a failure response in case of an error
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
/**
 * Edits a job's details in the database by job ID.
 *
 * @param {Object} req - The request object containing the job ID and updated details.
 * @param {Object} res - The response object to send the status.
 * @returns {Object} JSON response indicating success or failure, and the updated job.
 */
module.exports.editJob = async function (req, res) {
  try {
    // Find the job by ID
    const job = await Job.findById(req.body.jobid);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    // Update job fields if provided
    job.name = req.body.name || job.name;
    job.description = req.body.description || job.description;
    job.type = req.body.type || job.type;
    job.location = req.body.location || job.location;
    job.requiredSkills = req.body.requiredSkills || job.requiredSkills;
    job.pay = req.body.pay || job.pay;
    // Save the updated job
    await job.save();

    res.set("Access-Control-Allow-Origin", "*");
    // Respond with a success message
    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job,
    });
  } catch (err) {
    // Log any error that occurs during the process
    console.log(err);
    // Return a failure response in case of an error
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
/**
 * Creates a mail transporter using Gmail service.
 *
 * @returns {Object} The nodemailer transport object.
 */

function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
}

/**
 * Generates an OTP, stores it, and sends an email to the user.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object to send the status.
 * @returns {Object} JSON response indicating success or failure.
 */
module.exports.generateOtp = async function (req, res) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    // Create a new OTP record
    let authOtp = await AuthOtp.create({
      userId: req.body.userId,
      otp: otp,
    });
    // Find the user's email
    const { email } = await User.findById(req.body.userId);
    // Send mail to user
    const mailOptions = {
      from: '"Job Portal" <' + process.env.EMAIL + ">", // sender address
      to: email, // list of receivers
      subject: "OTP", // Subject line
      html: `<p>Your OTP is ${otp}</p>`, // plain text body
    };
    // Send the email
    await getTransport().sendMail(mailOptions);

    res.set("Access-Control-Allow-Origin", "*");
    // Generate success messgae
    return res.json(200, {
      success: true,
      message: "OTP is generated Successfully",
    });
  } catch (err) {
    //log any errors during the process
    console.log(err);
    // show error message
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Verifies the OTP entered by the user.
 *
 * @param {Object} req - The request object containing user ID and OTP.
 * @param {Object} res - The response object to send the status.
 * @returns {Object} JSON response indicating success or failure.
 */
module.exports.verifyOtp = async function (req, res) {
  try {
    // Find OTP entry by user ID and OTP
    const authOtp = await AuthOtp.findOne({
      userId: req.body.userId,
      otp: req.body.otp,
    });

    if (!authOtp) {
      return res.json(422, {
        error: true,
        message: "OTP is not correct",
      });
    }
    // Remove OTP record
    authOtp.remove();
    // Update user verification status
    await User.updateOne(
      { _id: req.body.userId },
      { $set: { isVerified: true } }
    );

    res.set("Access-Control-Allow-Origin", "*");
    // Show success message
    return res.json(200, {
      success: true,
      message: "OTP is verified Successfully",
    });
  } catch (err) {
    // Log any errors durring the process
    console.log(err);

    return res.json(500, {
      //Show the errors
      message: "Internal Server Error",
    });
  }
};

/**
 * Save or unsave a job based on the provided user and job IDs.
 * This method checks if a job is already saved by the user, and if so, it will unsave the job.
 * If the job is not saved, it will save the job for the user.
 * It updates the job's "saved" status in the database accordingly.
 *
 * @param {Object} req - The request object, containing userId and jobId in the body.
 * @param {Object} res - The response object, used to send the status of the save operation.
 */
module.exports.saveJob = async function (req, res) {
  try {
    // Destructure userId and jobId from the request body
    const { userId, jobId } = req.body;
    // Check if both userId and jobId are provided, return an error if not
    if (!userId || !jobId) {
      return res.status(400).json({
        message: "User ID and Job ID are required",
        success: false,
      });
    }
    // Log the userId and jobId for debugging purposes
    console.log("User ID:", userId);
    console.log("Job ID:", jobId);
    // Check if the job is already saved by the user
    let save_Job = await SavedJob.findOne({ userId: userId, jobId: jobId });
    // If the job is already saved, unsave the job
    if (save_Job) {
      // Delete the saved job entry
      await SavedJob.deleteOne({ _id: save_Job._id });
      // Update the job's saved status to false
      await Job.updateOne({ _id: jobId }, { saved: false });
      // Set the CORS header and respond with a success message
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).json({
        message: "Job unsaved",
        success: true,
      });
    } else {
      // If the job is not saved, create a new saved job entry
      let newSaveJob = await SavedJob.create({ userId: userId, jobId: jobId });
      // Update the job's saved status to true
      await Job.updateOne({ _id: jobId }, { saved: true });
      // Set the CORS header and respond with the new saved job
      res.set("Access-Control-Allow-Origin", "*");
      // Show success message
      return res.json(200, {
        message: "Job saved",
        data: { savedJob: newSaveJob },
        success: true,
      });
    }
  } catch (error) {
    // Catch any errors and log them
    console.log(error);
    // Respond with a server error status
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
/**
 * Function to handle the saving and retrieving of job lists for a user.
 * It retrieves saved jobs for a given user, and returns the full job details.
 * If no saved jobs are found, it returns a message indicating so.
 *
 * @param {Object} req - The request object containing parameters and body.
 * @param {Object} res - The response object to send the result back.
 * @returns {Object} - The response with either the list of saved jobs or an error message.
 */
module.exports.saveJobList = async function (req, res) {
  try {
    // Extracts the userId from the request parameters.
    const { userId } = req.params.id;
    // Retrieves the list of saved jobs for the given userId.
    const savedJobs = await SavedJob.find(userId);
    // Sets the Access-Control-Allow-Origin header to allow cross-origin requests.
    res.set("Access-Control-Allow-Origin", "*");
    // If no saved jobs are found, return a success message with empty data.
    if (savedJobs.length === 0) {
      return res.status(200).json({
        message: "No saved jobs found", // Response message indicating no jobs were saved.
        data: [], // Empty array since there are no saved jobs.
        success: true, // Indicates the request was successful.
      });
    }
    // Maps through the saved jobs to get an array of jobIds.
    const jobIds = savedJobs.map((job) => job.jobId);
    // Retrieves the details of the jobs based on the jobIds.
    const jobs = await Job.find({ _id: { $in: jobIds } });
    // Sets the Access-Control-Allow-Origin header again for the response.
    res.set("Access-Control-Allow-Origin", "*");
    // Returns a successful response with the job details.
    return res.status(200).json({
      message: "Saved jobs retrieved successfully", // Success message with job data.
      data: jobs, // The actual job data that was retrieved.
      success: true, // Indicates the request was successful.
    });
  } catch (error) {
    // Logs the error to the console for debugging.
    console.error("Error counting saved jobs:", error);
    // Returns a failure response with an internal server error message.
    return res.status(500).json({
      message: "Internal Server Error", // Error message when something goes wrong.
      success: false, // Indicates the request failed.
    });
  }
};
