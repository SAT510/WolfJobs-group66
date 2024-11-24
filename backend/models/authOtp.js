// Import the mongoose library for MongoDB schema and model handling
const mongoose = require("mongoose");
/**
 * Schema definition for the "autoOtp" collection.
 * This schema defines the structure of the OTP table, including fields for 
 * userId, otp, and createdAt.
 * 
 * @type {mongoose.Schema}
 */
const autoOtpSchema = new mongoose.Schema(
  {/**
     * The userId of the user requesting the OTP.
     * This field is required.
     * 
     * @type {String}
     */
    userId: {
      type: String,
      required: true,
    }, /**
    * The one-time password (OTP) associated with the user.
    * This field is required.
    * 
    * @type {String}
    */
    otp: {
      type: String,
      required: true,
    },
    /**
     * Timestamp of when the OTP was created.
     * Defaults to the current date and time.
     * 
     * @type {Date}
     */
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    /**
     * Enable automatic timestamping for createdAt and updatedAt fields.
     * 
     * @type {boolean}
     */
    timestamps: true,
  }
);
/**
 * Model definition for interacting with the "autoOtp" collection.
 * 
 * @type {mongoose.Model}
 */
const autoOtp = mongoose.model("autoOtp", autoOtpSchema);
// Export the autoOtp model for use in other parts of the application
module.exports = autoOtp;
