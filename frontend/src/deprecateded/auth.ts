import { toast } from "react-toastify";
import { getFormBody } from "./apiUtils";
import { loginURL, signupURL } from "../api/constants";

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
