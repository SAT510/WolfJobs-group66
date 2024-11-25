import { toast } from "react-toastify";
import { createJobURL, loginURL } from "../api/constants";
import { getFormBody } from "./apiUtils";
/**
 * Sends a request to the API to create a new job listing.
 *
 * This function makes a POST request to the `createJobURL` endpoint with the provided job details.
 * On success, it navigates the user to the dashboard and displays a success toast message.
 * 
 * @param {string} name - The name of the job.
 * @param {string} id - The unique identifier for the job (e.g., job ID).
 * @param {string} status - The status of the job (e.g., active, inactive).
 * @param {string} location - The location where the job is based.
 * @param {string} description - A description of the job.
 * @param {string} pay - The pay associated with the job.
 * @param {string} type - The type of the job (e.g., full-time, part-time).
 * @param {string} question1 - The first question to ask applicants.
 * @param {string} question2 - The second question to ask applicants.
 * @param {string} question3 - The third question to ask applicants.
 * @param {string} question4 - The fourth question to ask applicants.
 * @param {string} affiliation - The affiliation (e.g., organization or company) offering the job.
 * @param {function} navigate - A function to navigate the user to a different page, typically used to redirect to the dashboard after success.
 */
export const createJob = async (
  name: string,
  id: string,
  status: string,
  location: string,
  description: string,
  pay: string,
  type: string,
  question1: string,
  question2: string,
  question3: string,
  question4: string,
  affiliation: string,
  navigate: any
) => {
  const url = createJobURL;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      name,
      id,
      status,
      location,
      description,
      pay,
      type,
      question1,
      question2,
      question3,
      question4,
      affiliation,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        // success
        navigate("/dashboard");
        toast.success("Job created");
      }
    });
};
/**
 * Sends a request to the API to log in a user with the provided credentials.
 *
 * This function makes a POST request to the `loginURL` endpoint with the user's email and password.
 * On successful login, the user's token is stored in `localStorage` and they are redirected to the dashboard.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {function} navigate - A function to navigate the user to a different page, typically used to redirect to the dashboard after login.
 */
export async function login(email: string, password: string, navigate: any) {
  const url = loginURL;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Login data", data);
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard");
      }
    });
}
