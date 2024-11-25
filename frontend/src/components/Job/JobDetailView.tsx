/**
 * JobDetailView component is responsible for fetching and displaying the details
 * of a job selected by the user. It listens to the query parameter `jobId` from
 * the URL and updates the job data accordingly. If no job is selected, it displays
 * a "No Job Selected" message.
 *
 * This component utilizes React's state, effect hooks, and a custom store to manage
 * job data, and conditionally renders either job details or a fallback UI.
 */ import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../../store/JobStore";
import NoJobSelected from "./NoJobSelected";
import JobDetail from "./JobDetails";

const JobDetailView = () => {
  // Fetch the search parameters from the URL using React Router's useSearchParams hook.
  // eslint-disable-line
  /* tslint:disable-next-line */
  const [searchParams] = useSearchParams(); // eslint-disable-line
  // Access the job list from the global store using the useJobStore hook.
  const [jobData, setJobData] = useState<Job | null>();

  // State to store the job data. Initially set to null, will be updated based on the selected job.
  const jobsList = useJobStore((state) => state.jobList);
  /**
   * useEffect hook to listen for changes in searchParams and jobsList.
   * If the `jobId` is present in the URL search parameters, it attempts to
   * find the matching job from the job list and updates `jobData`. If no
   * jobId is found, it sets `jobData` to null.
   */
  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (!!jobId) {
      setJobData(jobsList.find((item) => item._id === jobId));
    } else {
      setJobData(null);
    }
  }, [searchParams, jobsList]); // Dependencies: searchParams and jobsList

  return (
    <>
      <div className="w-8/12" style={{ height: "calc(100vh - 72px)" }}>
        {!jobData && <NoJobSelected />}
        {!!jobData && <JobDetail jobData={jobData} />}
      </div>
    </>
  );
};

export default JobDetailView;
