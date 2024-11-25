/**
 * This file defines a Zustand store that manages the user state and actions for the user registration process.
 * It is used to store and update the user's information such as name, email, skills, and other personal data.
 * The store allows for the updating of user details through defined actions.
 *
 * Zustand is used here to create a simple state management solution for the user-related data.
 */

// Importing Zustand's create method to create the store
import { create } from "zustand";
// Type definition for the user state, outlining all fields related to the user.
type UserState = {
  name: string; // User's name
  email: string; // User's email address
  password: string; // User's password
  address: string; // User's physical address
  unityid: string; // User's Unity ID (could be for university or internal ID)
  studentid: string; // User's student ID
  role: string; // User's role (e.g., student, admin)
  dob: string; // User's date of birth
  skills: string; // User's skills
  projects: string; // User's projects
  experience: string; // User's work experience
  phonenumber: string; // User's phone number
  id: string; // Unique user ID
  availability: string; // User's availability (e.g., part-time, full-time)
  gender: string; // User's gender
  hours: string; // User's available working hours
  isLoggedIn: boolean; // Whether the user is logged in
  affiliation: string; // User's affiliation (e.g., university, company)
  resume: string; // User's resume (URL or path)
  resumeId: string; // Unique identifier for the resume
};
// Type definition for actions that update various user details in the state
type UserAction = {
  updateName: (name: UserState["name"]) => void; // Action to update the user's name
  updateEmail: (name: UserState["email"]) => void; // Action to update the user's email
  updatePassword: (name: UserState["email"]) => void; // Action to update the user's password
  updateUnityid: (unityid: UserState["unityid"]) => void; // Action to update the user's Unity ID
  updateStudentid: (studentid: UserState["studentid"]) => void; // Action to update the user's student ID
  updateAddress: (name: UserState["address"]) => void; // Action to update the user's address
  updateRole: (name: UserState["role"]) => void; // Action to update the user's role
  updateDob: (name: UserState["dob"]) => void; // Action to update the user's date of birth
  updateSkills: (name: UserState["skills"]) => void; // Action to update the user's skills
  updateProjects: (name: UserState["skills"]) => void; // Action to update the user's projects
  updateExperience: (name: UserState["experience"]) => void; // Action to update the user's experience
  updatePhonenumber: (name: UserState["phonenumber"]) => void; // Action to update the user's phone number
  updateId: (name: UserState["id"]) => void; // Action to update the user's ID
  updateAvailability: (name: UserState["availability"]) => void; // Action to update the user's availability
  updateGender: (name: UserState["gender"]) => void; // Action to update the user's gender
  updateHours: (name: UserState["hours"]) => void; // Action to update the user's hours
  updateIsLoggedIn: (name: UserState["isLoggedIn"]) => void; // Action to update the user's login status
  updateAffiliation: (name: UserState["affiliation"]) => void; // Action to update the user's affiliation
  updateResume: (name: UserState["resume"]) => void; // Action to update the user's resume
  updateResumeId: (name: UserState["resumeId"]) => void; // Action to update the user's resume ID
};
// Creating the user store with Zustand
/**
 * The useUserStore function creates and manages the state of the user using Zustand.
 * It includes the state variables and their corresponding update actions.
 *
 * Example Usage:
 * - To get the user name: `const name = useUserStore(state => state.name);`
 * - To update the user name: `useUserStore(state => state.updateName("New Name"));`
 *
 * The store holds the state of the user, including personal details, and provides methods to update them.
 */
export const useUserStore = create<UserState & UserAction>()((set) => ({
  // Initial state for the user
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
  // Action to update the user's name
  updateName: (name: string) => {
    set(() => ({ name: name }));
  },
  // Action to update the user's email
  updateEmail: (email: string) => {
    set(() => ({ email: email }));
  },
  // Action to update the user's Unity ID
  updateUnityid: (unityid: string) => {
    set(() => ({ unityid: unityid }));
  },
  // Action to update the user's student ID
  updateStudentid: (studentid: string) => {
    set(() => ({ studentid: studentid }));
  },
  // Action to update the user's password
  updatePassword: (password: string) => {
    set(() => ({ password: password }));
  },
  // Action to update the user's address
  updateAddress: (address: string) => {
    set(() => ({ address: address }));
  },
  // Action to update the user's role
  updateRole: (role: string) => {
    set(() => ({ role: role }));
  },
  // Action to update the user's date of birth
  updateDob: (dob: string) => {
    set(() => ({ dob: dob }));
  },
  // Action to update the user's skills
  updateSkills: (skills: string) => {
    set(() => ({ skills: skills }));
  },
  // Action to update the user's projects
  updateProjects: (projects: string) => {
    set(() => ({ projects: projects }));
  },
  // Action to update the user's work experience
  updateExperience: (experience: string) => {
    set(() => ({ experience: experience }));
  },
  // Action to update the user's phone number
  updatePhonenumber: (phonenumber: string) => {
    set(() => ({ phonenumber: phonenumber }));
  },
  // Action to update the user's ID
  updateId: (id: string) => {
    set(() => ({ id: id }));
  },
  // Action to update the user's availability
  updateAvailability: (availability: string) => {
    set(() => ({ availability: availability }));
  },
  // Action to update the user's gender
  updateGender: (gender: string) => {
    set(() => ({ gender: gender }));
  },
  // Action to update the user's available working hours
  updateHours: (hours: string) => {
    set(() => ({ hours: hours }));
  },
  // Action to update the user's login status
  updateIsLoggedIn: (isLoggedIn: boolean) => {
    set(() => ({ isLoggedIn: isLoggedIn }));
  },
  // Action to update the user's affiliation
  updateAffiliation: (affiliation: string) => {
    set(() => ({ affiliation: affiliation }));
  },
  // Action to update the user's resume
  updateResume: (resume: string) => {
    set(() => ({ resume: resume }));
  },
  // Action to update the user's resume ID
  updateResumeId: (resumeId: string) => {
    set(() => ({ resumeId: resumeId }));
  },
}));
