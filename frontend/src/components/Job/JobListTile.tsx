import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
/**
 * JobGrading Component
 * 
 * This component displays the list of job applicants who are in the "grading" status for a particular job
 * and allows the user to grade their answers to job-related questions.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Job} props.jobData - The job data including the job-related questions and information.
 * 
 * @returns {JSX.Element} The JSX markup to display the grading interface for job applicants.
 */
const JobGrading = (props: any) => {
  // Extract job data from props
  const { jobData }: { jobData: Job } = props;
  // State to store the filtered list of applicants who are currently being graded
  const [displayList, setDisplayList] = useState<Application[]>([]);
  // Hook to retrieve search parameters from the URL
  const [searchParams] = useSearchParams();
  // Access the list of all applications from the global store
  const applicationList = useApplicationStore((state) => state.applicationList);
/**
   * Effect hook to filter and set the display list whenever the search parameters change.
   * The filtered list contains only the applications for the specific job that are in the "grading" status.
   */
  useEffect(() => {
    // let displayList: Application[] = [];s
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "grading"
      )
    );
  }, [searchParams]);
/**
   * Handles the scoring of an application.
   * 
   * This function sends a POST request to modify the status and grade of an application.
   * After the request is completed, it shows a success or error toast based on the response.
   * 
   * @param {string} applicationId - The ID of the application to be graded.
   * @param {string} grade - The grade to assign to the application (a number between 0-10).
   */
  const handleScoring = (applicationId: string, grade: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      
      applicationId: applicationId,
      status: "rating", // Update the application status to 'rating'
      rating: grade,  // Set the grade for the application
    };
// Send POST request to the API
    axios.post(url, body).then((res) => {
      // If successful, show success toast and reload the page
      if (res.status == 200) {
        toast.success("Rejected candidate");
        location.reload();

        return;
      }// If failed, show error toast
      toast.error("Failed to reject candidate");
    });
  };

  return (
    <>
      <div className="text-xl ">Grading</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div className=" p-1">
          <div className="bg-white my-2 mx-1 p-2 rounded-lg">
            <div className=" flex flex-col">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
              </div>
              <div className="text-xl mt-4">Grade the questions</div>
              <div className="text-base">{jobData.question1}</div>
              <div className="text-base text-gray-600/80">
                {item.answer1 || "empty"}
              </div>
              <div className="text-base">{jobData.question2}</div>
              <div className="text-base text-gray-600/80">
                {item.answer2 || "empty"}
              </div>
              <div className="text-base">{jobData.question3}</div>
              <div className="text-base text-gray-600/80 ">
                {item.answer3 || "empty"}
              </div>
              <div className="text-base">{jobData.question4}</div>
              <div className="text-base text-gray-600/80">
                {item.answer4 || "empty"}
              </div>
              <div className="text-xl mt-4">Grade</div>
              <div className="flex flex-row">
                <input
                  className="border border-gray-700 rounded-lg w-20 text-right px-1"
                  type="number"
                  id={`${item._id}-grade`}
                  max={10}
                  min={0}
                />
                <div className="w-4" />
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    // Get grade input value and handle scoring for the application
                    const x: any = document.getElementById(`${item._id}-grade`);
                    const grade: string = x.value || "";
                    handleScoring(item._id, grade.toString());
                  }}
                  style={{
                    borderColor: "#FF5353",
                    color: "#FF5353",
                  }}
                >
                  Grade
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobGrading;
