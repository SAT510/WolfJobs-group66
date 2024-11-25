import { useNavigate } from "react-router-dom";
import { signup } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CryptoJS from "crypto-js";

import {
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
// Define the structure for form data
type FormValues = {
  name: string; // User's name
  email: string; // User's email
  password: string; // User's password
  confirmPassword: string; // Confirmed password for validation
  skills: string; // User's skills
};
/**
 * RegistrationPage component handles user registration, including form submission, validation, and role management.
 * It allows users to sign up for an account and provides different fields for capturing user details.
 * The form uses `react-hook-form` for form handling and validation, and `CryptoJS` to securely hash the password.
 */
const RegistrationPage = () => {
  // Initialize navigation hook
  const navigate = useNavigate();
  // State management for role and affiliation selection
  const [role, setRole] = useState("Applicant");
  const [affiliation, setAffiliation] = useState("nc-state-dining");
  // Initialize form with default values and validation rules
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: "",
    },
  });
  // Destructure form methods for handling form input, errors, and form state
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  /**
   * Handles form submission, performs password hashing and calls the signup function.
   *
   * @param {FormValues} data - The data object containing the form values.
   */
  const onSubmit = (data: FormValues) => {
    // Hash passwords using CryptoJS for security
    signup(
      data.email,
      CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex),
      CryptoJS.SHA256(data.confirmPassword).toString(CryptoJS.enc.Hex),
      data.name,
      role,
      role === "Manager" ? affiliation : "",
      data.skills,
      navigate // Redirect to another page after successful signup
    );
  };

  return (
    <>
      <div className="mx-auto bg-slate-50 content flex flex-col justify-center items-center">
        <div className=" p-4  border rounded bg-white">
          <div className="text-xl justify-center text-black mb-4 ">
            Create New Account
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width={400}>
              <TextField
                label="Name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(1) },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />

              <TextField
                label="Email Id"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(1) },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  "& label": {
                    paddingLeft: (theme) => theme.spacing(1),
                  },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Confirm password"
                type="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Passwords don't match";
                    }
                  },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{
                  "& label": {
                    paddingLeft: (theme) => theme.spacing(1),
                  },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Skills"
                type="text"
                {...register("skills", {
                  required: "Skills is required",
                })}
                error={!!errors.skills}
                helperText={errors.skills?.message}
                sx={{
                  "& label": {
                    paddingLeft: (theme) => theme.spacing(1),
                  },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.5),
                    borderRadius: "10px",
                  },
                }}
              />
              <FormControl>
                <InputLabel id="role-id">Role</InputLabel>
                <Select
                  value={role}
                  labelId="role-id"
                  label="Role"
                  id="role"
                  onChange={(e: SelectChangeEvent) => {
                    setRole(e.target.value);
                  }}
                >
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Applicant"}>Applicant</MenuItem>
                </Select>
              </FormControl>
              {role === "Manager" && (
                <FormControl>
                  <InputLabel id="affiliation-id">Role</InputLabel>
                  <Select
                    value={affiliation}
                    labelId="affiliation-id"
                    label="Role"
                    id="role"
                    onChange={(e: SelectChangeEvent) => {
                      setAffiliation(e.target.value);
                    }}
                  >
                    <MenuItem value={"nc-state-dining"}>
                      NC State Dining
                    </MenuItem>
                    <MenuItem value={"campus-enterprises"}>
                      Campus Enterprises
                    </MenuItem>
                    <MenuItem value={"wolfpack-outfitters"}>
                      Wolfpack Outfitters
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  background: "#FF5353",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Sign up
              </Button>
            </Stack>
          </form>
          <div className="mx-auto"></div>
          <br />
          <div className="mv-1 border-t mx-16" />
          <div className="flex justify-center">
            <p className="-mt-3 bg-white px-3 text-[#CCCCCC]">OR</p>
          </div>
          <br />
          <p
            className="text-[#656565] text-center"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an Account? Login Here
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
