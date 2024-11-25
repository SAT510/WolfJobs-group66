/**
 * Test suite for the Tasks API using Chai and Chai HTTP.
 * Tests cover various routes including GET and POST requests related to jobs and applications.
 */
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const SavedJob = require("../models/savedApplication");
const Job = require("../models/job");
// Should assertion style for Chai
chai.should();
// Use Chai HTTP for making HTTP requests
chai.use(chaiHttp);
/**
 * Test suite for the API endpoints related to tasks.
 */
describe("Tasks API", () => {
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
        response.body.should.have.property("message").eql("List of Applications"); // Check the message
        response.body.should.have.property("application").that.is.an("array"); // Check applications array
  
        console.log("********* Response Body *********", response.body); // Log response for debugging
      } catch (err) {
        console.error("Request failed:", err.message || err); // Log error details
        throw err; // Rethrow error to fail the test
      }
    });
  })
  
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
