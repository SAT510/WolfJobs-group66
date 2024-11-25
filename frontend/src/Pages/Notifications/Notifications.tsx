import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../../store/JobStore";
import { useApplicationStore } from "../../store/ApplicationStore";
import JobListTile from "../../components/Job/JobListTile";

/**
 * Notifications component that displays accepted and rejected job notifications.
 * It fetches the application and job data from an API and categorizes them into accepted and rejected jobs.
 * Users can toggle visibility for accepted and rejected job notifications.
 *
 * @component
 */

const Notifications = () => {
  // State hooks to manage the list of accepted and rejected jobs and their visibility
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList = useJobStore((state) => state.jobList);

  const updateApplicationList = useApplicationStore(
    (state) => state.updateApplicationList
  );
  const applicationList = useApplicationStore((state) => state.applicationList);
  // Local state for accepted and rejected jobs
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [isAcceptedVisible, setIsAcceptedVisible] = useState(true);
  const [isRejectedVisible, setIsRejectedVisible] = useState(true);
  // Navigation hook to navigate to job detail page
  const navigate = useNavigate();
  /**
   * useEffect hook that fetches the application and job data when the component mounts.
   * It updates the global state with fetched data and handles errors.
   */
  useEffect(() => {
    // Fetching applications data
    axios
      .get("http://localhost:8000/api/v1/users/fetchapplications")
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching applications");
          return;
        }
        // Update the application list in the store
        updateApplicationList(res.data.application);
      });
    // Fetching jobs data
    axios
      .get("http://localhost:8000/api/v1/users", {
        params: { page: 1, limit: 25 },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching jobs");
          return;
        }
        updateJobList(res.data.jobs);
      });
  }, []); // Empty dependency array means this effect runs once after the first render
  /**
   * useEffect hook that filters accepted and rejected jobs based on the application status.
   * It updates the state for accepted and rejected jobs accordingly.
   */
  useEffect(() => {
    const acceptedApplications = applicationList.filter(
      (app) => app.status === "accepted"
    );
    const acceptedJobIds = acceptedApplications.map((app) => app.jobid);
    const acceptedJobList = jobList.filter((job) =>
      acceptedJobIds.includes(job._id)
    );
    setAcceptedJobs(acceptedJobList);

    const rejectedApplications = applicationList.filter(
      (app) => app.status === "rejected"
    );
    const rejectedJobIds = rejectedApplications.map((app) => app.jobid);
    const rejectedJobList = jobList.filter((job) =>
      rejectedJobIds.includes(job._id)
    );
    setRejectedJobs(rejectedJobList); // Runs when either applicationList or jobList changes
  }, [applicationList, jobList]);
  /**
   * Handles the click event on a job notification. Navigates to the dashboard with the selected job's ID.
   *
   * @param {string} jobId - The ID of the selected job.
   */
  const handleJobClick = (jobId) => {
    navigate("/dashboard", { state: { selectedJobId: jobId } });
  };
  /**
   * Toggles the visibility of the accepted job notifications.
   */
  const toggleAcceptedVisibility = () => {
    setIsAcceptedVisible(!isAcceptedVisible);
  };
  /**
   * Toggles the visibility of the rejected job notifications.
   */
  const toggleRejectedVisibility = () => {
    setIsRejectedVisible(!isRejectedVisible);
  };

  return (
    <div className="notifications-page">
      <h1>
        Accepted Jobs ({acceptedJobs.length})
        <span onClick={toggleAcceptedVisibility} style={{ cursor: "pointer" }}>
          {isAcceptedVisible ? "▼" : "▲"}
        </span>
      </h1>
      {isAcceptedVisible && (
        <div className="notifications-list">
          {acceptedJobs.length > 0 ? (
            acceptedJobs.map((job) => (
              <div onClick={() => handleJobClick(job._id)} key={job._id}>
                <JobListTile data={job} action="view-details" />
              </div>
            ))
          ) : (
            <p>No accepted job notifications.</p>
          )}
        </div>
      )}

      <h1>
        Rejected Jobs ({rejectedJobs.length})
        <span onClick={toggleRejectedVisibility} style={{ cursor: "pointer" }}>
          {isRejectedVisible ? "▼" : "▲"}
        </span>
      </h1>
      {isRejectedVisible && (
        <div className="notifications-list">
          {rejectedJobs.length > 0 ? (
            rejectedJobs.map((job) => (
              <div onClick={() => handleJobClick(job._id)} key={job._id}>
                <JobListTile data={job} action="view-details" />
              </div>
            ))
          ) : (
            <p>No rejected job notifications.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
