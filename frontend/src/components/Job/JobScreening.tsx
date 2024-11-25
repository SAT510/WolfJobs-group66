import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
/**
 * JobScreening component handles the display of job applications for screening.
 * It filters applications based on job ID and their status, and allows the user to
 * accept or reject candidates for the screening stage.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Job} props.jobData - The job data for the current job posting.
 * @returns {JSX.Element} The rendered component displaying the job applications.
 */
const JobScreening = (props: any) => {
  const { jobData }: { jobData: Job } = props; // Destructure jobData prop
  const [searchParams] = useSearchParams(); // Get search params from URL

  const [displayList, setDisplayList] = useState<Application[]>([]); // State for filtered application list

  const applicationList = useApplicationStore((state) => state.applicationList); // Get application list from store
  // Effect hook to filter applications based on jobData._id and application status
  useEffect(() => {
    // let displayList: Application[] = [];s
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "applied"
      )
    );
  }, [searchParams]); // Re-run the effect when searchParams change
  /**
   * Handles accepting a candidate for the screening stage.
   * Sends a POST request to update the application status to 'screening'.
   *
   * @param {string} applicationId - The ID of the application to be modified.
   * @param {string} applicantname - The name of the applicant.
   * @param {string} jobname - The name of the job associated with the application.
   */
  const handleAccept = (
    applicationId: string,
    applicantname: string,
    jobname: string
  ) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicationId,
      status: "screening",
      applicantname: applicantname,
      jobname: jobname,
    };

    axios.post(url, body).then((res) => {
      if (res.status == 200) {
        toast.success("Accepted candidate"); // Show success message
        location.reload(); // Reload page to reflect changes

        return;
      }
      toast.error("Failed to accept candidate"); // Show error message if the request fails
    });
  };
  /**
   * Handles rejecting a candidate.
   * Sends a POST request to update the application status to 'rejected'.
   *
   * @param {string} applicationId - The ID of the application to be modified.
   * @param {string} applicantname - The name of the applicant.
   * @param {string} jobname - The name of the job associated with the application.
   */
  const handleReject = (
    applicationId: string,
    applicantname: string,
    jobname: string
  ) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: applicationId,
      status: "rejected",
      applicantname: applicantname,
      jobname: jobname,
    };

    axios.post(url, body).then((res) => {
      if (res.status == 200) {
        toast.success("Rejected candidate"); // Show success message
        location.reload(); // Reload page to reflect changes

        return;
      }
      toast.error("Failed to reject candidate"); // Show error message if the request fails
    });
  };

  return (
    <>
      <div className="text-xl">Screening</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div className="p-1 ">
          <div className="p-2 mx-1 my-2 bg-white rounded-lg">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
                <div className="flex justify-center px-2 py-1 ml-2 border border-gray-300 rounded-md">
                  <a
                    href={`/resumeviewer/${item.applicantid}`}
                    className="text-red-500"
                  >
                    View Resume
                  </a>
                </div>
              </div>
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
      ))}
    </>
  );
};

export default JobScreening;
