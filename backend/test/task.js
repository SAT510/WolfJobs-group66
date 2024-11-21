let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const SavedJob = require("../models/savedApplication");
const Job = require("../models/job");

chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {
  describe("GET /api/v1/users/fetchapplications", () => {
    it("IT SHOULD RETURN ALL THE APPLICATIONS", (done) => {
      // const task = {
      //     email:'shaangzb@gmail.com',
      //     password:'123',

      // };

      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/fetchapplications")

        .end((err, response) => {
          response.body.should.be.a("object");

          console.log("*********", response.body);

          done();
        });
    });
  });

  describe("GET /api/v1/users/", () => {
    it("IT SHOULD RETURN ALL THE JOBS", (done) => {
      // const task = {
      //     email:'shaangzb@gmail.com',
      //     password:'123',

      // };

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

  describe("GET /api/v1/users/", () => {
    it("IT SHOULD RETURN ALL THE JOBS", (done) => {
      // const task = {
      //     email:'shaangzb@gmail.com',
      //     password:'123',

      // };

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

  describe("POST /api/v1/users/createjob", () => {
    it("IT SHOULD RETURN THE JOB", (done) => {
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
        .request("http://localhost:8000")
        .post("/api/v1/users/createjob")
        .send({
          name: "Shaan",
          managerid: "1234556",
          skills: "C,java",
          location: "Noida",
          description: "xyz",
          pay: "10",
          schedule: "10/10/10",
        })
        .end((err, response) => {
          response.body.should.be.a("object");

          console.log("*********", response.body);

          done();
        });
    });
  });

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
        .request("http://localhost:8000")
        .get("/api/v1/users/search/TA")
        // .send(body)
        .end((err, response) => {
          response.body.should.be.a("object");

          console.log("*********", response.body.users);

          done();
        });
    });
  });

  describe("POST /api/v1/users/create-session", () => {
    it("IT SHOULD RETURN THE USER", (done) => {
      const body = { email: "boss@gmail.com", password: "123" };
      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/create-session")
        .send(body)

        .end((err, response) => {
          response.body.should.be.a("object");

          console.log("*********", response.body);

          done();
        });
    });
  });

  //creating a test to test post api for save application functionality
  describe("POST /api/v1/users/saveJob", function () {
    it("should save a job when valid userID and jobId are provided", function (done) {
      const body = {
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/saveJob")
        .send(body)
        .end(async (err, response) => {
          if (err) {
            console.error("Request error:", err);
            return done(err);
          }

          response.body.should.be.a("object");

          console.log("*********", response.body);
          done();
        });
    });
  });

  //creating a test to delete the a saved application
  describe("POST /api/v1/users/saveJob", function () {
    it("should save a job when valid userID and jobId are provided", function (done) {
      const body = {
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/saveJob")
        .send(body)
        .end(async (err, response) => {
          if (err) {
            console.error("Request error:", err);
            return done(err);
          }

          response.body.should.be.a("object");
          console.log("*********", response.body);

          done();
        });
    });

    it("should unsave a job when valid userID and jobId are provided", function (done) {
      const body = {
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/saveJob")
        .send({ ...body, action: "unsave" })
        .end(async (err, response) => {
          if (err) {
            console.error("Request error:", err);
            return done(err);
          }

          response.body.should.be.a("object");
          console.log("*********", response.body);
          done();
        });
    });
  });

  //test for displaying saved list
  describe("GET /api/v1/users/savedJobs", function () {
    it("should retrieve the saved job list for a valid userID", function (done) {
      const body = {
        userId: "60e6f0f5b9f1c25b4845a7ef",
        jobId: "607c191e810c19729de860ea",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/saveJob")
        .send(body)
        .end(async (err, response) => {
          if (err) {
            console.error("Request error:", err);
            return done(err);
          }

          response.body.should.be.a("object");
          console.log("*********", response.body);

          done();
        });
      chai
        .request("http://localhost:8000")
        .get(`/api/v1/users/savedJobList/${body.userId}`) // Assuming you use query parameters for the user ID
        .end(async (err, response) => {
          if (err) {
            console.error("Request error:", err);
            return done(err);
          }
          response.body.should.be.a("object");
          console.log("*********", response.body);
          response.should.have.status(200); // Check for successful response

          done();
        });
    });
  });

  //test to display the list when there is no saved job
  describe("GET /api/v1/users/savedJobList/:id", function () {
    it("should retrieve an empty job list for a user with no saved jobs", function (done) {
      const userId = "67182b905ffb75809dac3afb";
      chai
        .request("http://localhost:8000")
        .get(`/api/v1/users/saveJobList/:id`)
        .end((err, response) => {
          if (err) {
            console.error(
              "Request error while retrieving saved job list:",
              err
            );
            return done(err);
          }
          console.log("in test case EMPTY SAVED LIST DISPLAY: ", response.body);
          console.log("Testing with userId:", userId);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("success").eql(true);
          response.body.should.have
            .property("message")
            .eql("No saved jobs found");
          response.body.should.have.property("data").eql([]);

          done();
        });
    });
  });
});
