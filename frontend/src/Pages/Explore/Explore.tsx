/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The Explore component allows users to explore job listings, search, filter,
 * and sort them based on various criteria such as salary, city, and employment type.
 *
 * It fetches job data from the backend API, manages user-related state using
 * the UserStore and ApplicationStore, and updates the global job list and
 * application list accordingly.
 *
 * Key Features:
 * - Search for jobs by name
 * - Sort jobs by salary, city, or employment type
 * - Filter jobs by location, salary range, and employment type
 * - Toggle between showing open and closed jobs
 * - Displays job list and job details side-by-side
 *
 * @component
 * @example
 * return <Explore />;
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
// State hooks for storing user data and job listings
import JobsListView from "../../components/Job/JobListView";
import JobDetailView from "../../components/Job/JobDetailView";
import { useJobStore } from "../../store/JobStore";
import { useApplicationStore } from "../../store/ApplicationStore";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const Explore = () => {
  const navigate = useNavigate();

  const updateName = useUserStore((state) => state.updateName);
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

  const updateApplicationList = useApplicationStore(
    (state) => state.updateApplicationList
  );

  const updateEmail = useUserStore((state) => state.updateEmail);
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList: Job[] = useJobStore((state) => state.jobList);
  // State hooks for sorting and filtering job listings
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobList, setFilteredJobList] = useState<Job[]>([]);
  const [sortHighestPay, setSortHighestPay] = useState(false);
  const [sortAlphabeticallyByCity, setSortAlphabeticallyByCity] =
    useState(false);
  const [sortByEmploymentType, setSortByEmploymentType] = useState(false);
  const [showOpenJobs, setShowOpenJobs] = useState(true); // true for open jobs, false for closed jobs
  const [jobType, setJobType] = useState("all-jobs");

  // New state for filters
  const [filterLocation, setFilterLocation] = useState("");
  const [filterMinSalary, setFilterMinSalary] = useState("");
  const [filterMaxSalary, setFilterMaxSalary] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterEmploymentType, setFilterEmploymentType] = useState("");
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  /**
   * Handles search input change, updating the search term state.
   *
   * @param {any} event - The input change event.
   */
  const handleSortChange = () => {
    setSortHighestPay(!sortHighestPay);
  };
  /**
   * Toggles the sort order by city alphabetically.
   */
  const handleSortCityChange = () => {
    setSortAlphabeticallyByCity(!sortAlphabeticallyByCity);
  };
  /**
   * Toggles the sort order by employment type.
   */
  const handleSortEmploymenyTypeChange = () => {
    setSortByEmploymentType(!sortByEmploymentType);
  };
  /**
   * Toggles the job status between open and closed.
   */
  const toggleJobStatus = () => {
    setShowOpenJobs(!showOpenJobs);
  };
  // Fetches user data and updates the state on component mount
  useEffect(() => {
    const token: string = localStorage.getItem("token")!;
    if (!!!token) {
      navigate("/login");
    }
    if (!!token) {
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));
      // Updates the user data from token payload
      updateName(userInfo.name);
      updateEmail(userInfo.email);
      updateAddress(userInfo.address);
      updateUnityid(userInfo.unityid);
      updateStudentid(userInfo.studentid);
      updateRole(userInfo.role);
      updateDob(userInfo.dob);
      updateSkills(userInfo.skills);
      updateExperience(userInfo.experience);
      updateProjects(userInfo.projects);
      updatePhonenumber(userInfo.phonenumber);
      updateId(userInfo._id);
      updateAvailability(userInfo.availability);
      updateGender(userInfo.gender);
      updateHours(userInfo.hours);
      updateIsLoggedIn(true);
      updateResume(userInfo.resume);
      updateResumeId(userInfo.resumeId);
    }
  }, []);
  // Fetches job and application data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/fetchapplications")
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching applications");
          return;
        }
        res.data.application.sort(
          (a: { jobDeadline: string }, b: { jobDeadline: string }) =>
            new Date(a.jobDeadline).getTime() -
            new Date(b.jobDeadline).getTime()
        );
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
  }, []);
  /**
   * Filters and sorts the job list based on search, sorting, and filtering criteria.
   *
   * @returns {void}
   */
  useEffect(() => {
    let updatedList = jobList;
    // Filters jobs based on search term
    if (searchTerm !== "") {
      updatedList = updatedList.filter((job) =>
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sorts jobs by highest pay, city, or employment type
    if (sortHighestPay) {
      updatedList = [...updatedList].sort(
        (a, b) => parseFloat(b.pay) - parseFloat(a.pay)
      );
    }

    if (sortAlphabeticallyByCity) {
      updatedList = [...updatedList].sort((a, b) => {
        return a.location.localeCompare(b.location);
      });
    }

    if (sortByEmploymentType) {
      updatedList = [...updatedList].sort((a, b) => {
        return a.type.localeCompare(b.type);
      });
    }
    // Filters jobs based on selected job type
    if (jobType !== "all-jobs") {
      updatedList = updatedList.filter((job) =>
        job.type.toLowerCase().includes(jobType.toLowerCase())
      );
    }
    // Filters jobs by location, salary range, and employment type
    if (filterLocation !== "") {
      updatedList = updatedList.filter((job) =>
        job.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    //filter for max and min salary
    if (filterMinSalary !== "" || filterMaxSalary !== "") {
      updatedList = updatedList.filter((job) => {
        const jobPay = parseFloat(job.pay);

        const minSalary = parseFloat(filterMinSalary) || 0;

        const maxSalary = parseFloat(filterMaxSalary) || Infinity;

        return jobPay >= minSalary && jobPay <= maxSalary;
      });
    }

    if (filterEmploymentType !== "") {
      updatedList = updatedList.filter(
        (job) => job.type === filterEmploymentType
      );
    }

    updatedList = updatedList.filter((job) =>
      showOpenJobs ? job.status === "open" : job.status === "closed"
    );

    setFilteredJobList(updatedList);
  }, [
    searchTerm,
    jobList,
    sortHighestPay,
    sortAlphabeticallyByCity,
    sortByEmploymentType,
    showOpenJobs,
    filterLocation,
    filterMinSalary,
    filterMaxSalary,
    filterEmploymentType,
    jobType,
  ]);

  return (
    <>
      <div className="content bg-slate-50">
        <div className="flex flex-col">
          <div className="p-4 search-bar-container">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2"
            />
          </div>
          <div className="p-4 flex items-center gap-4">
            <button
              onClick={handleSortChange}
              className="p-2 ml-2 border border-black rounded-lg"
            >
              {sortHighestPay
                ? "Sort by High Pay : On"
                : "Sort by Highest Pay : Off"}
            </button>
            <button
              onClick={handleSortCityChange}
              className="p-2 ml-2 border border-black rounded-lg"
            >
              {sortAlphabeticallyByCity
                ? "Sort by City : On"
                : "Sort by City : Off"}
            </button>
            <button
              onClick={handleSortEmploymenyTypeChange}
              className="p-2 ml-2 border border-black rounded-lg"
            >
              {sortByEmploymentType
                ? "Sort by Employment Type : On"
                : "Sort by Employment Type : Off"}
            </button>
            <button
              onClick={toggleJobStatus}
              className="p-2 ml-2 border border-black rounded-lg"
            >
              {showOpenJobs ? "Show Closed Jobs" : "Show Open Jobs"}
            </button>
            <div style={{ gridTemplateRows: "auto auto" }}>
              <FormControl sx={{ minWidth: 150 }}>
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
                    height: "40px",
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(0.75),
                      borderRadius: "10px",
                      borderColor: "black",
                    },
                  }}
                >
                  <MenuItem value={"all-jobs"}>All Jobs</MenuItem>
                  <MenuItem value={"full-time"}>Full Time</MenuItem>
                  <MenuItem value={"part-time"}>Part Time</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="p-2 ml-2 border border-black rounded-lg"
              >
                Filters
              </button>

              {showFilterDropdown && (
                <div className="absolute mt-2 w-48 bg-white border shadow-lg p-4 z-10">
                  <div className="mb-2">
                    <label>Location:</label>

                    <input
                      type="text"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="w-full p-2 border"
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="mb-2">
                    <label>Min Salary:</label>

                    <input
                      type="number"
                      value={filterMinSalary}
                      onChange={(e) => setFilterMinSalary(e.target.value)}
                      className="w-full p-2 border"
                      placeholder="Enter min salary"
                    />
                  </div>

                  <div className="mb-2">
                    <label>Max Salary:</label>

                    <input
                      type="number"
                      value={filterMaxSalary}
                      onChange={(e) => setFilterMaxSalary(e.target.value)}
                      className="w-full p-2 border"
                      placeholder="Enter max salary"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="employmentType">Employment Type:</label>

                    <select
                      id="employmentType" // This id must match the htmlFor above
                      value={filterEmploymentType}
                      onChange={(e) => setFilterEmploymentType(e.target.value)}
                      className="w-full p-2 border"
                    >
                      <option value="">Select Type</option>

                      <option value="full-time">Full-Time</option>

                      <option value="part-time">Part-Time</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setShowFilterDropdown(false)}
                    className="p-2 bg-blue-500 text-white w-full"
                  >
                    Apply Filters
                  </button>
                </div>
              )}
              {/* <button
              onClick={toggleJobStatus}
              className="p-2 ml-2 border border-black rounded-lg"
            >
              {showOpenJobs ? "Show Closed Jobs" : "Show Open Jobs"}
            </button> */}
            </div>
          </div>

          <div
            className="flex flex-row"
            style={{ height: "calc(100vh - 72px)" }}
          >
            <JobsListView
              jobsList={filteredJobList}
              title={
                jobType === "part-time"
                  ? "Part time"
                  : jobType === "full-time"
                    ? "Full time"
                    : "All Jobs"
              }
            />
            <JobDetailView />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
