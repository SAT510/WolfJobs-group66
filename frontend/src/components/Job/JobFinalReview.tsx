import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useSearchParams } from "react-router-dom";
/**
 * JobFinalReview component displays the list of accepted and rejected candidates
 * for a particular job. It filters the applications based on their status 
 * and renders detailed information about the candidates.
 *
 * @param {object} props - The properties passed to the component.
 * @param {Job} props.jobData - Data for the job being reviewed.
 * 
 * @returns {JSX.Element} The rendered JobFinalReview component.
 */
const JobFinalReview = (props: any) => {
  // Destructuring jobData from props
  const { jobData }: { jobData: Job } = props;
  // State to hold the list of accepted and rejected applications
  const [acceptedList, setAcceptedList] = useState<Application[]>([]);
  const [rejectedList, setRejectedList] = useState<Application[]>([]);
  // React Router hook to access search parameters (e.g., URL query params)
  const [searchParams] = useSearchParams();
  // Accessing the list of applications from the application store
  const applicationList = useApplicationStore((state) => state.applicationList);
  /**
   * useEffect hook to filter applications based on the status (accepted/rejected)
   * whenever the search parameters change.
   */
  useEffect(() => {
    setAcceptedList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "accepted"
      )
    );
    setRejectedList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "rejected"
      )
    );
    // console.log(applicationList); // For debugging (currently commented)
  }, [searchParams]);

  return (
    <>
      <div className="text-xl">Review</div>
      {/* Section for displaying accepted candidates */}
      <div className="text-xl">Accepted Candidates</div>
      {acceptedList.length == 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {acceptedList?.map((item: Application) => {
        return (
          <div className="p-1 ">
            <div className="p-2 mx-1 my-2 bg-white rounded-lg">
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
            </div>
          </div>
        );
      })}
      {/* Section for displaying rejected candidates */}
      <div className="text-xl">Rejected Candidates</div>
      {rejectedList.length == 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {rejectedList?.map((item) => {
        return (
          <div className="p-1 ">
            <div className="p-2 mx-1 my-2 bg-white rounded-lg">
              <div className="flex flex-col">
                <div>
                  <span className="font-bold">Name: </span> {item.applicantname}
                </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>
                  <span className="font-bold">Email: </span>
                  {item.applicantemail}
                </div>
                {!!item?.applicantSkills && (
                  <div>
                    <span className="font-bold">Skills: </span>
                    {item.applicantSkills}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default JobFinalReview;
