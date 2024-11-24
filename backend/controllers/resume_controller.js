// Importing required models and modules
const Resume = require("../models/resume");
const User = require("../models/user");
const multer = require("multer");
// Multer configuration for file upload handling
/**
 * @description Configure multer for file uploads with a 15MB file size limit 
 * and a filter to allow only PDF files.
 */
const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter(req, file, cb) {
    // Check if file is a PDF
    if (!file.originalname.match(/\.(pdf)$/)) {
      // Reject non-PDF files
      return cb(new Error("Please upload a PDF file"));
    }
    cb(undefined, true); // Accept the file
  },
});

/**
 * @description Uploads a resume for a user by first checking if a resume 
 * exists for the given user and replacing it if necessary.
 * @async
 * @param {Object} req - The request object containing user data and the uploaded file.
 * @param {Object} res - The response object used to send back the result.
 */
exports.uploadResume = async (req, res) => {
  // Look for an existing resume with the same applicantId
  const existingResume = await Resume.findOne({
    applicantId: req.body.id,
  });

  if (existingResume) {
    // Delete the existing resume if one exists
    existingResume.remove();
  }

  // find the user and add the resume
  let user = await User.findOne({ _id: req.body.id });

  if (!user) {
    // If user does not exist, send a 404 error
    return res.status(404).send({ error: "User not found" });
  }

  try {
    // Create a new resume object
    const resume = new Resume({
      applicantId: user._id, // Link the resume to the user
      fileName: req.file.originalname, // File name of the uploaded resume
      fileData: req.file.buffer, // File data from the uploaded file
      contentType: "application/pdf", // Specify the content type as PDF
    });
    // Save the resume in the database
    await resume.save();

    // Update the user's resumeId and resume fileName
    user.resumeId = resume._id;
    user.resume = resume.fileName;
    await user.save();
    // Send success message if the upload is successful
    res.status(201).send({ message: "Resume uploaded successfully" });
  } catch (error) {
    // Handle any errors during the process and send back a 400 error
    res.status(400).send({ error: error.message });
  }
};
/**
 * @description Retrieves the resume for a given user by applicantId.
 * @async
 * @param {Object} req - The request object containing the applicantId.
 * @param {Object} res - The response object used to send back the resume file.
 */
exports.getResume = async (req, res) => {
  try {
    // Find the resume by the applicantId in the request parameters
    const resume = await Resume.findOne({ applicantId: req.params.id });
    if (!resume) {
      // If no resume is found, send a 404 error
      return res.status(404).send({ error: "Resume not found" });
    }
    // Set the appropriate headers for sending the PDF file
    res.set("Content-Type", "application/pdf");
    // Set the filename in the Content-Disposition header to display it inline
    res.set("Content-Disposition", `inline; filename=${resume.fileName}`);
    // Send the resume file data to the client
    res.send(resume.fileData);
  } catch (error) {
    // Handle any errors and send a 400 error
    res.status(400).send({ error: error.message });
  }
};
/**
 * @description Simple health check endpoint that responds with "Pong".
* @param {Object} req - The request object.
* @param {Object} res - The response object used to send back the result.
*/
exports.upload = upload;

exports.ping = (req, res) => {
  // Send a "Pong" message in response to a ping request
  res.send({ message: "Pong" });
};
