// export userRegistrationStore;
import { create } from "zustand";

type UserState = {
  name: string;
  email: string;
  password: string;
  address: string;
  unityid: string;
  studentid: string;
  role: string;
  dob: string;
  skills: string;
  projects: string;
  experience: string;
  phonenumber: string;
  id: string;
  availability: string;
  gender: string;
  hours: string;
  isLoggedIn: boolean;
  affiliation: string;
  resume: string;
  resumeId: string;
};

type UserAction = {
  updateName: (name: UserState["name"]) => void;
  updateEmail: (name: UserState["email"]) => void;
  updatePassword: (name: UserState["email"]) => void;
  updateUnityid: (unityid: UserState["unityid"]) => void;
  updateStudentid: (studentid: UserState["studentid"]) => void;
  updateAddress: (name: UserState["address"]) => void;
  updateRole: (name: UserState["role"]) => void;
  updateDob: (name: UserState["dob"]) => void;
  updateSkills: (name: UserState["skills"]) => void;
  updateProjects: (name: UserState["skills"]) => void;
  updateExperience: (name: UserState["experience"]) => void;
  updatePhonenumber: (name: UserState["phonenumber"]) => void;
  updateId: (name: UserState["id"]) => void;
  updateAvailability: (name: UserState["availability"]) => void;
  updateGender: (name: UserState["gender"]) => void;
  updateHours: (name: UserState["hours"]) => void;
  updateIsLoggedIn: (name: UserState["isLoggedIn"]) => void;
  updateAffiliation: (name: UserState["affiliation"]) => void;
  updateResume: (name: UserState["resume"]) => void;
  updateResumeId: (name: UserState["resumeId"]) => void;
};

export const useUserStore = create<UserState & UserAction>()((set) => ({
  name: "",
  email: "",
  password: "",
  unityid: "",
  studentid: "",
  address: "",
  role: "",
  dob: "",
  skills: "",
  projects: "",
  experience: "",
  phonenumber: "",
  id: "",
  availability: "",
  gender: "",
  hours: "",
  affiliation: "",
  isLoggedIn: false,
  resume: "",
  resumeId: "",

  updateName: (name: string) => {
    set(() => ({ name: name }));
  },
  updateEmail: (email: string) => {
    set(() => ({ email: email }));
  },
  updateUnityid: (unityid: string) => {
    set(() => ({ unityid: unityid }));
  },
  updateStudentid: (studentid: string) => {
    set(() => ({ studentid: studentid }));
  },
  updatePassword: (password: string) => {
    set(() => ({ password: password }));
  },
  updateAddress: (address: string) => {
    set(() => ({ address: address }));
  },
  updateRole: (role: string) => {
    set(() => ({ role: role }));
  },
  updateDob: (dob: string) => {
    set(() => ({ dob: dob }));
  },
  updateSkills: (skills: string) => {
    set(() => ({ skills: skills }));
  },
  updateProjects: (projects: string) => {
    set(() => ({ projects: projects }));
  },
  updateExperience: (experience: string) => {
    set(() => ({ experience: experience }));
  },
  updatePhonenumber: (phonenumber: string) => {
    set(() => ({ phonenumber: phonenumber }));
  },
  updateId: (id: string) => {
    set(() => ({ id: id }));
  },
  updateAvailability: (availability: string) => {
    set(() => ({ availability: availability }));
  },
  updateGender: (gender: string) => {
    set(() => ({ gender: gender }));
  },
  updateHours: (hours: string) => {
    set(() => ({ hours: hours }));
  },
  updateIsLoggedIn: (isLoggedIn: boolean) => {
    set(() => ({ isLoggedIn: isLoggedIn }));
  },
  updateAffiliation: (affiliation: string) => {
    set(() => ({ affiliation: affiliation }));
  },
  updateResume: (resume: string) => {
    set(() => ({ resume: resume }));
  },
  updateResumeId: (resumeId: string) => {
    set(() => ({ resumeId: resumeId }));
  },
}));
