import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/UserStore";
import { useNavigate } from "react-router-dom";
import { login } from "../../deprecateded/auth";

type FormValues = {
  name: string;
  email: string;
  password: string;
  unityid: string;
  studentid: string;
  address: string;
  role: string;
  skills: string;
  projects: string;
  experience: string;
  phonenumber: string;
  availability: string;
  gender: string;
  hours: string;
};
/**
 * ProfileEdit Component
 * This component provides a form to edit the user's profile details including name, email, role, skills, etc.
 * It allows users to update their information, and on successful submission, it saves the changes and navigates the user.
 *
 * Props:
 * - `props`: The current user's profile information passed down as props.
 *
 * Functionality:
 * - Uses React Hook Form to manage form state and validation.
 * - Submits the form data to the backend API to save the user's updated profile.
 * - Displays validation errors for required fields.
 *
 * @param {Object} props - The profile data passed to the component
 */
const ProfileEdit = ({ props }: { props: any }) => {
  /**
   * Destructuring the profile information from the props.
   * This data is used as default values for the form.
   */
  const {
    name,
    email,
    unityid,
    studentid,
    address,
    role,
    skills,
    projects,
    experience,
    phonenumber,
    availability,
    gender,
    hours,
  } = props;
  /**
   * Initializing the form with React Hook Form.
   * The defaultValues are populated with the data passed from props.
   */
  const form = useForm<FormValues>({
    defaultValues: {
      name: name,
      email: email,
      unityid: unityid,
      studentid: studentid,
      address: address,
      role: role,
      skills: skills,
      projects: projects,
      experience: experience,
      phonenumber: phonenumber,
      availability: availability,
      gender: gender,
      hours: hours,
    },
  });
  /**
   * State hook to manage the availability drop-down value.
   * This is independent from the form's availability field.
   */
  const [availabilityDrop, setAvailabilityDtop] = useState(availability);
  /**
   * Getting user data from the user store.
   * `userId` is used to identify the user in the backend.
   */
  const userId = useUserStore((state) => state.id);
  const password = useUserStore((state) => state.password);
  /**
   * `useNavigate` hook from React Router to navigate to other pages on successful profile save.
   */
  const navigate = useNavigate();
  /**
   * Extracting form-related methods from the `useForm` hook.
   * `register` is used to bind inputs to the form state.
   * `handleSubmit` is used to handle form submission.
   * `formState` holds form validation states.
   */
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  /**
   * Handles the form submission.
   * This function sends a POST request to save the updated profile.
   * On success, it navigates to the login page.
   *
   * @param {FormValues} data - The form data containing updated profile information.
   */
  const handleSaveProfile = (data: FormValues) => {
    const url = "http://localhost:8000/api/v1/users/edit";
    const body = {
      id: userId,
      name: data.name,
      role,
      email,
      password,
      unityid: data.unityid,
      studentid: data.studentid,
      address: data.address,
      availability: availabilityDrop,
      hours: data.hours,
      gender: data.gender,
      skills: data.skills,
      projects: data.projects,
      experience: data.experience,
      phonenumber: data.phonenumber,
    };
    // Send the data to the API
    axios.post(url, body).then((res) => {
      if (res.status !== 200) {
        toast.error("Failed to save profile");
        return;
      }
      toast.success("Saved profile");
      login(email, password, navigate); // After saving, log the user in with updated credentials
    });
  };

  return (
    <>
      <div className="my-2">
        <form onSubmit={handleSubmit(handleSaveProfile)} noValidate>
          <Stack spacing={2} width={"620px"}>
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
              label="Email"
              type="email"
              {...register("address", {
                required: "Email is required",
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
              disabled
              value={email}
            />
            <TextField
              label="Unityid"
              type="text"
              {...register("unityid")}
              error={!!errors.unityid}
              helperText={errors.unityid?.message}
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
              label="Studentid"
              type="text"
              {...register("studentid")}
              error={!!errors.studentid}
              helperText={errors.studentid?.message}
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
              label="Role"
              type="text"
              {...register("role", {
                required: "role is required",
              })}
              error={!!errors.role}
              helperText={errors.role?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1.5),
                  borderRadius: "10px",
                },
              }}
              disabled
              value={role}
            />
            <TextField
              label="Address"
              type="text"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
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
              label="Skills"
              type="text"
              {...register("skills")}
              error={!!errors.skills}
              helperText={errors.skills?.message}
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
              label="Projects"
              type="text"
              {...register("projects")}
              error={!!errors.projects}
              helperText={errors.projects?.message}
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
              label="Experience"
              type="text"
              {...register("experience")}
              error={!!errors.experience}
              helperText={errors.experience?.message}
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
              label="Phone number"
              type="text"
              {...register("phonenumber")}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1.5),
                  borderRadius: "10px",
                },
              }}
            />
            {/* <TextField
              label="Availability"
              type="text"
              {...register("availability")}
              error={!!errors.availability}
              helperText={errors.availability?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1.5),
                  borderRadius: "10px",
                },
              }}
            /> */}
            <FormControl>
              <InputLabel id="available-id">Availability</InputLabel>
              <Select
                value={availabilityDrop}
                labelId="available-id"
                label="Availability"
                id="available-id-1"
                sx={{
                  "& label": { paddingLeft: (theme) => theme.spacing(1) },
                  "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                  "& fieldset": {
                    paddingLeft: (theme) => theme.spacing(1.0),
                    borderRadius: "10px",
                  },
                }}
                onChange={(e: SelectChangeEvent) => {
                  // setRole(e.target.value);
                  setAvailabilityDtop(e.target.value);
                }}
              >
                {/* <MenuItem value={"0 Hours"}>0 Hours</MenuItem> */}
                <MenuItem value={"4 Hours"}>4 Hours</MenuItem>
                <MenuItem value={"8 Hours"}>8 Hours</MenuItem>
                <MenuItem value={"12 Hours"}>12 Hours</MenuItem>
                <MenuItem value={"16 Hours"}>16 Hours</MenuItem>
                <MenuItem value={"20 Hours"}>20 Hours</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Gender"
              type="text"
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1.5),
                  borderRadius: "10px",
                },
              }}
            />
            {/* <TextField
              label="Hours"
              type="text"
              {...register("hours")}
              error={!!errors.hours}
              helperText={errors.hours?.message}
              sx={{
                "& label": { paddingLeft: (theme) => theme.spacing(1) },
                "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                "& fieldset": {
                  paddingLeft: (theme) => theme.spacing(1.5),
                  borderRadius: "10px",
                },
              }}
            /> */}
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
              Save Profile
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default ProfileEdit;
