import { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillCheckCircle } from "react-icons/ai";
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
import { useForm } from "react-hook-form";
// Type definition for the form values
type FormValues = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  requiredSkills: string;
  description: string;
  deadline: string;
};
/**
 * Component for creating a new job listing.
 * It allows the user to fill in the details of the job (role, type, location, pay, etc.)
 * and navigate to the next page to fill in the job questionnaire.
 * 
 * @returns {JSX.Element} Rendered CreateJob component
 */
const CreateJob = () => {
  // Navigation hook to programmatically navigate between routes
  const navigate = useNavigate();
  // Local state for tracking required skills entered by the user
  const [requiredSkills, setRequiredSkills] = useState("");
   // React Hook Form hook for form handling and validation
  const form = useForm<FormValues>({
    defaultValues: {
      role: "",
      jobtype: "",
      location: "",
      pay: "",
      description: "",
      deadline: "",
    },
  });
  // Destructuring to get form handling methods and errors
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  // Local state for managing the selected job type (default is 'full-time')
  const [jobType, setJobType] = useState("full-time");
  /**
   * Handles form submission. This function processes the form data
   * and navigates to the next page with the job listing details.
   * 
   * @param {FormValues} data - Form data containing job listing information
   */
  const onSubmit = (data: FormValues) => {
    // Constructing the job listing data to pass to the next page
    const body = {
      role: data.role,
      jobtype: jobType,
      location: data.location,
      pay: data.pay,
      description: data.description,
      requiredSkills: requiredSkills,
      jobDeadline: data.deadline,
    };
    // Navigating to the next page with the job listing details
    navigate("/job_questionnaire", {
      state: body,
    });
  };

  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-3/12  pt-10 border-r"
          style={{ height: "calc(100vh - 72px)" }}
        >
          {/* Progress steps for creating a job listing */}
          <div className="text-2xl  translate-x-10">Create New Job Listing</div>
          <div className="flex flex-col items-start  ml-10  mt-10 ">
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div
          className="w-9/12 pt-10 pl-10"
          style={{ height: "calc(100vh - 72px)" }}
        >
           {/* Form for adding job details */}
          <div className="text-2xl translate-x-10">Add Details</div>
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="m-4 mx-10"
            >
              <Stack spacing={2} width={600}>
                <TextField
                  label="Job Role"
                  type="text"
                  {...register("role", {
                    required: "Job role is required",
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
                />
                {/* Job Type Selection */}
                <FormControl>
                  <InputLabel id="role-id">Job Type</InputLabel>
                  <Select
                    value={jobType}
                    labelId="role-id"
                    label="Job Type"
                    id="role"
                    onChange={(e: SelectChangeEvent) => {
                      setJobType(e.target.value);
                    }}
                    sx={{
                      "& label": { paddingLeft: (theme) => theme.spacing(1) },
                      "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                      "& fieldset": {
                        paddingLeft: (theme) => theme.spacing(0.75),
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value={"full-time"}>Full Time</MenuItem>
                    <MenuItem value={"part-time"}>Part Time</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Location"
                  type="text"
                  {...register("location")}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                {/* Pay Input */}
                <TextField
                  label="Pay"
                  type="number"
                  {...register("pay", {
                    required: "Job pay is required",
                  })}
                  error={!!errors.pay}
                  helperText={errors.pay?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                 {/* Job Description Input */}
                <TextField
                  label="Job Description"
                  type="text"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                  minRows={4}
                  multiline
                />
                {/* Job Deadline Input */}
                <TextField
                  label="Job Deadline"
                  type="date"
                  {...register("deadline", {
                    required: "Job deadline is required", // Add validation if needed
                  })}
                  error={!!errors.deadline}
                  helperText={errors.deadline?.message}
                  InputLabelProps={{
                    shrink: true, // Ensures the label stays above the input
                  }}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                {/* Required Skills Input */}
                <TextField
                  label="Required Skills"
                  type="text"
                  {...register("requiredSkills", {
                    required: "Skills are required",
                  })}
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  error={!!errors.requiredSkills}
                  helperText={errors.requiredSkills?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  style={{
                    color: "#FF5353",
                    borderColor: "#FF5353",
                    textTransform: "none",
                    fontSize: "16px",
                    minWidth: "200px",
                  }}
                >
                  Proceed
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
