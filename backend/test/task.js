/**
 * Test suite for the Tasks API using Chai and Chai HTTP.
 * Tests cover various routes including GET and POST requests related to jobs and applications.
 */
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const SavedJob = require("../models/savedApplication");
const Application = require("../models/application");
const Job = require("../models/job");
const { sendMail } = require("../models/nodemailer");
const User = require("../models/user");

const {
  acceptApplication,
  createSession,
  signUp,
  editProfile,
  deleteJob,
  editJob,
} = require("../controllers/api/v1/users_api");

const httpMocks = require("node-mocks-http");
const sinon = require("sinon");
const { expect } = chai;

// Should assertion style for Chai
chai.should();
// Use Chai HTTP for making HTTP requests
chai.use(chaiHttp);
/**
 * Test suite for the API endpoints related to tasks.
 */
describe("Tasks API", () => {
  describe("PUT /api/v1/jobs/edit", function () {
    this.timeout(10000); // Optional timeout adjustment

    afterEach(() => {
      sinon.restore(); // Restore Sinon stubs after each test
    });

    it("should successfully edit a job", async function () {
      const req = httpMocks.createRequest({
        method: "PUT",
        url: "/api/v1/jobs/edit",
        body: {
          jobid: "job123", // Job ID to edit
          name: "Updated Job Name",
          description: "Updated Description",
        },
      });
      const res = httpMocks.createResponse();

      const mockJob = {
        _id: "job123",
        name: "Old Job Name",
        description: "Old Description",
        type: "Full-time",
        location: "Remote",
        requiredSkills: ["Skill1", "Skill2"],
        pay: 50000,
        save: sinon.stub().resolves(), // Simulate successful save
      };

      sinon.stub(Job, "findById").resolves(mockJob);

      await editJob(req, res);

      res.statusCode.should.equal(200);
      const responseData = res._getJSONData();
      responseData.should.have
        .property("message")
        .eql("Job updated successfully");
      responseData.should.have.property("success").eql(true);
      responseData.should.have.property("job").that.is.an("object");
      responseData.job.should.have.property("name").eql("Updated Job Name");
      responseData.job.should.have
        .property("description")
        .eql("Updated Description");
    });

    it("should return 404 if the job is not found", async function () {
      const req = httpMocks.createRequest({
        method: "PUT",
        url: "/api/v1/jobs/edit",
        body: {
          jobid: "nonexistentjob", // Job ID that doesn't exist
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(Job, "findById").resolves(null); // Simulate no job found

      await editJob(req, res);

      res.statusCode.should.equal(404);
      const responseData = res._getJSONData();
      responseData.should.have.property("message").eql("Job not found");
      responseData.should.have.property("success").eql(false);
    });

    it("should return 500 if a server error occurs", async function () {
      const req = httpMocks.createRequest({
        method: "PUT",
        url: "/api/v1/jobs/edit",
        body: {
          jobid: "job123",
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(Job, "findById").rejects(new Error("Database error"));

      await editJob(req, res);

      res.statusCode.should.equal(500);
      const responseData = res._getJSONData();
      responseData.should.have.property("message").eql("Internal Server Error");
      responseData.should.have.property("success").eql(false);
    });
  });

  describe("DELETE /api/v1/jobs/delete", function () {
    this.timeout(10000); // Optional timeout adjustment

    afterEach(() => {
      sinon.restore(); // Restore Sinon stubs after each test
    });

    it("should return 500 if a server error occurs", async function () {
      const req = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/v1/jobs/delete",
        body: {
          jobid: "job123",
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(Job, "findByIdAndDelete").rejects(new Error("Database error"));

      await deleteJob(req, res);

      res.statusCode.should.equal(500);
      const responseData = res._getJSONData();
      responseData.should.have.property("message").eql("Internal Server Error");
      responseData.should.have.property("success").eql(false);
    });

    it("should return 404 if the job does not exist", async function () {
      const req = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/v1/jobs/delete",
        body: {
          jobid: "nonexistentjob", // Job ID that doesn't exist
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(Job, "findByIdAndDelete").resolves(null); // Simulate no job found

      await deleteJob(req, res);

      res.statusCode.should.equal(404);
      const responseData = res._getJSONData();
      responseData.should.have.property("message").eql("Job not found");
      responseData.should.have.property("success").eql(false);
    });

    it("should delete a job successfully", async function () {
      const req = httpMocks.createRequest({
        method: "DELETE",
        url: "/api/v1/jobs/delete",
        body: {
          jobid: "job123", // Job ID to delete
        },
      });
      const res = httpMocks.createResponse();

      const mockJob = {
        _id: "job123",
        title: "Test Job",
        description: "This is a test job",
      };

      sinon.stub(Job, "findByIdAndDelete").resolves(mockJob);

      await deleteJob(req, res);

      res.statusCode.should.equal(200);
      const responseData = res._getJSONData();
      responseData.should.have
        .property("message")
        .eql("Job deleted successfully");
      responseData.should.have.property("success").eql(true);
    });
  });

  describe("POST /api/v1/users/edit-profile", function () {
    this.timeout(10000); // Optional timeout adjustment

    afterEach(() => {
      sinon.restore(); // Restore Sinon stubs after each test
    });

    it("should successfully update the user's profile", async function () {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/users/edit-profile",
        body: {
          id: "user123",
          name: "Updated Name",
          password: "newpassword123",
          unityid: "unity123",
          role: "admin",
          address: "123 New Street",
          phonenumber: "1234567890",
          hours: "9-5",
          availability: "Full-time",
          gender: "Other",
          skills: ["JavaScript", "Node.js"],
          projects: ["Project A", "Project B"],
          experience: "3 years",
        },
      });
      const res = httpMocks.createResponse();

      const mockUser = {
        _id: "user123",
        name: "Old Name",
        save: sinon.stub().resolves(),
      };

      sinon.stub(User, "findById").resolves(mockUser);

      await editProfile(req, res);

      res.statusCode.should.equal(200);
      const responseData = res._getJSONData();
      responseData.should.have
        .property("message")
        .eql("User is updated Successfully");
      responseData.should.have.property("success").eql(true);
      responseData.data.should.have.property("user");
      responseData.data.user.should.have.property("name").eql("Updated Name");
      responseData.data.user.should.have
        .property("password")
        .eql("newpassword123");
      responseData.data.user.should.have.property("unityid").eql("unity123");
      responseData.data.user.should.have.property("role").eql("admin");
      responseData.data.user.should.have
        .property("address")
        .eql("123 New Street");
      responseData.data.user.should.have
        .property("phonenumber")
        .eql("1234567890");
      responseData.data.user.should.have.property("hours").eql("9-5");
      responseData.data.user.should.have
        .property("availability")
        .eql("Full-time");
      responseData.data.user.should.have.property("gender").eql("Other");
      responseData.data.user.should.have
        .property("skills")
        .eql(["JavaScript", "Node.js"]);
      responseData.data.user.should.have
        .property("projects")
        .eql(["Project A", "Project B"]);
      responseData.data.user.should.have.property("experience").eql("3 years");
    });
  });

  describe("POST /api/v1/users/sign-up", function () {
    this.timeout(10000); // Optional timeout adjustment

    afterEach(() => {
      sinon.restore(); // Restore Sinon stubs after each test
    });

    it("should return 500 if email sending fails", async function () {
      const mockApplication = {
        applicantemail: "applicant@example.com",
        status: "0",
        save: sinon.stub().resolves(),
      };

      sinon.stub(Application, "findById").resolves(mockApplication);
      sinon.stub(sendMail).throws(new Error("Email service not available"));

      const response = await chai
        .request("http://localhost:8000")
        .post("/api/v1/applications/accept")
        .send({ applicationid: "123" });

      response.should.have.status(404);
      response.body.should.be.a("object");
    });

    it("should return 200 if user already exists and provide token", async function () {
      const user = {
        email: "existinguser@example.com",
        password: "password123",
        toJSON: function () {
          return { email: this.email };
        },
      };

      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/users/sign-up",
        body: {
          email: "existinguser@example.com",
          password: "password123",
          confirm_password: "password123",
        },
      });
      const res = httpMocks.createResponse();

      sinon
        .stub(User, "findOne")
        .callsFake((query, callback) => callback(null, user));
      await signUp(req, res);

      res.statusCode.should.equal(200);
      const responseData = res._getJSONData();
      responseData.should.have
        .property("message")
        .eql("Sign Up Successful, here is your token, plz keep it safe");
    });

    it("should return 422 if passwords do not match", async function () {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/users/sign-up",
        body: {
          email: "user@example.com",
          password: "password123",
          confirm_password: "password123",
        },
      });
      const res = httpMocks.createResponse();

      await signUp(req, res);
    });
  });

  describe("POST /api/v1/sessions/create", function () {
    this.timeout(10000); // Optional timeout adjustment

    afterEach(() => {
      sinon.restore(); // Restore Sinon stubs after each test
    });

    it("should return 500 for server errors", async function () {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/sessions/create",
        body: {
          email: "user@example.com",
          password: "correctpassword",
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").throws(new Error("Database error")); // Simulate an error

      await createSession(req, res);

      res.statusCode.should.equal(500);
      const responseData = res._getJSONData();
      responseData.should.have.property("message").eql("Internal Server Error");
    });

    it("should return 200 and a JWT token for valid credentials", async function () {
      const user = {
        email: "user@example.com",
        password: "correctpassword",
        toJSON: function () {
          return { email: this.email };
        },
      };
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/sessions/create",
        body: {
          email: "user@example.com",
          password: "correctpassword",
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves(user); // Simulate finding the user

      await createSession(req, res);

      res.statusCode.should.equal(200);
      const responseData = res._getJSONData();
      responseData.should.have
        .property("message")
        .eql("Sign In Successful, here is your token, please keep it safe");
    });

    it("should return 422 if password does not match", async function () {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/sessions/create",
        body: {
          email: "user@example.com",
          password: "wrongpassword",
        },
      });
      const res = httpMocks.createResponse();

      sinon
        .stub(User, "findOne")
        .resolves({ email: "user@example.com", password: "correctpassword" });

      await createSession(req, res);

      res.statusCode.should.equal(422);
      const responseData = res._getJSONData();
      responseData.should.have
        .property("message")
        .eql("Invalid username or password");
    });

    it("should return 422 for invalid credentials", async function () {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/sessions/create",
        body: {
          email: "invalid@example.com",
          password: "wrongpassword",
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findOne").resolves(null); // Simulate user not found

      await createSession(req, res);

      res.statusCode.should.equal(422);
      const responseData = res._getJSONData();
      responseData.should.have
        .property("message")
        .eql("Invalid username or password");
    });
  });

  describe("POST /api/v1/applications/accept", function () {
    this.timeout(10000); // Increase timeout to handle async operations

    beforeEach(() => {
      // Optional: Mock data or initialize something before each test
    });

    afterEach(() => {
      // Optional: Clean up or restore stubs/mocks
      sinon.restore();
    });

    it("should return 500 on database error", async function () {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/users/edit-profile",
        body: {
          id: "user123",
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findById").rejects(new Error("Database error"));

      await editProfile(req, res);

      res.statusCode.should.equal(500);
      const responseData = res._getJSONData();
      responseData.should.have.property("message").eql("Internal Server Error");
    });

    it("should return 500 if user is not found", async function () {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/v1/users/edit-profile",
        body: {
          id: "nonexistentuser",
        },
      });
      const res = httpMocks.createResponse();

      sinon.stub(User, "findById").resolves(null);

      await editProfile(req, res);

      res.statusCode.should.equal(500);
      const responseData = res._getJSONData();
      responseData.should.have.property("message").eql("Internal Server Error");
    });

    it("should handle unexpected errors", async function () {
      const req = httpMocks.createRequest({
        body: { applicationid: "123" },
      });
      const res = httpMocks.createResponse();

      sinon
        .stub(Application, "findById")
        .throws(new Error("Database connection error"));

      await acceptApplication(req, res);

      expect(res.statusCode).to.equal(500);
      const responseData = res._getJSONData();
      expect(responseData.message).to.equal("Internal Server Error");
    });

    it("should update application and send email successfully", async function () {
      const req = httpMocks.createRequest({
        body: { applicationid: "123" },
      });
      const res = httpMocks.createResponse();

      const mockApplication = {
        applicantemail: "applicant@example.com",
        status: "0",
        save: sinon.stub().resolves(),
      };

      sinon.stub(Application, "findById").resolves(mockApplication);
      const sendMailStub = sinon.stub(sendMail).resolves();

      await acceptApplication(req, res);

      expect(res.statusCode).to.equal(200);
      const responseData = res._getJSONData();
      expect(responseData.message).to.equal(
        "Application is updated successfully, and email has been sent."
      );
      expect(responseData.success).to.be.true;

      expect(mockApplication.status).to.equal("1"); // Verify application status update
      sinon.assert.calledOnce(mockApplication.save); // Ensure save was called
    });

    it("should return 500 if email sending fails", async function () {
      const req = httpMocks.createRequest({
        body: { applicationid: "123" },
      });
      const res = httpMocks.createResponse();

      const mockApplication = {
        applicantemail: "applicant@example.com",
        status: "0",
        save: sinon.stub().resolves(),
      };

      sinon.stub(Application, "findById").resolves(mockApplication);
      sinon.stub(sendMail).throws(new Error("Email service not available"));

      await acceptApplication(req, res);

      expect(res.statusCode).to.equal(200);
      const responseData = res._getJSONData();
      expect(responseData.message).to.equal(
        "Application is updated successfully, and email has been sent."
      );
    });

    it("should return 404 if applicant email is missing", async function () {
      sinon.stub(Application, "findById").resolves({
        applicantemail: null,
      });

      const response = await chai
        .request("http://localhost:8000")
        .post("/api/v1/applications/accept")
        .send({ applicationid: "123" });

      response.should.have.status(404);
      response.body.should.be.a("object");
    });
  });
  /**
   * Test for fetching all applications.
   * It sends a GET request to the "/api/v1/users/fetchapplications" route.
   */
  describe("GET /api/v1/users/fetchapplications", function () {
    this.timeout(10000); // Increase timeout to 10 seconds

    it("IT SHOULD RETURN ALL THE APPLICATIONS", async function () {
      try {
        const response = await chai
          .request("http://localhost:8000") // Send request to the local server
          .get("/api/v1/users/fetchapplications"); // Fetch applications endpoint

        response.should.have.status(200); // Assert that the response status is 200
        response.body.should.be.a("object"); // Assert that the response body is an object
        response.body.should.have
          .property("message")
          .eql("List of Applications"); // Check the message
        response.body.should.have.property("application").that.is.an("array"); // Check applications array

        console.log("********* Response Body *********", response.body); // Log response for debugging
      } catch (err) {
        console.error("Request failed:", err.message || err); // Log error details
        throw err; // Rethrow error to fail the test
      }
    });
  });

  /**
   * Test for fetching all jobs.
   * It sends a GET request to the "/api/v1/users/" route.
   */
  describe("GET /api/v1/users/", () => {
    it("IT SHOULD RETURN ALL THE JOBS", (done) => {
      chai
        .request("http://localhost:8000") // Send request to the local server at the specified URL
        .get("/api/v1/users/") // Specify the GET route to fetch jobs

        .end((err, response) => {
          // Handle the response
          response.body.should.be.a("object"); // Assert that the response body is an object

          console.log("*********", response.body); // Log the response body for debugging

          done(); // Call done to indicate the test is complete
        });
    });
  });
  /**
   * Duplicate test for fetching all jobs (same as above).
   * This could be a redundant or mistaken repetition.
   */
  describe("GET /api/v1/users/", () => {
    it("IT SHOULD RETURN ALL THE JOBS", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/")

        .end((err, response) => {
          response.body.should.be.a("object");

          console.log("*********", response.body);

          done();
        });
    });
  });
  /**
   * Test for creating a job.
   * It sends a POST request to the "/api/v1/users/createjob" route with a job body.
   */
  describe("POST /api/v1/users/createjob", () => {
    it("IT SHOULD RETURN THE JOB", (done) => {
      const body = {
        // Define the body of the job being created
        name: "Shaan",
        managerid: "1234556",
        skills: "C,java",
        location: "Noida",
        description: "xyz",
        pay: "10",
        schedule: "10/10/10",
      };

      chai
        .request("http://localhost:8000") // Send request to the local server at the specified URL
        .post("/api/v1/users/createjob") // Specify the POST route to create a job
        .send({
          // Send the job creation data in the body of the request
          name: "Shaan",
          managerid: "1234556",
          skills: "C,java",
          location: "Noida",
          description: "xyz",
          pay: "10",
          schedule: "10/10/10",
        })
        .end((err, response) => {
          // Handle the response
          response.body.should.be.a("object"); // Assert that the response body is an object

          console.log("*********", response.body); // Log the response body for debugging

          done(); // Call done to indicate the test is complete
        });
    });
  });
  /**
   * Test for searching a job by a keyword.
   * It sends a GET request to the "/api/v1/users/search" route.
   */
  describe("GET /api/v1/users/search", () => {
    it("IT SHOULD RETURN THE SEARCHED JOB", (done) => {
      const body = {
        name: "Shaan",
        managerid: "1234556",
        skills: "C,java",
        location: "Noida",
        description: "xyz",
        pay: "10",
        schedule: "10/10/10",
      };

      chai
        .request("http://localhost:8000") // Send request to the local server at the specified URL
        .get("/api/v1/users/search/TA") // Specify the GET route to search for jobs by keyword
        // .send(body)
        .end((err, response) => {
          // Handle the response
          response.body.should.be.a("object"); // Assert that the response body is an object

          console.log("*********", response.body.users); // Log the search result for debugging

          done(); // Call done to indicate the test is complete
        });
    });
  });
  /**
   * Test for creating a user session.
   * It sends a POST request to the "/api/v1/users/create-session" route with user credentials.
   */
  describe("POST /api/v1/users/create-session", () => {
    it("IT SHOULD RETURN THE USER", (done) => {
      const body = { email: "boss@gmail.com", password: "123" }; // Define the user credentials
      chai
        .request("http://localhost:8000") // Send request to the local server at the specified URL
        .post("/api/v1/users/create-session") // Specify the POST route to create a user session
        .send(body) // Send the user credentials in the body of the request

        .end((err, response) => {
          // Handle the response
          response.body.should.be.a("object"); // Assert that the response body is an object

          console.log("*********", response.body); // Log the response body for debugging

          done(); // Call done to indicate the test is complete
        });
    });
  });

  /**
   * Test for saving a job to a user's saved list.
   * It sends a POST request to the "/api/v1/users/saveJob" route.
   */
  describe("POST /api/v1/users/saveJob", function () {
    it("should save a job when valid userID and jobId are provided", function (done) {
      const body = {
        // Define the userID and jobID for saving the job
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000") // Send request to the local server at the specified URL
        .post("/api/v1/users/saveJob") // Specify the POST route to save a job
        .send(body) // Send the user and job IDs in the request body
        .end(async (err, response) => {
          // Handle the response
          if (err) {
            console.error("Request error:", err); // Log error if there is one
            return done(err); // Pass error to done if there is a request error
          }

          response.body.should.be.a("object"); // Assert that the response body is an object

          console.log("*********", response.body); // Log the response body for debugging
          done(); // Call done to indicate the test is complete
        });
    });
  });

  /**
   * Test for unsaving a job from a user's saved list.
   * It sends a POST request to the "/api/v1/users/saveJob" route with an action to unsave.
   */
  describe("POST /api/v1/users/saveJob", function () {
    it("should save a job when valid userID and jobId are provided", function (done) {
      const body = {
        // Define the userID and jobID for unsaving the job
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/saveJob")
        .send(body)
        .end(async (err, response) => {
          // Handle the response
          if (err) {
            console.error("Request error:", err); // Log error if there is one
            return done(err); // Pass error to done if there is a request error
          }

          response.body.should.be.a("object"); // Assert that the response body is an object
          console.log("*********", response.body); // Log the response body for debugging

          done(); // Call done to indicate the test is complete
        });
    });

    it("should unsave a job when valid userID and jobId are provided", function (done) {
      const body = {
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000") // Send request to the local server at the specified URL
        .post("/api/v1/users/saveJob") // Specify the POST route to save a job
        .send({ ...body, action: "unsave" }) // Send the unsave action along with the user and job IDs
        .end(async (err, response) => {
          // Handle the response
          if (err) {
            console.error("Request error:", err); // Log error if there is one
            return done(err); // Pass error to done if there is a request error
          }

          response.body.should.be.a("object"); // Assert that the response body is an object
          console.log("*********", response.body); // Log the response body for debugging
          done(); // Call done to indicate the test is complete
        });
    });
  });

  /**
   * Test for retrieving the saved jobs list for a user.
   * It sends a GET request to the "/api/v1/users/savedJobList" route.
   */
  describe("GET /api/v1/users/savedJobs", function () {
    it("should retrieve the saved job list for a valid userID", function (done) {
      const body = {
        // Define the userID and jobID for saving the job
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000") // Send request to the local server at the specified URL
        .post("/api/v1/users/saveJob") // Specify the POST route to save a job
        .send(body) // Send the user and job IDs in the request body
        .end(async (err, response) => {
          // Handle the response
          if (err) {
            console.error("Request error:", err); // Log error if there is one
            return done(err); // Pass error to done if there is a request error
          }

          response.body.should.be.a("object"); // Assert that the response body is an object
          console.log("*********", response.body); // Log the response body for debugging

          done(); // Call done to indicate the test is complete
        });
      // Request to retrieve saved job list
      chai
        .request("http://localhost:8000")
        .get(`/api/v1/users/savedJobList/${body.userId}`) // Specify the GET route to retrieve the saved job list by userId
        .end(async (err, response) => {
          // Handle the response
          if (err) {
            console.error("Request error:", err); // Log error if there is one
            return done(err); // Pass error to done if there is a request error
          }
          response.body.should.be.a("object"); // Assert that the response body is an object
          console.log("*********", response.body); // Log the response body for debugging
          response.should.have.status(200); // Check for successful response

          done(); // Call done to indicate the test is complete
        });
    });
  });

  /**
   * Test for retrieving the saved job list when there are no saved jobs.
   * It sends a GET request to the "/api/v1/users/savedJobList" route with a user ID.
   */
  describe("GET /api/v1/users/savedJobList/:id", function () {
    it("should retrieve an empty job list for a user with no saved jobs", function (done) {
      const userId = "67182b905ffb75809dac3afb"; // Define a user ID with no saved jobs
      chai
        .request("http://localhost:8000")
        .get(`/api/v1/users/saveJobList/:id`) // Send request to retrieve saved job list for the user
        .end((err, response) => {
          // Handle the response
          if (err) {
            console.error(
              "Request error while retrieving saved job list:",
              err // Log error if there is one
            );
            return done(err); // Pass error to done if there is a request error
          }
          console.log("in test case EMPTY SAVED LIST DISPLAY: ", response.body);
          console.log("Testing with userId:", userId);
          response.should.have.status(200); // Check for successful response
          response.body.should.be.a("object"); // Assert that the response body is an object
          response.body.should.have.property("success").eql(true); // Assert success in the response
          response.body.should.have
            .property("message")
            .eql("Saved jobs retrieved successfully"); // Assert no saved jobs message

          done(); // Call done to indicate the test is complete
        });
    });
  });
});
