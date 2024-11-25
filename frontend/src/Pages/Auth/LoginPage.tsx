/**
 * LoginPage component is responsible for rendering the login form, validating the input,
 * and handling the form submission for user authentication.
 * It uses `react-hook-form` for form handling and `yup` for validation.
 * On form submission, it sends the email and password (hashed using CryptoJS) to the backend login endpoint.
 * 
 * @component
 * @example
 * // Usage
 * <LoginPage />
 */
import { useNavigate } from "react-router-dom"; // Importing navigation hook for routing
import { login } from "../../deprecateded/auth"; // Importing login function (deprecated)
import { useForm } from "react-hook-form"; // Importing hook for managing form state
import * as yup from "yup";  // Importing Yup for form validation schema
import { yupResolver } from "@hookform/resolvers/yup";  // Resolver to integrate yup with react-hook-form
import { Stack, TextField, Button } from "@mui/material"; // Material UI components for form fields and button
import CryptoJS from "crypto-js"; // For hashing the password using SHA256

type FormValues = {
  email: string; // Email field type for the form
  password: string; // Password field type for the form
};
/**
 * Validation schema for the form using Yup.
 * Ensures email is in valid format and password is required.
 */
const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid") // Validates the email format
    .required("Email is required"), // Ensures email is provided
  password: yup.string().required("Password is required"), // Ensures password is provided
});

const LoginPage = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  // Initializing the form handling with react-hook-form and schema validation via yup
  const form = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema), // Integrating Yup validation schema
  });
  // const { control } = form;
  const { register, handleSubmit, formState } = form; // Extracting necessary methods and form state
  const { errors } = formState; // Extracting validation errors from the form state
  /**
   * Handles form submission by calling the login function and passing hashed password.
   * @param data The form data containing email and password.
   */
  const onSubmit = (data: FormValues) => {
    console.log("form submitted");
    console.log(data); // Log form data for debugging purposes
    login(
      data.email, // Email from form input
      CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex), // Hashing password before sending it
      navigate // Passing navigate function to redirect after login
    );
  };

  return (
    <>
      <div className="mx-auto bg-slate-50 content flex flex-col justify-center items-center">
        <div className=" p-4  border rounded bg-white">
          <div className="text-xl justify-center text-black mb-4 ">
            Sign In to your Account
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width={400}>
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
                disabled={!formState.isValid}
              >
                Login
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
              navigate("/register");
            }}
          >
            Create a new account
          </p>
        </div>
      </div>
      {/* <DevTool control={control}></DevTool> */}
    </>
  );
};

export default LoginPage;
