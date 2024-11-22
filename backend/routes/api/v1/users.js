const express = require("express");

const router = express.Router();

const usersApi = require("../../../controllers/api/v1/users_api");

const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

router.post("/create-session", usersApi.createSession);
router.post("/signup", usersApi.signUp);
router.post("/edit", jsonParser, usersApi.editProfile);
router.get("/getprofile/:id", usersApi.getProfile);
router.get("/search/:name", usersApi.searchUser);
router.post("/createhistory", usersApi.createHistory);
// router.get('/gethistory/:userId',usersApi.getHistory);
router.get("/gethistory", usersApi.getHistory);
router.post("/createjob", jsonParser, usersApi.createJob);
router.get("/", usersApi.index);
router.get("/fetchapplications", usersApi.fetchApplication);
router.post("/acceptapplication", usersApi.acceptApplication);
router.post("/modifyApplication", jsonParser, usersApi.modifyApplication);
router.post(
  "/modifyApplicationFinalStage",
  jsonParser,
  usersApi.modifyApplicationFinalStage
);
router.post("/generateOTP", usersApi.generateOtp);
router.post("/verifyOTP", usersApi.verifyOtp);
router.post("/rejectapplication", usersApi.rejectApplication);
router.post("/closejob", jsonParser, usersApi.closeJob);
router.delete("/deletejob", jsonParser, usersApi.deleteJob);
router.put("/editjob", jsonParser, usersApi.editJob);
router.post("/createapplication", jsonParser, usersApi.createApplication);
router.post("/saveJob", jsonParser, usersApi.saveJob);
router.get("/saveJobList/:id", jsonParser, usersApi.saveJobList);
router.post("/getJobId", jsonParser, usersApi.findJobIdByName);

module.exports = router;
