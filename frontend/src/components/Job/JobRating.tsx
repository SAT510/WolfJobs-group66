/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * JobRating Component
 *
 * This component displays a list of job applications for a particular job that are in the "rating" stage.
 * Users can accept or reject candidates for the job. Accepting or rejecting a candidate triggers an
 * API call to update the application's status and reloads the page to reflect the changes.
 *
 * @component
 * @example
 * const jobData = { _id: "123", name: "Software Developer" };
 * return <JobRating jobData={jobData} />;
 *
 * @param {Object} props - Component props.
 * @param {Job} props.jobData - Data for the job associated with the applications being rated.
 */
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const JobRating = (props: any) => {
  // Destructure job data from props
  const { jobData }: { jobData: Job } = props;
  // State to hold filtered applications that are in the "rating" stage
  const [displayList, setDisplayList] = useState<Application[]>([]);
  // Get search parameters from the URL (used for filtering applications if needed)
  const [searchParams] = useSearchParams();
  // Access the application's store to get the list of all applications
  const applicationList = useApplicationStore((state) => state.applicationList);
  /**
   * useEffect hook to filter and set applications that are in the "rating" stage
   * when the component mounts or when the search parameters change.
   */
  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "rating"
      )
    );
  }, [searchParams]);
  /**
   * Handle accepting a candidate.
   * Makes an API call to change the status of the application to "accepted".
   *
   * @param {string} applicantid - The unique ID of the applicant.
   * @param {string} applicantname - The name of the applicant.
   * @param {string} jobname - The name of the job for which the application is made.
   */
  const handleAccept = (
    applicantid: string,
    applicantname: string,
    jobname: string
  ) => {
    const url =
      "http://localhost:8000/api/v1/users/modifyApplicationFinalStage";

    const body = {
      applicationId: applicantid,
      status: "accepted",
      applicantname: applicantname,
      jobname: jobname,
    };
    // API call to accept the candidate
    axios.post(url, body).then((res) => {
      if (res.status == 200) {
        toast.success("Accepted candidate");
        location.reload(); // Reload the page to update the application status
        return;
      }
      toast.error("Failed to accept candidate");
    });
  };
  /**
   * Handle rejecting a candidate.
   * Makes an API call to change the status of the application to "rejected".
   *
   * @param {string} applicantid - The unique ID of the applicant.
   * @param {string} applicantname - The name of the applicant.
   * @param {string} jobname - The name of the job for which the application is made.
   */
  const handleReject = (
    applicantid: string,
    applicantname: string,
    jobname: string
  ) => {
    const url =
      "http://localhost:8000/api/v1/users/modifyApplicationFinalStage";

    const body = {
      applicationId: applicantid,
      status: "rejected",
      applicantname: applicantname,
      jobname: jobname,
    };
    // API call to reject the candidate
    axios.post(url, body).then((res) => {
      if (res.status == 200) {
        toast.success("Rejected candidate");
        location.reload(); // Reload the page to update the application status
        return;
      }
      toast.error("Failed to reject candidate");
    });
  };

  return (
    <>
      <div className="text-xl">Rating</div>
      {/* If no applications are found, display "List empty" */}
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {/* Map over the display list and show each applicant's details */}
      {displayList.map((item: Application) => {
        return (
          <div className=" p-1">
            <div className="bg-white my-2 mx-1 p-2 rounded-lg">
              <div className=" flex flex-row justify-between">
                <div className="flex flex-col">
                  <div>
                    <span className="font-bold"> Name: </span>
                    {item.applicantname}
                  </div>
                  {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                  <div>
                    <span className="font-bold">Email: </span>
                    {item.applicantemail}
                  </div>
                  {!!item?.applicantSkills && (
                    <div>
                      <span className="font-bold">Skills:</span>
                      {item.applicantSkills}
                    </div>
                  )}
                  <div>
                    <span className="font-bold">Rating: </span>
                    {item.rating || "0"}
                  </div>
                </div>
                {/* Action buttons to accept or reject the applicant */}
                <div className="flex flex-row">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      return handleAccept(
                        item._id,
                        item.applicantname,
                        item.jobname
                      );
                    }}
                    style={{ color: "#FF5353" }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      return handleReject(
                        item._id,
                        item.applicantname,
                        item.jobname
                      );
                    }}
                    style={{ color: "#FF5353" }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default JobRating;
