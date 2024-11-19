const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const Food = require("../../../models/food");
const History = require("../../../models/history");
const Job = require("../../../models/job");
const Application = require("../../../models/application");
const AuthOtp = require("../../../models/authOtp");
const SavedJob = require("../../../models/savedApplication");


require("dotenv").config();


const sendEmail = require("../../../models/nodemailer");  

const nodemailer = require("nodemailer");
module.exports.acceptApplication = async function (req, res) {
  try {
    // Find the application by its ID
    let application = await Application.findById(req.body.applicationid);

    // Log the application object to check if applicantEmail is present
    console.log(application); // Check the structure of the application object

    // Ensure that applicantEmail exists
    if (!application.applicantemail) {
      return res.status(400).json({
        message: "Applicant email is missing from the application",
      });
    }

    // Update the status of the application to "accepted" (you can modify this as per your logic)
    application.status = "1"; 

    // Save the updated application
    await application.save();

    // Prepare email details
    const applicantEmail = application.applicantemail;
    const subject = "Your Application Has Been Accepted!";
    const text = "Congratulations! Your application has been accepted by the manager.";

    // Send the email to the applicant
    try {
      sendEmail(applicantEmail, subject, text);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Handle the email failure by notifying the user
      return res.status(500).json({
        message: "Application is updated, but email could not be sent.",
        error: emailError,
      });
    }

    // Send the success response back to the client
    res.status(200).json({
      message: "Application is updated successfully, and email has been sent.",
      data: {
        application,
      },
      success: true,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


  module.exports.rejectApplication = async function (req, res) {
    try {
      // Find the application by ID
      let application = await Application.findById(req.body.applicationid);
  
      // Check if the application exists
      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }
  
      // Update the application status to "rejected" (status code 2)
      application.status = "2";
      await application.save();
  
      // Send rejection email to the applicant
      const mailOptions = {
        from: 'softwareengineering510@gmail.com', // Your email address
        to: application.applicantemail, // Applicant's email address
        subject: 'Your Job Application Status',
        text: 'We regret to inform you that your application has been rejected. Thank you for applying, and we encourage you to apply for future opportunities.',
      };
  
      // Call the sendEmail function (assuming it's defined in nodemailer.js)
      nodemailer.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error('Error sending rejection email:', err);
          return res.status(500).json({
            message: 'Failed to send email notification',
          });
        }
        console.log('Rejection email sent:', info.response);
      });
  
      // Return success response
      res.set("Access-Control-Allow-Origin", "*");
      return res.json(200, {
        message: "Application rejected successfully, and applicant has been notified via email.",
        data:  { application, applicantEmail },
        success: true,
      });
    } catch (err) {
      console.error('Error rejecting application:', err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    res.set("Access-Control-Allow-Origin", "*");
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Sign In Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "wolfjobs", { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.createHistory = async function (req, res) {
  try {
    let history = await History.create({
      date: req.body.date,
      caloriesgain: req.body.total,
      caloriesburn: req.body.burnout,
      user: req.body.id,
    });

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "History Created Successfully",

      data: {
        history: history,
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

module.exports.signUp = async function (req, res) {
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

module.exports.editProfile = async function (req, res) {
  // if (req.body.password == req.body.confirm_password) {
  try {
    let user = await User.findById(req.body.id);

    user.name = req.body.name;
    user.password = req.body.password;
    user.unityid = req.body.unityid;
    user.role = req.body.role;
    user.address = req.body.address;
    user.phonenumber = req.body.phonenumber;
    user.hours = req.body.hours;
    user.availability = req.body.availability;
    user.gender = req.body.gender;
    // user.dob = req.body.dob;
    check = req.body.skills;
    user.skills = check;
    user.projects = req.body.projects;
    user.experience = req.body.experience;
    user.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "User is updated Successfully",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, {
        //   expiresIn: "100000",
        // }),
        user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
  // } else {
  //   return res.json(400, {
  //     message: "Bad Request",
  //   });
  // }
};
module.exports.searchUser = async function (req, res) {
  try {
    var regex = new RegExp(req.params.name, "i");

    let users = await Job.find({ name: regex });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The list of Searched Users",

      data: {
        //user.JSON() part gets encrypted

        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        users: users,
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

module.exports.getHistory = async function (req, res) {
  try {
    let history = await History.findOne({
      user: req.query.id,
      date: req.query.date,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The User Profile",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
        history: history,
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

module.exports.createJob = async function (req, res) {
  let user = await User.findOne({ _id: req.body.id });
  check = req.body.skills;
  try {
    let job = await Job.create({
      name: req.body.name,
      managerid: user._id,
      managerAffilication: user.affiliation,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
      pay: req.body.pay,
      requiredSkills: req.body.requiredSkills,
      question1: req.body.question1,
      question2: req.body.question2,
      question3: req.body.question3,
      question4: req.body.question4,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      data: {
        job: job,
        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" })
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "NOT CREATED",
    });
  }
};

module.exports.index = async function (req, res) {
  let jobs = await Job.find({}).sort("-createdAt");

  //Whenever we want to send back JSON data
  res.set("Access-Control-Allow-Origin", "*");
  return res.json(200, {
    message: "List of jobs",

    jobs: jobs,
  });
};

module.exports.fetchApplication = async function (req, res) {
  let application = await Application.find({}).sort("-createdAt");

  //Whenever we want to send back JSON data
  res.set("Access-Control-Allow-Origin", "*");
  return res.json(200, {
    message: "List of Applications",

    application: application,
  });
};

module.exports.createApplication = async function (req, res) {
  // let user = await User.findOne({ _id: req.body.id });
  // check = req.body.skills;

  try {
    const existingApplication = await Application.findOne({
      applicantid: req.body.applicantId,
      jobid: req.body.jobId,
    });

    if (existingApplication) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.json(400, {
        message: "You have already applied for the job",
        error: true,
      });
    }

    let application = await Application.create({
      // applicantemail: req.body.applicantemail,
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
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      data: {
        application: application,
        //token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" })
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "NOT CREATED",
    });
  }
};

module.exports.modifyApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = req.body.status;

    //change answer only from screening to grading
    if (req.body.status === "grading") {
      application.answer1 = req.body.answer1;
      application.answer2 = req.body.answer2;
      application.answer3 = req.body.answer3;
      application.answer4 = req.body.answer4;
    }

    if (req.body.status === "rating") {
      application.rating = req.body.rating;
    }
    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Application is updated Successfully",
      data: {
        application,
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


  
module.exports.closeJob = async function (req, res) {
  try {
    let job = await Job.findById(req.body.jobid);

    job.status = "closed";

    job.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Job is updated Successfully",

      data: {
        //user.JSON() part gets encrypted

        // token: jwt.sign(user.toJSON(), env.jwt_secret, {
        //   expiresIn: "100000",
        // }),
        job,
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
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
module.exports.editJob = async function (req, res) {
  try {
    const job = await Job.findById(req.body.jobid);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }


    job.name = req.body.name || job.name;
    job.description = req.body.description || job.description;
    job.type = req.body.type || job.type;
    job.location = req.body.location || job.location;
    job.requiredSkills = req.body.requiredSkills || job.requiredSkills;
    job.pay = req.body.pay || job.pay;


    await job.save();

    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};




function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
}

// Generate OTP ans send email to user
module.exports.generateOtp = async function (req, res) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    let authOtp = await AuthOtp.create({
      userId: req.body.userId,
      otp: otp,
    });

    const { email } = await User.findById(req.body.userId);
    // Send mail to user
    const mailOptions = {
      from: '"Job Portal" <' + process.env.EMAIL + ">", // sender address
      to: email, // list of receivers
      subject: "OTP", // Subject line
      html: `<p>Your OTP is ${otp}</p>`, // plain text body
    };

    await getTransport().sendMail(mailOptions);

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      success: true,
      message: "OTP is generated Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.verifyOtp = async function (req, res) {
  try {
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

    authOtp.remove();

    await User.updateOne(
      { _id: req.body.userId },
      { $set: { isVerified: true } }
    );

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      success: true,
      message: "OTP is verified Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

//Save job functionality
module.exports.saveJob = async function (req, res) {
  try {
    const { userId, jobId } = req.body;
    if (!userId || !jobId) {
      return res.status(400).json({
        message: "User ID and Job ID are required",
        success: false,
      });
    }
    console.log("User ID:", userId);
    console.log("Job ID:", jobId);
    let save_Job = await SavedJob.findOne({ userId: userId, jobId: jobId });
    if (save_Job) {
      await SavedJob.deleteOne({ _id: save_Job._id });
      // Update the job's saved status to false
      await Job.updateOne({ _id: jobId }, { saved: false });

      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).json({
        message: "Job unsaved",
        success: true,
      });
    } else {
      let newSaveJob = await SavedJob.create({ userId: userId, jobId: jobId });
      await Job.updateOne({ _id: jobId }, { saved: true });
      res.set("Access-Control-Allow-Origin", "*");
      return res.json(200, {
        message: "Job saved",
        data: { savedJob: newSaveJob },
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

//display save
module.exports.saveJobList = async function (req, res) {
  try {
    const { userId } = req.params.id;

    const savedJobs = await SavedJob.find(userId);
    res.set("Access-Control-Allow-Origin","*")

    if (savedJobs.length === 0) {
      return res.status(200).json({
        message: "No saved jobs found",
        data: [],
        success: true,
      });
    }
    const jobIds = savedJobs.map((job) => job.jobId);

    const jobs = await Job.find({ _id: { $in: jobIds } });

    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Saved jobs retrieved successfully",
      data: jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error counting saved jobs:", error); 
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
