import { toast } from "react-toastify";
import { getFormBody } from "./apiUtils";
import { loginURL, signupURL } from "../api/constants";
/**
 * Logs in a user by sending their credentials to the login API.
 * If successful, the user's token is stored in `localStorage`,
 * and they are redirected to the dashboard.
 * If the login fails, an error message is displayed.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {function} navigate - The navigate function for redirection.
 *
 * @returns {Promise<void>} Resolves when the login request completes.
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
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard");
        return;
      }
      toast.error("Login Failed");
    });
}
/**
 * Signs up a new user by sending their registration details to the signup API.
 * If successful, the user's token is stored in `localStorage`,
 * and they are redirected to the dashboard.
 * If the signup fails, an error message is displayed.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} confirmPassword - The user's password confirmation.
 * @param {string} name - The user's full name.
 * @param {string} role - The user's role (e.g., "student", "teacher").
 * @param {string} affiliation - The user's affiliation (e.g., "University").
 * @param {string} skills - A comma-separated list of the user's skills.
 * @param {function} navigate - The navigate function for redirection.
 *
 * @returns {Promise<void>} Resolves when the signup request completes.
 */
export function signup(
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  // unityid: string,
  // studentid: string,
  role: string,
  affiliation: string,
  skills: string,
  // projects: string,
  // experience: string,
  navigate: any
) {
  const url = signupURL;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      email,
      password,
      confirm_password: confirmPassword,
      name,
      // unityid,
      // studentid,
      role,
      skills,
      // projects,
      // experience,
      affiliation,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard");
        return;
      }
      toast.error("Sign up Failed");
    });
}
