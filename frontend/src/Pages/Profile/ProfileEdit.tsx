import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
  skills: string;
  phonenumber: string;
  availability: string;
  gender: string;
  hours: string;
};

const ProfileEdit = ({ props }: { props: any }) => {
  const {
    name,
    email,
    address,
    role,
    skills,
    phonenumber,
    availability,
    gender,
    hours,
  } = props;

  const form = useForm<FormValues>({
    defaultValues: {
      name: name,
      email: email,
      address: address,
      role,
      skills: skills,
      phonenumber: phonenumber,
      availability: availability,
      gender: gender,
      hours: hours,
    },
  });

  const [availabilityDrop, setAvailabilityDtop] = useState(availability);

  useEffect(() => {
    console.log(props);
  }, [props]);

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = () => {};

  return (
    <>
      <div className="my-2">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              label="Role"
              type="text"
              {...register("role", {
                required: "Email is required",
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
          </Stack>
        </form>
      </div>
    </>
  );
};

export default ProfileEdit;
