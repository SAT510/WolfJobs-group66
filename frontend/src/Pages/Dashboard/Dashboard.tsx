import { useEffect, useState } from "react";
import JobDetailView from "../../components/Job/JobDetailView";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { useJobStore } from "../../store/JobStore";
import { useApplicationStore } from "../../store/ApplicationStore";
import JobListTile from "../../components/Job/JobListTile";
import { Button } from "@mui/material";
/**
 * Dashboard component that displays different information based on the user role.
 * - For "Manager" role: Displays job listings with options to view applications.
 * - For "Applicant" role: Displays jobs they have applied for with application statuses.
 *
 * The component interacts with various stores (UserStore, JobStore, ApplicationStore) to 
 * manage and display user data, job listings, and applications.
 */
const Dashboard = () => {
  const naviagte = useNavigate();
  // User store actions to update user data
  const updateName = useUserStore((state) => state.updateName);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const updatePassword = useUserStore((state) => state.updatePassword);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateUnityid = useUserStore((state) => state.updateUnityid);
  const updateStudentid = useUserStore((state) => state.updateStudentid);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updateProjects = useUserStore((state) => state.updateProjects);
  const updateExperience = useUserStore((state) => state.updateExperience);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);
  // User and job store state
  const role = useUserStore((state) => state.role);
  const managerId = useUserStore((state) => state.id);
  // Job and application store actions
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList: Job[] = useJobStore((state) => state.jobList);

  const updateApplicationList = useApplicationStore(
    (state) => state.updateApplicationList
  );

  const applicationList: Application[] = useApplicationStore(
    (state) => state.applicationList
  );
  // State to display jobs based on user role
  const [displayList, setDisplayList] = useState<Job[]>([]);
  // Check if the user is logged in and update user data on mount
  useEffect(() => {
    const token: string = localStorage.getItem("token")!;
    if (!!!token) {
      naviagte("/login"); // Redirect to login if token is not found
    }
    if (!!token) {
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));
      // Update user data using the values from the token
      updateName(userInfo.name);
      updateEmail(userInfo.email);
      updatePassword(userInfo.password);
      updateAddress(userInfo.address);
      updateUnityid(userInfo.unityid);
      updateStudentid(userInfo.studentid);
      updateRole(userInfo.role);
      updateDob(userInfo.dob);
      updateSkills(userInfo.skills);
      updateProjects(userInfo.projects);
      updateExperience(userInfo.experience);
      updatePhonenumber(userInfo.phonenumber);
      updateId(userInfo._id);
      updateAvailability(userInfo.availability);
      updateGender(userInfo.gender);
      updateHours(userInfo.hours);
      updateIsLoggedIn(true);
      updateResume(userInfo.resume);
      updateResumeId(userInfo.resumeId);
    }
  }, []); // Empty dependency array ensures this effect runs only once after component mount
  // Fetch applications and job listings on mount
  useEffect(() => {
    // Fetch applications
    axios
      .get("http://localhost:8000/api/v1/users/fetchapplications")
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching applications");
          return;
        }
        updateApplicationList(res.data.application as Application[]);
      });

    axios
      .get("http://localhost:8000/api/v1/users", {
        params: { page: 1, limit: 25 },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching jobs");
          return;
        }
        res.data.jobs.sort(
          (a: { jobDeadline: string }, b: { jobDeadline: string }) =>
            new Date(a.jobDeadline).getTime() -
            new Date(b.jobDeadline).getTime()
        );
        updateJobList(res.data.jobs as Job[]);
      });
  }, []); // Empty dependency array ensures this effect runs only once after component mount
   // Filter and display jobs based on the user's role (Manager or Applicant)
  useEffect(() => {
    if (role === "Manager") {
      const temp = jobList.filter((item) => {
        return item.managerid === managerId; // Filter jobs managed by the current user
      });
      setDisplayList(temp);
    } else if (role === "Applicant") {
      const applicantsJobs: Application[] = applicationList.filter(
        (item) => item.applicantid
      );
      const ids: string[] = [];
      for (let i = 0; i < applicantsJobs.length; i++) {
        const id = applicantsJobs[i]?.jobid || "";
        ids.push(id);
      }
      const temp = jobList.filter((item) => ids.includes(item._id)); // Filter jobs the user has applied to
      setDisplayList(temp);
    }
  }, [role, jobList, applicationList]); // Re-run effect when role, jobList, or applicationList changes

  return (
    <>
      <div className="content bg-slate-50">
        <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
          <>
            <div className="w-4/12 pt-2 overflow-x-hidden overflow-y-scroll bg-white/60 px-9">
              <div className="py-4 text-2xl">
                {role === "Manager" ? "My Listings" : "My Applications"}
              </div>
              {displayList?.map((job: Job) => {
                let action;

                if (role === "Manager") {
                  action = "view-application";
                } else {
                  const application = applicationList?.find(
                    (item) =>
                      item.jobid === job._id && item.status === "screening"
                  );
                  action = application
                    ? "view-questionnaire"
                    : "view-application";
                }

                return <JobListTile data={job} key={job._id} action={action} />;
              })}
            </div>
          </>
          <JobDetailView />
        </div>
      </div>
      {role === "Manager" && (
        <div className="fixed p-4 bottom-3 right-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              naviagte("/createjob");
            }}
            type="button"
            className="text-white bg-red-400 "
            style={{
              background: "#FF5353",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "18px",
              width: "250px",
            }}
            variant="contained"
          >
            Create Job +
          </Button>
        </div>
      )}
    </>
  );
};
export default Dashboard;
function updateExpirence(experience: any) {
  throw new Error("Function not implemented.");
}
